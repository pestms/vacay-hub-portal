
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface RequestStatusBadgeProps {
  status: "pending" | "approved" | "rejected";
}

export function RequestStatusBadge({ status }: RequestStatusBadgeProps) {
  return (
    <Badge
      className={cn(
        "capitalize",
        status === "approved" && "bg-green-600 hover:bg-green-700",
        status === "rejected" && "bg-red-600 hover:bg-red-700",
        status === "pending" && "bg-amber-600 hover:bg-amber-700"
      )}
    >
      {status}
    </Badge>
  );
}
