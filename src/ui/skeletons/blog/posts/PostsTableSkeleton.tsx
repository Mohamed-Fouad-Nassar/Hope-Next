import Table from "@/ui/Table";
import PostRowSkeleton from "./PostRowSkeleton";
import PostDashCardSkeleton from "./PostDashCardSkeleton";

import { ARTICLES_PER_PAGE } from "@/lib/constants";

export default function PostsTableSkeleton() {
  return (
    <>
      <div className="hidden md:block">
        <Table>
          <Table.Head
            actions={true}
            titles={[
              "Id",
              "Title",
              "Status",
              "User",
              "Created at",
              "Statistics",
            ]}
          />

          <Table.Body
            data={Array.from({ length: ARTICLES_PER_PAGE })}
            render={(_, i) => <PostRowSkeleton key={i} />}
          />
        </Table>
      </div>

      <div className="md:hidden space-y-2 rounded-lg bg-gray-50 p-2 md:pt-0">
        {Array.from({ length: ARTICLES_PER_PAGE }).map((_, i) => (
          <PostDashCardSkeleton key={i} />
        ))}
      </div>
    </>
  );
}
