import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Building2,
  MapPin,
  Layout,
  Users,
  Plus,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Search,
} from "lucide-react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Sample data
  const restaurants = [
    {
      id: 1,
      name: "Mario's Italian",
      location: "Downtown",
      areas: 3,
      canvases: 5,
      tables: 24,
      status: "active",
    },
    {
      id: 2,
      name: "Sakura Sushi",
      location: "Midtown",
      areas: 2,
      canvases: 3,
      tables: 18,
      status: "active",
    },
    {
      id: 3,
      name: "Blue Ocean Café",
      location: "Waterfront",
      areas: 4,
      canvases: 6,
      tables: 32,
      status: "inactive",
    },
  ];

  const areas = [
    {
      id: 1,
      name: "Main Dining",
      restaurant: "Mario's Italian",
      tables: 12,
      capacity: 48,
      status: "active",
    },
    {
      id: 2,
      name: "Patio",
      restaurant: "Mario's Italian",
      tables: 8,
      capacity: 32,
      status: "active",
    },
    {
      id: 3,
      name: "Private Room",
      restaurant: "Mario's Italian",
      tables: 4,
      capacity: 16,
      status: "active",
    },
    {
      id: 4,
      name: "Sushi Bar",
      restaurant: "Sakura Sushi",
      tables: 10,
      capacity: 20,
      status: "active",
    },
  ];

  const canvases = [
    {
      id: 1,
      name: "Floor Plan A",
      restaurant: "Mario's Italian",
      area: "Main Dining",
      tables: 12,
      lastModified: "2 hours ago",
    },
    {
      id: 2,
      name: "Patio Layout",
      restaurant: "Mario's Italian",
      area: "Patio",
      tables: 8,
      lastModified: "1 day ago",
    },
    {
      id: 3,
      name: "Sushi Counter",
      restaurant: "Sakura Sushi",
      area: "Sushi Bar",
      tables: 10,
      lastModified: "3 hours ago",
    },
  ];

  const stats = {
    totalRestaurants: restaurants.length,
    totalAreas: areas.length,
    totalCanvases: canvases.length,
    totalTables: restaurants.reduce((sum, r) => sum + r.tables, 0),
  };

  const TabButton = ({ id, label, icon: Icon }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
        activeTab === id
          ? "bg-primary text-white"
          : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      <Icon size={18} />
      {label}
    </button>
  );

  const ActionButton = ({ icon: Icon, onClick, variant = "secondary" }) => (
    <button
      onClick={onClick}
      className={`p-2 rounded-lg transition-colors ${
        variant === "primary"
          ? "bg-primary text-white hover:bg-blue-700"
          : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      <Icon size={16} />
    </button>
  );

  return (
    <div className="min-h-screen ">
      {/* Header */}
      <header className=" border-b  px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Table Manager</h1>
            <p className="text-gray-600">
              Manage your restaurant layouts and seating
            </p>
          </div>
          <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Plus size={18} />
            New Restaurant
          </button>
        </div>
      </header>

      {/* Navigation */}
      <nav className=" border-b  px-6 py-3">
        <div className="flex gap-2">
          <TabButton id="overview" label="Overview" icon={Layout} />
          <TabButton id="restaurants" label="Restaurants" icon={Building2} />
          <TabButton id="areas" label="Areas" icon={MapPin} />
          <TabButton id="canvases" label="Canvases" icon={Layout} />
        </div>
      </nav>

      {/* Main Content */}
      <main className="p-6">
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Restaurants
                  </CardTitle>
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {stats.totalRestaurants}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +2 from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Areas
                  </CardTitle>
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalAreas}</div>
                  <p className="text-xs text-muted-foreground">
                    Across all restaurants
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Canvases
                  </CardTitle>
                  <Layout className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {stats.totalCanvases}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Floor plan layouts
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Tables
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalTables}</div>
                  <p className="text-xs text-muted-foreground">
                    Seating capacity managed
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Latest updates across your restaurants
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-3  rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium">New canvas created</p>
                      <p className="text-sm text-gray-600">
                        Floor Plan A added to Mario's Italian
                      </p>
                    </div>
                    <span className="text-sm text-gray-500">2 hours ago</span>
                  </div>
                  <div className="flex items-center gap-4 p-3  rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium">Area modified</p>
                      <p className="text-sm text-gray-600">
                        Patio seating updated at Mario's Italian
                      </p>
                    </div>
                    <span className="text-sm text-gray-500">1 day ago</span>
                  </div>
                  <div className="flex items-center gap-4 p-3  rounded-lg">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium">Restaurant status changed</p>
                      <p className="text-sm text-gray-600">
                        Blue Ocean Café marked as inactive
                      </p>
                    </div>
                    <span className="text-sm text-gray-500">2 days ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "restaurants" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Restaurants</h2>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={16}
                  />
                  <input
                    type="text"
                    placeholder="Search restaurants..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  <Plus size={16} />
                  Add Restaurant
                </button>
              </div>
            </div>

            <div className=" rounded-lg border  overflow-hidden">
              <table className="w-full">
                <thead className=" border-b ">
                  <tr>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">
                      Name
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">
                      Location
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">
                      Areas
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">
                      Canvases
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">
                      Tables
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {restaurants.map((restaurant) => (
                    <tr
                      key={restaurant.id}
                      className="border-b border-gray-100 hover:"
                    >
                      <td className="py-3 px-4 font-medium">
                        {restaurant.name}
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {restaurant.location}
                      </td>
                      <td className="py-3 px-4">{restaurant.areas}</td>
                      <td className="py-3 px-4">{restaurant.canvases}</td>
                      <td className="py-3 px-4">{restaurant.tables}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            restaurant.status === "active"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {restaurant.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <ActionButton icon={Eye} onClick={() => {}} />
                          <ActionButton icon={Edit} onClick={() => {}} />
                          <ActionButton icon={Trash2} onClick={() => {}} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "areas" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Areas</h2>
              <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                <Plus size={16} />
                Add Area
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {areas.map((area) => (
                <Card key={area.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{area.name}</CardTitle>
                      <ActionButton icon={MoreHorizontal} onClick={() => {}} />
                    </div>
                    <CardDescription>{area.restaurant}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tables:</span>
                        <span className="font-medium">{area.tables}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Capacity:</span>
                        <span className="font-medium">{area.capacity}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            area.status === "active"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {area.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <button className="flex-1 bg-primary text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        Edit Layout
                      </button>
                      <ActionButton
                        icon={Eye}
                        onClick={() => {}}
                        variant="secondary"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === "canvases" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Canvases</h2>
              <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                <Plus size={16} />
                Create Canvas
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {canvases.map((canvas) => (
                <Card key={canvas.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{canvas.name}</CardTitle>
                      <ActionButton icon={MoreHorizontal} onClick={() => {}} />
                    </div>
                    <CardDescription>
                      {canvas.restaurant} • {canvas.area}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Layout size={32} className="text-gray-400" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Tables:</span>
                          <span className="font-medium">{canvas.tables}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Modified:</span>
                          <span className="text-sm text-gray-500">
                            {canvas.lastModified}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="flex-1 bg-primary text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                          Open Editor
                        </button>
                        <ActionButton
                          icon={Eye}
                          onClick={() => {}}
                          variant="secondary"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
