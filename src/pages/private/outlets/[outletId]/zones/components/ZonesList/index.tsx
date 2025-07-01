import { GetZonesAPI } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import React from "react";
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

  if (isLoading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Zones Management</h1>
          <p className="text-muted-foreground">
            Showing {zonesData.data.length} of {zonesData.total} zones
          </p>
        </div>

        {/* Zones List */}
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
              </CardHeader>

              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Location Information */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                      Location Details
                    </h4>
                    <Separator />
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">
                          {zone.__location__.name}
                        </span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                        <span className="text-sm">
                          {zone.__location__.address}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">
                          {zone.__location__.contactNumber}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Tenant Information */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                      Tenant Details
                    </h4>
                    <Separator />
                    <div className="space-y-3">
                      <div className="text-sm">
                        <span className="font-medium">
                          {zone.__tenant__.tenantName}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">
                          {zone.__tenant__.contactEmail}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">
                          {zone.__tenant__.contactPhone}
                        </span>
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Plan: </span>
                        <Badge variant="outline">
                          {zone.__tenant__.subscriptionPlan}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Timestamps */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                      Timeline
                    </h4>
                    <Separator />
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <div className="text-sm">
                          <span className="text-muted-foreground">
                            Created:{" "}
                          </span>
                          <span className="font-medium">
                            {formatDate(zone.createdAt)}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <div className="text-sm">
                          <span className="text-muted-foreground">
                            Updated:{" "}
                          </span>
                          <span className="font-medium">
                            {formatDate(zone.updatedAt)}
                          </span>
                        </div>
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">
                          Subscription ends:{" "}
                        </span>
                        <span className="font-medium">
                          {formatDate(zone.__tenant__.subscriptionEndDate)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
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
      </div>
    </div>
  );
};

export default ZonesListView;
