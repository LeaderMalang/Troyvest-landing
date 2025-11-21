type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
};

export function GradientButton({ children, asChild, ...rest }: Props) {
  const base =
    "inline-flex items-center justify-center px-6 py-3 rounded-xl " +
    "bg-gradient-to-r from-[#FEE372] to-[#FACC15] text-black text-sm md:text-base " +
    "font-semibold shadow-[0_0_18px_rgba(255,199,0,0.45)] " +
    "hover:shadow-[0_0_24px_rgba(255,199,0,0.65)] transition";

  if (asChild) {
    // for <a> wrapper
    return (
      <button className={base} {...rest}>
        {children}
      </button>
    );
  }
  return (
    <button className={base} {...rest}>
      {children}
    </button>
  );
}
