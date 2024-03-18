import { motion } from "framer-motion";
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
    <div className="relative flex flex-col items-center">
      <Link to={url}>{text}</Link>
      <div className="relative flex w-full justify-center">
        {match && (
          <motion.div
            layoutId="underline"
            className="absolute w-9/12 border-b-4 border-b-[#00000089]"
          ></motion.div>
        )}
      </div>
    </div>
  );
}
