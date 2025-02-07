import {
  LuBold,
  LuList,
  LuQuote,
  LuLink2,
  LuItalic,
  LuYoutube,
  LuLink2Off,
  LuHeading2,
  LuHeading3,
  LuHeading4,
  LuUnderline,
  LuAlignLeft,
  LuAlignRight,
  LuAlignCenter,
  LuListOrdered,
  LuHighlighter,
  LuStrikethrough,
} from "react-icons/lu";
import clsx from "clsx";
import { useCallback } from "react";
import { Editor } from "@tiptap/core";
import { IconType } from "react-icons";

const Toolbar = ({ editor }: { editor: Editor }) => {
  // functions
  const addYoutubeVideo = useCallback(() => {
    const url = prompt("Enter YouTube URL");
    if (url) {
      editor.commands.setYoutubeVideo({
        src: url,
      });
    }
  }, [editor]);
  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);
    // cancelled
    if (url === null) return;
    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    // set or update link
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  // buttons
  const HeadingBtns = [
    {
      icon: LuHeading2,
      label: "Heading 2",
      active: editor.isActive("heading", { level: 2 }),
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    },
    {
      icon: LuHeading3,
      label: "Heading 3",
      active: editor.isActive("heading", { level: 3 }),
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    },
    {
      icon: LuHeading4,
      label: "Heading 4",
      active: editor.isActive("heading", { level: 4 }),
      onClick: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
    },
    {
      icon: LuQuote,
      label: "Quote",
      active: editor.isActive("blockquote"),
      onClick: () => editor.chain().focus().toggleBlockquote().run(),
    },
  ];
  const TypographyBtns = [
    {
      icon: LuBold,
      label: "Bold",
      active: editor.isActive("bold"),
      onClick: () => editor.chain().focus().toggleBold().run(),
    },
    {
      icon: LuItalic,
      label: "Italic",
      active: editor.isActive("italic"),
      onClick: () => editor.chain().focus().toggleItalic().run(),
    },
    {
      icon: LuUnderline,
      label: "Underline",
      active: editor.isActive("underline"),
      onClick: () => editor.chain().focus().toggleUnderline().run(),
    },
    {
      icon: LuStrikethrough,
      label: "Strike",
      active: editor.isActive("strike"),
      onClick: () => editor.chain().focus().toggleStrike().run(),
    },
    {
      icon: LuHighlighter,
      label: "Highlight",
      active: editor.isActive("highlight"),
      onClick: () => editor.chain().focus().toggleHighlight().run(),
    },
  ];
  const TextAlignBtns = [
    {
      icon: LuAlignLeft,
      label: "Align Left",
      active: editor.isActive({ textAlign: "left" }),
      onClick: () => editor.chain().focus().setTextAlign("left").run(),
    },
    {
      icon: LuAlignCenter,
      label: "Align Center",
      active: editor.isActive({ textAlign: "center" }),
      onClick: () => editor.chain().focus().setTextAlign("center").run(),
    },
    {
      icon: LuAlignRight,
      label: "Align Right",
      active: editor.isActive({ textAlign: "right" }),
      onClick: () => editor.chain().focus().setTextAlign("right").run(),
    },
  ];
  const ListBtns = [
    {
      icon: LuListOrdered,
      label: "Order List",
      active: editor.isActive("orderedList"),
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
    },
    {
      icon: LuList,
      label: "Un-order List",
      active: editor.isActive("bulletList"),
      onClick: () => editor.chain().focus().toggleBulletList().run(),
    },
  ];
  const LinkBtns = [
    {
      icon: LuLink2,
      label: "Set Link",
      active: editor.isActive("link"),
      onClick: setLink,
    },
    {
      icon: LuLink2Off,
      label: "Unset Link",
      active: false,
      onClick: () => editor.chain().focus().unsetLink()?.run(),
      disable: !editor.isActive("link"),
    },
    {
      icon: LuYoutube,
      label: "YouTube Video",
      active: false,
      onClick: addYoutubeVideo,
    },
  ];

  return (
    <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 bg-slate-50 border border-b-0 p-2 rounded-lg rounded-b-none shadow">
      <div className="flex flex-wrap justify-center sm:justify-start items-center gap-1 sm:gap-2">
        {HeadingBtns.map((btn) => (
          <Button key={btn.label} btn={btn} />
        ))}
      </div>
      <div className="flex flex-wrap justify-center sm:justify-start items-center gap-1 sm:gap-2">
        {TypographyBtns.map((btn) => (
          <Button key={btn.label} btn={btn} />
        ))}
      </div>
      <div className="flex flex-wrap justify-center sm:justify-start items-center gap-1 sm:gap-2">
        {TextAlignBtns.map((btn) => (
          <Button key={btn.label} btn={btn} />
        ))}
      </div>
      <div className="flex flex-wrap justify-center sm:justify-start items-center gap-1 sm:gap-2">
        {ListBtns.map((btn) => (
          <Button key={btn.label} btn={btn} />
        ))}
      </div>
      <div className="flex flex-wrap justify-center sm:justify-start items-center gap-1 sm:gap-2">
        {LinkBtns.map((btn) => (
          <Button key={btn.label} btn={btn} />
        ))}
      </div>
    </div>
  );
};

function Button({
  btn,
}: {
  btn: {
    label: string;
    icon: IconType;
    active: boolean;
    disable?: boolean;
    onClick: () => void;
  };
}) {
  const { icon: Icon, onClick, active, label, disable = false } = btn;

  return (
    <button
      type="button"
      title={label}
      onClick={onClick}
      aria-label={label}
      disabled={disable || false}
      className={clsx(
        "p-2 rounded-md transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-main-500",
        {
          "bg-main-500 text-white": active,
          "bg-white text-gray-700 hover:bg-gray-200": !active,
          "opacity-50 hover:bg-white": disable,
        }
      )}
    >
      <Icon className="size-5" />
    </button>
  );
}

export default Toolbar;
