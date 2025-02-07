import { Editor } from "@tiptap/core";

export default function CharacterCounter({
  editor,
  limit,
}: {
  editor: Editor;
  limit: number;
}) {
  if (!limit) return null;

  const words = editor?.storage.characterCount.words();
  const characters = editor?.storage.characterCount.characters();
  const percentage = editor ? Math.round((100 / limit) * characters) : 0;

  return (
    <div
      className={`character-count ${
        characters === limit ? "character-count--warning" : ""
      }`}
    >
      <svg height="20" width="20" viewBox="0 0 20 20">
        <circle r="10" cx="10" cy="10" fill="#e9ecef" />
        <circle
          r="5"
          cx="10"
          cy="10"
          fill="transparent"
          stroke="currentColor"
          strokeWidth="10"
          strokeDasharray={`calc(${percentage} * 31.4 / 100) 31.4`}
          transform="rotate(-90) translate(-20)"
        />
        <circle r="6" cx="10" cy="10" fill="white" />
      </svg>
      <span className="font-bold text-main-500">{characters}</span> /{" "}
      <span className="font-bold">{limit}</span> characters,{" "}
      <span className="font-bold text-main-500">{words}</span> words
    </div>
  );
}
