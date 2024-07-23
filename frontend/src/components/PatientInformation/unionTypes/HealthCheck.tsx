import { HealthCheckEntry } from "../../../types";
import { getHealth } from "../../../utils";

const HealthCheck = ({ entry }: { entry: HealthCheckEntry }): JSX.Element => {
  const base = (
    <>
      {getHealth(entry.healthCheckRating)}
      <span>Diagnose by {entry.specialist}</span>
    </>
  );

  return base;
};

export default HealthCheck;
