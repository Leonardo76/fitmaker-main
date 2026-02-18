import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "empty"
    | "link"
    | "icon";
  size?: "default" | "sm" | "lg" | "icon";
  children?: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "default", size = "default", children, ...props },
    ref,
  ) => {
    const variantClasses = getVariantClasses(variant);
    const sizeClasses = getSizeClasses(size);

    return (
      <button
        className={`
          inline-flex items-center justify-center whitespace-nowrap rounded-md 
          text-sm font-medium ring-offset-white transition-colors 
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 
          focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50
          
          ${variantClasses} ${sizeClasses} ${className || ""}
        `}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  },
);

export default Button;

// Helper to get variant classes without external libraries
const getVariantClasses = (variant: string) => {
  switch (variant) {
    case "default":
      return "bg-blue-600 text-white hover:bg-blue-700 shadow-sm";
    case "destructive":
      return "bg-red-600 text-white hover:bg-red-700 shadow-sm";
    case "outline":
      return "border border-slate-300 bg-white hover:bg-slate-100 text-slate-900";
    case "icon":
      return "hover:scale-125 ";
    case "secondary":
      return "bg-slate-100 text-slate-900 hover:bg-slate-200";
    case "ghost":
      return "hover:bg-slate-100 text-slate-700 hover:text-slate-900";
    case "empty":
      return "";
    case "link":
      return "text-blue-600 underline-offset-4 hover:underline";
    default:
      return "bg-blue-600 text-white hover:bg-blue-700 shadow-sm";
  }
};

// Helper to get size classes
const getSizeClasses = (size: string) => {
  switch (size) {
    case "default":
      return "h-10 px-4 py-2";
    case "sm":
      return "h-9 rounded-md px-3";
    case "lg":
      return "h-11 rounded-md px-8";
    case "icon":
      return "h-5 w-5";
    default:
      return "h-10 px-4 py-2";
  }
};
