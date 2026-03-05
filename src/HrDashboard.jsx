import { useEffect, useState } from "react";
import "./hr.css";


import { useNavigate } from "react-router-dom";

function HrDashboard() {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/employees`)
            .then(res => res.json())
            .then(data => setEmployees(data))
            .catch(err => console.log(err));
    }, []);



    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem("hrLoggedIn");

        if (!isLoggedIn) {
            navigate("/hr-login");
        }
    }, [navigate]);
    const viewEmployee = (id) => {
        setLoading(true);
        fetch(`${process.env.REACT_APP_API_BASE_URL}/employee-full/${id}`)
            .then(res => res.json())
            .then(data => {
                setSelectedEmployee(data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    };

    const handleExcelDownload = (id) => {
        window.open(
      `${process.env.REACT_APP_API_BASE_URL}/download-employee-excel/${selectedEmployee.employee.id}`,
      "_blank"
    )
    };

    return (
        <div className="hr-container">

            <h1>HR Employee Dashboard</h1>

            {/* ================= EMPLOYEE LIST ================= */}
            <div className="employee-list">
                <h2>All Employees</h2>

                {employees.length === 0 ? (
                    <p>No Employees Found</p>
                ) : (
                    employees.map(emp => (
                        <div key={emp.id} className="employee-card">
                            <div>
                                <strong>{emp.name}</strong>
                                <p>{emp.email}</p>
                            </div>

                            <div className="btn-group">
                                <button onClick={() => viewEmployee(emp.id)}>
                                    View
                                </button>

                                <a
                                    href={`${process.env.REACT_APP_API_BASE_URL}/download-employee/${emp.id}`}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <button className="download-btn">
                                        Download Docs
                                    </button>
                                </a>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {loading && <p>Loading...</p>}

            {selectedEmployee && (
                <div className="employee-details" id="print-section">
                    <img src="/chn-logo.png" alt="Company Logo" className="company-logo" />
                    <h2>Employee Onboarding Form</h2>

                    {/* ================= PERSONAL DETAILS ================= */}
                    <h3>Personal Details</h3>
                    <table>
                        <tbody>
                            <tr>
                                <th>Employee Code</th>
                                <td>{selectedEmployee.employee?.employee_code}</td>
                                <th>Status</th>
                                <td>{selectedEmployee.employee?.status}</td>
                            </tr>

                            <tr>
                                <th>Name</th>
                                <td>{selectedEmployee.employee?.name}</td>
                                <th>DOB</th>
                                <td>{selectedEmployee.employee?.dob}</td>
                            </tr>

                            <tr>
                                <th>Date of Joining</th>
                                <td>{selectedEmployee.employee?.doj}</td>
                                <th>Gender</th>
                                <td>{selectedEmployee.employee?.gender}</td>
                            </tr>

                            <tr>
                                <th>Blood Group</th>
                                <td>{selectedEmployee.employee?.blood_group}</td>
                                <th>Marital Status</th>
                                <td>{selectedEmployee.employee?.marital_status}</td>
                            </tr>

                            {selectedEmployee.employee?.marital_status === "Married" && (
                                <tr>
                                    <th>Spouse Name</th>
                                    <td colSpan="3">{selectedEmployee.employee?.spouse_name}</td>
                                </tr>
                            )}

                            <tr>
                                <th>Phone</th>
                                <td>{selectedEmployee.employee?.phone}</td>
                                <th>Email</th>
                                <td>{selectedEmployee.employee?.email}</td>
                            </tr>

                            <tr>
                                <th>PAN Number</th>
                                <td>{selectedEmployee.employee?.pan_number}</td>
                                <th>Aadhar Number</th>
                                <td>{selectedEmployee.employee?.aadhar_number}</td>
                            </tr>

                            <tr>
                                <th>Father Name</th>
                                <td>{selectedEmployee.employee?.father_name}</td>
                                <th>Mother Name</th>
                                <td>{selectedEmployee.employee?.mother_name}</td>
                            </tr>

                            <tr>
                                <th>Department</th>
                                <td>{selectedEmployee.employee?.department}</td>
                                <th>Designation</th>
                                <td>{selectedEmployee.employee?.designation}</td>
                            </tr>

                            <tr>
                                <th>Permanent Address</th>
                                <td colSpan="3">{selectedEmployee.employee?.permanent_address}</td>
                            </tr>

                            <tr>
                                <th>Present Address</th>
                                <td colSpan="3">{selectedEmployee.employee?.present_address}</td>
                            </tr>
                        </tbody>
                    </table>
                    <h3>Emergency Contact</h3>
                    <table>
                        <tbody>
                            <tr>
                                <th>Contact Name</th>
                                <td>{selectedEmployee.employee?.emergency_name}</td>
                                <th>Relationship</th>
                                <td>{selectedEmployee.employee?.emergency_relation}</td>
                            </tr>
                            <tr>
                                <th>Phone</th>
                                <td colSpan="3">{selectedEmployee.employee?.emergency_phone}</td>
                            </tr>
                        </tbody>
                    </table>


                    <h3>Experience Summary</h3>
                    <table>
                        <tbody>
                            <tr>
                                <th>Total Experience (Years)</th>
                                <td>{selectedEmployee.employee?.total_exp_years}</td>
                                <th>Total Experience (Months)</th>
                                <td>{selectedEmployee.employee?.total_exp_months}</td>
                            </tr>

                            <tr>
                                <th>Career Break</th>
                                <td>{selectedEmployee.employee?.career_break}</td>
                                <th>Duration</th>
                                <td>{selectedEmployee.employee?.career_break_duration}</td>
                            </tr>

                            {selectedEmployee.employee?.career_break === "yes" && (
                                <tr>
                                    <th>Reason</th>
                                    <td colSpan="3">
                                        {selectedEmployee.employee?.career_break_reason}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    {/* ================= EDUCATION ================= */}
                    <h3>Education Details</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Level</th>
                                <th>Degree</th>
                                <th>Institution</th>
                                <th>Year</th>
                                <th>Percentage</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>10th</td>
                                <td>-</td>
                                <td>{selectedEmployee.employee?.qualification10}</td>
                                <td>{selectedEmployee.employee?.year10}</td>
                                <td>{selectedEmployee.employee?.percent10}</td>
                            </tr>
                            <tr>
                                <td>12th</td>
                                <td>-</td>
                                <td>{selectedEmployee.employee?.qualification12}</td>
                                <td>{selectedEmployee.employee?.year12}</td>
                                <td>{selectedEmployee.employee?.percent12}</td>
                            </tr>
                            <tr>
                                <td>UG</td>
                                <td>{selectedEmployee.employee?.ug_degree}</td>
                                <td>{selectedEmployee.employee?.ug_college}</td>
                                <td>{selectedEmployee.employee?.ug_year}</td>
                                <td>{selectedEmployee.employee?.ug_percent}</td>
                            </tr>

                            {selectedEmployee.employee?.pg_degree && (
                                <tr>
                                    <td>PG</td>
                                    <td>{selectedEmployee.employee?.pg_degree}</td>
                                    <td>{selectedEmployee.employee?.pg_college}</td>
                                    <td>{selectedEmployee.employee?.pg_year}</td>
                                    <td>{selectedEmployee.employee?.pg_percent}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    {/* ================= BANK DETAILS ================= */}
                    <h3>Bank Details</h3>
                    <table>
                        <tbody>
                            <tr>
                                <th>Account Holder</th>
                                <td>{selectedEmployee.employee?.account_holder_name}</td>
                                <th>Bank</th>
                                <td>{selectedEmployee.employee?.bank_name}</td>
                            </tr>
                            <tr>
                                <th>Account No</th>
                                <td>{selectedEmployee.employee?.account_number}</td>
                                <th>IFSC</th>
                                <td>{selectedEmployee.employee?.ifsc_code}</td>
                            </tr>
                            <tr>
                                <th>Branch</th>
                                <td colSpan="3">{selectedEmployee.employee?.branch_name}</td>
                            </tr>
                        </tbody>
                    </table>

                    {/* ================= ESI/PF ================= */}
                    <h3>ESI / PF Details</h3>
                    <table>
                        <tbody>
                            <tr>
                                <th>ESI Applicable</th>
                                <td>{selectedEmployee.employee?.esi_applicable}</td>
                                <th>UAN</th>
                                <td>{selectedEmployee.employee?.uan_number}</td>
                            </tr>
                            <tr>
                                <th>PF Number</th>
                                <td>{selectedEmployee.employee?.pf_number}</td>
                                <th>ESI Number</th>
                                <td>{selectedEmployee.employee?.esi_number}</td>
                            </tr>
                        </tbody>
                    </table>

                    {/* ================= TRAININGS ================= */}
                    <h3>Professional Trainings</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Training</th>
                                <th>Institute</th>
                                <th>Duration</th>
                                <th>Year</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedEmployee.trainings?.length === 0 ? (
                                <tr><td colSpan="4">No Trainings</td></tr>
                            ) : (
                                selectedEmployee.trainings?.map((t, i) => (
                                    <tr key={i}>
                                        <td>{t.training_name}</td>
                                        <td>{t.institute}</td>
                                        <td>{t.duration}</td>
                                        <td>{t.year}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>

                    {/* ================= EMPLOYMENT ================= */}
                    <h3>Employment History</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Organization</th>
                                <th>Designation</th>
                                <th>Period</th>
                                <th>Salary</th>
                                <th>Reason</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedEmployee.employments?.length === 0 ? (
                                <tr><td colSpan="5">No Employment History</td></tr>
                            ) : (
                                selectedEmployee.employments?.map((e, i) => (
                                    <tr key={i}>
                                        <td>{e.organization}</td>
                                        <td>{e.designation}</td>
                                        <td>{e.period}</td>
                                        <td>{e.salary}</td>
                                        <td>{e.reason}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>

                    {/* ================= DEPENDENTS ================= */}
                    <h3>Dependent Details</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>DOB</th>
                                <th>Relationship</th>
                                <th>Aadhar Number</th>
                                <th>PAN Number</th>
                                <th>Documents</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedEmployee.dependents?.length === 0 ? (
                                <tr>
                                    <td colSpan="6">No Dependents</td>
                                </tr>
                            ) : (
                                selectedEmployee.dependents?.map((dep, i) => (
                                    <tr key={i}>
                                        <td>{dep.name}</td>
                                        <td>{dep.dob}</td>
                                        <td>{dep.relation}</td>
                                        <td>{dep.aadhar_number}</td>
                                        <td>{dep.pan_number}</td>
                                        <td>
                                            {dep.photo && (
                                                <a
                                                    href={`${process.env.REACT_APP_API_BASE_URL}/uploads/${dep.photo}`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    Photo
                                                </a>
                                            )}{" "}
                                            {dep.aadhar_photo && (
                                                <a
                                                    href={`${process.env.REACT_APP_API_BASE_URL}/uploads/${dep.aadhar_photo}`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    Aadhar
                                                </a>
                                            )}{" "}
                                            {dep.pan_photo && (
                                                <a
                                                    href={`${process.env.REACT_APP_API_BASE_URL}/uploads/${dep.pan_photo}`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    PAN
                                                </a>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>

                    {/* ================= DOCUMENTS ================= */}
                    <h3>Uploaded Documents</h3>
                    <table>
                        <tbody>
                            {[
                                ["Resume", selectedEmployee.employee?.resume],
                                ["SSLC Certificate", selectedEmployee.employee?.sslc],
                                ["HSC Certificate", selectedEmployee.employee?.hsc],
                                ["Aadhar (Self)", selectedEmployee.employee?.aadharSelf],
                                ["Photo", selectedEmployee.employee?.photo],
                                ["Aadhar (Father)", selectedEmployee.employee?.aadharFather],
                                ["Aadhar (Mother)", selectedEmployee.employee?.aadharMother],
                                ["PAN", selectedEmployee.employee?.panSelf],
                                ["Bank Passbook", selectedEmployee.employee?.bankPassbookPhoto],
                            ].map(([label, file], index) => (
                                <tr key={index}>
                                    <th>{label}</th>
                                    <td>
                                        {file ? (
                                            <a
                                                href={`${process.env.REACT_APP_API_BASE_URL}/uploads/${file}`}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="view-btn"
                                            >
                                                View
                                            </a>
                                        ) : (
                                            <span style={{ color: "red" }}>Not Uploaded</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="print-actions">
                        <button
                            onClick={() => handleExcelDownload(selectedEmployee.employee.id)}
                            className="print-btn">
                            Download Excel
                        </button>

                        <button
                            onClick={() => window.print()}
                            className="print-btn">
                            Print
                        </button>

                        <button
                            onClick={() => setSelectedEmployee(null)}
                            className="close-btn">
                            Close
                        </button>
                    </div>

                </div>
            )}
        </div>
    );
}

export default HrDashboard;