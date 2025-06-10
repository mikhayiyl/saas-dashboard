import { Table, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import EditUserDialog from "@/components/users/EditUserModal";

type User = {
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
  const filteredUsers = usersData.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="overflow-x-auto">
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
                <TableCell className="text-sm md:text-base">
                  {user.name}
                </TableCell>
                <TableCell className="text-sm md:text-base">
                  {user.email}
                </TableCell>
                <TableCell className="text-sm md:text-base">
                  {user.role}
                </TableCell>
                <TableCell className="flex flex-col md:flex-row gap-2">
                  <EditUserDialog
                    user={user}
                    onEdit={onEdit}
                    onClose={() => console.log("Dialog closed")}
                  />
                  <Button variant="destructive" className="w-full md:w-auto">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center text-gray-500 text-sm md:text-base"
              >
                No users found.
              </TableCell>
            </TableRow>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default UsersTable;
