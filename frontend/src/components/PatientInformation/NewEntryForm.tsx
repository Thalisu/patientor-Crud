import React from "react";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import { NewEntry } from "../../types";

interface Input {
  value: string;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const NewEntryForm = ({ setPatient }: { setPatient: any }) => {
  const { id } = useParams();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as unknown as Input[];
    const newDate = new Date(Date.now());
    const newEntry = {
      description: form[0].value,
      date: newDate.toISOString().split("T")[0],
      specialist: form[1].value,
      type: "HealthCheck",
      healthCheckRating: Number(form[2].value),
    };
    const patient = await patientService.createEntry(
      newEntry as NewEntry,
      id as string
    );
    setPatient(patient);
  };
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <h3>New healthCheck entry</h3>
      <label htmlFor="desc">Description</label>
      <input type="text" id="desc" />
      <label htmlFor="spec">Specialist</label>
      <input type="text" id="spec" />
      <label htmlFor="heal">Healthcheck rating</label>
      <input type="number" id="heal" min="0" max="2" />
      <div style={{ display: "flex" }}>
        <button type="reset">Cancel</button>
        <button type="submit">Add</button>
      </div>
    </form>
  );
};

export default NewEntryForm;
