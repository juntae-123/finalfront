import { useState } from "react";

interface CommentFormProps {
  guestbookId: number;
}

const CommentForm = ({ guestbookId }: CommentFormProps) => {
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:3005/comment", {
        method: "POST",
        body: JSON.stringify({
          guestbookId,
          content,
          author,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setContent("");
      setAuthor("");
      window.location.reload(); // 댓글 목록 새로고침
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="mb-4">
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="이름"
          required
        />
      </div>
      <div className="mb-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={4}
          placeholder="댓글을 작성하세요..."
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
      >
        댓글 작성
      </button>
    </form>
  );
};

export default CommentForm;
