import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { User } from "@/types/User";
import { Pencil, Trash2 } from "lucide-react";

type Props = {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
};

const UsersTable: React.FC<Props> = ({ users, onEdit, onDelete }) => {
  return (
    <section aria-labelledby="users-heading" className="w-full overflow-x-auto">
      <h2 id="users-heading" className="sr-only">
        Users Table
      </h2>

      <Table className="min-w-full border rounded-lg">
        <TableHeader>
          <TableRow>
            <TableHead scope="col">Name</TableHead>
            <TableHead scope="col">Email</TableHead>
            <TableHead scope="col">Role</TableHead>
            <TableHead scope="col">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.length > 0 ? (
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name || "Unnamed"}</TableCell>
                <TableCell>{user.email || "—"}</TableCell>
                <TableCell>{user.role || "—"}</TableCell>
                <TableCell>
                  <div className="flex flex-col md:flex-row gap-2">
                    <Button
                      variant="outline"
                      className="w-full md:w-auto"
                      onClick={() => onEdit(user)}
                      aria-label={`Edit user ${user.name}`}
                    >
                      <Pencil className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      className="w-full md:w-auto"
                      onClick={() => {
                        if (typeof user.id === "string") onDelete(user);
                      }}
                      aria-label={`Delete user ${user.name}`}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center text-muted-foreground"
              >
                No users found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </section>
  );
};

export default UsersTable;
