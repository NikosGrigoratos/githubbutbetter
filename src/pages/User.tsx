import { useEffect, useState } from "react";
import { get } from "../utils/api";
import Info from "../components/Info";
import EmptyPageMessage from "../components/EmptyPageMessage";

type User = {
  avatar_url: string;
  login: string; // probably username?
  name: string;
  followers: number;
  public_repos: number;
  bio?: string;
  location?: string;
};

const User = ({ submittedSearch }: { submittedSearch: string }) => {
  const [userData, setUserData] = useState<null | User>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!submittedSearch) return;

    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const res = await get(`/${submittedSearch}`);

        setUserData(res as User);
      } catch (error) {
        setUserData(null);
        console.error(error);
      }
      setIsLoading(false);
    };

    fetchUser();
  }, [submittedSearch]);

  if (isLoading) return <EmptyPageMessage text="Loading..." />;

  if (!submittedSearch) return <EmptyPageMessage text="Search a user first" />;

  if (!userData) return <EmptyPageMessage text="No user found" />;

  const { avatar_url, name, login, followers, public_repos, location, bio } =
    userData;

  return (
    <div className="p-5">
      <div className="flex items-center mb-4">
        <img className="w-20 h-20 rounded-full" src={avatar_url} />
        <h2 className="text-xl font-semibold ml-2">{name}</h2>
      </div>

      {bio ? (
        <div className="text-slate-800 text-lg break-words font-semibold mb-3">
          {bio}
        </div>
      ) : null}

      <div className="flex flex-col gap-4 lg:flex-row lg:gap-8">
        <Info infoKey="Username" infoValue={login} />
        <Info infoKey="Followers" infoValue={followers} />
        <Info infoKey="Public Repos" infoValue={public_repos} />
        <Info infoKey="Location" infoValue={location} />
      </div>
    </div>
  );
};

export default User;
