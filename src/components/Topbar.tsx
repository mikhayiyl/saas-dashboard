import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Topbar() {
  return (
    <header className="flex items-center justify-between p-4 border-b bg-background">
      <h1 className="text-lg font-semibold">SaaS Dashboard</h1>
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarFallback>MM</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
