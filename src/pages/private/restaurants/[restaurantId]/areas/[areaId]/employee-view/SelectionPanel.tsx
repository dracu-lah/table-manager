import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

// Selection Panel Component
const SelectionPanel = ({
  selectedTables,
  selectedUser,
  tables,
  onConfirmSeating,
  onCancelSelection,
}) => {
  if (!selectedTables.length && !selectedUser) return null;

  const getSelectedTableNumbers = () => {
    return selectedTables
      .map((tableId) => {
        const table = tables.find((t) => t.id === tableId);
        return table?.tableNumber;
      })
      .filter(Boolean);
  };

  const totalCapacity = selectedTables.reduce((sum, tableId) => {
    const table = tables.find((t) => t.id === tableId);
    return sum + (table?.capacity || 0);
  }, 0);

  return (
    <Card className="border-blue-200 bg-blue-50">
      <CardContent className="p-4">
        <div className="space-y-3">
          {selectedTables.length > 0 && (
            <div>
              <h4 className="font-semibold text-blue-800 text-sm">
                Selected Tables:
              </h4>
              <p className="text-blue-600 text-sm">
                Table {getSelectedTableNumbers().join(", ")}
                {totalCapacity > 0 && ` (Total capacity: ${totalCapacity})`}
              </p>
            </div>
          )}

          {selectedUser && (
            <div>
              <h4 className="font-semibold text-blue-800 text-sm">
                Selected Guest:
              </h4>
              <p className="text-blue-600 text-sm">
                {selectedUser.name} (Party of {selectedUser.party_size})
              </p>
            </div>
          )}

          {selectedTables.length > 0 && selectedUser && (
            <div className="flex gap-2 pt-2">
              <Button size="sm" onClick={onConfirmSeating}>
                <CheckCircle size={14} className="mr-1" />
                Confirm Seating
              </Button>
              <Button size="sm" variant="outline" onClick={onCancelSelection}>
                Cancel
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SelectionPanel;
