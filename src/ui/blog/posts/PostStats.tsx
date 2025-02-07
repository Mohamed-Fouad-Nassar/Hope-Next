import {
  BookmarkIcon,
  HandThumbUpIcon,
  ChatBubbleOvalLeftIcon,
} from "@heroicons/react/24/outline";
import {
  BookmarkIcon as BookmarkIconFilled,
  HandThumbUpIcon as HandThumbUpIconFilled,
} from "@heroicons/react/24/solid";

type TPostStats = {
  likes: number;
  saves: number;
  comments: number;
  isLiked?: boolean;
  isSaved?: boolean;
  className?: string;
};

export default function PostStats({
  likes,
  saves,
  isLiked,
  isSaved,
  comments,
  className,
}: TPostStats) {
  return (
    <div
      className={`${className} flex items-center mb-1 gap-3 text-sm text-gray-600`}
    >
      <div className="flex items-center gap-1">
        {isLiked ? (
          <HandThumbUpIconFilled className="size-5 text-gray-800" />
        ) : (
          <HandThumbUpIcon className="size-5 text-gray-500" />
        )}
        <span>{likes}</span>
      </div>

      <div className="flex items-center gap-1">
        <ChatBubbleOvalLeftIcon className="size-5 text-gray-500" />
        <span>{comments}</span>
      </div>

      <div className="flex items-center gap-1">
        {isSaved ? (
          <BookmarkIconFilled className="size-5 text-gray-800" />
        ) : (
          <BookmarkIcon className="size-5 text-gray-500" />
        )}
        <span>{saves}</span>
      </div>
    </div>
  );
}
