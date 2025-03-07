import { useState } from "react";
import {
  Folder,
  FileText,
  ChevronRight,
  ChevronDown,
  Plus,
} from "lucide-react";

const fileStructure = [
  {
    name: "Root",
    type: "folder",
    children: [
      {
        name: "Documents",
        type: "folder",
        children: [
          { name: "report.pdf", type: "file" },
          { name: "data.xlsx", type: "file" },
        ],
      },
      {
        name: "Pictures",
        type: "folder",
        children: [
          { name: "vacation.jpg", type: "file" },
          {
            name: "2024",
            type: "folder",
            children: [{ name: "party.jpg", type: "file" }],
          },
        ],
      },
    ],
  },
];

const DirectoryItem = ({ item, addItem }: { item: any; addItem: Function }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleAddFolder = () => {
    const newFolder = {
      name: `New Folder ${Math.random().toString(36).substring(2, 7)}`,
      type: "folder",
      children: [],
    };
    addItem(item, newFolder);
  };

  const handleAddFile = () => {
    const newFile = {
      name: `New File ${Math.random().toString(36).substring(2, 7)}.txt`,
      type: "file",
    };
    addItem(item, newFile);
  };

  return (
    <div className="pl-4">
      {/* Folders */}
      {item.type === "folder" ? (
        <div>
          <div
            className="flex items-center cursor-pointer hover:bg-gray-600 p-1 rounded"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            <Folder className="ml-2 text-blue-500" size={16} />
            <span className="ml-2 font-medium">{item.name}</span>
          </div>

          {/* Add Folder and File Buttons */}
          <div className="ml-8 mt-2 flex space-x-2">
            <button
              onClick={handleAddFolder}
              className="flex items-center bg-blue-500 text-white p-1 rounded text-xs"
            >
              <Plus size={14} />
              Add Folder
            </button>
            <button
              onClick={handleAddFile}
              className="flex items-center bg-green-500 text-white p-1 rounded text-xs"
            >
              <Plus size={14} />
              Add File
            </button>
          </div>

          {/* Recursive Rendering for Children */}
          {isOpen && (
            <div className="ml-4 border-l border-gray-300">
              {item.children?.map((child: any, index: number) => (
                <DirectoryItem key={index} item={child} addItem={addItem} />
              ))}
            </div>
          )}
        </div>
      ) : (
        // Files
        <div className="flex items-center p-1 ml-6">
          <FileText className="text-gray-500" size={16} />
          <span className="ml-2">{item.name}</span>
        </div>
      )}
    </div>
  );
};

const updateFileStructure = (item: any, newItem: any) => {
  // Recursive function to find the target folder and add the new item
  const addItem = (target: any, newItem: any) => {
    if (target.name === item.name) {
      target.children.push(newItem);
    } else if (target.children) {
      target.children.forEach((child: any) => addItem(child, newItem));
    }
  };

  const newFileStructure = [...fileStructure];
  newFileStructure.forEach((rootItem: any) => addItem(rootItem, newItem));
  return newFileStructure;
};

export default function App() {
  const [fileStructureState, setFileStructureState] = useState(fileStructure);

  const addItem = (parentItem: any, newItem: any) => {
    const newFileStructure = updateFileStructure(parentItem, newItem);
    setFileStructureState(newFileStructure);
  };

  return (
    <div className="p-4 min-h-screen">
      <h2 className="text-lg font-semibold mb-4">File Explorer</h2>
      {fileStructureState.map((item, index) => (
        <DirectoryItem key={index} item={item} addItem={addItem} />
      ))}
    </div>
  );
}
