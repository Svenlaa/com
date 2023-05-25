import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

export type Profile = {
  name: string;
  role: string;
  links?: pathType[];
  pictureUrl: string;
};

type ProfileCardProps = {
  profile: Profile;
  buttonTxt: string;
};

const ProfileCard = ({ buttonTxt, profile }: ProfileCardProps) => {
  return (
    <div className="m-4 flex flex-col rounded-2xl bg-white/50 p-8 pb-4 drop-shadow-2xl dark:bg-white/10">
      <span className="relative mx-auto h-72 w-72">
        <Image
          src={profile.pictureUrl}
          alt={profile.name}
          layout="fill"
          className="aspect-square rounded-full"
          priority
        />
      </span>
      <span className="mx-auto mt-4 text-center text-2xl font-bold">
        {profile.name}
      </span>
      <span className="text-center text-gray-600 dark:text-gray-400">
        {profile.role}
      </span>
      {profile.links && (
        <div className="my-2 flex flex-row justify-center gap-2">
          {profile.links.map((l) => (
            <ProfileLink
              animate={l.animate}
              href={l.href}
              icon={l.icon}
              key={l.href}
              label={l.label}
            />
          ))}
        </div>
      )}
      <Link href="/running">
        <a className="mx-auto my-2 w-min whitespace-nowrap rounded-full bg-prime-600 py-2 px-4 text-2xl font-extrabold text-white transition-colors duration-200 hover:bg-prime-700">
          {buttonTxt}
        </a>
      </Link>
    </div>
  );
};

type pathType = {
  readonly href: string;
  readonly icon: IconDefinition;
  readonly label: string;
  readonly animate?: boolean;
};
const ProfileLink = (props: pathType) => {
  return (
    <div className="relative rounded-md bg-white/80 dark:bg-black/80 drop-shadow-sm justify-center h-8 w-8 text-lg text-black/80 transition-colors duration-200 hover:bg-gray-300 dark:text-gray-400 md:hover:bg-prime-700 md:hover:text-white">
      <div
        className={`${
          props.animate ? "ping" : "opacity-0"
        } bg-prime-700 absolute h-full w-full top-0 -z-10 rounded-lg`}
      />
      <Link href={props.href}>
        <a
          target="_blank"
          aria-label={props.label}
          className="h-full w-full flex justify-center content-center flex-col "
        >
          <FontAwesomeIcon icon={props.icon} className="aspect-square" />
        </a>
      </Link>
    </div>
  );
};

export default ProfileCard;
