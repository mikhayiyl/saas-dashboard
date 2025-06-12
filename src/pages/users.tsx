import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import UsersTable from "@/components/users/UsersTable";
import EditUserModal, { type User } from "@/components/users/EditUserModal";
import {
  addUser,
  deleteUser,
  fetchUsers,
  updateUser,
} from "@/lib/firebaseUsers";

const Users = () => {
  const [search, setSearch] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);

  const handleSave = async (user: User) => {
    if (user.id) {
      await updateUser(user);
    } else {
      await addUser(user);
    }

    const updatedUsers = await fetchUsers();
    setUsers(updatedUsers);
    handleClose();
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    await deleteUser(id);
    const updatedUsers = await fetchUsers();
    setUsers(updatedUsers);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const filteredUsers = users.filter((user) =>
    [user.name, user.email]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="p-4 max-w-screen-lg mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <h1 className="text-lg md:text-xl font-semibold">Users</h1>
        <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
          <Input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-64"
          />
          <Button className="w-full md:w-auto" onClick={handleAdd}>
            Add User
          </Button>
        </div>
      </div>

      <UsersTable
        users={filteredUsers}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {isModalOpen && (
        <EditUserModal
          user={selectedUser ?? undefined}
          onEdit={handleSave}
          onClose={handleClose}
        />
      )}
    </div>
  );
};

export default Users;
