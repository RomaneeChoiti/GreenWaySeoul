import { Post } from "@/types/domain"
import axiosInstance from "./axios"

type RequestCreatePost = Post & { imageUris: Image

const createPost = async(body: RequestCreatePost)=>{
    const { data } = await axiosInstance.post('/posts',body)
}