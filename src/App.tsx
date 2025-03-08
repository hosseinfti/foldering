import { useState } from "react";
import {
  Folder,
  FileText,
  ChevronRight,
  ChevronDown,
  Plus,
} from "lucide-react";
import "./App.css";

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

/**
 * @param {string} s
 * @return {boolean}
 */
function isNonAlphanumeric(str) {
  return str.replace(/[a-zA-Z0-9]/g, "").length === str.length;
}
var isPalindrome = function (s) {
  let first = 0;
  let last = s.length - 1;
  while (first < last) {
    while (isNonAlphanumeric(s[first])) {
      first++;
    }
    while (isNonAlphanumeric(s[last])) {
      last--;
    }
    if (s[first].toLowerCase() === s[last].toLowerCase()) {
      first++;
      last--;
      continue;
    } else {
      return false;
    }
  }
  return true;
};

// console.log(isPalindrome("A man, a plan, a canal: Panama"));

function maxProfit(prices: number[]): number {
  let maxProfit = 0;
  let buy_price = prices[0];
  for (let day = 1; day < prices.length; day++) {
    if (prices[day] < buy_price) {
      buy_price = prices[day];
    } else {
      maxProfit = Math.max(maxProfit, prices[day] - buy_price);
    }
  }
  return maxProfit;
}
// console.log(maxProfit([1, 3, 6, 4, 3]));

function romanToInteger(s: string): number {
  const romanMap = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };
  let result = 0;
  for (let i = 0; i < s.length; i++) {
    const current = romanMap[s[i]];
    const next = romanMap[s[i + 1]];
    if (next && current < next) {
      result -= current;
    } else {
      result += current;
    }
  }
  return result;
}

// console.log(romanToInteger("MCMXCIV"));

function lastWordLength(s: string): number {
  let length = 0;
  for (let i = s.length - 1; i >= 0; i--) {
    if (s[i] === " ") {
      if (length === 0) {
        continue;
      } else {
        break;
      }
    } else {
      length++;
    }
  }
  return length;
}
// console.log(lastWordLength("   fly me   to   the moon  "));

function removeDuplicatesInPlace(nums: number[]): number {
  let k = 1;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] !== nums[i - 1]) {
      nums[k] = nums[i];
      k++;
    }
  }
  return k;
}
// console.log(removeDuplicatesInPlace([1, 1, 2, 2, 3, 4, 4, 5]));

//یکتانت
// رشته‌ای تشکیل شده از کاراکتر‌های حرفی و عددی به شما می‌دهیم. تعداد اعداد integer یکتای موجود در این رشته را بدهید.
// input: a123bc34d8ef34
// output: 3
// hint: {123, 34, 8}

function uniqNumber(str) {
  let seen = new Set();
  let numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  for (let i = 0; i < str.length; i++) {
    if (!numbers.includes(str[i])) {
      continue;
    } else {
      if (seen.has(str[i])) {
        continue;
      } else {
        seen.add(str[i]);
      }
    }
  }
  return seen.size;
}
// console.log(uniqNumber("a123bc34d8ef34"));
