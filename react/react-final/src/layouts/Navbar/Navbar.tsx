import React, { useMemo } from "react";
import LinkWithUnderline from "./LinkWithUnderline";
import { Link } from "react-router-dom";
import { useBasePath } from "@/hooks";
import {
  motion,
  useAnimate,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { throttle } from "lodash";

const links = [
  { title: "Popular", url: "/popular" },
  { title: "Coming Soon", url: "/coming-soon" },
  { title: "Now Playing", url: "/now-playing" },
];

export default function Navbar() {
  const basePath = useBasePath();
  const { scrollY } = useScroll();
  const [scope, animate] = useAnimate();

  const changeBgByScroll = useMemo(
    () =>
      throttle((lastest: number) => {
        if (lastest > 50) {
          animate(
            scope.current,
            { backgroundColor: "#040404" },
            { duration: 0.3 },
          );
        } else {
          animate(
            scope.current,
            { backgroundColor: "#00000000" },
            { duration: 0.3 },
          );
        }
      }, 100),
    [animate, scope],
  );

  useMotionValueEvent(scrollY, "change", (lastest) => {
    changeBgByScroll(lastest);
  });

  return (
    <motion.div
      ref={scope}
      className="fixed top-0 z-50 flex h-16 w-full items-center gap-5 text-nowrap px-6 py-8 text-white"
    >
      <h1 className="text-2xl font-bold drop-shadow-xl">
        <Link to="/">MOVIE</Link>
      </h1>
      <nav className="flex h-full items-center gap-3 overflow-x-visible text-lg font-semibold">
        {links.map((link, i) => {
          return (
            <React.Fragment key={link.url}>
              <LinkWithUnderline
                text={link.title}
                url={link.url}
                curBaseUrl={basePath ?? "/"}
              />
              {i < links.length - 1 ? <span>|</span> : null}
            </React.Fragment>
          );
        })}
      </nav>
    </motion.div>
  );
}
