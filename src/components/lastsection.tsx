import Link from "next/link";

export default function LastSection() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Link
        href="/guestbook"
        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
      >
        방명록 남기기
      </Link>
    </div>
  );
}
