import { ComponentProps, ReactNode } from "react";
import Footer from "../components/footer";
import Header from "../components/header";

type Props = {
  children: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
} & ComponentProps<"main">;
const MainLayout = ({
  children,
  header,
  footer,
  className,
  ...props
}: Props) => {
  let head: ReactNode = <Header />;
  if (header === null) head = null;
  if (header) head = header;

  let foot: ReactNode = <Footer />;
  if (footer === null) foot = null;
  if (footer) foot = footer;

  return (
    <div className="flex min-h-screen flex-col">
      {head}
      <main className={`flex-grow px-4 ${className}`} {...props}>
        {children}
      </main>
      {foot}
    </div>
  );
};

export default MainLayout;
