import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Users,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Utensils,
  Search,
  Filter,
  Phone,
  Mail,
  Calendar,
  User,
} from "lucide-react";

// Mock data - in real app this would come from context/API
const mockReservations = [
  {
    id: "1",
    name: "Prakash Varmma",
    phone: "JK09120",
    guests: 4,
    time: "10:00 AM",
    status: "waiting",
    tableAssigned: "T-12",
    arrived: true,
  },
  {
    id: "2",
    name: "Sarath Suresh",
    phone: "JK09120",
    guests: 4,
    time: "10:01 AM",
    status: "seated",
    tableAssigned: "T-02",
    arrived: true,
  },
  {
    id: "3",
    name: "Muhammed Irshad",
    phone: "JK09120",
    guests: 4,
    time: "10:05 AM",
    status: "waiting",
    tableAssigned: "T-02",
    arrived: true,
  },
  {
    id: "4",
    name: "Sharon Viswanathan",
    phone: "JK09120",
    guests: 4,
    time: "11:00 AM",
    status: "seated",
    tableAssigned: "T-02",
    arrived: true,
  },
  {
    id: "5",
    name: "John Smith",
    phone: "555-0123",
    guests: 2,
    time: "11:30 AM",
    status: "reserved",
    tableAssigned: null,
    arrived: false,
  },
];

const mockTables = [
  { id: "T-1", status: "available", seats: 8, zone: 1 },
  { id: "T-2", status: "occupied", seats: 4, zone: 1, needsCleaning: true },
  { id: "T-3", status: "available", seats: 6, zone: 1 },
  { id: "T-4", status: "available", seats: 4, zone: 1 },
  { id: "T-5", status: "occupied", seats: 6, zone: 1 },
  { id: "T-6", status: "available", seats: 4, zone: 1 },
  { id: "T-7", status: "available", seats: 4, zone: 1 },
  { id: "T-8", status: "available", seats: 4, zone: 1 },
  { id: "T-9", status: "available", seats: 4, zone: 1 },
  { id: "T-10", status: "available", seats: 4, zone: 1 },
  { id: "T-11", status: "available", seats: 4, zone: 1 },
  { id: "T-12", status: "available", seats: 4, zone: 1 },
];

type ReservationStatus = "waiting" | "seated" | "reserved" | "cancelled";
type TableStatus = "available" | "occupied" | "reserved" | "cleaning";

interface Reservation {
  id: string;
  name: string;
  phone: string;
  guests: number;
  time: string;
  status: ReservationStatus;
  tableAssigned: string | null;
  arrived: boolean;
}

interface Table {
  id: string;
  status: TableStatus;
  seats: number;
  zone: number;
  needsCleaning?: boolean;
}

