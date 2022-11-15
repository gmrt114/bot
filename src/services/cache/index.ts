export type CacheInstance = {
  cache: Record<string, string>;
  insert: (key: string, value: string) => void;
  get: (key: string) => string | undefined;
}

const Cache = (): CacheInstance => {
  const cache: Record<string, string> = {};

  const insert = (key: string, value: string) => {
    cache[key] = value;
  };

  const get = (key: string) => {
    return cache[key];
  };

  return {
    insert,
    get,
    cache,
  };
};

export default Cache;
