import Table from "@/ui/Table";
import UserRow from "./UserRow";
import Pagination from "@/ui/Pagination";
import UserDashCard from "./UserDashCard";

import { USERS_PER_PAGE } from "@/lib/constants";

import { getUsers, getUsersCount } from "@/services/authAPI";

export default async function UsersTable({ page }: { page: string }) {
  const users = await getUsers(page);
  const { count } = await getUsersCount();

  return (
    <>
      <div className="hidden md:block relative">
        <Table>
          <Table.Head
            actions={true}
            titles={["Id", "User", "role", "Created at", "Statistics"]}
          />

          <Table.Body
            data={users}
            render={(user) => (
              <UserRow
                key={user?.id}
                user={user}
                isLast={
                  user == users[users.length - 1] ||
                  user == users[users.length - 2]
                }
              />
            )}
          />
        </Table>
      </div>

      <div className="md:hidden space-y-2 rounded-lg bg-gray-50 p-2 md:pt-0">
        {users.map((user) => (
          <UserDashCard key={user?.id} user={user} />
        ))}
      </div>

      {users.length > 0 && (
        <Pagination pageSize={USERS_PER_PAGE} count={count} />
      )}
    </>
  );
}
