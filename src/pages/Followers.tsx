import { useState, useEffect } from "react";
import { get } from "../utils/api";
import EmptyPageMessage from "../components/EmptyPageMessage";

type Follower = {
  id: number;
  avatar_url: string;
  login: string; // username (note: could not find name, weird)
};

const FollowerPreview = ({ follower }: { follower: Follower }) => {
  const { avatar_url, login } = follower;
  return (
    <div className="w-[100%] border-[1px] rounded-lg border-slate-500 mb-2 p-2 lg:w-[40%] flex items-center">
      <img className="w-14 h-14 rounded-full" src={avatar_url} />
      <span className="text-lg font-bold text-red-500 ml-3">{login}</span>
    </div>
  );
};

const Followers = ({ submittedSearch }: { submittedSearch: string }) => {
  const [followers, setFollowers] = useState<Follower[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!submittedSearch) return;

    const fetchFollowers = async () => {
      setIsLoading(true);
      try {
        const res = await get(`/${submittedSearch}/followers`);

        setFollowers(res as Follower[]);
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    };

    fetchFollowers();
  }, [submittedSearch]);

  if (isLoading) return <EmptyPageMessage text="Loading..." />;

  if (!submittedSearch) return <EmptyPageMessage text="Search a user first" />;

  if (!followers.length)
    return <EmptyPageMessage text="No available followers" />;

  return (
    <div className="p-5">
      {followers.map((follower) => (
        <FollowerPreview key={follower.id} follower={follower} />
      ))}
    </div>
  );
};

export default Followers;
