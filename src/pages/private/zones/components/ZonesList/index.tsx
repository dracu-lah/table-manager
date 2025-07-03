import { GetZonesAPI } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import {
  MapPin,
  Building,
  Calendar,
  Phone,
  Mail,
  ExternalLink,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import routePath from "@/router/routePath";
import UpdateZoneDialog from "./UpdateZoneDialog";
import PageLoader from "@/components/loaders/PageLoader";

const ZonesListView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: zonesData,
    isLoading,
    error,
  } = useQuery({
    queryKey: [GetZonesAPI.name],
    queryFn: () => GetZonesAPI({ id }),
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (isLoading)
    return (
      <div className="h-full  flex justify-center items-center">
        <PageLoader />
      </div>
    );

  return (
    <>
      <div className="space-y-6">
        {zonesData.data.map((zone) => (
          <Card
            key={zone.id}
            className="hover:shadow-lg transition-shadow duration-200"
          >
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Building className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold capitalize">
                      {zone.name}
                    </h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge
                        variant={zone.isActive ? "default" : "destructive"}
                      >
                        {zone.isActive ? "Active" : "Inactive"}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        Zone ID: {zone.id}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <UpdateZoneDialog zone={zone} />
                  <Button
                    onClick={() =>
                      navigate(
                        routePath.zoneCanvas({
                          outletId: zone.locationId,
                          zoneId: zone.id,
                        }),
                      )
                    }
                    className="flex items-center space-x-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Open Canvas</span>
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Page {zonesData.page} of {zonesData.totalPages}
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" disabled={zonesData.page === 1}>
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={zonesData.page === zonesData.totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
};

export default ZonesListView;
