import React from "react";

const inputStyle = {
  width: "100%",
  padding: "0.87rem 1rem",
  margin: "0.4rem 0 1rem 0",
  borderRadius: "18px",
  border: "1px solid #bff4ff",
  fontSize: "1rem"
};

const labelStyle = {
  fontWeight: 500,
  color: "#299be9"
};

const EmployeeForm = ({onSubmit, onChange, values, editMode, loading}) => (
  <form style={{maxWidth:400,margin:"auto"}} onSubmit={onSubmit}>
    <div>
      <label style={labelStyle}>Nom complet :</label>
      <input style={inputStyle} name="name" value={values.name || ""} onChange={onChange} placeholder="Nom complet" required />
    </div>
    <div>
      <label style={labelStyle}>Email :</label>
      <input style={inputStyle} type="email" name="email" value={values.email || ""} onChange={onChange} placeholder="Email" required />
    </div>
    <div>
      <label style={labelStyle}>Département :</label>
      <input style={inputStyle} name="department" value={values.department || ""} onChange={onChange} required />
    </div>
    <div>
      <label style={labelStyle}>Poste :</label>
      <input style={inputStyle} name="position" value={values.position || ""} onChange={onChange} required />
    </div>
    <div>
      <label style={labelStyle}>Téléphone :</label>
      <input style={inputStyle} name="phone" value={values.phone || ""} onChange={onChange} />
    </div>
    <div>
      <label style={labelStyle}>Adresse :</label>
      <input style={inputStyle} name="address" value={values.address || ""} onChange={onChange} />
    </div>
    {!editMode && (
      <div>
        <label style={labelStyle}>Mot de passe :</label>
        <input style={inputStyle} type="password" name="password" value={values.password || ""} onChange={onChange} required />
      </div>
    )}
    <button type="submit"
      style={{
        width:"100%",
        background:"#8dbee1",
        color:"#1568a5",
        border:"none",
        borderRadius:"16px",
        fontWeight:"bold",
        fontSize:"1.15em",
        padding:"0.7rem",
        marginTop:"0.7rem",
        cursor:"pointer"
      }}
      disabled={loading}
    >
      {loading ? "Envoi..." : (editMode ? "Enregistrer" : "Ajouter")}
    </button>
  </form>
);

export default EmployeeForm;
