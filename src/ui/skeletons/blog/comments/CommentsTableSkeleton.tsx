import Table from "@/ui/Table";
import CommentRowSkeleton from "./CommentRowSkeleton";
import CommentDashCardSkeleton from "./CommentDashCardSkeleton";

import { COMMENTS_PER_PAGE } from "@/lib/constants";

export default function CommentsTableSkeleton() {
  return (
    <>
      <div className="hidden md:block">
        <Table>
          <Table.Head
            actions={true}
            titles={["Id", "Post ID", "Content", "User", "Created at"]}
          />

          <Table.Body
            data={Array.from({ length: COMMENTS_PER_PAGE })}
            render={(_, i) => <CommentRowSkeleton key={i} />}
          />
        </Table>
      </div>

      <div className="md:hidden space-y-2 rounded-lg bg-gray-50 p-2 md:pt-0">
        {Array.from({ length: 9 }).map((_, i) => (
          <CommentDashCardSkeleton key={i} />
        ))}
      </div>
    </>
  );
}
