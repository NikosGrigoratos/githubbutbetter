import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className="sticky flex w-full flex-nowrap items-center justify-between bg-[#FBFBFB] py-2 top-0 mb-4
      text-neutral-500 shadow-lg hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 lg:flex-wrap lg:justify-start lg:py-4"
    >
      <div className="flex w-full flex-wrap items-center justify-between px-3">
        <Link
          to="/"
          className="ml-2 mr-3 font-semibold text-neutral-800 hover:text-neutral-500"
        >
          GITHUB BUT BETTER
        </Link>
        <button
          className="block border-0 bg-transparent px-2 text-neutral-500 hover:no-underline hover:shadow-none 
          focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
          type="button"
          onClick={() => setIsOpen((open) => !open)}
        >
          <span className="[&>svg]:w-7">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-7 w-7"
            >
              <path
                fill-rule="evenodd"
                d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
              />
            </svg>
          </span>
        </button>

        <div
          className={`${
            !isOpen ? "hidden" : ""
          } mt-2 flex-grow basis-[100%] items-center lg:mt-0 lg:!flex lg:basis-auto`}
        >
          <div className="mr-auto flex flex-col pl-0 lg:flex-row lg:items-center lg:gap-3">
            <div className="my-4 pl-2 lg:my-0 lg:pl-2 lg:pr-1">
              <Link to="/" className="text-neutral-500 hover:text-neutral-700">
                User
              </Link>
            </div>
            <div className="mb-4 pl-2 lg:mb-0 lg:pl-0 lg:pr-1">
              <Link
                to="/repos"
                className="text-neutral-500 hover:text-neutral-700"
              >
                Repositories
              </Link>
            </div>
            <div className="mb-4 pl-2 lg:mb-0 lg:pl-0 lg:pr-1">
              <Link
                to="/followers"
                className="text-neutral-500 hover:text-neutral-700"
              >
                Followers
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
