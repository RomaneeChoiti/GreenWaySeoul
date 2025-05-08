import { ImageUri, Post } from '@/types/domain';
import axiosInstance from './axios';

type RequestCreatePost = Omit<Post, 'id'> & { imageUris: ImageUri[] }

type ResponsePost = Post & { images: ImageUri[] }

const createPost = async(body: RequestCreatePost): Promise<ResponsePost> => {
    const { data } = await axiosInstance.post('/posts',body);

    return data;
};

type ResponseSinglePost = ResponsePost & {isFavorite: boolean};

const getPost = async(id: number): Promise<ResponseSinglePost> => {
    const { data } = await axiosInstance.get(`/posts/${id}`);
    return data;
};

const getPosts = async(page = 1): Promise<ResponsePost[]> => {
    const { data } = await axiosInstance.get(`/posts/my?page=${page}`);
    return data;
};

const deletePost = async(id: number): Promise<void> => {
    const { data } = await axiosInstance.delete(`/posts/${id}`);
    return data;
};

type RequestUpdatePost = Omit<Post, 'id'> & { id: number; imageUris: ImageUri[] };

const updatePost = async (body: RequestUpdatePost): Promise<ResponsePost> => {
    const { id, ...updateData } = body;
    const { data } = await axiosInstance.patch(`/posts/${id}`, updateData);
    return data;
};

const getFavoritePosts = async (page = 1): Promise<ResponsePost[]> => {
    const { data } = await axiosInstance.get(`/favorites/my?page=${page}`);
    return data;
};

const updateFavoritePost = async (id: number): Promise<number> => {
    const { data } = await axiosInstance.post(`/favorites/${id}`);
    return data;
};

export { createPost, getPost, getPosts, deletePost, updatePost, updateFavoritePost, getFavoritePosts };
export type { RequestCreatePost, ResponsePost, ResponseSinglePost, RequestUpdatePost };