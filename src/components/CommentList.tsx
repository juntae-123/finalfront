import { Comment } from "@/types/comment";
import { FaTrash } from "react-icons/fa";

interface CommentListProps {
  comments: Comment[];
}

const CommentList = ({ comments }: CommentListProps) => {
  const handleDelete = async (id: number) => {
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      try {
        await fetch(`http://localhost:3005/comment/${id}`, {
          method: "DELETE",
        });
        window.location.reload(); // 댓글 목록 새로고침
      } catch (error) {
        console.error("Error deleting comment:", error);
      }
    }
  };

  return (
    <div className="space-y-4">
      {comments.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          아직 작성된 댓글이 없습니다.
        </div>
      ) : (
        comments.map((comment) => (
          <div
            key={comment.id}
            className="bg-white rounded-lg shadow-sm p-4 border border-gray-200"
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <span className="font-medium text-gray-900">
                  {comment.author}
                </span>
                <span className="text-sm text-gray-500 ml-2">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </div>
              <button
                onClick={() => handleDelete(comment.id)}
                className="text-gray-400 hover:text-red-500 transition-colors p-1"
                title="댓글 삭제"
              >
                <FaTrash size={16} />
              </button>
            </div>
            <p className="text-gray-700 whitespace-pre-wrap">
              {comment.content}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default CommentList;
