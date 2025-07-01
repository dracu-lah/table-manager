import { useState } from "react";
import CreatePropertyForm from "./components/CreatePropertyForm";
// import EditPropertyForm from "./components/EditPropertyForm";
// import PropertiesSidebar from "./components/PropertiesSidebar";

import { useParams } from "react-router";
const PropertyManagementPage = () => {
  const { property_name } = useParams();
  const [length, setLength] = useState(0);
  return (
    <div className="flex h-full">
      {/* <div className="flex-1"> */}
      {/*   {property_name === "new" ? ( */}
      <CreatePropertyForm length={length} />
      {/*   ) : ( */}
      {/*     <EditPropertyForm */}

      {/*       propertyId={property_name} */}
      {/*       length={length} */}
      {/*       key={`property-${property_name}`} */}
      {/*     /> */}
      {/*   )} */}
      {/* </div> */}
      {/* <PropertiesSidebar setLength={setLength} /> */}
    </div>
  );
};

export default PropertyManagementPage;
