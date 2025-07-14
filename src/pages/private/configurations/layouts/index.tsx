import CreateZoneDialog from "./components/CreateZoneDialog";
import ZonesList from "./components/ZonesList";

const Layouts = () => {
  return (
    <div className="p-6">
      <div className=" mx-auto">
        <div className="flex justify-between">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Layouts Management</h1>
          </div>

          {/* <CreateZoneDialog /> */}
        </div>
        <ZonesList />
      </div>
    </div>
  );
};

export default Layouts;
