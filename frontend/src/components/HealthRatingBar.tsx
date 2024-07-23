import { Entry } from "../types";

import { getHealth } from "../utils";

const HealthRatingBar = ({ entries }: { entries?: Entry[] }) => {
  const entry = entries?.reverse().find((e) => e.type === "HealthCheck");
  const healthCheck = getHealth(entry?.healthCheckRating);

  return (
    <div className="health-bar">
      <p>{healthCheck}</p>
    </div>
  );
};

export default HealthRatingBar;
