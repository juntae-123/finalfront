"use client";

import GuestbookForm from "@/components/GuestbookForm";

export default function GuestbookWritePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">방명록 작성</h1>
          <p className="text-gray-600 text-lg">소중한 메시지를 남겨주세요</p>
        </div>
        <div className="bg-white rounded-xl shadow-xl p-8">
          <GuestbookForm />
        </div>
      </div>
    </div>
  );
}
