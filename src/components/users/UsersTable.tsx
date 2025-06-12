import { Button } from "@/components/ui/button";
import { Table, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import EditUserDialog from "@/components/users/EditUserModal";
import { useLiveData } from "@/hooks/useLiveData";

export type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  lastSeen: number;
};

const transformUsers = (val: Record<string, User>): User[] => {
  return Object.entries(val || {}).map(([id, user]) => ({
    id: Number(id),
    name: user.name,
    email: user.email,
    role: user.role,
    lastSeen: user.lastSeen,
  }));
};

const UsersTable: React.FC<{
  search: string;
  onEdit: (user: User) => void;
}> = ({ search, onEdit }) => {
  const {
    data: users,
    isUpdating,
    error,
    retry,
  } = useLiveData<User, Record<string, User>>("users", transformUsers);

  const filteredUsers = users.filter((user) => {
    const name = user.name ?? "";
    const email = user.email ?? "";
    return (
      name.toLowerCase().includes(search.toLowerCase()) ||
      email.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="overflow-x-auto">
      {error && (
        <div className="text-red-600 mb-2">
          Failed to load users. <Button onClick={retry}>Retry</Button>
        </div>
      )}
      {isUpdating && <div className="text-gray-500 mb-2">Loading users...</div>}
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHeader>

        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="text-sm md:text-base">
                  {user.name || "Unnamed"}
                </TableCell>
                <TableCell className="text-sm md:text-base">
                  {user.email || "—"}
                </TableCell>
                <TableCell className="text-sm md:text-base">
                  {user.role || "—"}
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
