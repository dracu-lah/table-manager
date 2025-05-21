import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import routePath from "@/router/routePath";
import { LoginAPI } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Eye, EyeOff, LoaderIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Label } from "@/components/ui/label";
import useAuthStore from "@/store/useAuthStore";
import { isTesting } from "@/utils/constants";
const LoginPage = () => {
  const { setToken } = useAuthStore();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const defaultValues = {
    usernameOrEmail: isTesting ? "admin01" : "",
    password: isTesting ? "corporate321" : "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues,
  });
  const loginMutation = useMutation({
    mutationFn: LoginAPI,
    onSuccess: ({ data }) => {
      setToken({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        data: {
          userName: data.userName,
          roleName: data.roleName,
          userLocationId: data.userLocationID || 0,
          userOutletId: data.outletID || 0,
          allowedReportOutlets: data?.allowedReportOutlets || [],
        },
      });
      navigate(routePath.dashboard);
    },
    onError: ({ response }) => {
      setError("root.serverError", {
        type: response.status,
        message: response.data.message,
      });
    },
  });
  const onSubmit = ({ usernameOrEmail, password }) => {
    // queryClient.invalidateQueries();
    // loginMutation.mutate({
    //   userName: usernameOrEmail,
    //   password,
    //   roleName: "",
    //   locationId: 0,
    //   finYear: 0,
    // });

    const data = {
      status: "Success",
      message: "Request Succeeded.",
      data: {
        userName: "admin01",
        memberId: 0,
        roleName: "admin",
        outletID: 0,
        allowedReportOutlets: [14, 15, 16],
        userLocationID: 0,
        accessToken:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJTZXNzaW9uSUQiOiJ5c2h3RzhmVjlrQ3c2WDdHb1pQUGciLCJVc2VySUQiOiIxIiwiVXNlck5hbWUiOiJhZG1pbjAxIiwiQXV0aEZpbGVQYXRoIjoiYWRtaW4wMV95c2h3RzhmVjlrQ3c2WDdHb1pQUGcuSlNPTiIsIlJvbGVOYW1lIjoiYWRtaW4iLCJMb2NhdGlvbklkIjoiMSIsIkFwcGxpY2F0aW9uSWQiOiIxIiwiRmluWWVhciI6IjIwMjUiLCJFeHBpcmVEYXRlIjoiMjAyNS0wNS0yMSAxNjo1NzoxMCIsIkV4dGVybmFsVG9rZW4iOiIiLCJNZW1iZXJJZCI6IjAiLCJNZW1iZXJzaGlwUHJvZ3JhbUlkIjoiMSIsIk1lbWJlcnNoaXBUaWVySWQiOiIxIiwiTWVtYmVyc2hpcENhdGVnb3J5SWQiOiIxIiwibmJmIjoxNzQ3ODI2ODMwLCJleHAiOjE3NDc4MzIyMzAsImlhdCI6MTc0NzgyNjgzMCwiaXNzIjoia3JhZnR1c2VyIiwiYXVkIjoia3JhZnR1c2VyIn0.rXm28gO7YAlgIn9c7da8R6mYmCChDx-5e5Vu3aQcRXU",
        refreshToken: "asegdjnHZHfXsujHuL1ARXYtg8BQ6NTSViPl91CpxmI=",
      },
    };
    setToken({
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      data: {
        userName: data.userName,
        roleName: data.roleName,
        userLocationId: data.userLocationID || 0,
        userOutletId: data.outletID || 0,
        allowedReportOutlets: data?.allowedReportOutlets || [],
      },
    });
    navigate(routePath.dashboard);
  };
  return (
    <Card className="m-auto my-40 w-[350px]">
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Username / Email</Label>
              <Input
                id="email"
                type="text"
                {...register("usernameOrEmail", { required: true })}
              />
              {errors.usernameOrEmail && (
                <span className="form-error">
                  {errors.usernameOrEmail.message}
                </span>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="* * * * * *"
                  {...register("password", { required: true })}
                />
                <Button
                  type="button"
                  variant="outline"
                  className="absolute right-0 top-0"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </Button>
                {errors.password && (
                  <span className="form-error">{errors.password.message}</span>
                )}
                {errors.root && (
                  <span className="form-error">
                    {errors.root.serverError.message}
                  </span>
                )}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full mt-4" type="submit">
            {loginMutation.isPending ? (
              <LoaderIcon className="animate-spin" />
            ) : (
              "Login"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default LoginPage;
