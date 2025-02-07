"use client";

import clsx from "clsx";
import { useRef, useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

type TagProps = { value: string; label: string };
type TagsSliderProps = { tags: TagProps[]; field: string };

export default function TagsSlider({ tags, field }: TagsSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const handleScroll = () => {
    updateScrollState();
  };
  const updateScrollState = () => {
    const container = containerRef?.current;
    if (container) {
      setCanScrollRight(
        container.scrollWidth > container.clientWidth + container.scrollLeft
      );
      setCanScrollLeft(container.scrollLeft > 0);
    }
  };
  const scrollRight = () => {
    containerRef?.current?.scrollBy({ left: 200, behavior: "smooth" });
  };
  const scrollLeft = () => {
    containerRef?.current?.scrollBy({ left: -200, behavior: "smooth" });
  };
  useEffect(() => {
    updateScrollState();
    window.addEventListener("resize", updateScrollState);
    return () => {
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeTagValue = searchParams.get(field) ?? "all";
  function handleTagClick(value: string): void {
    const params = new URLSearchParams();
    params.delete("page");
    params.set(field, value);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="relative px-4 pt-6 pb-2 w-full">
      {canScrollLeft && (
        <div className="pr-2 pt-4 absolute left-0 top-0 bottom-0 flex justify-center items-center bg-white overflow-y-hidden transition">
          <button
            onClick={scrollLeft}
            className="bg-gray-200 p-2 rounded-full shadow hover:bg-gray-300"
            aria-label="Scroll Left"
          >
            <ChevronLeftIcon className="size-5" />
          </button>
        </div>
      )}

      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto gap-2 scrollbar-hide"
      >
        {tags.map(({ value, label }, index) => (
          <TagButton
            key={index}
            label={label}
            active={activeTagValue == value}
            onClick={() => handleTagClick(value)}
          />
        ))}
      </div>

      {canScrollRight && (
        <div className="pl-2 pt-4 absolute right-0 top-0 bottom-0 flex justify-center items-center bg-white overflow-y-hidden transition">
          <button
            onClick={scrollRight}
            className="bg-gray-200 p-2 rounded-full shadow hover:bg-gray-300"
            aria-label="Scroll Right"
          >
            <ChevronRightIcon className="size-5" />
          </button>
        </div>
      )}
    </div>
  );
}

type TagButtonProps = {
  label: string;
  active: boolean;
  onClick: () => void;
};
function TagButton({ active = false, label = "", onClick }: TagButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={active}
      className={clsx(
        "px-3 py-1.5 text-sm font-medium bg-gray-200 text-gray-700 rounded hover:bg-gray-300 hover:text-black active:bg-gray-400 active:text-white transition",
        {
          "!bg-main-600 !text-white !cursor-not-allowed": active,
        }
      )}
    >
      {label}
    </button>
  );
}
