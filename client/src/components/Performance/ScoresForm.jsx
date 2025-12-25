import React from "react";
import DynamicListForm from "./DynamicListForm";

const ScoresForm = ({ scores, setScores }) => (
  <DynamicListForm
    items={scores}
    setItems={setScores}
    addLabel="+ Add Score"
    fields={[
      { name: "criteria", label: "Criteria", type: "text", default: "" },
      { name: "note", label: "Note (0–10)", type: "number", default: 0 },
    ]}
  />
);

export default ScoresForm;
