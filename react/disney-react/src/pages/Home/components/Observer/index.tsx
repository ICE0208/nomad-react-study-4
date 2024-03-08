import { forwardRef } from "react";

interface ObserverProps {
  visible?: boolean;
}

const Observer = forwardRef<HTMLDivElement, ObserverProps>(
  ({ visible }, ref) => {
    return <>{visible && <div ref={ref} className="mt-32 h-4"></div>}</>;
  },
);

export default Observer;
