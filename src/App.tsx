import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import "./styles.css"; // Ensure this file exists

const SERVICE_ID = "service_t2fsozo";
const TEMPLATE_ID = "template_aepvo66";
const USER_ID = "nBpVQK5B0LisYKp9E";

interface EmailTemplateParams extends Record<string, unknown> {
  to_name: string;
  message: string;
}

type Application = {
  id: number;
  company: string;
  position: string;
  date: string;
  status: string;
  notes: string;
};

const defaultApp: Application = {
  id: 0,
  company: "",
  position: "",
  date: "",
  status: "Applied",
  notes: "",
};

const App: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [form, setForm] = useState<Application>(defaultApp);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("jobApps");
    if (stored) setApplications(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("jobApps", JSON.stringify(applications));
  }, [applications]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ): void => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (!form.company || !form.position || !form.date) {
      setStatusMessage("Please fill in all required fields.");
      return;
    }
    setApplications([...applications, { ...form, id: Date.now() }]);
    setForm(defaultApp);
    setStatusMessage("Application added.");
  };

  const handleDelete = (id: number): void => {
    setApplications(applications.filter((app) => app.id !== id));
    setStatusMessage("Application deleted.");
  };

  const sendSummaryEmail = (): void => {
    if (applications.length === 0) {
      setStatusMessage("No applications to include in the email.");
      return;
    }

    const summary = applications
      .map((app) => `• ${app.company} - ${app.position} (${app.status}) on ${app.date}`)
      .join("<br/>");

    const templateParams: EmailTemplateParams = {
      to_name: "Job Seeker",
      message: summary,
    };

    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, templateParams, USER_ID)
      .then(() => setStatusMessage("Summary email sent successfully!"))
      .catch(() => setStatusMessage("Failed to send email."));
  };

  return (
    <div className="container">
      <h1 className="title">Job Application Tracker</h1>

      <form onSubmit={handleSubmit} className="form">
        <input
          className="input"
          name="company"
          placeholder="Company"
          value={form.company}
          onChange={handleChange}
          required
        />
        <input
          className="input"
          name="position"
          placeholder="Position"
          value={form.position}
          onChange={handleChange}
          required
        />
        <input
          className="input"
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
        />
        <select className="input" name="status" value={form.status} onChange={handleChange}>
          <option>Applied</option>
          <option>In Review</option>
          <option>Interviewing</option>
          <option>Rejected</option>
          <option>Offer</option>
        </select>
        <textarea
          className="textarea"
          name="notes"
          placeholder="Notes or links"
          value={form.notes}
          onChange={handleChange}
        />
        <button className="button" type="submit">
          Add Application
        </button>
      </form>

      <hr className="divider" />
      <h2 className="subtitle">Applications</h2>

      {applications.length === 0 ? (
        <p>No applications yet.</p>
      ) : (
        applications.map((app) => (
          <div key={app.id} className="app-card">
            <p>
              <strong>{app.company}</strong> - {app.position} ({app.status})
            </p>
            <small>{app.date}</small>
            {app.notes && <p>{app.notes}</p>}
            <button className="delete-button" onClick={() => handleDelete(app.id)}>
              Delete
            </button>
          </div>
        ))
      )}

      <button className="summary-button" onClick={sendSummaryEmail}>
        Send Weekly Summary Email
      </button>

      <a href="/dashboard">
        <button className="dashboard-button">Go to Dashboard</button>
      </a>

      {statusMessage && <p className="status">{statusMessage}</p>}
    </div>
  );
};

export default App;
