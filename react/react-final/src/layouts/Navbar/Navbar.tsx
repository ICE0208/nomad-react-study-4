import React from "react";
import LinkWithUnderline from "./LinkWithUnderline";
import { Link } from "react-router-dom";

const links = [
  { title: "Popular", url: "/popular" },
  { title: "Coming Soon", url: "/coming-soon" },
  { title: "Now Playing", url: "/now-playing" },
];

export default function Navbar() {
  return (
    <div className="fixed top-0 z-50 flex h-16 w-full items-center gap-5 text-nowrap bg-blue-400 px-3 text-white">
      <h1 className="text-3xl font-bold">
        <Link to="/">MOVIE</Link>
      </h1>
      <nav className="flex h-full items-center gap-3 overflow-x-visible text-xl font-semibold">
        {links.map((link, i) => {
          return (
            <React.Fragment key={link.url}>
              <LinkWithUnderline text={link.title} url={link.url} />
              {i < links.length - 1 ? <span>|</span> : null}
            </React.Fragment>
          );
        })}
      </nav>
    </div>
  );
}
