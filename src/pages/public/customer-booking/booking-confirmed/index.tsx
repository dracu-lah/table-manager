import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Calendar,
  Clock,
  Users,
  MapPin,
  Check,
  Mail,
  Phone,
  Download,
  Share2,
  Star,
  MessageSquare,
  Navigation,
} from "lucide-react";

const BookingConfirmationPage = () => {
  // Sample confirmed booking data
  const bookingDetails = {
    confirmationNumber: "TM-2025-ADG-7834",
    restaurant: "Al Dhiyafa Grand Kitchen",
    date: "2025-06-15", // Sunday, June 15, 2025
    time: "7:30 pm",
    guests: 4,
    firstName: "Sarah",
    surname: "Johnson",
    email: "sarah.johnson@email.com",
    phone: "+971 50 123 4567",
    occasion: "Anniversary",
    viewPreference: "Waterfall View",
    specialRequest:
      "Could we have a table away from the kitchen area? Also celebrating our 5th anniversary, so any special touches would be appreciated!",
    totalAmount: 780.0, // 4 guests × AED 195.00
    address: {
      street: "Al Falea Street Jumeirah Beach",
      city: "Jumeirah Beach Dubai",
      emirate: "Dubai",
      postalCode: "0000",
    },
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              Booking Confirmation
            </h1>
            <Button variant="ghost" className="text-primary hover:text-red-600">
              Sign in
            </Button>
          </div>

          {/* Confirmation Success Message */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <Check className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-green-800">
                Booking Confirmed!
              </h2>
            </div>
            <p className="text-green-700 mb-2">
              Your table has been successfully reserved at Al Dhiyafa Grand
              Kitchen.
            </p>
            <p className="text-sm text-green-600">
              Confirmation number:{" "}
              <span className="font-mono font-bold">
                {bookingDetails.confirmationNumber}
              </span>
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column - Booking Details */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Reservation Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="font-medium">Date</p>
                        <p className="text-gray-600">
                          {formatDate(bookingDetails.date)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="font-medium">Time</p>
                        <p className="text-gray-600">{bookingDetails.time}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="font-medium">Party Size</p>
                        <p className="text-gray-600">
                          {bookingDetails.guests}{" "}
                          {bookingDetails.guests === 1 ? "guest" : "guests"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Star className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="font-medium">Occasion</p>
                        <p className="text-gray-600">
                          {bookingDetails.occasion}
                        </p>
                      </div>
                    </div>
                  </div>

                  {bookingDetails.viewPreference && (
                    <div className="border-t pt-4">
                      <p className="font-medium mb-1">Seating Preference</p>
                      <p className="text-gray-600">
                        {bookingDetails.viewPreference}
                      </p>
                    </div>
                  )}

                  {bookingDetails.specialRequest && (
                    <div className="border-t pt-4">
                      <p className="font-medium mb-1">Special Requests</p>
                      <p className="text-gray-600 text-sm bg-gray-50 p-3 rounded">
                        {bookingDetails.specialRequest}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium">Name</p>
                      <p className="text-gray-600">
                        {bookingDetails.firstName} {bookingDetails.surname}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <div>
                        <p className="font-medium">Phone</p>
                        <p className="text-gray-600">{bookingDetails.phone}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 md:col-span-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-gray-600">{bookingDetails.email}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <Button className="bg-primary hover:bg-red-600 text-white">
                  <Download className="w-4 h-4 mr-2" />
                  Download Confirmation
                </Button>
                <Button
                  variant="outline"
                  className="border-primary text-red-500 hover:bg-red-50"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Details
                </Button>
                <Button
                  variant="outline"
                  className="border-primary text-red-500 hover:bg-red-50"
                >
                  <Navigation className="w-4 h-4 mr-2" />
                  Get Directions
                </Button>
              </div>
            </div>

            {/* Right column - Restaurant Info & Summary */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">
                    {bookingDetails.restaurant}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-500 mt-1" />
                    <div>
                      <p>{bookingDetails.address.street}</p>
                      <p>
                        {bookingDetails.address.city},{" "}
                        {bookingDetails.address.emirate}
                      </p>
                      <p>{bookingDetails.address.postalCode}</p>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <Button
                      variant="outline"
                      className="w-full border-primary text-red-500 hover:bg-red-50"
                    >
                      View Restaurant Details
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Billing Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* <div> */}
                  {/*   <p className="font-medium">Experience</p> */}
                  {/*   <div className="flex justify-between items-center mt-2"> */}
                  {/*     <div> */}
                  {/*       <p className="font-medium">Themed Nights</p> */}
                  {/*       <p className="text-sm text-gray-500"> */}
                  {/*         {bookingDetails.guests}x AED 195.00 */}
                  {/*       </p> */}
                  {/*     </div> */}
                  {/*     <div> */}
                  {/*       <p className="font-medium"> */}
                  {/*         AED {bookingDetails.totalAmount.toFixed(2)} */}
                  {/*       </p> */}
                  {/*     </div> */}
                  {/*   </div> */}
                  {/* </div> */}

                  <div className="border-t pt-4">
                    <div className="flex justify-between font-bold text-lg">
                      <p>Total Paid</p>
                      <p>AED {bookingDetails.totalAmount.toFixed(2)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Important Notes */}
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-blue-900 mb-3">
                    Important Information
                  </h3>
                  <ul className="text-sm text-blue-800 space-y-2">
                    <li>
                      • Please arrive 10 minutes before your reservation time
                    </li>
                    <li>• Present confirmation number upon arrival</li>
                    <li>• Cancellation policy: 24 hours notice required</li>
                    <li>• Dress code: Smart casual</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Customer Support */}
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3">Need Help?</h3>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start border-primary text-red-500 hover:bg-red-50"
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Contact Restaurant
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start border-gray-300"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Call Support
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Email confirmation notice */}
          <div className="mt-8 bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Mail className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium">
                Confirmation Email Sent
              </span>
            </div>
            <p className="text-sm text-gray-600">
              A confirmation email has been sent to{" "}
              <strong>{bookingDetails.email}</strong>. Please check your spam
              folder if you don't see it in your inbox.
            </p>
          </div>

          {/* Table Manager branding */}
          <div className="border-t pt-6 mt-8">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">O</span>
              </div>
              <span className="font-semibold text-gray-800">Table Manager</span>
            </div>
            <p className="text-sm text-gray-600">
              Your booking was secured through Table Manager. We hope you have a
              wonderful dining experience!{" "}
              <span className="text-primary cursor-pointer">
                Rate your experience
              </span>{" "}
              after your visit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmationPage;
