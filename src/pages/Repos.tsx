import { useState, useEffect } from "react";
import { get } from "../utils/api";
import { getReposNextOrder } from "../utils/helpers";
import _orderBy from "lodash/orderBy";
import EmptyPageMessage from "../components/EmptyPageMessage";

type Repo = {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
};

const StarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
    />
  </svg>
);

const RepoPreview = ({ repo }: { repo: Repo }) => {
  const { name, description, stargazers_count } = repo;

  return (
    <div className="border-[1px] rounded-lg border-slate-500 mb-2 p-2 w-[50%]">
      <span className="text-xl text-red-500">{name}</span>
      <div className="break-words">{description}</div>
      <div className="flex items-center">
        <StarIcon />
        <span className="ml-1">{stargazers_count}</span>
      </div>
    </div>
  );
};

const Repos = ({ submittedSearch }: { submittedSearch: string }) => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<"asc" | "desc" | null>(null);

  useEffect(() => {
    if (!submittedSearch) return;

    const fetchRepos = async () => {
      setIsLoading(true);
      try {
        const res = await get(`/${submittedSearch}/repos`);

        setRepos(res as Repo[]);
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    };

    fetchRepos();
  }, [submittedSearch]);

  const handleSorting = () => {
    const newOrder = getReposNextOrder(currentOrder);

    setCurrentOrder(newOrder);
    setRepos((prevRepos) =>
      _orderBy(
        prevRepos,
        newOrder ? "stargazers_count" : "name", // The github api initially sorts them by name, so if not sorting is provided we will do the same
        newOrder ?? "asc"
      )
    );
  };

  if (isLoading) return <EmptyPageMessage text="Loading..." />;

  if (!submittedSearch) return <EmptyPageMessage text="Search a user first" />;

  if (!repos.length)
    return <EmptyPageMessage text="No available repositories" />;

  return (
    <div className="p-5">
      <button
        type="button"
        className="flex items-center mb-2 border-[1px] rounded-md border-red-500 hover:border-slate-500"
        onClick={handleSorting}
      >
        Order By {currentOrder ?? "-"} &nbsp; <StarIcon />
      </button>

      {repos.map((repo) => (
        <RepoPreview key={repo.id} repo={repo} />
      ))}
    </div>
  );
};

export default Repos;
