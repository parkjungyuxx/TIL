"use client";

import { useRouter } from "next/navigation";
import { startTransition } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();
  const reload = () => {
    startTransition(() => {
      router.refresh();
      reset();
    });
  };
  return (
    <>
      <h1>Error: {error.message}</h1>
      <button
        onClick={reload}
        className="border border-black py-1 px-2 cursor-pointer"
      >
        reset
      </button>
    </>
  );
}
