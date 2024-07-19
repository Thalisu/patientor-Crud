export const isString = (string: unknown): string is string => {
  return typeof string === "string" && string !== undefined && string !== "";
};

export const isOptionalString = (text: unknown): text is string | undefined => {
  return (
    typeof text === "string" || text instanceof String || text === undefined
  );
};

export const parseString = (text: unknown): string => {
  if (!text || !isString(text)) {
    throw new Error(`Incorrect or missing text: ${text}`);
  }
  return text;
};

export const parseOptionalString = (text: unknown): string | undefined => {
  if (!isOptionalString(text)) {
    throw new Error(`Incorrect or missing text: ${text}`);
  }
  return text;
};
