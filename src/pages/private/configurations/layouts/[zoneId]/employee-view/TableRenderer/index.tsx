import TableIcon from "./TableIcon";
import TableAssignmentBadge from "./TableAssignmentBadge";

// Table Renderer Component
const TableRenderer = ({
  tables,
  selectedTables,
  highlightedTables,
  tableAssignments,
  canvasScale,
  onTableSelect,
  showSeatedHighlight = false,
}) => {
  const originalCanvasConfig = { width: 800, height: 494 };
  const scaledCanvasConfig = {
    width: originalCanvasConfig.width * canvasScale,
    height: originalCanvasConfig.height * canvasScale,
  };

  return (
    <div className="flex justify-center">
      <div
        className="relative border-2 border-gray-300 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden"
        style={{
          width: scaledCanvasConfig.width,
          height: scaledCanvasConfig.height,
          backgroundImage: `linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)`,
        }}
      >
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(to right, #666 1px, transparent 1px),
              linear-gradient(to bottom, #666 1px, transparent 1px)
            `,
            backgroundSize: `${Math.max(30, 50 * canvasScale)}px ${Math.max(30, 50 * canvasScale)}px`,
          }}
        />

        {/* Tables */}
        {tables.map((table) => (
          <div
            key={table.id}
            className={`absolute transition-all duration-200 hover:scale-105 cursor-pointer
              ${showSeatedHighlight && highlightedTables.includes(table.id) ? "z-10   border-2  border-blue-500  " : ""}
            `}
            style={{
              left: `${table.position.x * canvasScale}px`,
              top: `${table.position.y * canvasScale}px`,
            }}
            onClick={() => onTableSelect(table.id)}
          >
            <div className="relative">
              <TableIcon
                tableType={table.tableType}
                status={table.tableStatus}
                width={table.width}
                height={table.height}
                scale={canvasScale}
                isSelected={selectedTables.includes(table.id)}
              />

              {/* Table Number */}
              <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                style={{
                  fontSize: `${Math.max(12, 16 * canvasScale)}px`,
                }}
              >
                <span className="text-white font-bold drop-shadow-lg">
                  {table.tableNumber}
                </span>
              </div>

              {/* Assignment Badge */}
              <TableAssignmentBadge
                assignment={tableAssignments[table.id]}
                scale={canvasScale}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableRenderer;
