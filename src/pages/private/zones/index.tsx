import OutletSelect from "@/components/tableManagerCommon/OutletSelect";
import CreateZoneDialog from "./components/CreateZoneDialog";
import ZonesList from "./components/ZonesList";
import { useState } from "react";

const ZonePage = () => {
  const [outlet, setOutlet] = useState(0);
  return (
    <div className="p-6">
      <div className=" mx-auto">
        <div className="flex justify-between">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Zones Management</h1>
          </div>

          <OutletSelect
            outlet={outlet}
            setOutlet={setOutlet}
            restaurantId={1}
          />
          <CreateZoneDialog outletId={outlet} />
        </div>
        <ZonesList />
      </div>
    </div>
  );
};

export default ZonePage;
