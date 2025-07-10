import CreatePropertyDialog from "./components/CreatePropertyDialog";
import PropertiesList from "./components/PropertiesList";

const PropertiesPage = () => {
  return (
    <div className="p-6">
      <div className=" mx-auto">
        <div className="flex justify-between">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Properties Management</h1>
          </div>

          <CreatePropertyDialog />
        </div>
        <PropertiesList />
      </div>
    </div>
  );
};

export default PropertiesPage;
