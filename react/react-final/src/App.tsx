import { Outlet } from "react-router-dom";
import { useQueries } from "@tanstack/react-query";
import { getComingSoon, getNowPlaying, getPopular } from "./api";
import { Footer, Navbar } from "./layouts";
import { useEffect, useRef } from "react";
import { useBasePath } from "./hooks";

function App() {
  const results = useQueries({
    queries: [
      { queryKey: ["movie", "popular"], queryFn: getPopular },
      { queryKey: ["movie", "now-playing"], queryFn: getNowPlaying },
      { queryKey: ["movie", "coming-soon"], queryFn: getComingSoon },
    ],
  });
  const prevBasePath = useRef("");

  const basePath = useBasePath() || "/";
  if (basePath !== prevBasePath.current || prevBasePath.current === "/") {
    window.scrollTo(0, 0);
    prevBasePath.current = basePath;
  }

  useEffect(() => {
    window.onbeforeunload = function pushRefresh() {
      window.scrollTo(0, 0);
    };
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <Outlet
          context={{
            results,
          }}
        />
      </main>
      <Footer />
    </>
  );
}

export default App;
