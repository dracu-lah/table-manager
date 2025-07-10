import React from "react";
import {
  MapPin,
  Phone,
  Clock,
  Users,
  CreditCard,
  AlertCircle,
  Building2,
} from "lucide-react";

const OutletCard = ({ outletData }) => {
  // You can replace this with your actual API call
  // const { id } = useParams();
  // const {
  //   data: outlet,
  //   isLoading,
  //   error,
  // } = useQuery({
  //   queryKey: [GetOutletAPI.name],
  //   queryFn: () => GetOutletAPI({ id }),
  // });

  // Mock data based on your API response structure
  const outlet = outletData || {
    id: 1,
    name: "thrissur",
    description: null,
    cuisine: null,
    address: "hfjdjfhk",
    latitude: null,
    longitude: null,
    streetName: null,
    city: null,
    country: null,
    logoImageUrl: null,
    imageConfigurations: null,
    hasCoverCharges: false,
    standardCoverCharge: null,
    operationalHours: null,
    cancellationPolicy: null,
    hasMinimumSpend: false,
    minimumSpendAmount: null,
    requiresUpfrontPayment: false,
    contactNumber: "95676565",
    isActive: true,
    propertyId: 1,
    createdAt: "2025-05-30T15:20:36.485Z",
    updatedAt: "2025-05-30T15:20:36.485Z",
    __tenant__: {
      id: 1,
      tenantName: "Tenant A",
      subscriptionPlan: "Basic",
      isActive: true,
      subscriptionStartDate: "2025-06-17T11:45:23.310Z",
      subscriptionEndDate: "2026-06-17T11:45:23.310Z",
      contactEmail: "tenant@example.com",
      contactPhone: "1234567890",
      createdAt: "2025-06-17T11:45:23.310Z",
      deletedAt: null,
      updatedAt: "2025-06-17T11:45:23.310Z",
    },
  };

  const isLoading = false;
  const error = null;

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
          <div className="h-48 bg-gray-200"></div>
          <div className="p-6 space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-red-800 mb-2">
            Error Loading Outlet
          </h3>
          <p className="text-red-600">
            Unable to load outlet information. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  if (!outlet) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">
            Outlet Not Found
          </h3>
          <p className="text-yellow-600">
            The requested outlet could not be found.
          </p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600">
          {outlet.logoImageUrl ? (
            <img
              src={outlet.logoImageUrl}
              alt={outlet.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <Building2 className="h-16 w-16 text-white opacity-80" />
            </div>
          )}
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          <div className="absolute bottom-4 left-6 text-white">
            <h1 className="text-3xl font-bold capitalize">{outlet.name}</h1>
            {outlet.cuisine && (
              <p className="text-lg opacity-90">{outlet.cuisine}</p>
            )}
          </div>
          <div className="absolute top-4 right-4">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                outlet.isActive
                  ? "bg-green-100 text-green-800 border border-green-200"
                  : "bg-red-100 text-red-800 border border-red-200"
              }`}
            >
              {outlet.isActive ? "Active" : "Inactive"}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          {/* Description */}
          {outlet.description && (
            <div className="mb-6">
              <p className="text-gray-700 text-lg leading-relaxed">
                {outlet.description}
              </p>
            </div>
          )}

          {/* Contact & Location Info */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Contact Information
              </h3>

              {outlet.contactNumber && (
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-blue-500" />
                  <span className="text-gray-700">{outlet.contactNumber}</span>
                </div>
              )}

              {outlet.address && (
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-red-500 mt-0.5" />
                  <div className="text-gray-700">
                    <p>{outlet.address}</p>
                    {outlet.city && <p>{outlet.city}</p>}
                    {outlet.country && <p>{outlet.country}</p>}
                  </div>
                </div>
              )}

              {outlet.operationalHours && (
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">
                    {outlet.operationalHours}
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Policies & Charges
              </h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Cover Charges</span>
                  <span
                    className={`font-medium ${outlet.hasCoverCharges ? "text-orange-600" : "text-green-600"}`}
                  >
                    {outlet.hasCoverCharges
                      ? `₹${outlet.standardCoverCharge || "Variable"}`
                      : "No"}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Minimum Spend</span>
                  <span
                    className={`font-medium ${outlet.hasMinimumSpend ? "text-orange-600" : "text-green-600"}`}
                  >
                    {outlet.hasMinimumSpend
                      ? `₹${outlet.minimumSpendAmount || "Variable"}`
                      : "No"}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Upfront Payment</span>
                  <span
                    className={`font-medium ${outlet.requiresUpfrontPayment ? "text-orange-600" : "text-green-600"}`}
                  >
                    {outlet.requiresUpfrontPayment
                      ? "Required"
                      : "Not Required"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Cancellation Policy */}
          {outlet.cancellationPolicy && (
            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="font-semibold text-yellow-800 mb-2">
                Cancellation Policy
              </h4>
              <p className="text-yellow-700">{outlet.cancellationPolicy}</p>
            </div>
          )}

          {/* Tenant Information */}
          {outlet.__tenant__ && (
            <div className="border-t pt-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Tenant Information
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p>
                    <span className="font-medium text-gray-600">Tenant:</span>{" "}
                    {outlet.__tenant__.tenantName}
                  </p>
                  <p>
                    <span className="font-medium text-gray-600">Plan:</span>
                    <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                      {outlet.__tenant__.subscriptionPlan}
                    </span>
                  </p>
                  <p>
                    <span className="font-medium text-gray-600">Contact:</span>{" "}
                    {outlet.__tenant__.contactEmail}
                  </p>
                </div>
                <div className="space-y-2">
                  <p>
                    <span className="font-medium text-gray-600">Phone:</span>{" "}
                    {outlet.__tenant__.contactPhone}
                  </p>
                  <p>
                    <span className="font-medium text-gray-600">
                      Subscription:
                    </span>{" "}
                    {formatDate(outlet.__tenant__.subscriptionStartDate)} -{" "}
                    {formatDate(outlet.__tenant__.subscriptionEndDate)}
                  </p>
                  <p>
                    <span className="font-medium text-gray-600">Status:</span>
                    <span
                      className={`ml-2 px-2 py-1 rounded text-sm ${
                        outlet.__tenant__.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {outlet.__tenant__.isActive ? "Active" : "Inactive"}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Metadata */}
          <div className="border-t pt-4 mt-6 text-sm text-gray-500">
            <div className="flex justify-between">
              <span>Created: {formatDate(outlet.createdAt)}</span>
              <span>Updated: {formatDate(outlet.updatedAt)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutletCard;
