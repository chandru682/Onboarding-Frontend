import { useState , useRef} from "react";
import "./googleForm.css";
import { useNavigate } from "react-router-dom";


function EmployeeForm() {
  const navigate = useNavigate();

  const clickCount = useRef(0);
  const clickTimer = useRef(null);

  const [dependents, setDependents] = useState([
  {
    name: "",
    dob: "",
    relation: "",
    aadharNumber: "",
    panNumber: "",
    aadharPhoto: null,
    panPhoto: null,
    photo: null
  }
]);
  const [formData, setFormData] = useState({});
  const [files, setFiles] = useState({});
  const [isExperienced, setIsExperienced] = useState(false);
  const [esiApplicable, setEsiApplicable] = useState("no");
  const [careerBreak, setCareerBreak] = useState("no");
  const [trainings, setTrainings] = useState([
    { name: "", institute: "", duration: "", year: "", remarks: "" }
  ]);

  const [employmentHistory, setEmploymentHistory] = useState([
    { organization: "", designation: "", period: "", salary: "", nature: "", reason: "" }
  ]);

  const [maritalStatus, setMaritalStatus] = useState("");
  /* ================= HANDLERS ================= */

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNumberOnly = (e, maxLength, field) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= maxLength) {
      setFormData({ ...formData, [field]: value });
    }
  };

  const handleFileChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  const handleTrainingChange = (index, e) => {
    const updated = [...trainings];
    updated[index][e.target.name] = e.target.value;
    setTrainings(updated);
  };

  const handleDependentChange = (index, e) => {
  const updated = [...dependents];
  updated[index][e.target.name] = e.target.value;
  setDependents(updated);
};

const handleDependentFileChange = (index, e) => {
  const updated = [...dependents];
  updated[index][e.target.name] = e.target.files[0];
  setDependents(updated);
};

