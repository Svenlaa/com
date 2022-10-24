import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import {
  faHouse,
  faUser,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

type pathType = {
  readonly href: string;
  readonly label: string;
  readonly icon?: IconDefinition;
  readonly blank?: boolean;
};

const paths: pathType[] = [
  { href: "/", label: "Home", icon: faHouse },
  { href: "/account", label: "Account", icon: faUser },
  {
    href: "https://github.com/Svenlaa",
    label: "Github",
    icon: faGithub,
    blank: true,
  },
];

const Header = () => {
  const currPath = useRouter().asPath;
  return (
    <header className="flex flex-row gap-4 p-4">
      {paths.map((path) => (
        <HeaderLink
          to={path.href}
          isActive={path.href === currPath}
          key={path.href}
          icon={path.icon ? path.icon : undefined}
          target={path.blank ? "_blank" : undefined}
        >
          {path.label}
        </HeaderLink>
      ))}
    </header>
  );
};

type LinkProps = {
  to: string;
  children: ReactNode;
  isActive?: boolean;
  icon?: IconDefinition;
  target?: string;
};
const HeaderLink = ({ to, children, isActive, icon, target }: LinkProps) => {
  return (
    <Link href={to}>
      <a
        className={`${
          isActive
            ? "bg-prime-500 text-white"
            : "transition-text bg-white text-gray-800 delay-75 duration-500 ease-out hover:bg-prime-500 hover:text-white dark:bg-gray-800 dark:text-gray-400"
        } rounded-md p-2 px-3 text-lg`}
        target={target || "_self"}
      >
        {icon ? <FontAwesomeIcon className="pr-2" icon={icon} /> : null}
        {children}
      </a>
    </Link>
  );
};

export default Header;
