import axios from "axios";
import * as qs from "qs";

export const stringifyObj = <T>(obj: T): string =>
  qs.stringify(obj, { indices: true });

const constructUrl = (path: string): string => {
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  return `${apiUrl}${path}`; // We could probably do a check for path to start with '/' but we are very strict with our devs
};

export const get = async <T>(
  path: string,
  params: T | Record<string, never> = {}
): Promise<unknown | Error> => {
  try {
    const url = constructUrl(path);
    const response = await axios.get(url, {
      params,
      paramsSerializer: (params) => stringifyObj(params),
    });

    return response.data;
  } catch (error) {
    console.error(error);

    throw error as Error;
  }
};
