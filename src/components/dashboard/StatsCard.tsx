import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: "default" | "success" | "warning" | "destructive";
  className?: string;
}

export function StatsCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  variant = "default",
  className
}: StatsCardProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "success":
        return "border-success/20 bg-success/5";
      case "warning":
        return "border-warning/20 bg-warning/5";
      case "destructive":
        return "border-destructive/20 bg-destructive/5";
      default:
        return "";
    }
  };

  const getIconColor = () => {
    switch (variant) {
      case "success":
        return "text-success";
      case "warning":
        return "text-warning";
      case "destructive":
        return "text-destructive";
      default:
        return "text-primary";
    }
  };

  return (
    <Card className={cn("transition-all hover:shadow-medium", getVariantStyles(), className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className={cn("h-4 w-4", getIconColor())} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          {description && <span>{description}</span>}
          {trend && (
            <span className={cn(
              "flex items-center gap-1",
              trend.isPositive ? "text-success" : "text-destructive"
            )}>
              {trend.isPositive ? "↗" : "↘"} {Math.abs(trend.value)}%
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}