const EmployeeView: React.FC = () => {
  const [reservations, setReservations] =
    useState<Reservation[]>(mockReservations);
  const [tables, setTables] = useState<Table[]>(mockTables);
  const [selectedFilter, setSelectedFilter] = useState<
    "all" | ReservationStatus
  >("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredReservations = useMemo(() => {
    return reservations.filter((reservation) => {
      const matchesFilter =
        selectedFilter === "all" || reservation.status === selectedFilter;
      const matchesSearch =
        reservation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reservation.phone.includes(searchTerm);
      return matchesFilter && matchesSearch;
    });
  }, [reservations, selectedFilter, searchTerm]);

  const waitingCount = reservations.filter(
    (r) => r.status === "waiting",
  ).length;
  const seatedCount = reservations.filter((r) => r.status === "seated").length;
  const reservedCount = reservations.filter(
    (r) => r.status === "reserved",
  ).length;
  const availableTables = tables.filter((t) => t.status === "available").length;
  const needsCleaningCount = tables.filter((t) => t.needsCleaning).length;

  const handleSeatCustomer = (reservationId: string, tableId: string) => {
    setReservations((prev) =>
      prev.map((r) =>
        r.id === reservationId
          ? {
              ...r,
              status: "seated" as ReservationStatus,
              tableAssigned: tableId,
            }
          : r,
      ),
    );
    setTables((prev) =>
      prev.map((t) =>
        t.id === tableId ? { ...t, status: "occupied" as TableStatus } : t,
      ),
    );
  };

  const handleMarkForCleaning = (tableId: string) => {
    setTables((prev) =>
      prev.map((t) =>
        t.id === tableId
          ? { ...t, needsCleaning: true, status: "cleaning" as TableStatus }
          : t,
      ),
    );
  };

  const handleCleaningComplete = (tableId: string) => {
    setTables((prev) =>
      prev.map((t) =>
        t.id === tableId
          ? { ...t, needsCleaning: false, status: "available" as TableStatus }
          : t,
      ),
    );
  };

  const handleCustomerLeft = (tableId: string) => {
    setTables((prev) =>
      prev.map((t) =>
        t.id === tableId ? { ...t, status: "available" as TableStatus } : t,
      ),
    );
    setReservations((prev) =>
      prev.map((r) =>
        r.tableAssigned === tableId
          ? {
              ...r,
              status: "reserved" as ReservationStatus,
              tableAssigned: null,
            }
          : r,
      ),
    );
  };

  const getStatusColor = (status: ReservationStatus) => {
    switch (status) {
      case "waiting":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "seated":
        return "bg-green-100 text-green-800 border-green-200";
      case "reserved":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTableStatusColor = (
    status: TableStatus,
    needsCleaning?: boolean,
  ) => {
    if (needsCleaning) return "bg-yellow-100 border-yellow-300";
    switch (status) {
      case "available":
        return "bg-green-100 border-green-300";
      case "occupied":
        return "bg-red-100 border-red-300";
      case "reserved":
        return "bg-blue-100 border-blue-300";
      case "cleaning":
        return "bg-yellow-100 border-yellow-300";
      default:
        return "bg-gray-100 border-gray-300";
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Employee Dashboard
        </h1>
        <p className="text-gray-600">
          Manage reservations, tables, and customer flow
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-orange-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Waiting</p>
                <p className="text-2xl font-bold text-orange-600">
                  {waitingCount}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-green-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Seated</p>
                <p className="text-2xl font-bold text-green-600">
                  {seatedCount}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-blue-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Reserved</p>
                <p className="text-2xl font-bold text-blue-600">
                  {reservedCount}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Available</p>
                <p className="text-2xl font-bold text-green-600">
                  {availableTables}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">
                  Need Cleaning
                </p>
                <p className="text-2xl font-bold text-yellow-600">
                  {needsCleaningCount}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Reservations List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Reservations
                </CardTitle>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search customers..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                </div>
              </div>

              {/* Filter buttons */}
              <div className="flex gap-2 mt-4">
                {["all", "waiting", "seated", "reserved"].map((filter) => (
                  <Button
                    key={filter}
                    variant={selectedFilter === filter ? "default" : "outline"}
                    size="sm"
                    onClick={() =>
                      setSelectedFilter(filter as "all" | ReservationStatus)
                    }
                    className="capitalize"
                  >
                    {filter}
                  </Button>
                ))}
              </div>
            </CardHeader>

            <CardContent className="p-0">
              <div className="max-h-96 overflow-y-auto">
                {filteredReservations.map((reservation) => (
                  <div
                    key={reservation.id}
                    className="border-b p-4 hover:bg-gray-50"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-start gap-3">
                        <Avatar>
                          <AvatarFallback>
                            {reservation.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>

                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {reservation.name}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                            <span className="flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {reservation.phone}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {reservation.guests} guests
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {reservation.time}
                            </span>
                          </div>

                          {reservation.tableAssigned && (
                            <p className="text-sm text-blue-600 mt-1">
                              Table: {reservation.tableAssigned}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(reservation.status)}>
                          {reservation.status}
                        </Badge>

                        {reservation.status === "waiting" && (
                          <select
                            className="text-sm border rounded px-2 py-1"
                            onChange={(e) => {
                              if (e.target.value) {
                                handleSeatCustomer(
                                  reservation.id,
                                  e.target.value,
                                );
                              }
                            }}
                            defaultValue=""
                          >
                            <option value="">Seat at table...</option>
                            {tables
                              .filter(
                                (t) =>
                                  t.status === "available" &&
                                  t.seats >= reservation.guests,
                              )
                              .map((t) => (
                                <option key={t.id} value={t.id}>
                                  {t.id} ({t.seats} seats)
                                </option>
                              ))}
                          </select>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Table Status */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Utensils className="h-5 w-5" />
                Table Status
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {tables.map((table) => (
                  <div
                    key={table.id}
                    className={`p-3 border rounded-lg ${getTableStatusColor(table.status, table.needsCleaning)}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-semibold">{table.id}</span>
                      <span className="text-xs text-gray-600">
                        {table.seats} seats
                      </span>
                    </div>

                    <div className="text-xs mb-2 capitalize">
                      {table.needsCleaning ? "Needs Cleaning" : table.status}
                    </div>

                    <div className="flex gap-1">
                      {table.status === "occupied" && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs px-2 py-1 h-auto"
                            onClick={() => handleMarkForCleaning(table.id)}
                          >
                            Mark Clean
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs px-2 py-1 h-auto"
                            onClick={() => handleCustomerLeft(table.id)}
                          >
                            Customer Left
                          </Button>
                        </>
                      )}

                      {table.needsCleaning && (
                        <Button
                          size="sm"
                          variant="default"
                          className="text-xs px-2 py-1 h-auto"
                          onClick={() => handleCleaningComplete(table.id)}
                        >
                          Cleaning Done
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EmployeeView;
