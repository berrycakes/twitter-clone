export const getKeyByValue = (object: Record<string, any>, value: any) => {
  return Object.keys(object).find((key) => object[key] === value);
};

export const startCase = (str?: string) => {
  if (!str) return null;
  return str.charAt(0).toUpperCase() + str.slice(1);
};
