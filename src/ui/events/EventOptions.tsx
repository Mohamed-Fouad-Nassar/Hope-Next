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
import { usePathname } from "next/navigation";

import { BASE_URL } from "@/lib/constants";

export default function EventOptions({
  id,
  title,
  className,
}: {
  id?: number;
  title: string;
  className?: string;
}) {
  const pathname = usePathname();
  const eventURL = id ? `${BASE_URL}/events/${id}` : BASE_URL + pathname;

  return (
    <div className={`${className} text-white flex items-center gap-4 md:block`}>
      <h3 className="text-sm font-semibold md:pb-2">Share On</h3>
      <div className="flex gap-2 items-center">
        <FacebookShareButton url={eventURL} quote={title} hashtag={`#${title}`}>
          <FacebookIcon size={32} className="rounded" />
        </FacebookShareButton>
        <TelegramShareButton url={eventURL} title={title}>
          <TelegramIcon size={32} className="rounded" />
        </TelegramShareButton>
        <TwitterShareButton url={eventURL} title={title}>
          <TwitterIcon size={32} className="rounded" />
        </TwitterShareButton>
        <WhatsappShareButton url={eventURL} title={title} separator=":: ">
          <WhatsappIcon size={32} className="rounded" />
        </WhatsappShareButton>
      </div>
    </div>
  );
}
