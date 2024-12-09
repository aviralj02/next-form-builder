import Button from "@/components/Button";
import DownloadIcon from "@/components/icons/DownloadIcon";
import { ButtonType } from "@/typings/enums";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex justify-between items-center">
        <Link className="flex items-center justify-center" href="#">
          <span className="font-bold text-lg sm:text-2xl">
            Next Form Builder
          </span>
        </Link>

        <Link href="/builder">
          <Button buttonType={ButtonType.ACTIVE}>Get Started</Button>
        </Link>
      </header>

      <main className="flex-1 w-full">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="flex flex-col items-center space-y-4 text-center w-full">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Create Forms with Ease
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Build simple, powerful forms in minutes. No authentication
                required.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link href="/builder">
                <Button buttonType={ButtonType.ACTIVE}>Get Started</Button>
              </Link>
              <Link href="/responses">
                <Button buttonType={ButtonType.SUBMIT}>
                  Download Responses
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 NextFormBuilder. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
