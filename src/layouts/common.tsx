import { ComponentProps, ReactNode } from "react";
import Footer from "../components/footer";
import Header from "../components/header";

type Props = {
  children: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
} & ComponentProps<"main">;
const MainLayout = (props: Props) => {
  const { children, header, footer, className } = props;
  let head: ReactNode = <Header />;
  if (header === null) head = null;
  if (header) head = header;

  let foot: ReactNode = <Footer />;
  if (footer === null) foot = null;
  if (footer) foot = footer;

  return (
    <div className="relative flex min-h-screen w-full flex-col">
      {head}
      <main
        {...props}
        className={`mx-auto h-full w-full flex-grow px-4 md:container ${className}`}
      >
        {children}
      </main>
      {foot}
    </div>
  );
};

MainLayout.messages = [...Header.messages];
export default MainLayout;
