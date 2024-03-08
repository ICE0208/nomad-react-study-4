import { forwardRef } from "react";

interface ObserverProps {
  visible?: boolean;
}

const Observer = forwardRef<HTMLDivElement, ObserverProps>(
  ({ visible }, ref) => {
    return (
      <>
        {visible && (
          <div>
            <div className="flex h-28 w-full animate-bounce">
              <DoubleDownSvg />
            </div>
            <div ref={ref} className="h-4"></div>
          </div>
        )}
      </>
    );
  },
);

const DoubleDownSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="white"
    className="h-10 w-10"
  >
    <path
      fillRule="evenodd"
      d="M11.47 13.28a.75.75 0 0 0 1.06 0l7.5-7.5a.75.75 0 0 0-1.06-1.06L12 11.69 5.03 4.72a.75.75 0 0 0-1.06 1.06l7.5 7.5Z"
      clipRule="evenodd"
      stroke="white"
      strokeWidth={1}
    />
    <path
      fillRule="evenodd"
      d="M11.47 19.28a.75.75 0 0 0 1.06 0l7.5-7.5a.75.75 0 1 0-1.06-1.06L12 17.69l-6.97-6.97a.75.75 0 0 0-1.06 1.06l7.5 7.5Z"
      clipRule="evenodd"
      stroke="white"
      strokeWidth={1.0}
    />
  </svg>
);

export default Observer;
