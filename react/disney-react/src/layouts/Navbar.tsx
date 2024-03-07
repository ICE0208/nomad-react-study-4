import { Link, useLocation, useNavigate } from "react-router-dom";

const getTitle = (pathname: string) => {
  const routePatterns = [
    { pattern: /^\/$/, title: "Home" },
    { pattern: /^\/character\/\d+\/?$/, title: "Detail" },
    // 추가 경로 패턴 정의 가능
  ];

  // 현재 경로와 매칭되는 패턴 찾기
  const matchingPattern = routePatterns.find((pattern) =>
    pattern.pattern.test(pathname)
  );
  return matchingPattern ? matchingPattern.title : "Page Not Found";
};

export default function Navbar() {
  const location = useLocation();
  const title = getTitle(location.pathname);

  const navigate = useNavigate();

  const onBackIconClick = () => {
    // history state가 있으면 뒤로 가고, 없으면 루트 페이지로 이동
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1); // 뒤로 가기
    } else {
      navigate("/", { replace: true }); // 루트 페이지로 이동
    }
  };

  return (
    <header>
      <nav className="h-16 bg-rose-400 text-white flex items-center justify-between px-4 sm:justify-center relative">
        <div className="text-3xl font-bold flex items-center">
          <Link
            to="/"
            className="mr-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-8 h-8 sm:hidden"
            >
              <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
              <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
            </svg>
          </Link>
          <span className="sm:text-4xl">{title}</span>
          {location.pathname !== "/" && (
            <div
              className="sm:block hidden absolute left-2 top-1/2 -translate-y-1/2"
              onClick={onBackIconClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3.0}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
            </div>
          )}
        </div>
        <div className="flex space-x-2 items-center sm:hidden">
          <input className="rounded-lg h-8 w-64 text-black px-4 focus:outline-none focus:ring-red-300 focus:ring-2" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-7 h-7"
          >
            <path
              fillRule="evenodd"
              d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
              clipRule="evenodd"
              stroke="currentColor"
              strokeWidth="1.3"
            />
          </svg>
        </div>
      </nav>
    </header>
  );
}
