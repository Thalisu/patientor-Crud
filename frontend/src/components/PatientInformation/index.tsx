import { useParams } from "react-router-dom";
import { Patient } from "../../types";
import patientService from "../../services/patients";
import { useEffect, useState } from "react";
import EntriesDetails from "./Entries";
const styleSsh = {
  margin: "16px 0 0",
};

const styleOcc = {
  margin: "0",
};

const PatientInformation = (): JSX.Element => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient>();
  useEffect(() => {
    patientService.getOne(id as string).then((data) => setPatient(data));
  }, [id]);
  console.log(patient);
  return (
    <>
      <h2>{patient?.name}</h2>
      <p style={styleSsh}>ssn: {patient?.ssn}</p>
      <p style={styleOcc}>occupation: {patient?.occupation}</p>
      <h3>entries</h3>
      <ol>
        {patient?.entries?.length !== 0 ? (
          <EntriesDetails entries={patient?.entries} />
        ) : (
          <p>no entries found</p>
        )}
      </ol>
    </>
  );
};

export default PatientInformation;
