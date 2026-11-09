import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
        404 error
      </p>
      <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
        Page not found
      </h1>
      <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400 max-w-md">
        Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or doesn&apos;t exist.
      </p>
      <div className="mt-8">
        <Button href="/">
          Back to Homepage
        </Button>
      </div>
    </div>
  );
}

