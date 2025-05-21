import UsersList from "./UsersList";
import CreateUserDialog from "./CreateUserDialog";
import { GetUsersAPI } from "@/services/api";
import { useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { withPageAccess } from "@/hooks/usePagePermisssions";
import menuKeys from "@/utils/constants/menuKeys";
import PaginationButtons from "@/components/PaginationButtons";
import SearchBar from "@/components/SearchBar";
const UserManagementPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page");
  const filter = searchParams.get("filter");
  const {
    data: users,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["GetUsersAPI", filter, page],
    queryFn: () => GetUsersAPI({ filter, PageNumber: page }),
  });

  return (
    <div className="min-h-screen">
      <div>
        <div className="flex justify-between p-8">
          <h1 className="text-2xl font-semibold">Users</h1>
          <SearchBar />
          <CreateUserDialog />
        </div>
      </div>
      <div className="my-4 mb-24 space-y-2 px-4">
        {users && <UsersList users={users.data} />}
      </div>
      <div className="bottom-0 items-end self-center pb-5">
        {users && users.numberOfPages !== 0 && (
          <PaginationButtons pageCount={users.numberOfPages} />
        )}
      </div>
    </div>
  );
};

export default withPageAccess(UserManagementPage, menuKeys.USER_MANAGEMENT);
