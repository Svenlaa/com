import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode, useState } from "react";
import {
  faBars,
  faHouse,
  faRunning,
  faX,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslations } from "next-intl";
import Flag from "./flag";

type pathType = {
  href: string;
  label: keyof IntlMessages["Header"];
  icon?: IconDefinition;
};

const paths: Readonly<pathType[]> = [
  { href: "/", label: "home", icon: faHouse },
  { href: "/running", label: "running", icon: faRunning },
] as const;

const Header = () => {
  const t = useTranslations("Header");

  const currPath = useRouter().pathname;
  const [isOpen, setIsOpen] = useState(false);
  const locale = useRouter().locale;

  return (
    <header className="z-50 mx-auto w-screen md:container">
      <div className="mx-auto flex w-full flex-row justify-between bg-white p-4 dark:bg-black md:bg-inherit">
        <Link href="/">
          <a className="my-auto text-3xl duration-200 ease-in hover:text-prime-900 dark:hover:text-prime-200">
            Svenlaa
          </a>
        </Link>

        {/* Section with hamburger for smaller screens */}
        <div className="flex flex-row md:hidden ">
          {locale === "nl" && (
            <Flag countryCode="gb" langCode="en" langName="English" />
          )}
          {locale === "en" && (
            <Flag countryCode="nl" langCode="nl" langName="Nederlands" />
          )}
          <button
            className="translate aspect-square rounded-full bg-prime-600 text-3xl text-white"
            aria-label="hamburger menu"
            onClick={() => setIsOpen(!isOpen)}
          >
            <FontAwesomeIcon
              icon={isOpen ? faX : faBars}
              className="aspect-square scale-90 p-2"
            />
          </button>
        </div>

        {/* Section that shows tabs on larger screens */}
        <div className="hidden gap-4 md:flex md:flex-row">
          {paths.map((path) => (
            <HeaderLink
              to={path.href}
              isActive={path.href === currPath}
              key={path.href}
              icon={path.icon ? path.icon : undefined}
            >
              {t(path.label)}
            </HeaderLink>
          ))}
          {locale === "nl" && (
            <Flag
              countryCode="gb"
              langCode="en"
              langName="English"
              className="transition-text whitespace-nowrap rounded-md bg-white p-2 px-3 text-xl text-gray-800 delay-75 duration-500 ease-out hover:bg-prime-700 hover:text-white dark:bg-gray-800 dark:text-gray-400"
            />
          )}
          {locale === "en" && (
            <Flag
              countryCode="nl"
              langCode="nl"
              langName="Nederlands"
              className="transition-text whitespace-nowrap rounded-md bg-white p-2 px-3 text-xl text-gray-800 delay-75 duration-500 ease-out hover:bg-prime-700 hover:text-white dark:bg-gray-800 dark:text-gray-400"
            />
          )}
        </div>
      </div>

      {/* Dropdown for smaller screens */}
      <div
        className={`${
          isOpen ? "flex " : "hidden"
        } absolute w-full flex-col rounded-b-xl bg-white px-4 drop-shadow-xl dark:bg-gray-900 md:hidden`}
      >
        {paths.map((path) => (
          <HeaderLink
            to={path.href}
            isActive={path.href === currPath}
            key={path.href}
            icon={path.icon ? path.icon : undefined}
          >
            {t(path.label)}
          </HeaderLink>
        ))}
      </div>
    </header>
  );
};

Header.messages = ["Header"];

type LinkProps = {
  to: string;
  children: ReactNode;
  isActive?: boolean;
  icon?: IconDefinition;
};

const HeaderLink = (props: LinkProps) => {
  const { to, children } = props;
  return (
    <Link href={to}>
      <a
        className={`${
          props.isActive
            ? "text-prime-700 md:bg-prime-700 md:text-white md:hover:bg-prime-600"
            : "hover:text-prime-700 md:bg-white md:text-gray-800 md:hover:bg-prime-700 md:hover:text-white md:dark:bg-gray-800 md:dark:text-gray-400"
        } transition-text whitespace-nowrap rounded-md p-2 px-3 text-xl drop-shadow-sm delay-75 duration-500 ease-out`}
      >
        {props.icon ? (
          <FontAwesomeIcon className="text-md pr-2" icon={props.icon} />
        ) : null}
        {children}
      </a>
    </Link>
  );
};

export default Header;
