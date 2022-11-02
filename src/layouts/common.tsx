import { ComponentProps, ReactNode } from "react";
import Header from "../components/header";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; /* eslint-disable import/first */

type Props = {
  children: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
} & ComponentProps<"main">;
const MainLayout = (props: Props) => {
  const { children, header, footer, className } = props;

  return (
    <div className="relative flex min-h-screen w-full flex-col">
      {header || <Header />}
      <main
        {...props}
        className={`mx-auto h-full w-full flex-grow px-4 md:container ${className}`}
      >
        {children}
      </main>
      {footer || null}
    </div>
  );
};

MainLayout.messages = [...Header.messages];
export default MainLayout;
