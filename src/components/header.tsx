import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";

const paths = [
  { href: "/", label: "Home" },
  { href: "/account", label: "Account" },
  { href: "https://github.com/Svenlaa", label: "Github" },
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
        className={`${
          isActive
            ? "bg-prime-500 hover:bg-prime-400 hover:dark:bg-prime-600"
            : "hover:bg-gray-300 dark:hover:bg-gray-800"
        } rounded-md p-2 text-lg`}
      >
        {children}
      </a>
    </Link>
  );
};

export default Header;
