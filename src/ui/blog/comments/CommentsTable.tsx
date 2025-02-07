import Table from "@/ui/Table";
import CommentRow from "./CommentRow";
import Pagination from "@/ui/Pagination";
import CommentDashCard from "./CommentDashCard";

import { COMMENTS_PER_PAGE } from "@/lib/constants";

import { getComments, getCommentsCount } from "@/services/blogAPI";

export default async function CommentsTable({ page = "1" }: { page?: string }) {
  const comments = await getComments(page);
  const { count } = await getCommentsCount();

  return (
    <>
      <div className="hidden md:block relative">
        <Table>
          <Table.Head
            actions={true}
            titles={["Id", "Post ID", "Content", "User", "Created at"]}
          />

          <Table.Body
            data={comments}
            render={(comment) => (
              <CommentRow
                key={comment?.id}
                comment={comment}
                isLast={
                  comment == comments[comments.length - 1] ||
                  comment == comments[comments.length - 2]
                }
              />
            )}
          />
        </Table>
      </div>

      <div className="md:hidden space-y-2 rounded-lg bg-gray-50 p-2 md:pt-0">
        {comments.map((comment) => (
          <CommentDashCard key={comment?.id} comment={comment} />
        ))}
      </div>

      {comments.length > 0 && (
        <Pagination pageSize={COMMENTS_PER_PAGE} count={count} />
      )}
    </>
  );
}
