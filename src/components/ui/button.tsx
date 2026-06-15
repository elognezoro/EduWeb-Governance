import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600/40 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-brand-700 text-white shadow-soft hover:bg-brand-800 active:scale-[0.98]",
        secondary:
          "bg-institutional-600 text-white shadow-soft hover:bg-institutional-700 active:scale-[0.98]",
        outline:
          "border border-slate-200 bg-card text-ink hover:bg-slate-50 hover:border-slate-300",
        ghost: "text-ink hover:bg-slate-100",
        gold: "bg-gold-500 text-white shadow-soft hover:bg-gold-600 active:scale-[0.98]",
        danger: "bg-danger-500 text-white shadow-soft hover:bg-danger-600",
      },
      size: {
        sm: "h-9 px-3.5",
        md: "h-11 px-5",
        lg: "h-12 px-7 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
);
Button.displayName = "Button";

export { Button, buttonVariants };
