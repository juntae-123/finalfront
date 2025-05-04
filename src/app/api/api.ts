import axios from "axios";

const API_URL = "http://localhost:3005/guestbook";

export const fetchMessages = async () => {
  try {
    const response = await axios.get(API_URL);
    if (Array.isArray(response.data)) {
      return response.data;
    } else {
      throw new Error("데이터 형식이 올바르지 않습니다.");
    }
  } catch {
    throw new Error("방명록을 불러오는 중 오류가 발생했습니다.");
  }
};

export const postMessage = async (author: string, content: string) => {
  try {
    await axios.post(API_URL, { author, content });
  } catch {
    throw new Error("메시지 작성 중 오류가 발생했습니다.");
  }
};

export const deleteMessage = async (id: number) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch {
    throw new Error("방명록 삭제 중 오류가 발생했습니다.");
  }
};
