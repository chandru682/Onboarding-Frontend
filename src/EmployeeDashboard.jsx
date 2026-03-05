import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./employeeDashboard.css";

function EmployeeDashboard() {
  const navigate = useNavigate();
  const [employeeData, setEmployeeData] = useState(null);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("employeeLoggedIn");
    const employeeId = localStorage.getItem("employeeId");

    if (!isLoggedIn || !employeeId) {
      navigate("/employee-login");
      return;
    }

    fetch(`http://127.0.0.1:8000/employee-full/${employeeId}`)
      .then(res => res.json())
      .then(data => {
        setEmployeeData(data);
      })
      .catch(err => console.log(err));

  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("employeeLoggedIn");
    localStorage.removeItem("employeeId");
    navigate("/employee-login");
  };

  if (!employeeData) {
    return <h3 style={{ padding: "40px" }}>Loading...</h3>;
  }

  const employee = employeeData.employee;

  return (
   <div className="employee-dashboard-container">
  <div className="employee-details" id="print-section">
      <h2>Employee Dashboard</h2>
      <hr />

      {/* ================= PERSONAL ================= */}
      
      <h3>Personal Details</h3>
      <p><b>Name:</b> {employee?.name}</p>
      <p><b>DOB:</b> {employee?.dob}</p>
      <p><b>Gender:</b> {employee?.gender}</p>
      <p><b>Phone:</b> {employee?.phone}</p>
      <p><b>Email:</b> {employee?.email}</p>
      <p><b>Father Name:</b> {employee?.father_name}</p>
      <p><b>Mother Name:</b> {employee?.mother_name}</p>
      <p><b>Blood Group:</b> {employee?.blood_group}</p>
      <p><b>Marital Status:</b> {employee?.marital_status}</p>

      {employee?.marital_status === "Married" && (
        <p><b>Spouse Name:</b> {employee?.spouse_name}</p>
      )}

      <p><b>Permanent Address:</b> {employee?.permanent_address}</p>
      <p><b>Present Address:</b> {employee?.present_address}</p>

      <hr />

      {/* ================= EMERGENCY ================= */}
      <h3>Emergency Contact</h3>
      <p><b>Name:</b> {employee?.emergency_name}</p>
      <p><b>Relation:</b> {employee?.emergency_relation}</p>
      <p><b>Phone:</b> {employee?.emergency_phone}</p>

      <hr />

      {/* ================= EXPERIENCE ================= */}
      <h3>Experience Summary</h3>
      <p><b>Total Years:</b> {employee?.total_exp_years}</p>
      <p><b>Total Months:</b> {employee?.total_exp_months}</p>
      <p><b>Career Break:</b> {employee?.career_break}</p>

      {employee?.career_break === "yes" && (
        <>
          <p><b>Duration:</b> {employee?.career_break_duration}</p>
          <p><b>Reason:</b> {employee?.career_break_reason}</p>
        </>
      )}

      <hr />

      {/* ================= ESI / PF ================= */}
      <h3>ESI / PF Details</h3>
      <p><b>ESI Applicable:</b> {employee?.esi_applicable}</p>
      <p><b>UAN:</b> {employee?.uan_number}</p>
      <p><b>PF:</b> {employee?.pf_number}</p>
      <p><b>ESI:</b> {employee?.esi_number}</p>

      <hr />

      {/* ================= TRAININGS ================= */}
      <h3>Professional Trainings</h3>
      {employeeData.trainings?.length === 0 ? (
        <p>No Trainings</p>
      ) : (
        employeeData.trainings?.map((t, i) => (
          <div key={i}>
            <p><b>Training:</b> {t.training_name}</p>
            <p><b>Institute:</b> {t.institute}</p>
            <p><b>Duration:</b> {t.duration}</p>
            <p><b>Year:</b> {t.year}</p>
            <hr />
          </div>
        ))
      )}

      {/* ================= EMPLOYMENT ================= */}
      <h3>Employment History</h3>
      {employeeData.employments?.length === 0 ? (
        <p>No Employment History</p>
      ) : (
        employeeData.employments?.map((e, i) => (
          <div key={i}>
            <p><b>Organization:</b> {e.organization}</p>
            <p><b>Designation:</b> {e.designation}</p>
            <p><b>Period:</b> {e.period}</p>
            <p><b>Salary:</b> {e.salary}</p>
            <p><b>Reason:</b> {e.reason}</p>
            <hr />
          </div>
        ))
      )}

      {/* ================= DEPENDENTS ================= */}
      <h3>Dependents</h3>
      {employeeData.dependents?.length === 0 ? (
        <p>No Dependents</p>
      ) : (
        employeeData.dependents?.map((d, i) => (
          <div key={i}>
            <p><b>Name:</b> {d.name}</p>
            <p><b>DOB:</b> {d.dob}</p>
            <p><b>Relation:</b> {d.relation}</p>
            <p><b>Aadhar:</b> {d.aadhar_number}</p>
            <p><b>PAN:</b> {d.pan_number}</p>
            <hr />
          </div>
        ))
      )}

      {/* ================= DOCUMENTS ================= */}
      <h3>Uploaded Documents</h3>
      {[
        ["Resume", employee?.resume],
        ["SSLC Certificate", employee?.sslc],
        ["HSC Certificate", employee?.hsc],
        ["Aadhar", employee?.aadharSelf],
        ["PAN", employee?.panSelf],
        ["Photo", employee?.photo],
      ].map(([label, file], index) => (
        <div key={index}>
          <b>{label}:</b>{" "}
          {file ? (
            <a
              href={`http://127.0.0.1:8000/uploads/${file}`}
              target="_blank"
              rel="noreferrer"
            >
              View
            </a>
          ) : (
            <span style={{ color: "red" }}>Not Uploaded</span>
          )}
        </div>
      ))}

      <br />
      <button onClick={handleLogout}>Logout</button>
    </div>
    </div>
  );
}


export default EmployeeDashboard;