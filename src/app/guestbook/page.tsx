"use client";

import { useState } from "react";
import GuestbookPreview from "@/components/GuestbookPreview";
import GuestbookForm from "@/components/GuestbookForm";

export default function GuestbookPage() {
  const [activeTab, setActiveTab] = useState<"view" | "write">("view");

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-center mb-8">
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab("view")}
            className={`px-4 py-2 rounded-lg ${
              activeTab === "view"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            전체 방명록 보기
          </button>
          <button
            onClick={() => setActiveTab("write")}
            className={`px-4 py-2 rounded-lg ${
              activeTab === "write"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            방명록 작성하기
          </button>
        </div>
      </div>

      {activeTab === "view" ? <GuestbookPreview /> : <GuestbookForm />}
    </div>
  );
}
