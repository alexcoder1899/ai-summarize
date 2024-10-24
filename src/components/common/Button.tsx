import clsx from "clsx";

type ButtonProps = {
  variant?: "outlined" | "contained";
  className?: string;
};

const Button: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps
> = ({ children, variant = "contained", className = "", ...props }) => {
  return (
    <button
      className={clsx(
        "relative flex w-[160px] justify-center overflow-hidden rounded-xl px-16 py-2.5 font-bold",
        variant === "contained"
          ? "border-none bg-button-gradient disabled:opacity-30"
          : "border border-white bg-transparent",
        className
      )}
      {...props}
    >
      {variant === "contained" && (
        <span className="absolute inset-0 z-0 bg-[#531DAB] opacity-80"></span>
      )}
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default Button;
