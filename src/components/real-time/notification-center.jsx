import { Bell } from "lucide-react";
import { Button } from "../ui/button";

export function NotificationCenter() {
  return (
    <Button variant="ghost" size="sm" className="p-2">
      <Bell className="w-4 h-4" />
    </Button>
  );
}