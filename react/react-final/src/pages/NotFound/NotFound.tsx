import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const [timer, setTimer] = useState(5);

  const navigater = useNavigate();
  const windowWidth = window.innerWidth;

  useEffect(() => {
    // ! 테스트용 코드
    // if (timer <= 0) {
    //   setTimer(5);
    //   return;
    // }

    if (timer <= 0) {
      navigater("/", { replace: true });
      return;
    }

    const id = setTimeout(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(id);
  }, [timer, setTimer, navigater]);

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center overflow-hidden">
      <motion.h3
        animate={{ scale: [4, 1], opacity: [1, 0] }}
        transition={{ duration: 1 }}
        key={timer}
        className="text-[40px]"
      >
        {timer}
      </motion.h3>
      <div className="mt-20 text-center text-[24px]">
        <p>This is an invalid page.</p>
        <p>Go to Home in {timer} seconds</p>
      </div>
      <div className="relative mt-12">
        <span
          className="cursor-pointer text-[20px] underline"
          onClick={() => {
            navigater("/", { replace: true });
          }}
        >
          Click to go to Home
        </span>
      </div>
      <div className="absolute bottom-0 left-0 flex h-60 w-full items-end overflow-hidden">
        <motion.div
          className="offset flex h-[200px] w-[200px] items-center justify-center rounded-full border-t-4 border-t-gray-300 bg-gray-600"
          animate={{
            x: windowWidth - 200,
            rotateZ: 360,
          }}
          transition={{
            rotateZ: { duration: 1, repeat: 5, ease: "linear" },
            x: { duration: 5, ease: "linear" },
          }}
        >
          <span className="text-[48px] font-bold text-gray-500">404</span>
        </motion.div>
      </div>
    </div>
  );
}
