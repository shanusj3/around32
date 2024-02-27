import { useParams } from "react-router-dom";
import { useGetBloge } from "../helpers/api-comunication-chats";
import Avatar from "react-avatar";

const BlogPage = () => {
  const params = useParams();
  const { blogId } = params;
  console.log(blogId);
  const { data: blog, isLoading, error } = useGetBloge(blogId!);
  return (
    <div className="min-h-screen w-full px-2 md:px-14">
      {isLoading ? (
        <>loading</>
      ) : error ? (
        <>erorr</>
      ) : (
        <>
          <div className="w-full">
            <div className="flex gap-2 ">
              <div>
                <Avatar name={blog?.author} round size="35px" />
              </div>
              <h1 className="md:text-2xl font-extrabold text-blackMain">
                {blog?.author}
              </h1>
            </div>

            <div className="w-full p-3">
              <p className="mb-1 font-medium ">
                Auther: <span className="text-blueMain">{blog?.author}</span>
              </p>
              <img
                src={blog?.image}
                alt={blog?.heading}
                className="w-full md:h-[500px]"
              />
              <p className="mt-3 text-blackThi break-all">{blog?.blog}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BlogPage;