const addDependentRow = () => {
  setDependents([
    ...dependents,
    {
      name: "",
      dob: "",
      relation: "",
      aadharNumber: "",
      panNumber: "",
      aadharPhoto: null,
      panPhoto: null,
      photo: null
    }
  ]);
};

  const addTrainingRow = () => {
    setTrainings([...trainings, { name: "", institute: "", duration: "", year: "", remarks: "" }]);
  };

  const handleEmploymentChange = (index, e) => {
    const updated = [...employmentHistory];
    updated[index][e.target.name] = e.target.value;
    setEmploymentHistory(updated);
  };

  const addEmploymentRow = () => {
    setEmploymentHistory([
      ...employmentHistory,
      { organization: "", designation: "", period: "", salary: "", nature: "", reason: "" }
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.phone?.length !== 10) return alert("Phone must be 10 digits");
    if (formData.emergencyPhone?.length !== 10) return alert("Emergency phone must be 10 digits");
    if (formData.aadharNumber?.length !== 12) return alert("Aadhar must be 12 digits");

    const submitData = new FormData();

    submitData.append("trainings", JSON.stringify(trainings));
    submitData.append("employments", JSON.stringify(employmentHistory));

    Object.keys(formData).forEach(key => {
      submitData.append(key, formData[key]);
    });

    Object.keys(files).forEach(key => {
      submitData.append(key, files[key]);
    });
    submitData.append("dependents", JSON.stringify(
  dependents.map(dep => ({
    name: dep.name,
    dob: dep.dob,
    relation: dep.relation,
    aadharNumber: dep.aadharNumber,
    panNumber: dep.panNumber
  }))
));
dependents.forEach((dep, index) => {
  if (dep.aadharPhoto) {
    submitData.append(`dependent_aadhar_${index}`, dep.aadharPhoto);
  }
  if (dep.panPhoto) {
    submitData.append(`dependent_pan_${index}`, dep.panPhoto);
  }
  if (dep.photo) {
    submitData.append(`dependent_photo_${index}`, dep.photo);
  }
});

    await fetch("http://127.0.0.1:8000/employee-joining", {
      method: "POST",
      body: submitData,
    });

    alert("Employee Submitted Successfully");
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <img
        src="/chn-logo.png"
        alt="Company Logo"
        className="company-logo"
        style={{ cursor: "pointer" }}
        onClick={() => {
          clickCount.current += 1;

          if (clickCount.current === 1) {
            clickTimer.current = setTimeout(() => {
              clickCount.current = 0;
            }, 600); // time window for triple click
          }

          if (clickCount.current === 3) {
            clearTimeout(clickTimer.current);
            clickCount.current = 0;
            navigate("/");
          }
        }}
      />
      <h1 className="main-title">Employee Onboarding  Form</h1>

      {/* ================= EMPLOYEE DETAILS ================= */}

      <div className="form-section">

        <h2 className="section-title">Employee Details</h2>
        <div className="form-grid">

          <FormInput label="Full Name" name="name" onChange={handleChange} />
          <FormInput label="Date of Birth" name="dob" type="date" onChange={handleChange} />

          <div>
            <label>Gender *</label>
            <select name="gender" onChange={handleChange} required>
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          <FormInput
            label="Phone Number"
            name="phone"
            maxLength={10}
            onChange={(e) => handleNumberOnly(e, 10, "phone")}
          />

          <FormInput label="Email Address" name="email" type="email" onChange={handleChange} />
          <FormInput label="Date of Joining" name="doj" type="date" onChange={handleChange} />
          <FormInput label="Father Name" name="fatherName" onChange={handleChange} />
          <FormInput label="Mother Name" name="motherName" onChange={handleChange} />
          <FormInput label="Department" name="department" onChange={handleChange} />
          <FormInput label="Designation" name="designation" onChange={handleChange} />
          <FormInput label="Blood Group" name="bloodGroup" onChange={handleChange} />

          <div>
            <label>Marital Status *</label>
            <select
              name="maritalStatus"
              value={maritalStatus}
              onChange={(e) => {
                const value = e.target.value;
                setMaritalStatus(value);
                setFormData({
                  ...formData,
                  maritalStatus: value,
                  spouseName: value === "Married" ? "" : "No"
                });
              }}
              required
            >
              <option value="">Select Status</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Divorced">Divorced</option>
              <option value="Widowed">Widowed</option>
            </select>
          </div>

          {maritalStatus === "Married" && (
            <FormInput
              label="Spouse Name"
              name="spouseName"
              onChange={handleChange}
            />
          )}
          <FormInput label="PAN Number" name="panNumber" onChange={handleChange} />

          <FormInput
            label="Aadhar Number"
            name="aadharNumber"
            maxLength={12}
            onChange={(e) => handleNumberOnly(e, 12, "aadharNumber")}
          />

          <FormTextarea label="Permanent Address" name="permanentAddress" onChange={handleChange} />
          <FormTextarea label="Present Address" name="presentAddress" onChange={handleChange} />

        </div>
      </div>

      {/* ================= EMERGENCY CONTACT ================= */}

      <div className="form-section">
        <h2 className="section-title">Emergency Contact</h2>
        <div className="form-grid">
          <FormInput label="Contact Name" name="emergencyName" onChange={handleChange} />
          <FormInput label="Relationship" name="emergencyRelation" onChange={handleChange} />
          <FormInput
            label="Phone Number"
            name="emergencyPhone"
            maxLength={10}
            onChange={(e) => handleNumberOnly(e, 10, "emergencyPhone")}
          />
        </div>
      </div>

      {/* ================= EDUCATION ================= */}

      <div className="form-section">
        <h2 className="section-title">Education Details</h2>

        {/* 10TH */}
        <div className="edu-block">
          <h3 className="edu-heading">10th</h3>
          <div className="form-grid">
            <FormInput label="School Name" name="qualification10" onChange={handleChange} />
            <FormInput label="Year of Passing" name="year10" onChange={handleChange} />
            <FormInput label="Percentage" name="percent10" onChange={handleChange} />
          </div>
        </div>

        {/* 12TH */}
        <div className="edu-block">
          <h3 className="edu-heading">12th</h3>
          <div className="form-grid">
            <FormInput label="School Name" name="qualification12" onChange={handleChange} />
            <FormInput label="Year of Passing" name="year12" onChange={handleChange} />
            <FormInput label="Percentage" name="percent12" onChange={handleChange} />
          </div>
        </div>

        {/* UG */}
        <div className="edu-block">
          <h3 className="edu-heading">UG</h3>
          <div className="form-grid">
            <FormInput label="Degree" name="ugDegree" onChange={handleChange} />
            <FormInput label="Institution/University" name="ugCollege" onChange={handleChange} />
            <FormInput label="Year of Passing" name="ugYear" onChange={handleChange} />
            <FormInput label="Percentage" name="ugPercent" onChange={handleChange} />
          </div>
        </div>

        {/* PG OPTIONAL */}
        <div className="edu-block">
          <h3 className="edu-heading">PG (Optional)</h3>
          <div className="form-grid">
            <FormInput label="Degree" name="pgDegree" onChange={handleChange} required={false} />
            <FormInput label="Institution/University" name="pgCollege" onChange={handleChange} required={false} />
            <FormInput label="Year of passing" name="pgYear" onChange={handleChange} required={false} />
            <FormInput label="Percentage" name="pgPercent" onChange={handleChange} required={false} />
          </div>
        </div>

      </div>

      {/* ================= EXPERIENCE SUMMARY ================= */}
      <div className="form-section">
        <h2 className="section-title">Experience Summary</h2>

        <div className="form-grid">

          <FormInput
            label="Total Experience (Years)"
            name="totalExpYears"
            maxLength={2}
            onChange={(e) => handleNumberOnly(e, 2, "totalExpYears")}
            required={false}
          />

          <FormInput
            label="Total Experience (Months)"
            name="totalExpMonths"
            maxLength={2}
            onChange={(e) => handleNumberOnly(e, 2, "totalExpMonths")}
            required={false}
          />

          <div>
            <label>Career Break?</label>
            <select
              name="careerBreak"
              value={careerBreak}
              onChange={(e) => {
                setCareerBreak(e.target.value);
                handleChange(e);
              }}
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>

          {careerBreak === "yes" && (
            <>
              <FormInput
                label="Career Break Duration"
                name="careerBreakDuration"
                placeholder="Example: 6 Months"
                onChange={handleChange}
                required={false}
              />

              <FormTextarea
                label="Reason for Career Break"
                name="careerBreakReason"
                onChange={handleChange}
                required={false}
              />
            </>
          )}

        </div>
      </div>


      {/* ================= DEPENDENT DETAILS ================= */}
<div className="form-section">
  <h2 className="section-title">Dependent Details (Optional)</h2>

  {dependents.map((dep, index) => (
    <div key={index} className="dependent-block">

      <h3>Dependent {index + 1}</h3>

      <div className="form-grid">
        <FormInput
          label="Name"
          name="name"
          required={false}
          onChange={(e) => handleDependentChange(index, e)}
        />

        <FormInput
          label="Date of Birth"
          type="date"
          name="dob"
          required={false}
          onChange={(e) => handleDependentChange(index, e)}
        />

        <FormInput
          label="Relationship"
          name="relation"
          required={false}
          onChange={(e) => handleDependentChange(index, e)}
        />

        <FormInput
          label="Aadhar Number"
          name="aadharNumber"
          required={false}
          maxLength={12}
          onChange={(e) => handleDependentChange(index, e)}
        />

        <FormInput
          label="PAN Number"
          name="panNumber"
          required={false}
          onChange={(e) => handleDependentChange(index, e)}
        />

        <FormFile
          label="Aadhar Photo"
          name="aadharPhoto"
          required={false}
          onChange={(e) => handleDependentFileChange(index, e)}
        />

        <FormFile
          label="PAN Photo"
          name="panPhoto"
          required={false}
          onChange={(e) => handleDependentFileChange(index, e)}
        />

        <FormFile
          label="Dependent Photo"
          name="photo"
          required={false}
          onChange={(e) => handleDependentFileChange(index, e)}
        />

      </div>
    </div>
  ))}

  <button type="button" onClick={addDependentRow}>
    + Add Dependent
  </button>
</div>
      {/* ================= TRAINING (OPTIONAL) ================= */}

      <div className="form-section">
        <h2 className="section-title">Professional Training (Optional)</h2>

        {trainings.map((training, index) => (
          <div key={index} className="form-grid">
            <FormInput label="Training Name" name="name" onChange={(e) => handleTrainingChange(index, e)} required={false} />
            <FormInput label="Institute" name="institute" onChange={(e) => handleTrainingChange(index, e)} required={false} />
            <FormInput label="Duration" name="duration" onChange={(e) => handleTrainingChange(index, e)} required={false} />
            <FormInput label="Year" name="year" onChange={(e) => handleTrainingChange(index, e)} required={false} />
            <FormInput label="Remarks" name="remarks" onChange={(e) => handleTrainingChange(index, e)} required={false} />
          </div>
        ))}

        <button type="button" onClick={addTrainingRow}>+ Add Training</button>
      </div>

      {/* ================= EMPLOYMENT (OPTIONAL) ================= */}

      <div className="form-section">
        <h2 className="section-title">Employment Details (Optional)</h2>

        {employmentHistory.map((job, index) => (
          <div key={index} className="form-grid">
            <FormInput label="Organization" name="organization" onChange={(e) => handleEmploymentChange(index, e)} required={false} />
            <FormInput label="Designation" name="designation" onChange={(e) => handleEmploymentChange(index, e)} required={false} />
            <FormInput label="Period" name="period" onChange={(e) => handleEmploymentChange(index, e)} required={false} />
            <FormInput label="Salary" name="salary" onChange={(e) => handleEmploymentChange(index, e)} required={false} />
            <FormInput label="Nature of Job" name="nature" onChange={(e) => handleEmploymentChange(index, e)} required={false} />
            <FormInput label="Reason" name="reason" onChange={(e) => handleEmploymentChange(index, e)} required={false} />
          </div>
        ))}

        <button type="button" onClick={addEmploymentRow}>+ Add Employment</button>
      </div>

      {/* ================= BANK DETAILS ================= */}
      <div className="form-section">
        <h2 className="section-title">Bank Details</h2>

        <div className="form-grid">

          <FormInput
            label="Account Holder Name"
            name="accountHolderName"
            onChange={handleChange}
          />

          <FormInput
            label="Bank Name"
            name="bankName"
            onChange={handleChange}
          />

          <FormInput
            label="Account Number"
            name="accountNumber"
            maxLength={16}
            onChange={(e) => handleNumberOnly(e, 16, "accountNumber")}
          />

          <FormInput
            label="IFSC Code"
            name="ifscCode"
            onChange={handleChange}
          />

          <FormInput
            label="Branch Name"
            name="branchName"
            onChange={handleChange}
          />

        </div>
      </div>

      {/* ================= ESI DETAILS ================= */}
      <div className="form-section">
        <h2 className="section-title">ESI / PF Details</h2>

        <div className="form-grid">

          <div>
            <label>Is ESI Applicable?</label>
            <select
              name="esiApplicable"
              value={esiApplicable}
              onChange={(e) => {
                setEsiApplicable(e.target.value);
                handleChange(e);
              }}
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>

          {esiApplicable === "yes" && (
            <>
              <FormInput
                label="UAN Number"
                name="uanNumber"
                onChange={handleChange}
                required={false}
              />
              <FormInput
                label="PF Number"
                name="pfNumber"
                onChange={handleChange}
                required={false}
              />
              <FormInput
                label="ESI Number"
                name="esiNumber"
                onChange={handleChange}
                required={false}
              />
            </>
          )}

        </div>
      </div>

      {/* ================= DOCUMENTS ================= */}
      <div className="form-section">
        <h2 className="section-title">Documents</h2>
        <div className="form-grid">
          <FormFile label="Resume" name="resume" onChange={handleFileChange} />
          <FormFile label="SSLC Certificate" name="sslc" onChange={handleFileChange} />
          <FormFile label="HSC Certificate" name="hsc" onChange={handleFileChange} />
          <FormFile label="Aadhar" name="aadharSelf" onChange={handleFileChange} />
          <FormFile label="Photo" name="photo" onChange={handleFileChange} />
          <FormFile label="Aadhar Father" name="aadharFather" onChange={handleFileChange} />
          <FormFile label="Aadhar Mother" name="aadharMother" onChange={handleFileChange} />
          <FormFile label="PAN" name="panSelf" onChange={handleFileChange} />
          <FormFile label="Bank Passbook" name="bankPassbookPhoto" onChange={handleFileChange} />
        </div>
      </div>



      {/* ================= EXPERIENCE ================= */}
      <div className="form-section">
        <h2 className="section-title">Experience Documents (Optional)</h2>
        <div className="form-grid">
          <div>
            <label>Are you Experienced?</label>
            <select onChange={(e) => setIsExperienced(e.target.value === "yes")}>
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>

          {isExperienced && (
            <>
              <FormFile label="Offer Letter" name="offerLetter" onChange={handleFileChange} required={false} />
              <FormFile label="Experience Letter" name="experienceLetter" onChange={handleFileChange} required={false} />
              <FormFile label="Payslip" name="payslip" onChange={handleFileChange} required={false} />
            </>
          )}
        </div>
      </div>

      <div className="submit-wrapper">
        <button type="submit" className="submit-btn">
          Submit Employee Data
        </button>
      </div>

    </form>
  );
}

/* ================= REUSABLE ================= */

const FormInput = ({ label, name, type = "text", onChange, required = true, maxLength }) => (
  <div>
    <label>{label} {required && "*"}</label>
    <input type={type} name={name} onChange={onChange} required={required} maxLength={maxLength} />
  </div>
);

const FormTextarea = ({ label, name, onChange, required = true }) => (
  <div className="full-width">
    <label>{label} {required && "*"}</label>
    <textarea name={name} onChange={onChange} required={required} />
  </div>
);

const FormFile = ({ label, name, onChange, required = true }) => (
  <div>
    <label>{label} {required && "*"}</label>
    <input type="file" name={name} onChange={onChange} required={required} />
  </div>
);

export default EmployeeForm;