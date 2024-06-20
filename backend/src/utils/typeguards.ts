export const isString = (string: unknown): string is string => {
  return typeof string === "string" || string instanceof String;
};
