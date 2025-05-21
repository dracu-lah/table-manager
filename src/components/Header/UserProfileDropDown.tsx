import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import useAuthStore from "@/store/useAuthStore";
import routePath from "@/router/routePath";
import { useNavigate } from "react-router";

const UserProfileDropdown = () => {
  const navigate = useNavigate();
  const { accessToken, clearToken, data } = useAuthStore();
  const queryClient = useQueryClient();
  // Get first letter of username for avatar fallback
  const userInitial = data?.userName
    ? data.userName.charAt(0).toUpperCase()
    : "U";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={data?.userImage} alt={data?.userName || "User"} />
            <AvatarFallback>{userInitial}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {data?.userName || "User"}
            </p>
            <p className="text-xs text-muted-foreground">
              {data?.roleName || "Member"}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate(routePath.profile)}>
          Profile
        </DropdownMenuItem>
        {/* <DropdownMenuItem>Settings</DropdownMenuItem> */}
        {/* <DropdownMenuSeparator /> */}
        <DropdownMenuItem
          className="text-red-500"
          onClick={() => {
            queryClient.removeQueries();
            clearToken();
          }}
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfileDropdown;
