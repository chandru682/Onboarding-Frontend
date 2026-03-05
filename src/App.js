import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmployeeForm from "./EmployeeDetail";
import HrDashboard from "./HrDashboard";
import EmployeePrint from "./EmployeePrint";
import HrLogin from "./HrLogin";
import Signup from "./Signup";
import EmployeeLogin from "./EmployeeLogin";
import EmployeeDashboard from "./EmployeeDashboard";
import SuperUserLogin from "./SuperuserLogin";
import ManagerLogin from "./ManagerLogin";
import SuperuserDashboard from "./SuperuserDashboard";
import ManagerDashboard from "./ManagerDashboard";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EmployeeLogin />} />
        <Route path="/employee-form" element={<EmployeeForm />} />
        <Route path="/hr" element={<HrDashboard />} />
        <Route path="/employee-print/:id" element={<EmployeePrint />} />
        <Route path="/hr-login" element={<HrLogin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/employee-login" element={<EmployeeLogin />} />
        <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
        <Route path="/superuser-login" element={<SuperUserLogin />} />
        <Route path="/manager-login" element={<ManagerLogin />} />
        <Route path="/superuserdashboard" element={<SuperuserDashboard />} />
        <Route path="/managerdashboard" element={<ManagerDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
