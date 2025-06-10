import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import UsersTable, { type User } from "@/components/users/UsersTable";
import EditUserDialog from "@/components/users/EditUserModal";

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
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Users</h1>
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-64"
          />
          <Button>Add User</Button>
        </div>
      </div>

      <UsersTable search={search} onEdit={handleEdit} />

      {selectedUser && (
        <EditUserDialog
          user={selectedUser}
          onEdit={handleEdit}
          onClose={handleClose}
        />
      )}
    </div>
  );
};

export default Users;
