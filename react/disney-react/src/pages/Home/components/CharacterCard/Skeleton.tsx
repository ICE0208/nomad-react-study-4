export default function CharacterCardSkeleton() {
  return (
    <div className="flex h-[280px] w-[360px] flex-col items-center justify-start rounded-3xl bg-gradient-to-b from-violet-700 to-indigo-700 p-6 shadow-2xl ">
      {/* Image */}
      <div className="mb-4 flex min-h-[180px] w-full animate-pulse items-center justify-center rounded-lg bg-gray-100 bg-cover bg-top">
        <svg
          className="h-10 w-10 text-gray-200 opacity-50 dark:text-gray-600"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 18"
        >
          <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
        </svg>
      </div>
      {/* Text */}
      <div className="w-full">
        <div className="mb-4 h-6 w-5/12 animate-pulse rounded-full bg-gray-100"></div>
      </div>
    </div>
  );
}
