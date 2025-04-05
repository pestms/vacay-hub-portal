
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

const cardVariants = cva(
  "overflow-hidden transition-all duration-200 hover:shadow-md",
  {
    variants: {
      variant: {
        default: "bg-card border-border",
        purple: "bg-gradient-to-br from-purple-100 to-purple-50 border-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 dark:border-purple-800/50",
        blue: "bg-gradient-to-br from-blue-100 to-blue-50 border-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 dark:border-blue-800/50",
        green: "bg-gradient-to-br from-green-100 to-green-50 border-green-200 dark:from-green-900/30 dark:to-green-800/30 dark:border-green-800/50",
        red: "bg-gradient-to-br from-red-100 to-red-50 border-red-200 dark:from-red-900/30 dark:to-red-800/30 dark:border-red-800/50",
        amber: "bg-gradient-to-br from-amber-100 to-amber-50 border-amber-200 dark:from-amber-900/30 dark:to-amber-800/30 dark:border-amber-800/50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const iconVariants = cva(
  "p-2 rounded-full flex items-center justify-center",
  {
    variants: {
      variant: {
        default: "bg-muted text-muted-foreground",
        purple: "bg-purple-200 text-purple-700 dark:bg-purple-700/50 dark:text-purple-300",
        blue: "bg-blue-200 text-blue-700 dark:bg-blue-700/50 dark:text-blue-300",
        green: "bg-green-200 text-green-700 dark:bg-green-700/50 dark:text-green-300",
        red: "bg-red-200 text-red-700 dark:bg-red-700/50 dark:text-red-300",
        amber: "bg-amber-200 text-amber-700 dark:bg-amber-700/50 dark:text-amber-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
  variant?: "default" | "purple" | "blue" | "green" | "red" | "amber";
}

export function StatCard({
  title,
  value,
  description,
  icon,
  className,
  variant = "default",
}: StatCardProps) {
  return (
    <Card className={cn(cardVariants({ variant }), className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon && (
          <div className={iconVariants({ variant })}>
            <div className="w-4 h-4">{icon}</div>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}
