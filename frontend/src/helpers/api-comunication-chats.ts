import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Blog } from "../types/blogTypes";

export const useGetAllBlogs = () => {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: async () => (await axios.get<Blog[]>("/routes/blog")).data,
  });
};

export const useGetBloge = (blogId: string) => {
  return useQuery({
    queryKey: ["blogs", blogId],
    queryFn: async () => (await axios.get<Blog>(`/routes/blog/${blogId}`)).data,
  });
};

export const fetchFeatuedPost = () => {
  return useQuery({
    queryKey: ["featured-blgs"],
    queryFn: async () =>
      (await axios.get<Blog[]>(`/routes/blog/featured`)).data,
  });
};
