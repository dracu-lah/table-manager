import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Card, CardContent } from "@/components/ui/card";
import {
  Plus,
  X,
  Calendar,
  Clock,
  Users,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

// Types based on your Kotlin data class
const BookingStatus = {
  PENDING: "PENDING",
  CONFIRMED: "CONFIRMED",
  CANCELLED: "CANCELLED",
  COMPLETED: "COMPLETED",
};

const zones = [
  { id: "indoor", name: "Indoor", capacity: 50 },
  { id: "outdoor", name: "Outdoor", capacity: 30 },
  { id: "private", name: "Private Room", capacity: 20 },
  { id: "bar", name: "Bar Zone", capacity: 25 },
];

const availableTables = [
  { id: "T1", name: "Table 1", capacity: 4, zone: "indoor" },
  { id: "T2", name: "Table 2", capacity: 6, zone: "indoor" },
  { id: "T3", name: "Table 3", capacity: 2, zone: "outdoor" },
  { id: "T4", name: "Table 4", capacity: 8, zone: "private" },
  { id: "T5", name: "Table 5", capacity: 4, zone: "bar" },
];

export default function BookingDialogForm() {
  const [open, setOpen] = useState(false);
  const [selectedZone, setSelectedZone] = useState("");

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: "",
      name: "",
      time: "",
      noOfOccupants: 1,
      phone: "",
      email: "",
      tableName: [],
      status: BookingStatus.PENDING,
      selectedZone: "",
    },
  });

  const watchedZone = watch("selectedZone");
  const watchedTables = watch("tableName");

  const filteredTables = availableTables.filter(
    (table) => table.zone === watchedZone,
  );

  const handleZoneChange = (zoneId) => {
    setValue("selectedZone", zoneId);
    setValue("tableName", []); // Clear selected tables when zone changes
  };

  const handleTableToggle = (table) => {
    const currentTables = watchedTables || [];
    const isSelected = currentTables.some((t) => t.id === table.id);

    if (isSelected) {
      setValue(
        "tableName",
        currentTables.filter((t) => t.id !== table.id),
      );
    } else {
      setValue("tableName", [...currentTables, table]);
    }
  };

  const onSubmit = (data) => {
    // Generate ID if not provided
    if (!data.id) {
      data.id = `BK-${Date.now()}`;
    }

    console.log("Booking Data:", data);

    // Here you would typically send the data to your backend
    alert("Booking created successfully!");

    // Reset form and close dialog
    reset();
    setOpen(false);
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create New Booking
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-gray-900">
              Create New Booking
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="text-sm font-medium flex items-center gap-2"
                >
                  <Users className="h-4 w-4" />
                  Customer Name *
                </Label>
                <Input
                  id="name"
                  {...register("name", { required: "Name is required" })}
                  placeholder="Enter customer name"
                  className="w-full"
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="noOfOccupants"
                  className="text-sm font-medium flex items-center gap-2"
                >
                  <Users className="h-4 w-4" />
                  Number of Occupants *
                </Label>
                <Input
                  id="noOfOccupants"
                  type="number"
                  min="1"
                  max="20"
                  {...register("noOfOccupants", {
                    required: "Number of occupants is required",
                    min: { value: 1, message: "At least 1 occupant required" },
                  })}
                  className="w-full"
                />
                {errors.noOfOccupants && (
                  <p className="text-sm text-red-500">
                    {errors.noOfOccupants.message}
                  </p>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="phone"
                  className="text-sm font-medium flex items-center gap-2"
                >
                  <Phone className="h-4 w-4" />
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  {...register("phone")}
                  placeholder="Enter phone number"
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium flex items-center gap-2"
                >
                  <Mail className="h-4 w-4" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="Enter email address"
                  className="w-full"
                />
              </div>
            </div>

            {/* Date and Time */}
            <div className="space-y-2">
              <Label
                htmlFor="time"
                className="text-sm font-medium flex items-center gap-2"
              >
                <Clock className="h-4 w-4" />
                Booking Date & Time *
              </Label>
              <Input
                id="time"
                type="datetime-local"
                {...register("time", { required: "Booking time is required" })}
                min={getCurrentDateTime()}
                className="w-full"
              />
              {errors.time && (
                <p className="text-sm text-red-500">{errors.time.message}</p>
              )}
            </div>

            {/* Zone Selection */}
            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Select Zone *
              </Label>
              <Controller
                name="selectedZone"
                control={control}
                rules={{ required: "Zone selection is required" }}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value);
                      handleZoneChange(value);
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose a zone" />
                    </SelectTrigger>
                    <SelectContent>
                      {zones.map((zone) => (
                        <SelectItem key={zone.id} value={zone.id}>
                          {zone.name} (Capacity: {zone.capacity})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.selectedZone && (
                <p className="text-sm text-red-500">
                  {errors.selectedZone.message}
                </p>
              )}
            </div>

            {/* Table Selection */}
            {watchedZone && (
              <div className="space-y-2">
                <Label className="text-sm font-medium">Select Tables</Label>
                <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                  {filteredTables.map((table) => {
                    const isSelected = watchedTables?.some(
                      (t) => t.id === table.id,
                    );
                    return (
                      <Card
                        key={table.id}
                        className={`cursor-pointer transition-colors ${
                          isSelected
                            ? "bg-blue-100 border-blue-500"
                            : "hover:bg-gray-50"
                        }`}
                        onClick={() => handleTableToggle(table)}
                      >
                        <CardContent className="p-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-sm">
                                {table.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                Capacity: {table.capacity}
                              </p>
                            </div>
                            {isSelected && (
                              <div className="bg-blue-500 text-white rounded-full p-1">
                                <X className="h-3 w-3" />
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
                {watchedTables?.length > 0 && (
                  <p className="text-sm text-gray-600">
                    Selected tables:{" "}
                    {watchedTables.map((t) => t.name).join(", ")}
                  </p>
                )}
              </div>
            )}

            {/* Status Selection */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Booking Status</Label>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(BookingStatus).map((status) => (
                        <SelectItem key={status} value={status}>
                          {status.charAt(0) + status.slice(1).toLowerCase()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  reset();
                  setOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit(onSubmit)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Create Booking
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
