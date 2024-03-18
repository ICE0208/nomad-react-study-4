import React from "react";
import LinkWithUnderline from "./LinkWithUnderline";

const links = [
  { title: "Popular", url: "/popular" },
  { title: "Coming Soon", url: "/coming-soon" },
  { title: "Now Playing", url: "/now-playing" },
];

export default function Navbar() {
  return (
    <div className="flex h-16 items-center gap-5 text-nowrap bg-blue-400 px-3 text-white">
      <h1 className="text-3xl font-bold">MOVIE</h1>
      <nav className="flex gap-3 text-xl font-semibold">
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
