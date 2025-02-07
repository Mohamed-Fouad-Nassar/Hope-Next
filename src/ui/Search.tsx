"use client";

import { usePathname, useRouter } from "next/navigation";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import Button from "./Button";

export default function Search({
  searchField,
  placeholder = "Search...",
}: {
  searchField: string;
  placeholder?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();

  function handleSearch(query: string): void {
    const params = new URLSearchParams();
    params.delete("page");
    params.set(searchField, query);
    router.push(`${pathname}/search?${params.toString()}`, { scroll: false });
  }

  return (
    <form
      className="max-w-md mx-auto"
      onSubmit={(e: React.FormEvent) => {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        console.log(form.search.value);

        handleSearch(form.search.value);
      }}
    >
      <label
        htmlFor="search"
        className="sr-only text-sm font-medium text-gray-900 dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <MagnifyingGlassIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        </div>
        <input
          required
          id="search"
          type="search"
          placeholder={placeholder}
          className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-main-500 focus:border-main-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-main-500 dark:focus:border-main-500"
        />
        <Button
          variation="primary"
          size="sm"
          type="submit"
          className="absolute end-[5px] bottom-[5px] "
        >
          Search
        </Button>
      </div>
    </form>
  );
}
