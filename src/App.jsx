import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = async () => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`
    );
    const data = await res.json();

    setPosts((prev) => [...prev, ...data]);
    setPage((prev) => prev + 1);

    // Stop when no more posts
    if (data.length === 0 || data.length < 10) {
      setHasMore(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 p-4 py-10 w-full flex flex-col justify-center items-center  sm:px-6 lg:px-20 min-w-full overflow-x-hidden">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Infinite Scroll Posts
      </h1>

      <InfiniteScroll
        dataLength={posts.length}
        next={fetchPosts}
        hasMore={hasMore}
        className="bg-gray-900 "
        loader={<h4 className="text-white text-center mt-4">Loading...</h4>}
        endMessage={
          <p className="text-center text-gray-500 mt-6">
            <b>Post has been finished.</b>
          </p>
        }
      >
        {posts.map((post, idx) => (
          <div
            key={post.id}
            className=" text-white p-4 mb-4 rounded-lg shadow-md"
          >
            <h2 className="font-semibold text-xl sm:text-2xl">
              {idx + 1}. &nbsp;{post.title}
            </h2>
            <p className="text-base sm:text-lg font-medium mt-2">{post.body}</p>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default App;
