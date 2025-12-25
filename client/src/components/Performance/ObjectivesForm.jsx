import React from "react";
import DynamicListForm from "./DynamicListForm";

const ObjectivesForm = ({ objectives, setObjectives }) => (
  <DynamicListForm
    items={objectives}
    setItems={setObjectives}
    addLabel="+ Add Objective"
    fields={[
      { name: "title", label: "Title", type: "text", default: "" },
      { name: "description", label: "Description", type: "textarea", default: "" },
      { name: "status", label: "Status", type: "select", options: ["En cours", "Atteint", "Non atteint"], default: "En cours" },
    ]}
  />
);

export default ObjectivesForm;
