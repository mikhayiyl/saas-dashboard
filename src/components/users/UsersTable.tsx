import { Button } from "@/components/ui/button";
import { Table, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import type { User } from "@/types/User";
import { Pencil, Trash2 } from "lucide-react";

type Props = {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
};

const UsersTable: React.FC<Props> = ({ users, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
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
          {users.length > 0 ? (
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name || "Unnamed"}</TableCell>
                <TableCell>{user.email || "—"}</TableCell>
                <TableCell>{user.role || "—"}</TableCell>
                <TableCell className="flex flex-col md:flex-row gap-2">
                  <Button
                    variant="outline"
                    className="w-full md:w-auto"
                    onClick={() => onEdit(user)}
                  >
                    <Pencil className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    className="w-full md:w-auto"
                    onClick={() => {
                      if (typeof user.id === "string") onDelete(user.id);
                    }}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
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
    </div>
  );
};

export default UsersTable;
