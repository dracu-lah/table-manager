import { GetLayoutsAPI } from "@/services/api"; // Ensure correct import for GetLayoutsAPI
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { Building, ExternalLink } from "lucide-react";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card"; // Added CardContent, CardDescription for more detailed info
import { Button } from "@/components/ui/button";
import routePath from "@/router/routePath";
// import UpdateLayoutDialog from "./UpdateLayoutDialog"; // Renamed from UpdateZoneDialog
import PageLoader from "@/components/loaders/PageLoader";
import UpdateLayoutDialog from "./UpdateLayoutDialog";

// Define the type for a single layout item from your API response
interface LayoutItem {
  id: string;
  name: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

const LayoutsList = () => {
  const { id } = useParams(); // This 'id' would typically be for a parent resource (e.g., outletId)
  const navigate = useNavigate();

  // Use the GetLayoutsAPI and expect an array of LayoutItem
  const {
    data: layoutsData, // Renamed from zonesData
    isLoading,
    error,
  } = useQuery<LayoutItem[]>({
    // Explicitly type the data
    queryKey: [GetLayoutsAPI.name], // Use the function name as query key
    queryFn: () => GetLayoutsAPI(),
  });

  const formatDate = (dateString: string) => {
    // Added type for dateString
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric", // Added hour/minute for more detail, can remove if not needed
      minute: "numeric",
    });
  };

  if (isLoading)
    return (
      <div className="h-full flex justify-center items-center">
        <PageLoader />
      </div>
    );

  if (error) {
    return (
      <div className="h-full flex justify-center items-center text-red-500">
        Error loading layouts: {error.message}
      </div>
    );
  }

  // If layoutsData is undefined or empty after loading, handle that case
  if (!layoutsData || layoutsData.length === 0) {
    return (
      <div className="h-full flex justify-center items-center text-gray-500">
        No layouts found.
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        {/* Iterate directly over layoutsData as it's an array */}
        {layoutsData.map((layout) => (
          <Card
            key={layout.id}
            className="hover:shadow-lg transition-shadow duration-200"
          >
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center overflow-hidden">
                    {/* Use imageUrl if available, otherwise a default icon */}
                    {layout.imageUrl ? (
                      <img
                        src={layout.imageUrl}
                        alt={layout.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Building className="w-6 h-6 text-primary" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold capitalize">
                      {layout.name}
                    </h3>
                    <div className="flex items-center space-x-2 mt-1">
                      {/* Removed Badge as isActive is not in the new response.
                          You might add a badge for 'status' if a similar concept exists. */}
                      <span className="text-sm text-muted-foreground">
                        Layout ID: {layout.id}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  {/* Assuming you have a similar dialog for updating layouts */}
                  <UpdateLayoutDialog layout={layout} />
                  {/* <Button */}
                  {/*   onClick={() => */}
                  {/*     navigate( */}
                  {/*       // Assuming routePath.layoutCanvas is updated to accept layoutId */}
                  {/*       // and potentially outletId if that's still relevant to the canvas page */}
                  {/*       routePath.layoutCanvas({ */}
                  {/*         outletId: id, // Pass the parent 'id' from useParams as outletId */}
                  {/*         layoutId: layout.id, // Pass layout.id as layoutId */}
                  {/*       }), */}
                  {/*     ) */}
                  {/*   } */}
                  {/*   className="flex items-center space-x-2" */}
                  {/* > */}
                  {/*   <ExternalLink className="w-4 h-4" /> */}
                  {/*   <span>Open Canvas</span> */}
                  {/* </Button> */}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Created: {formatDate(layout.createdAt)}
              </CardDescription>
              {layout.updatedAt && (
                <CardDescription>
                  Last Updated: {formatDate(layout.updatedAt)}
                </CardDescription>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination removed as it's not present in the new API response */}
      {/* If your API will eventually include pagination, you'll need to re-add this logic
          and adjust `useQuery` to send pagination parameters. */}
    </>
  );
};

export default LayoutsList;
