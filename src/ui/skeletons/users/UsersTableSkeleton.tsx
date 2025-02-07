import Table from "@/ui/Table";
import UserRowSkeleton from "./UserRowSkeleton";
import UserDashCardSkeleton from "./UserDashCardSkeleton";

export default function UsersTableSkeleton() {
  return (
    <>
      <div className="hidden md:block">
        <Table>
          <Table.Head
            actions={true}
            titles={["Id", "Title", "User", "Created at", "Statistics"]}
          />

          <Table.Body
            data={Array.from({ length: 9 })}
            render={(_, i) => <UserRowSkeleton key={i} />}
          />
        </Table>
      </div>

      <div className="md:hidden space-y-2 rounded-lg bg-gray-50 p-2 md:pt-0">
        {Array.from({ length: 9 }).map((_, i) => (
          <UserDashCardSkeleton key={i} />
        ))}
      </div>
    </>
  );
}
