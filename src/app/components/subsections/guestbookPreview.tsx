"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaComment, FaArrowRight, FaHeart } from "react-icons/fa";

interface Message {
  id: number;
  author: string;
  content: string;
  createdAt: string;
  likes: number;
}

const GuestbookPreview = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLike = async (messageId: number) => {
    try {
      await axios.patch(`http://localhost:3005/guestbook/${messageId}/like`);
      setMessages((prevMessages) =>
        prevMessages.map((message) =>
          message.id === messageId
            ? { ...message, likes: message.likes + 1 }
            : message
        )
      );
    } catch (err) {
      console.error("Error liking message:", err);
    }
  };

  const handleMessageClick = (id: number) => {
    router.push(`/guestbook/${id}`);
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get("http://localhost:3005/guestbook");
        if (Array.isArray(response.data)) {
          setMessages(response.data.slice(0, 9));
        } else {
          setMessages([]);
          setError("데이터 형식이 올바르지 않습니다.");
        }
      } catch (err) {
        setError("메시지를 불러오는 중 오류가 발생했습니다.");
        console.error("Error fetching messages:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div
      id="guestbook"
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-8"
    >
      <div className="max-w-7xl w-full space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold text-gray-800 flex items-center justify-center gap-2">
            <FaComment className="text-blue-500" />
            방명록
          </h2>
          <p className="text-gray-600">
            방문자들의 소중한 메시지를 확인해보세요
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className="bg-white rounded-lg shadow-lg p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                onClick={() => handleMessageClick(message.id)}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {message.author}
                    </h3>
                    <span className="text-sm text-gray-500">
                      {new Date(message.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-600 line-clamp-3">
                    {message.content}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <button
                      onClick={() => handleLike(message.id)}
                      className="text-sm text-gray-500 flex items-center gap-1 hover:text-red-500 transition-colors"
                    >
                      <FaHeart className="text-red-400" /> {message.likes}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <button
            onClick={() => router.push("/guestbook?tab=view")}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl text-lg font-semibold"
          >
            전체 방명록 보기
            <FaArrowRight className="ml-2 animate-pulse" />
          </button>
          <button
            onClick={() => router.push("/guestbook/write")}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl text-lg font-semibold"
          >
            방명록 작성하기
            <FaArrowRight className="ml-2 animate-pulse" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GuestbookPreview;
