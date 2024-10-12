import { Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function RootLayout() {
  return (
    <>
      <Header />
      <main className="h-full">
        <Outlet />
      </main>
    </>
  );
}
