"use client";

import {
  TwitterIcon,
  TelegramIcon,
  WhatsappIcon,
  FacebookIcon,
  TwitterShareButton,
  FacebookShareButton,
  TelegramShareButton,
  WhatsappShareButton,
} from "next-share";
import {
  PaperClipIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";

import Menus from "@/ui/Menus";
import { BASE_URL } from "@/lib/constants";
import toast from "react-hot-toast";

export default function PostMenu({
  title,
  postId,
}: {
  title: string;
  postId: number;
}) {
  const pathname = usePathname();
  const postURL = BASE_URL + pathname;

  return (
    <Menus>
      <Menus.Menu>
        <Menus.Toggle id={postId} />
        <Menus.List id={postId} isLast={false}>
          <Menus.Button
            onClick={() => {
              navigator.clipboard.writeText(postURL);
              toast.success("Link copied successfully");
            }}
            icon={
              <PaperClipIcon className="size-[30px] p-1 flex justify-center items-center rounded-full bg-gray-50 dark:text-gray-300" />
            }
          >
            Copy Link
          </Menus.Button>
          <Menus.Divider />
          <Menus.ButtonGroup title="Share Post on">
            <FacebookShareButton
              url={postURL}
              quote={title}
              hashtag={`#${title}`}
            >
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <TelegramShareButton url={postURL} title={title}>
              <TelegramIcon size={32} round />
            </TelegramShareButton>
            <TwitterShareButton url={postURL} title={title}>
              <TwitterIcon size={32} round />
            </TwitterShareButton>
            <WhatsappShareButton url={postURL} title={title} separator=":: ">
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
          </Menus.ButtonGroup>
          <Menus.Divider />
          <Menus.Button
            icon={
              <ExclamationTriangleIcon className="size-[30px] p-1 flex justify-center items-center rounded-full bg-gray-50 dark:text-gray-300" />
            }
          >
            Report
          </Menus.Button>
        </Menus.List>
      </Menus.Menu>
    </Menus>
  );
}
