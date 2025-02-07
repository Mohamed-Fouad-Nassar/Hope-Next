"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

type FilterOptionProps = { value: string; label: string };
type FilterProps = { options: FilterOptionProps[]; filterField: string };

export default function Filter({ options, filterField }: FilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeFilterValue = searchParams.get(filterField) ?? "all";

  function handleFilter(value: string): void {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");
    params.set(filterField, value);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    // <div className="flex w-fit overflow-hidden bg-white border divide-x rounded-lg dark:bg-gray-900 rtl:flex-row-reverse dark:border-gray-700 dark:divide-gray-700">
    <div className="inline-flex w-fit overflow-hidden text-base font-medium divide-x rounded-lg border border-gray-100 bg-gray-100 p-1 dark:bg-gray-900 rtl:flex-row-reverse dark:border-gray-700 dark:divide-gray-700">
      {options.map(({ value, label }: FilterOptionProps) => (
        <FilterButton
          key={value}
          label={label}
          active={activeFilterValue == value}
          onClick={() => handleFilter(value)}
        />
      ))}
    </div>
  );
}

type FilterButtonProps = {
  label: string;
  active: boolean;
  onClick: () => void;
};

export function FilterButton({
  active = false,
  label = "",
  onClick,
}: FilterButtonProps) {
  return (
    <button
      // className={`px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100
      //   ${active ? "!bg-main-600 !text-white !cursor-not-allowed" : ""}

      // `}
      className={`inline-block rounded-md px-4 py-1.5 text-sm focus:relative ${
        active
          ? "bg-white text-main-500 shadow-sm"
          : "text-gray-500 hover:text-gray-700"
      }`}
      disabled={active}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
