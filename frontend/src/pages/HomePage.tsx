import FeaturedCard from "../components/ui/FeaturedCard";
import HomeBlogCard from "../components/ui/HomeBlogCard";
import {
  fetchFeatuedPost,
  useGetAllBlogs,
} from "../helpers/api-comunication-chats";
import { categorise } from "../utils/categories";

const HomePage = () => {
  const { data: blogs, isLoading, error } = useGetAllBlogs();
  const {
    data: featuredData,
    isLoading: featuredLoading,
    error: featuredError,
  } = fetchFeatuedPost();
  return (
    <div className="w-full min-h-screen px-2 md:px-14  justify-center">
      <div className="w-full">
        <div
          className="w-full h-[500px] bg-center bg-no-repeat relative rounded-lg flex flex-col justify-center"
          style={{
            backgroundImage: `url("/assets/wanderlustbg.webp")`,
          }}
        >
          <div className="h-[500px] w-full bg-black opacity-45  absolute rounded-lg  " />
          <div className="z-50 p-3">
            <h1 className="text-xl font-extrabold text-center md:text-left text-white md:text-4xl">
              Journey Beyond Horizons
            </h1>
            <p className="my-4 font-medium md:text-lg md:max-w-lg text-center md:text-left text-white">
              Dive into the world of travel with stories that transport you to
              far-off lands. Adventure awaits around every corner. It's time to
              explore the world!
            </p>
          </div>
          <div
            className="w-[80%] md:flex items-center justify-center
            bg-white shadow-xl rounded-xl mx-auto left-[10%] -bottom-[7%] absolute p-3 py-4  hidden"
          >
            {categorise.map((val) => (
              <p
                className="w-[18%] p-2 mx-2 rounded-sm text-center bg-blue-100 cursor-pointer"
                key={val.value}
              >
                {val.category}
              </p>
            ))}
          </div>
        </div>
        <div className="mt-8 w-full flex flex-wrap gap-2 justify-center md:hidden">
          {categorise.map((val) => (
            <p
              className="px-3 p-2 rounded-sm text-center bg-blue-100 cursor-pointer"
              key={val.value}
            >
              {val.category}
            </p>
          ))}
        </div>
        <div className="h-screen mt-20 flex flex-wrap">
          <div className="w-full md:w-2/3 h-[200px] p-4">
            <h4 className="text-lg font-bold text-blackThi">What's hot</h4>
            <h1 className="md:text-2xl font-extrabold text-blackMain">
              Featured Post
            </h1>
            <div className="w-full">
              <div className="w-full flex flex-wrap">
                {featuredLoading ? (
                  <>Loding</>
                ) : featuredError ? (
                  <>error</>
                ) : (
                  featuredData?.map((val) => (
                    <FeaturedCard key={val._id} blog={val} />
                  ))
                )}
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 h-[200px] p-4">
            <h4 className="text-lg font-bold text-blackThi">Whats New</h4>
            <h1 className="md:text-2xl font-extrabold text-blackMain">
              Latest Posts
            </h1>
          </div>
        </div>
        <div className="w-full min-h-screen px-2 md:px-14 ">
          <h4 className="text-lg font-bold text-blackThi">All post</h4>
          <div className="w-full flex flex-wrap">
            {isLoading ? (
              <>Loding</>
            ) : error ? (
              <>error</>
            ) : (
              blogs?.map((val) => <HomeBlogCard key={val._id} blog={val} />)
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
