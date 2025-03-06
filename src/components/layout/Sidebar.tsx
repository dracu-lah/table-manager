import React, { useState } from "react";
import { useCanvas } from "../../context/CanvasContext";
import { ElementData, ElementType } from "../../types";
import { Button } from "../ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { v4 as uuidv4 } from "uuid";

export const Sidebar: React.FC = () => {
  const { dispatch, state } = useCanvas();
  const [openCategory, setOpenCategory] = useState<ElementType | null>(null);

  const elementCategories = [
    { type: "table", subtypes: ["type-1", "type-2", "type-3"] },
    { type: "window", subtypes: ["standard", "large"] },
    { type: "door", subtypes: ["single", "double"] },
    { type: "separator", subtypes: ["vertical", "horizontal"] },
  ];

  const handleAddElement = (type: ElementType, subType: string) => {
    // Count existing elements of this type and subtype to create the label
    const existingElements = state.elements.filter(
      (el) => el.type === type && el.subType === subType,
    );
    const count = existingElements.length;

    const newElement: ElementData = {
      id: uuidv4(),
      type,
      subType,
      label: `${type} ${subType} (${count + 1})`,
      position: { x: 100, y: 100 },
      rotation: 0,
    };

    dispatch({ type: "ADD_ELEMENT", payload: newElement });
  };

  return (
    <div className="w-64 bg-gray-100 p-4 border-r border-gray-200 h-full flex flex-col">
      <h2 className="text-xl font-bold mb-4">Elements</h2>
      <div className="space-y-2">
        {elementCategories.map((category) => (
          <Collapsible
            key={category.type}
            open={openCategory === category.type}
            onOpenChange={() =>
              setOpenCategory(
                openCategory === category.type ? null : category.type,
              )
            }
            className="border border-gray-300 rounded-md"
          >
            <CollapsibleTrigger className="w-full p-2 text-left font-medium bg-gray-200 flex justify-between items-center">
              <span className="capitalize">{category.type}</span>
              <span>{openCategory === category.type ? "▲" : "▼"}</span>
            </CollapsibleTrigger>
            <CollapsibleContent className="p-2 space-y-2">
              {category.subtypes.map((subtype) => (
                <Button
                  key={subtype}
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() =>
                    handleAddElement(category.type as ElementType, subtype)
                  }
                >
                  {subtype}
                </Button>
              ))}
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    </div>
  );
};
