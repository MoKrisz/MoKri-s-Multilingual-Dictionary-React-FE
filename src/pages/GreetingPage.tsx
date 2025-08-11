import { Trans } from "react-i18next";

export default function GreetingPage() {
  return (
    <main className="h-full">
      <section className="flex flex-col md:flex-row gap-10 md:gap-52 items-center justify-center h-full">
        <h1 className="text-text-primary font-bold text-2xl md:text-3xl lg:text-4xl">
          <Trans i18nKey="app-title">
            MoKri's
            <br />
            Multilingual Dictionary
          </Trans>
        </h1>
      </section>
    </main>
  );
}
