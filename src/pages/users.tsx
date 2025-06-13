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
import ConfirmDeleteModal from "@/components/ui/ConfirmDeleteModal";

// Optional debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

const Users = () => {
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, 300); //  Debounced search

  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);

  //  Save and add new user
  const handleSave = async (user: User) => {
    if (user.id) {
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u.id === user.id ? user : u))
      );
      await updateUser(user);
    } else {
      const { id, ...userWithoutId } = user; // remove any existing id
      const { id: newUserId } = await addUser(userWithoutId);
      setUsers((prevUsers) => [
        ...prevUsers,
        { ...userWithoutId, id: newUserId },
      ]);
    }

    handleClose();

    //Optional real sync
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

  //confirmation
  const confirmDelete = (user: User) => {
    setUserToDelete(user);
  };

  //delete
  const handleDelete = async () => {
    if (!userToDelete || !userToDelete.id) return;

    setUsers((prev) => prev.filter((u) => u.id !== userToDelete.id));
    try {
      await deleteUser(userToDelete.id);
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
    setUserToDelete(null);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const filteredUsers = users.filter((user) =>
    [user.name, user.email]
      .join(" ")
      .toLowerCase()
      .includes(debouncedSearch.toLowerCase())
  );

  return (
    <main className="p-4 max-w-screen-lg mx-auto">
      <header className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <h1 className="text-lg md:text-xl font-semibold">Users</h1>
        <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
          <Input
            type="text"
            aria-label="Search users"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-64"
          />
          <Button className="w-full md:w-auto" onClick={handleAdd}>
            Add User
          </Button>
        </div>
      </header>

      {filteredUsers.length > 0 ? (
        <UsersTable
          users={filteredUsers}
          onEdit={handleEdit}
          onDelete={confirmDelete}
        />
      ) : (
        <div className="text-center text-gray-500 mt-8">No users found.</div>
      )}

      {isModalOpen && (
        <EditUserModal
          user={selectedUser ?? undefined}
          onEdit={handleSave}
          onClose={handleClose}
          users={users}
        />
      )}

      {userToDelete && (
        <ConfirmDeleteModal
          user={userToDelete}
          onConfirm={handleDelete}
          onCancel={() => setUserToDelete(null)}
        />
      )}
    </main>
  );
};

export default Users;
