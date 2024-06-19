import { useEffect, useState } from "react";
import { Diagnosis, Entries } from "../../types";
import { assertNever } from "../../utils";
import diagnosesService from "../../services/diagnoses";
import HealthCheck from "./unionTypes/HealthCheck";

import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import WorkIcon from "@mui/icons-material/Work";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

const EntriesDetails = ({
  entries,
}: {
  entries: Entries | undefined;
}): JSX.Element[] | undefined => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  useEffect(() => {
    diagnosesService.getAll().then((data) => setDiagnoses(data));
  }, []);

  const style = {
    margin: "16px 0 0",
  };

  return entries?.map((e) => {
    const base = (
      <>
        <p style={style}>
          {e.date}
          {"  "}
          <em>{e.description}</em>
        </p>
        <ul>
          {e.diagnosisCodes?.map((code) => {
            const diagnosis = diagnoses.find(
              (diagnosis) => diagnosis.code === code
            );
            return (
              <li key={code}>
                {code}: {diagnosis?.name}
              </li>
            );
          })}
        </ul>
      </>
    );

    switch (e.type) {
      case "Hospital":
        return (
          <li key={e.id}>
            {base}
            <LocalHospitalIcon />
          </li>
        );
      case "OccupationalHealthcare":
        return (
          <li key={e.id}>
            {base}
            <WorkIcon /> {e.employerName}
            <br />
          </li>
        );
      case "HealthCheck":
        return (
          <li key={e.id}>
            {base}
            <MedicalServicesIcon />
            <br />
            <HealthCheck entry={e} />
          </li>
        );

      default:
        return assertNever(e);
    }
  });
};

export default EntriesDetails;
