import { cn } from "@/lib/utils";
import { TransitionTrigger } from "./transition-trigger";
import { AnimationVariant } from "@/lib/animations";

interface NavigationButtonProps {
  href?: string;
  children: React.ReactNode;
  disabled?: boolean;
  variant?: AnimationVariant;
}

export const NavigationButton = ({
  href,
  children,
  disabled,
  variant = "down",
}: NavigationButtonProps) => {
  const baseClasses =
    "text-subtitle font-semibold opacity-30 transition-opacity ease-quad-out";

  if (href && !disabled) {
    return (
      <TransitionTrigger
        href={href}
        variant={variant}
        className={`${baseClasses} hover:opacity-100`}
      >
        {children}
      </TransitionTrigger>
    );
  }

  return (
    <button
      disabled
      className={cn(baseClasses, "cursor-not-allowed opacity-10")}
    >
      {children}
    </button>
  );
};
