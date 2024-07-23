export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export const getHealth = (healthCheckRating: number | undefined) => {
  switch (healthCheckRating) {
    case 0:
      return "💚";
    case 1:
      return "💛";
    case 2:
      return "❤️";
    default:
      return "no rating available";
  }
};