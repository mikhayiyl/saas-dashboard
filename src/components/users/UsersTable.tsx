import { Table, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import EditUserDialog from "@/components/users/EditUserModal";

export type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

const usersData: User[] = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Admin" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", role: "Editor" },
  {
    id: 3,
    name: "Charlie Brown",
    email: "charlie@example.com",
    role: "Viewer",
  },
];

const UsersTable: React.FC<{
  search: string;
  onEdit: (user: User) => void;
}> = ({ search, onEdit }) => {
  const handleEdit = (user: User) => console.log("Editing:", user);
  const handleClose = () => console.log("Dialog closed");

  const filteredUsers = usersData.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Table className="w-full">
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Role</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <tbody>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <EditUserDialog
                  user={user}
                  onEdit={handleEdit}
                  onClose={handleClose}
                />
                <Button variant="destructive" className="ml-2">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={4} className="text-center text-gray-500">
              No users found.
            </TableCell>
          </TableRow>
        )}
      </tbody>
    </Table>
  );
};

export default UsersTable;
