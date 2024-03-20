import { AnimatePresence, motion } from "framer-motion";
import { Link, useMatch } from "react-router-dom";

interface LinkWithUnderlineProps {
  text: string;
  url: string;
}

export default function LinkWithUnderline({
  text,
  url,
}: LinkWithUnderlineProps) {
  const match = useMatch(url);

  return (
    <div className="relative flex flex-col items-center overflow-visible">
      <Link to={url}>{text}</Link>
      <AnimatePresence>
        {match && (
          <motion.div
            layoutId="underline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              type: "spring",
              bounce: 0.4,
              duration: 0.6,
            }}
            className="absolute -bottom-1 w-11/12 border-b-4 border-b-[#ffffffc5]"
          ></motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
