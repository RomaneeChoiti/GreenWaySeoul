import { create } from "zustand";
import { ResponsePost } from "@/api/post";

interface DetailPostState {
    detailPost: ResponsePost | null;
    setDetailPost: (detailPost: ResponsePost) => void;
}

const useDetailPostStore = create<DetailPostState>(set => ({
    detailPost: null,
    setDetailPost: (detailPost: ResponsePost) => {
        set({detailPost});
    },
}))

export { useDetailPostStore };