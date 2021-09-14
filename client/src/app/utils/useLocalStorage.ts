const PREFIX = 'messenger-io-';

export const useLocalStorage = (key?: string, initialValue?: any) => {
  const jsonValue = localStorage.getItem(PREFIX + key);

  if (jsonValue && !initialValue) return JSON.parse(jsonValue);

  if (initialValue)
    localStorage.setItem(PREFIX + key, JSON.stringify(initialValue));

  return initialValue;
};
