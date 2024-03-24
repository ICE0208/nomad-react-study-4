import { Outlet } from "react-router-dom";
import { useQueries } from "@tanstack/react-query";
import { getComingSoon, getNowPlaying, getPopular } from "./api";
import { Navbar } from "./layouts";
import { useRef } from "react";
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
  if (basePath !== prevBasePath.current) {
    window.scrollTo(0, 0);
    prevBasePath.current = basePath;
  }

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
    </>
  );
}

export default App;
