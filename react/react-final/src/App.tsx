import { Outlet } from "react-router-dom";
import { useQueries } from "@tanstack/react-query";
import { getComingSoon, getNowPlaying, getPopular } from "./api";
import { Navbar } from "./layouts";

function App() {
  const results = useQueries({
    queries: [
      { queryKey: ["movie", "popular"], queryFn: getPopular },
      { queryKey: ["movie", "now-playing"], queryFn: getNowPlaying },
      { queryKey: ["movie", "coming-soon"], queryFn: getComingSoon },
    ],
  });

  return (
    <>
      <Navbar />
      <main className="pt-16">
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
