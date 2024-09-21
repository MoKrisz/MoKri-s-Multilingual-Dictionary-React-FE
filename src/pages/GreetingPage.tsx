import Button from "../components/Button"

export default function GreetingPage() {
  return (
    <main className="bg-celadon h-full">
      <section className="flex flex-col md:flex-row gap-52 items-center justify-center h-full">
        <h1 className="font-bold md:text-xl lg:text-4xl">MoKri's<br/> Multilingual Dictionary</h1>
        <Button>Get started!</Button>
      </section>
    </main>
  );
}
