// src/pages/outlets.tsx
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { GetOutletsAPI } from "@/services/api";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Building } from "lucide-react";
import routePath from "@/router/routePath";
import PageLoader from "@/components/loaders/PageLoader";

const OutletsPage = () => {
  const navigate = useNavigate();

  const {
    data: outlets,
    isLoading,
    error,
  } = useQuery({
    queryKey: [GetOutletsAPI.name],
    queryFn: () => GetOutletsAPI(),
  });

  // Placeholder images for different types of outlets
  const getPlaceholderImage = (name: string) => {
    const placeholders = [
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=1074&auto=format&fit=crop", // Restaurant
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1074&auto=format&fit=crop", // Office
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1074&auto=format&fit=crop", // Building
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1074&auto=format&fit=crop", // Modern office
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1074&auto=format&fit=crop", // Store
    ];

    // Use name hash to consistently pick the same image for the same name
    const hash = name.split("").reduce((a, b) => a + b.charCodeAt(0), 0);
    return placeholders[hash % placeholders.length];
  };

  if (isLoading)
    return (
      <div className="h-full  flex justify-center items-center">
        <PageLoader />
      </div>
    );

  if (error)
    return (
      <div className="text-center py-10 text-red-500">
        Failed to load outlets.
      </div>
    );

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Outlets</h1>

        <div className="flex gap-4">
          <Button size="sm" onClick={() => navigate(routePath.createOutlet)}>
            Create Outlet
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {outlets?.map((outlet: any) => (
          <Card
            key={outlet.id}
            className="pt-0 overflow-hidden flex flex-col hover:shadow-lg transition-shadow"
          >
            <div className="h-48 relative">
              <img
                src={outlet.logoImageUrl || getPlaceholderImage(outlet.name)}
                className="size-full object-cover"
                alt={outlet.name}
                onError={(e) => {
                  e.currentTarget.src = getPlaceholderImage(outlet.name);
                }}
              />
              {outlet.isActive ? (
                <Badge className="absolute top-2 right-2 bg-green-500">
                  Active
                </Badge>
              ) : (
                <Badge variant="destructive" className="absolute top-2 right-2">
                  Inactive
                </Badge>
              )}
            </div>

            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Building className="h-4 w-4" />
                {outlet.name}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {outlet.__tenant__?.tenantName}
              </p>
            </CardHeader>

            <CardContent className="flex-grow space-y-3">
              {outlet.address && (
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <span className="text-sm">{outlet.address}</span>
                </div>
              )}

              {outlet.contactNumber && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{outlet.contactNumber}</span>
                </div>
              )}

              {outlet.cuisine && (
                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline" className="text-xs">
                    {outlet.cuisine}
                  </Badge>
                </div>
              )}

              <div className="flex flex-wrap gap-1 pt-2">
                <Badge variant="secondary" className="text-xs">
                  {outlet.__tenant__?.subscriptionPlan}
                </Badge>
                {outlet.hasCoverCharges && (
                  <Badge variant="outline" className="text-xs">
                    Cover Charges
                  </Badge>
                )}
                {outlet.hasMinimumSpend && (
                  <Badge variant="outline" className="text-xs">
                    Min Spend
                  </Badge>
                )}
              </div>
            </CardContent>

            <CardFooter className="flex gap-2 justify-between pt-4">
              <div className="text-xs text-muted-foreground">
                ID: {outlet.id}
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() =>
                    navigate(routePath.editOutlet({ id: outlet.id }))
                  }
                >
                  Edit
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {outlets?.length === 0 && (
        <div className="text-center py-10 text-muted-foreground">
          No outlets found.
        </div>
      )}
    </div>
  );
};

export default OutletsPage;
