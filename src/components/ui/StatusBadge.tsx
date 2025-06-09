import { getStatusColor, getStatusText } from "@/lib/utils";
import type { ServiceStatus, ApplicationStatus, Language } from "@/types";

interface StatusBadgeProps {
  status: ServiceStatus | ApplicationStatus;
  language: Language;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function StatusBadge({
  status,
  language,
  size = "md",
  className = "",
}: StatusBadgeProps) {
  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-2.5 py-1 text-xs",
    lg: "px-3 py-1.5 text-sm",
  };

  return (
    <span
      className={`
        inline-flex items-center rounded-full font-medium
        ${getStatusColor(status)}
        ${sizeClasses[size]}
        ${className}
      `}
    >
      <div className="w-1.5 h-1.5 rounded-full bg-current mr-1.5"></div>
      {getStatusText(status, language)}
    </span>
  );
}
