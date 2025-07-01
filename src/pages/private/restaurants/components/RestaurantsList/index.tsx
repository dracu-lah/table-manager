import { GetRestaurantsAPI } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import {
  Building,
  Calendar,
  Phone,
  Mail,
  ExternalLink,
  ChefHat,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import routePath from "@/router/routePath";
import PageLoader from "@/components/loaders/PageLoader";

const RestaurantsListView = () => {
  const navigate = useNavigate();

  const {
    data: restaurantsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: [GetRestaurantsAPI.name],
    queryFn: () => GetRestaurantsAPI(),
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (isLoading)
    return (
      <div className="h-full flex justify-center items-center">
        <PageLoader />
      </div>
    );

  if (error)
    return (
      <div className="text-red-500 text-center mt-8">
        Failed to load restaurants.
      </div>
    );

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        {restaurantsData?.map((restaurant: any) => (
          <Card
            key={restaurant.id}
            className="hover:shadow-lg transition-shadow duration-200"
          >
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <ChefHat className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold capitalize">
                      {restaurant.tenantName}
                    </h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="default">
                        Restaurant ID: {restaurant.id}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Tenant Info */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                    Tenant Details
                  </h4>
                  <Separator />
                  <div className="space-y-3">
                    <div className="text-sm font-medium">
                      {restaurant.tenantName}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{restaurant.contactEmail}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{restaurant.contactPhone}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-muted-foreground">Plan: </span>
                      <Badge variant="outline">
                        {restaurant.subscriptionPlan}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Timeline Info */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                    Timeline
                  </h4>
                  <Separator />
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <div className="text-sm">
                        <span className="text-muted-foreground">Start: </span>
                        <span className="font-medium">
                          {formatDate(restaurant.subscriptionStartDate)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <div className="text-sm">
                        <span className="text-muted-foreground">End: </span>
                        <span className="font-medium">
                          {formatDate(restaurant.subscriptionEndDate)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Created/Updated Info */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                    Meta
                  </h4>
                  <Separator />
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <div className="text-sm">
                        <span className="text-muted-foreground">Created: </span>
                        <span className="font-medium">
                          {formatDate(restaurant.createdAt)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <div className="text-sm">
                        <span className="text-muted-foreground">Updated: </span>
                        <span className="font-medium">
                          {formatDate(restaurant.updatedAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination Placeholder (not functional since API doesn't support it) */}
      <div className="mt-8 flex items-center justify-between">
        <div className="text-sm text-muted-foreground">Page 1 of 1</div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" disabled>
            Next
          </Button>
        </div>
      </div>
    </>
  );
};

export default RestaurantsListView;
