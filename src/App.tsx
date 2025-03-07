import { useState } from "react";
import "./App.css";
import { Folder, FileText, ChevronRight, ChevronDown } from "lucide-react";

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

const DirectoryItem = ({ item }: { item: any }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="pl-4">
      {/* Folders */}
      {item.type === "folder" ? (
        <div>
          <div
            className="flex items-center cursor-pointer hover:bg-gray-200 p-1 rounded"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            <Folder className="ml-2 text-blue-500" size={16} />
            <span className="ml-2 font-medium">{item.name}</span>
          </div>

          {/* Recursive Rendering for Children */}
          {isOpen && (
            <div className="ml-4 border-l border-gray-300">
              {item.children?.map((child: any, index: number) => (
                <DirectoryItem key={index} item={child} />
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

export default function App() {
  return (
    <div className="p-4 min-h-screen">
      <h2 className="text-lg font-semibold mb-4">File Explorer</h2>
      {fileStructure.map((item, index) => (
        <DirectoryItem key={index} item={item} />
      ))}
    </div>
  );
}
