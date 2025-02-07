import clsx from "clsx";

type DashPageHeadingProps = {
  as?: "div" | "h1";
  className?: string;
  children: React.ReactNode;
};

export default function DashPageHeading({
  children,
  className,
  as: Component = "h1",
}: DashPageHeadingProps) {
  return (
    <Component
      className={clsx(className, "text-2xl font-bold pb-5 ml-12 lg:ml-0")}
    >
      {children}
    </Component>
  );
}
