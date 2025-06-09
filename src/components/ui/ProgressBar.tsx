import { calculateProgress } from "@/lib/utils";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  showSteps?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
  color?: "primary" | "success" | "warning" | "error";
}

export default function ProgressBar({
  currentStep,
  totalSteps,
  showSteps = true,
  className = "",
  size = "md",
  color = "primary",
}: ProgressBarProps) {
  const progress = calculateProgress(currentStep, totalSteps);

  const sizeClasses = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3",
  };

  const colorClasses = {
    primary: "bg-primary-600",
    success: "bg-success-600",
    warning: "bg-warning-600",
    error: "bg-error-600",
  };

  return (
    <div className={`w-full ${className}`}>
      {showSteps && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm text-gray-500">
            {currentStep} of {totalSteps} steps
          </span>
        </div>
      )}

      <div className={`w-full bg-gray-200 rounded-full ${sizeClasses[size]}`}>
        <div
          className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${progress}%` }}
        />
      </div>

      {showSteps && (
        <div className="mt-1 text-right">
          <span className="text-xs text-gray-500">{progress}% complete</span>
        </div>
      )}
    </div>
  );
}
