"use client";

import { useState } from "react";
import axios from "axios";
import { AxiosError } from "axios";

export default function GuestbookForm() {
  const [newMessage, setNewMessage] = useState("");
  const [author, setAuthor] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:3005/guestbook", {
        author,
        content: newMessage,
      });

      if (response.status === 201) {
        setAuthor("");
        setNewMessage("");
        // 방명록 목록 페이지로 이동
        window.location.href = "/guestbook?tab=view";
      } else {
        throw new Error("방명록 작성에 실패했습니다.");
      }
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      console.error("Error submitting message:", error);
      setError(
        error.response?.data?.message || "메시지 작성 중 오류가 발생했습니다."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">방명록 작성</h2>

      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="author"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            작성자
          </label>
          <input
            id="author"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="이름을 입력해주세요"
            required
            disabled={isSubmitting}
          />
        </div>
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            메시지
          </label>
          <textarea
            id="message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={4}
            placeholder="소중한 메시지를 남겨주세요"
            required
            disabled={isSubmitting}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          {isSubmitting ? "작성 중..." : "작성하기"}
        </button>
      </form>
    </div>
  );
}
