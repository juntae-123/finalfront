"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import GuestbookForm from "./GuestbookForm";

interface Message {
  id: number;
  author: string;
  content: string;
  createdAt: string;
  likes: number;
}

export default function GuestbookPreview() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"view" | "write">("view");
  const router = useRouter();

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get("http://localhost:3005/guestbook");
      if (Array.isArray(response.data)) {
        setMessages(response.data);
        setError("");
      } else {
        setMessages([]);
        setError("데이터 형식이 올바르지 않습니다.");
      }
    } catch {
      setError("방명록을 불러오는 중 오류가 발생했습니다.");
      setMessages([]);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3005/guestbook/${id}`);
      fetchMessages();
    } catch {
      setError("방명록 삭제 중 오류가 발생했습니다.");
    }
  };

  const handleMessageClick = (id: number) => {
    router.push(`/guestbook/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">방명록</h1>
          <p className="text-gray-600">여러분의 소중한 메시지를 남겨주세요</p>
        </div>

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

        {error && (
          <div className="mb-8 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {activeTab === "write" ? (
          <GuestbookForm />
        ) : (
          <div className="space-y-6">
            {messages.length > 0 ? (
              messages.map((message) => (
                <div
                  key={message.id}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => handleMessageClick(message.id)}
                >
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold">{message.author}</h3>
                    <span className="text-sm text-gray-500">
                      {new Date(message.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="mt-2 text-gray-700">{message.content}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      Likes: {message.likes}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(message.id);
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-white shadow-lg rounded-lg">
                <p className="text-gray-500">아직 작성된 방명록이 없습니다.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
