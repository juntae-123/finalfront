"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Guestbook } from "@/types/guestbook";
import { Comment } from "@/types/comment";
import CommentForm from "@/components/CommentForm";
import CommentList from "@/components/CommentList";
import { FaTrash } from "react-icons/fa";

export default function GuestbookDetail() {
  const params = useParams();
  const router = useRouter();
  const [guestbook, setGuestbook] = useState<Guestbook | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGuestbook = async () => {
      try {
        const response = await fetch(
          `http://localhost:3005/guestbook/${params.id}`
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || `서버 오류가 발생했습니다. (${response.status})`
          );
        }

        if (!data) {
          throw new Error("방명록을 찾을 수 없습니다.");
        }
        setGuestbook(data);
      } catch (err) {
        const error = err as Error;
        console.error("Error fetching guestbook:", error);
        setGuestbook(null);
        setError(error?.message || "방명록을 불러오는 중 오류가 발생했습니다.");
      }
    };

    const fetchComments = async () => {
      try {
        const response = await fetch(
          `http://localhost:3005/comment?guestbookId=${params.id}`
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || `서버 오류가 발생했습니다. (${response.status})`
          );
        }

        console.log("Fetched comments:", data);
        setComments(data);
      } catch (error: any) {
        console.error("Error fetching comments:", error);
        setComments([]);
        setError(error?.message || "댓글을 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchGuestbook();
    fetchComments();
  }, [params.id]);

  const handleDelete = async () => {
    if (window.confirm("방명록을 삭제하시겠습니까?")) {
      try {
        await fetch(`http://localhost:3005/guestbook/${params.id}`, {
          method: "DELETE",
        });
        router.push("/guestbook");
      } catch (error) {
        console.error("Error deleting guestbook:", error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!guestbook) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <h2 className="text-2xl font-bold text-red-500 mb-4">
          오류가 발생했습니다
        </h2>
        <p className="text-gray-600 mb-4">
          {error || "방명록을 불러오는 중 문제가 발생했습니다."}
        </p>
        <button
          onClick={() => router.push("/guestbook")}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          방명록 목록으로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-2xl font-bold">{guestbook.author}</h1>
          <button
            onClick={handleDelete}
            className="text-gray-400 hover:text-red-500 transition-colors p-1"
            title="방명록 삭제"
          >
            <FaTrash size={18} />
          </button>
        </div>
        <p className="text-gray-700 mb-4">{guestbook.content}</p>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>Likes: {guestbook.likes}</span>
          <span>{new Date(guestbook.createdAt).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Comments</h2>
        <CommentForm guestbookId={guestbook.id} />
        <CommentList comments={comments} />
      </div>
    </div>
  );
}
