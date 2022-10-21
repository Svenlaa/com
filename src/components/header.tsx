import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";

const paths = [
  { href: "/", label: "Home" },
  { href: "/account", label: "Account" },
] as const;

const Header = () => {
  const currPath = useRouter().asPath;
  return (
    <header className="flex flex-row gap-4 p-4">
      {paths.map((path) => (
        <Lin to={path.href} isActive={path.href === currPath} key={path.href}>
          {path.label}
        </Lin>
      ))}
    </header>
  );
};

type LinkProps = {
  to: string;
  children: ReactNode;
  isActive?: boolean;
};
const Lin = ({ to, children, isActive }: LinkProps) => {
  return (
    <Link href={to}>
      <a
        className={`${isActive ? " bg-purple-500" : ""} rounded-md p-2 text-lg`}
      >
        {children}
      </a>
    </Link>
  );
};

export default Header;
