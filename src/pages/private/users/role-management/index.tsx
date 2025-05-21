import RolesList from "./RolesList";
import CreateRoleDialog from "./CreateRoleDialog";
import SearchBar from "@/components/SearchBar";
import { GetRolesAPI } from "@/services/api";
import { useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { withPageAccess } from "@/hooks/usePagePermisssions";
import menuKeys from "@/utils/constants/menuKeys";

const RoleManagementPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get("filter");
  const {
    data: roles,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["GetRolesAPI", filter],
    queryFn: () => GetRolesAPI({ filter }),
  });

  return (
    <div className="min-h-screen">
      <div>
        <div className="flex justify-between p-8">
          <h1 className="text-2xl font-semibold">Roles</h1>
          <SearchBar />
          <CreateRoleDialog />
        </div>
      </div>
      <div className="my-4 mb-24 space-y-2 px-4">
        {roles && <RolesList roles={roles.data} />}
      </div>
    </div>
  );
};

export default withPageAccess(RoleManagementPage, menuKeys.ROLE_MANAGEMENT);
