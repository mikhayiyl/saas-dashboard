import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import UsersTable from "@/components/users/UsersTable";
import EditUserModal from "@/components/users/EditUserModal";
import {
  addUser,
  deleteUser,
  fetchUsers,
  updateUser,
} from "@/lib/firebaseUsers";
import type { User } from "@/types/User";

const Users = () => {
  const [search, setSearch] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);

  //save and add new user

  const handleSave = async (user: User) => {
    if (user.id) {
      // Optimistic update for existing user
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u.id === user.id ? user : u))
      );
      await updateUser(user);
    } else {
      // Optimistic add for new user
      const { id, ...userWithoutId } = user;
      const newUserId = (await addUser(userWithoutId)).id;

      setUsers((prevUsers) => [
        ...prevUsers,
        {
          ...userWithoutId,
          id: newUserId,
        },
      ]);
    }

    handleClose();
    //  real sync
    const updatedUsers = await fetchUsers();
    setUsers(updatedUsers);
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  // delete

  const handleDelete = async (id: string) => {
    // Optimistic update
    setUsers((prev) => prev.filter((u) => u.id !== id));
    try {
      await deleteUser(id);
    } catch (error) {
      console.error("Failed to delete user:", error);
      // Optional rollback here
    }
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
          users={users}
        />
      )}
    </div>
  );
};

export default Users;
