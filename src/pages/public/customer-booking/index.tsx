import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, Users, MapPin, Edit2, Eye } from "lucide-react";
import routePath from "@/router/routePath";
import { useNavigate } from "react-router";

const CustomerBookingPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(2);
  const [timeLeft, setTimeLeft] = useState(255); // 4:15 minutes in seconds

  const availableTimes = [
    "6:00 pm",
    "6:15 pm",
    "6:30 pm",
    "6:45 pm",
    "7:00 pm",
    "7:15 pm",
    "7:30 pm",
    "7:45 pm",
    "8:00 pm",
    "8:15 pm",
    "8:30 pm",
  ];

  const viewPreferences = [
    "Window View",
    "Waterfall View",
    "Garden View",
    "City View",
    "Beach View",
    "Private Booth",
    "Bar Area",
    "Terrace",
  ];

  // Timer countdown
  React.useEffect(() => {
    if (currentStep === 2 && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [currentStep, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")} minutes`;
  };

  const handleFindTable = () => {
    if (selectedTime && selectedDate) {
      setCurrentStep(2);
    }
  };

  const getTodaysDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const getDateOptions = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push({
        value: date.toISOString().split("T")[0],
        label: date.toLocaleDateString("en-US", {
          weekday: "long",
          month: "short",
          day: "numeric",
        }),
      });
    }
    return dates;
  };

  if (currentStep === 1) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900">
                Booking at Al Dhiyafa Grand Kitchen
              </h1>
              <Button
                variant="ghost"
                className="text-primary hover:text-red-600"
              >
                Sign in
              </Button>
            </div>

            {/* Step indicator */}
            <div className="flex items-center mb-8">
              <div className="flex items-center">
                <span className="bg-primary text-white px-3 py-1 rounded text-sm font-medium">
                  1. FIND A TABLE
                </span>
                <span className="ml-4 text-gray-400 text-sm">
                  2. YOUR DETAILS
                </span>
              </div>
            </div>

            {/* Booking form */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div>
                <Label
                  htmlFor="guests"
                  className="text-sm font-medium mb-2 block"
                >
                  Number of Guests
                </Label>
                <Input
                  id="guests"
                  type="number"
                  min="1"
                  max="20"
                  value={numberOfGuests}
                  onChange={(e) =>
                    setNumberOfGuests(parseInt(e.target.value) || 1)
                  }
                  className="w-full"
                />
              </div>

              <div>
                <Label
                  htmlFor="date"
                  className="text-sm font-medium mb-2 block"
                >
                  Date
                </Label>
                <Select value={selectedDate} onValueChange={setSelectedDate}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select date" />
                  </SelectTrigger>
                  <SelectContent>
                    {getDateOptions().map((date) => (
                      <SelectItem key={date.value} value={date.value}>
                        {date.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label
                  htmlFor="time"
                  className="text-sm font-medium mb-2 block"
                >
                  Preferred Time
                </Label>
                <Select value={selectedTime} onValueChange={setSelectedTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableTimes.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                className="bg-primary hover:bg-red-600 text-white mt-6"
                onClick={() => {
                  // This could trigger a search for available tables
                  console.log("Searching for tables...");
                }}
              >
                Find a table
              </Button>
            </div>

            {/* Available times - only show if date is selected */}
            {selectedDate && (
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-4">Available Times</h3>
                <div className="flex flex-wrap gap-3">
                  {availableTimes.map((time) => (
                    <Button
                      key={time}
                      variant={selectedTime === time ? "default" : "outline"}
                      className={`${
                        selectedTime === time
                          ? "bg-primary hover:bg-red-600 text-white"
                          : "border-primary text-red-500 hover:bg-red-50"
                      }`}
                      onClick={() => setSelectedTime(time)}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center gap-2 mb-6">
              <Button
                variant="outline"
                className="text-primary border-red-500 hover:bg-red-50"
              >
                🔔 Notify me
              </Button>
            </div>

            <div className="mb-8">
              <Button variant="link" className="text-primary p-0">
                See all affiliated restaurants ›
              </Button>
            </div>

            {selectedTime && selectedDate && (
              <div className="mb-8">
                <Button
                  onClick={handleFindTable}
                  className="bg-primary hover:bg-red-600 text-white px-8 py-2"
                >
                  Proceed to Booking Details
                </Button>
              </div>
            )}

            {/* Table Manager branding */}
            <div className="border-t pt-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">O</span>
                </div>
                <span className="font-semibold text-gray-800">
                  Table Manager
                </span>
              </div>
              <p className="text-sm text-gray-600">
                Al Dhiyafa Grand Kitchen has partnered with Table Manager to
                provide free, secure, and instantly confirmed online bookings.{" "}
                <span className="text-primary cursor-pointer">Learn More</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              Booking at Al Dhiyafa Grand Kitchen
            </h1>
            <Button variant="ghost" className="text-primary hover:text-red-600">
              Sign in
            </Button>
          </div>

          {/* Step indicator */}
          <div className="flex items-center mb-8">
            <div className="flex items-center">
              <span className="text-green-600 text-sm font-medium">
                ✓ FIND A TABLE
              </span>
              <span className="ml-4 bg-primary text-white px-3 py-1 rounded text-sm font-medium">
                2. YOUR DETAILS
              </span>
            </div>
          </div>

          {/* Timer */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <p className="text-blue-800 text-sm">
              Due to limited availability, we can hold this table for you for{" "}
              <strong>{formatTime(timeLeft)}</strong>
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left column - Form */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First name</Label>
                  <Input id="firstName" placeholder="First name" />
                </div>
                <div>
                  <Label htmlFor="surname">Surname</Label>
                  <Input id="surname" placeholder="Surname" />
                </div>
              </div>

              <div>
                <Label htmlFor="phone">Phone number</Label>
                <div className="flex">
                  <Select defaultValue="in">
                    <SelectTrigger className="w-20">
                      <SelectValue>
                        <span className="text-lg">🇮🇳</span>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="in">🇮🇳</SelectItem>
                      <SelectItem value="us">🇺🇸</SelectItem>
                      <SelectItem value="uk">🇬🇧</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    id="phone"
                    placeholder="Phone number"
                    className="flex-1 ml-2"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Email" />
              </div>

              <div>
                <Label htmlFor="occasion">Select an occasion (optional)</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an occasion (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="birthday">Birthday</SelectItem>
                    <SelectItem value="anniversary">Anniversary</SelectItem>
                    <SelectItem value="business">Business meal</SelectItem>
                    <SelectItem value="date">Date night</SelectItem>
                    <SelectItem value="celebration">Celebration</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* View Preference Section */}
              <div>
                <Label htmlFor="view-preference">
                  View Preference (optional)
                </Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your preferred view" />
                  </SelectTrigger>
                  <SelectContent>
                    {viewPreferences.map((view) => (
                      <SelectItem
                        key={view}
                        value={view.toLowerCase().replace(" ", "-")}
                      >
                        {view}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="special-request">
                  Add a special request (optional)
                </Label>
                <Textarea
                  id="special-request"
                  placeholder="Add a special request (optional)"
                  className="min-h-[80px]"
                />
              </div>

              {/* Checkboxes */}
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <Checkbox id="text-updates" />
                  <Label htmlFor="text-updates" className="text-sm leading-5">
                    Yes, I want to get text updates and reminders about my
                    bookings.*
                  </Label>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox id="dining-offers" />
                  <Label htmlFor="dining-offers" className="text-sm leading-5">
                    Sign me up to receive dining offers and news from this
                    restaurant by email.
                  </Label>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox id="opentable-offers" />
                  <Label
                    htmlFor="opentable-offers"
                    className="text-sm leading-5"
                  >
                    Table Manager will send you dining offers and news by email
                    unless you object by unchecking this box.
                  </Label>
                </div>
              </div>

              <Button
                // className="w-full bg-gray-300 text-gray-600 cursor-not-allowed"
                className="w-full "
                onClick={() => navigate(routePath.bookingConfirmed)}
                // disabled
              >
                Confirm booking
              </Button>

              <div className="text-xs text-gray-500 space-y-2">
                <p>
                  By selecting "Confirm booking" you are agreeing to the terms
                  and conditions of the{" "}
                  <span className="text-primary">
                    Table Manager User Agreement
                  </span>{" "}
                  and <span className="text-primary">Privacy Policy</span>.
                  *Message &amp; data rates may apply. You can opt out of
                  receiving text messages at any time in your account setting or
                  by replying STOP.
                </p>
                <p>
                  Certain U.S. consumers may have additional data rights, which
                  can be exercised by clicking{" "}
                  <span className="text-primary">
                    Do Not Sell or Share My Personal Information
                  </span>
                  .
                </p>
              </div>
            </div>

            {/* Right column - Booking summary */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">
                    Al Dhiyafa Grand Kitchen
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gray-500" />
                    <span>
                      {selectedDate
                        ? new Date(selectedDate).toLocaleDateString("en-US", {
                            weekday: "long",
                            month: "long",
                            day: "numeric",
                          })
                        : "Date not selected"}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-gray-500" />
                    <span>{selectedTime}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-gray-500" />
                    <span>
                      {numberOfGuests}{" "}
                      {numberOfGuests === 1 ? "guest" : "guests"}
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-500 mt-1" />
                    <div>
                      <p>Al Falea Street Jumeirah Beach</p>
                      <p>Jumeirah Beach Dubai, Dubai, 0000</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Booking summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    {/* <p className="font-medium">Experience</p> */}
                    <div className="flex justify-between items-center mt-2">
                      {/* <div> */}
                      {/* <p className="font-medium">Themed Nights</p> */}
                      {/* <p className="text-sm text-gray-500"> */}
                      {/*   {numberOfGuests}x AED 195.00 */}
                      {/* </p> */}
                      {/* </div> */}
                      {/* <div className="text-right"> */}
                      {/*   <p className="font-medium"> */}
                      {/*     AED {(numberOfGuests * 195).toFixed(2)} */}
                      {/*   </p> */}
                      {/*   <Button */}
                      {/*     variant="ghost" */}
                      {/*     size="sm" */}
                      {/*     className="text-primary p-0 h-auto" */}
                      {/*   > */}
                      {/*     <Edit2 className="w-4 h-4 mr-1" /> */}
                      {/*     Edit */}
                      {/*   </Button> */}
                      {/* </div> */}
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between">
                      <p>Subtotal</p>
                      <p>AED {(numberOfGuests * 195).toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between font-bold">
                      <p>Total</p>
                      <p>AED {(numberOfGuests * 195).toFixed(2)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerBookingPage;
