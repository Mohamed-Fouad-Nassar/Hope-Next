import { cookies } from "next/headers";

import PostMenu from "./PostMenu";
import LikePostForm from "./LikePostForm";
import SavePostForm from "./SavePostForm";

import { verifyToken } from "@/utils/jwt";
// import { TUserFromCookie } from "@/types/auth.types";

type TPostOperationsProps = {
  likes: number;
  saves: number;
  title: string;
  postId: number;
  isLiked: boolean;
  isSaved: boolean;
};

export default async function PostOperations({
  likes,
  saves,
  title,
  postId,
  isLiked,
  isSaved,
}: TPostOperationsProps) {
  const userToken = cookies().get("jwtToken")?.value || "";

  const user = await verifyToken(userToken);
  const userId = user ? user?.id : undefined;

  return (
    <div className="ml-auto flex items-center">
      <LikePostForm
        likes={likes}
        userId={userId}
        postId={postId}
        isLiked={isLiked}
      />
      <SavePostForm
        saves={saves}
        userId={userId}
        postId={postId}
        isSaved={isSaved}
      />
      <PostMenu title={title} postId={postId} />
    </div>
  );
}
