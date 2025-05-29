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
import { Calendar, Clock, Users, MapPin, Edit2 } from "lucide-react";

const CustomerBookingPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDate, setSelectedDate] = useState("29 May");
  const [selectedPeople, setSelectedPeople] = useState("2 people");
  const [timeLeft, setTimeLeft] = useState(255); // 4:15 minutes in seconds

  const availableTimes = [
    "6:30 pm",
    "6:45 pm",
    "7:00 pm",
    "7:15 pm",
    "7:30 pm",
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
    if (selectedTime) {
      setCurrentStep(2);
    }
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
              <Select value={selectedPeople} onValueChange={setSelectedPeople}>
                <SelectTrigger>
                  <SelectValue placeholder="2 people" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1 people">1 person</SelectItem>
                  <SelectItem value="2 people">2 people</SelectItem>
                  <SelectItem value="3 people">3 people</SelectItem>
                  <SelectItem value="4 people">4 people</SelectItem>
                  <SelectItem value="5 people">5 people</SelectItem>
                  <SelectItem value="6 people">6 people</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedDate} onValueChange={setSelectedDate}>
                <SelectTrigger>
                  <SelectValue placeholder="29 May" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="29 May">29 May</SelectItem>
                  <SelectItem value="30 May">30 May</SelectItem>
                  <SelectItem value="31 May">31 May</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="7:00 pm" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6:00 pm">6:00 pm</SelectItem>
                  <SelectItem value="6:30 pm">6:30 pm</SelectItem>
                  <SelectItem value="7:00 pm">7:00 pm</SelectItem>
                  <SelectItem value="7:30 pm">7:30 pm</SelectItem>
                  <SelectItem value="8:00 pm">8:00 pm</SelectItem>
                </SelectContent>
              </Select>

              <Button className="bg-primary hover:bg-red-600 text-white">
                Find a table
              </Button>
            </div>

            {/* Available times */}
            <div className="flex flex-wrap gap-3 mb-6">
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

            {selectedTime && (
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
                className="w-full bg-gray-300 text-gray-600 cursor-not-allowed"
                disabled
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
                    <span>Thursday, {selectedDate}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-gray-500" />
                    <span>{selectedTime}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-gray-500" />
                    <span>{selectedPeople}</span>
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
                    <p className="font-medium">Experience</p>
                    <div className="flex justify-between items-center mt-2">
                      <div>
                        <p className="font-medium">Themed Nights</p>
                        <p className="text-sm text-gray-500">2x AED 195.00</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">AED 390.00</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-primary p-0 h-auto"
                        >
                          <Edit2 className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between">
                      <p>Subtotal</p>
                      <p>AED 390.00</p>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between font-bold">
                      <p>Total</p>
                      <p>AED 390.00</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Table Manager branding */}
          {/* <div className="border-t pt-6 mt-8"> */}
          {/*   <div className="flex items-center gap-2"> */}
          {/*     <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center"> */}
          {/*       <span className="text-white font-bold text-sm">O</span> */}
          {/*     </div> */}
          {/*     <span className="font-semibold text-gray-800">Table Manager</span> */}
          {/*   </div> */}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default CustomerBookingPage;
