import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import UsersTable, { type User } from "@/components/users/UsersTable";
import EditUserModal from "@/components/users/EditUserModal";

const Users = () => {
  const [search, setSearch] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleEdit = (user: User) => {
    console.log("Editing user:", user);
    setSelectedUser(user);
  };

  const handleClose = () => {
    console.log("Closing edit modal");
    setSelectedUser(null);
  };

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
          <Button className="w-full md:w-auto">Add User</Button>
        </div>
      </div>

      <UsersTable search={search} onEdit={handleEdit} />

      {selectedUser && (
        <EditUserModal
          user={selectedUser}
          onEdit={handleEdit}
          onClose={handleClose}
        />
      )}
    </div>
  );
};

export default Users;
