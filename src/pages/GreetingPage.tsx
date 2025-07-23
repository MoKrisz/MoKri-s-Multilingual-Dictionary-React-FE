import { Link } from "react-router-dom";
import Button from "../components/Button";

export default function GreetingPage() {
  return (
    <main className="h-full">
      <section className="flex flex-col md:flex-row gap-10 md:gap-52 items-center justify-center h-full">
        <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl">
          MoKri's
          <br />
          Multilingual Dictionary
        </h1>
        <Link to="menu">
          <Button extraStyle="font-bold">Get started!</Button>
        </Link>
      </section>
    </main>
  );
}
