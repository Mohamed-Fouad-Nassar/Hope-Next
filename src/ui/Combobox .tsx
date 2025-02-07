"use client";

import { RefObject, useState } from "react";

import useClickOutside from "@/hooks/useClickOutside";

type TDataItem = {
  title: string;
  value: string;
  subTitle?: string;
};
type TComboboxProps = {
  data: TDataItem[];
  placeholder?: string;
  selectedValue: string;
  handleSelectValue: (value: string) => void;
};

export default function Combobox({
  data,
  handleSelectValue,
  selectedValue = "",
  placeholder = "Search...",
}: TComboboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState(
    data?.find((el) => el?.value === selectedValue)?.title || ""
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selected, setSelected] = useState<TDataItem | null>(
    data?.find((el) => el?.value === selectedValue) || null
  );

  const ref = useClickOutside(() => setIsOpen(false), false);

  const filteredData =
    query === ""
      ? data
      : data.filter((item) =>
          item.title.toLowerCase().includes(query.toLowerCase())
        );

  const handleSelect = (item: TDataItem) => {
    setSelected(item);
    setQuery(item.title);
    handleSelectValue(item.value);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full ">
      <div ref={ref as RefObject<HTMLDivElement>}>
        <input
          type="text"
          className="w-full rounded-md border-0 px-3.5 py-2 bg-gray-100 ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-main-700 sm:text-sm sm:leading-6"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          placeholder={placeholder}
          onFocus={() => setIsOpen(true)}
        />
      </div>
      {isOpen && (
        <ul className="absolute mt-1 w-full max-h-60 overflow-auto rounded-md bg-white border border-gray-300 shadow-lg z-10">
          {filteredData.length === 0 && query !== "" ? (
            <li className="cursor-default select-none py-2 px-4 text-gray-700">
              No results found.
            </li>
          ) : (
            filteredData.map((item) => (
              <li
                key={item.value}
                onClick={() => handleSelect(item)}
                className="group flex flex-col cursor-pointer select-none py-2 px-4 hover:bg-indigo-500"
              >
                <span className="group-hover:text-white">{item.title}</span>
                {item.subTitle && (
                  <span className="text-sm text-gray-600 group-hover:text-white">
                    {item.subTitle}
                  </span>
                )}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
