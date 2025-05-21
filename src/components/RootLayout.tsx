import { Link, Outlet } from "react-router";

const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-gray-900 text-white py-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">
            Restaurant Management
          </Link>
          <nav>
            <ul className="flex space-x-4">
              {/* <li> */}
              {/*   <Button */}
              {/*     asChild */}
              {/*     variant="ghost" */}
              {/*     className="text-white hover:bg-gray-700" */}
              {/*   > */}
              {/*     <Link to="/restaurants">Restaurants</Link> */}
              {/*   </Button> */}
              {/* </li> */}
              {/* <li> */}
              {/*   <Button */}
              {/*     asChild */}
              {/*     variant="ghost" */}
              {/*     className="text-white hover:bg-gray-700" */}
              {/*   > */}
              {/*     <Link to="/customer-view">Customer View</Link> */}
              {/*   </Button> */}
              {/* </li> */}
              {/* You could add an "Areas" link here if you had a dedicated areas page */}
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Optional: Footer */}
      {/* <footer className="bg-gray-900 text-white py-4 text-center">
        <div className="container mx-auto">
          &copy; {new Date().getFullYear()} Your Company
        </div>
      </footer> */}
    </div>
  );
};

export default RootLayout;
