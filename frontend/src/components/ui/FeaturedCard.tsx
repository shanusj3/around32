import React from "react";
import { Blog } from "../../types/blogTypes";
import Avatar from "react-avatar";
import { Link } from "react-router-dom";

interface Card {
  blog: Blog;
}

const FeaturedCard = ({ blog }: Card) => {
  return (
    <div className="w-full">
      <div className=" m-5 border-2 rounded-md p-2 border-[#eaeaea] hover:bg-gray-50 hover:shadow-sm">
        <Link to={"blog/" + blog._id}>
          <div className="flex gap-2 ">
            <div>
              <Avatar name={blog.author} round size="35px" />
            </div>
            <h1 className="md:text-2xl font-extrabold text-blackMain">
              {blog.author}
            </h1>
          </div>
          <div className="h-full w-full  items-center flex flex-col-reverse md:flex-row justify-between bg-white md:p-2  rounded-md">
            <div className="md:w-2/3 w-full">
              <h1 className="text-2xl text-blackMain break-all  font-extrabold md:px-2 text-ellipsis whitespace-nowrap overflow-hidden">
                {blog.heading}
              </h1>
              <p className="  break-all h-[55px] text-gray-500  overflow-hidden md:px-2">
                {blog.blog}
              </p>
            </div>
            <div className="md:w-1/3 w-full text-blackThi">
              <img
                src={blog.image}
                alt={blog.heading}
                className="max-w-[200px] max-h-[150px] rounded-md"
              />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedCard;
