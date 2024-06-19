import { HealthCheckEntry } from "../../../types";

const HealthCheck = ({ entry }: { entry: HealthCheckEntry }): JSX.Element => {
  const getHealth = () => {
    switch (entry.healthCheckRating) {
      case 0:
        return "💚";
      case 1:
        return "💛";
      case 2:
        return "❤️";
      default:
        break;
    }
  };

  const base = (
    <>
      {getHealth()}
      <span>Diagnose by {entry.specialist}</span>
    </>
  );

  return base;
};

export default HealthCheck;
