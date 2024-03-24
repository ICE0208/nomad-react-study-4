import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

interface LinkWithUnderlineProps {
  text: string;
  url: string;
  curBaseUrl: string;
}

export default function LinkWithUnderline({
  text,
  url,
  curBaseUrl,
}: LinkWithUnderlineProps) {
  return (
    <div className="relative flex flex-col items-center overflow-visible">
      <Link to={url}>{text}</Link>
      <AnimatePresence>
        {url === curBaseUrl && (
          <motion.div
            layoutId="underline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scaleX: 0.35 }}
            transition={{
              type: "spring",
              bounce: 0.4,
              duration: 0.6,
            }}
            className="absolute -bottom-1 w-11/12 border-b-4 border-b-[#ffffffc5] drop-shadow-xl"
          ></motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
