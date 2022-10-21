import { ReactNode } from "react";
import Footer from "../components/footer";
import Header from "../components/header";

type Props = { children: ReactNode; header?: ReactNode; footer?: ReactNode };
const CommonLayout = ({ children, header, footer }: Props) => {
  let head: ReactNode = <Header />;
  if (header === null) head = null;
  if (header) head = header;

  let foot: ReactNode = <Footer />;
  if (footer === null) foot = null;
  if (footer) foot = footer;

  return (
    <>
      {head}
      <main className="px-4">{children}</main>
      {foot}
    </>
  );
};

export default CommonLayout;
