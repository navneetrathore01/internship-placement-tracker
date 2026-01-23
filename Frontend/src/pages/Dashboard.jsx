import { useEffect, useState } from "react";
import {
  getApplications,
  createApplication,
  updateApplication,
  deleteApplication,
} from "../services/applicationService";
import "../styles/dashboard.css";

export default function Dashboard() {
  const token = localStorage.getItem("token");
  const [apps, setApps] = useState([]);
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");

  const loadApps = async () => {
    const data = await getApplications(token);
    setApps(Array.isArray(data) ? data : []);
  };


  useEffect(() => {
    loadApps();
  }, []);

  const handleAdd = async () => {
    if (!company || !role) return;
    await createApplication({ company, role, status: "Applied" }, token);
    setCompany("");
    setRole("");
    loadApps();
  };

  return (
    <main className="dashboard">
      <header className="dashboard-header">
        <h1>Internship Tracker</h1>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.reload();
          }}
        >
          Logout
        </button>
      </header>

      <section className="stats">
        <div className="stat blue">
          <span>Applied</span>
          <strong>
            {apps.filter(a => a.status === "Applied").length}
          </strong>
        </div>

        <div className="stat purple">
          <span>Interview</span>
          <strong>
            {apps.filter(a => a.status === "Interview").length}
          </strong>
        </div>

        <div className="stat green">
          <span>Offer</span>
          <strong>
            {apps.filter(a => a.status === "Offer").length}
          </strong>
        </div>
      </section>


      <section className="dashboard-form">
        <input
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        <input
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        <button onClick={handleAdd}>Add</button>
      </section>

      <section className="dashboard-list">
        {apps.map((app) => (
          <div key={app._id} className="card">
            <div>
              <strong>{app.company}</strong>
              <span>{app.role}</span>
            </div>

            <div className="card-actions">
              <select
                value={app.status}
                onChange={(e) =>
                  updateApplication(app._id, e.target.value, token).then(loadApps)
                }
              >
                <option>Applied</option>
                <option>OA</option>
                <option>Interview</option>
                <option>Offer</option>
                <option>Rejected</option>
              </select>

              <button
                className="delete"
                onClick={() =>
                  deleteApplication(app._id, token).then(loadApps)
                }
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
