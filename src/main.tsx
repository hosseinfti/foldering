import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import workerInstance from "./fibWorker.ts?worker";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

function lengthOfLongestSubstring(s: string): number {
  let maxLength = 0;
  let set = new Set();
  let left = 0;
  for (let right = 0; right < s.length; right++) {
    while (set.has(s[right])) {
      set.delete(s[left]);
      left++;
    }
    set.add(s[right]);
    maxLength = Math.max(maxLength, right - left + 1);
  }
  return maxLength;
}

function twoSum(numbers: number[], target: number): number[] {
  let left = 0,
    right = numbers.length - 1;

  while (left < right) {
    let sum = numbers[left] + numbers[right];
    if (sum === target) return [left + 1, right + 1]; // 1-based index
    else if (sum < target) left++;
    else right--;
  }

  return [];
}

//binary search
function binarySearch(numbers: number[], target: number): number {
  let low = 0;
  let high = numbers.length - 1;
  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    if (mid === target) return mid;
    else if (mid < target) low = mid + 1;
    else high = mid - 1;
  }
}

const worker = new workerInstance();
worker.onmessage = (e: MessageEvent) => {
  console.log("Fibonacci Result:", e.data);
};
// worker.postMessage(45);

function fib(n: number): number {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}
// console.log(fib(45));

function subsets(nums: number[]): number[][] {
  let result: number[][] = []; // ذخیره تمام زیرمجموعه‌ها

  // تابع بازگشتی برای تولید زیرمجموعه‌ها
  function backtrack(index: number, path: number[]) {
    // در هر مرحله، مسیر فعلی را ذخیره می‌کنیم
    result.push([...path]);

    // از index به بعد، برای هر عنصر آرایه، دو انتخاب داریم
    for (let i = index; i < nums.length; i++) {
      // عنصر را به مسیر اضافه می‌کنیم
      path.push(nums[i]);

      // تابع بازگشتی را برای بررسی انتخاب‌های بعدی فراخوانی می‌کنیم
      backtrack(i + 1, path);

      // پس از بازگشت از فراخوانی، عنصر را از مسیر حذف می‌کنیم
      path.pop();
    }
  }

  // شروع از ایندکس ۰ و مسیر خالی
  backtrack(0, []);
  return result;
}
let nums = [1, 2, 3];

// console.log(subsets(nums));
