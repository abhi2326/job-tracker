import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

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
  const [status, setStatus] = useState("");

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("jobApps");
    if (stored) setApplications(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("jobApps", JSON.stringify(applications));
  }, [applications]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (!form.company || !form.position || !form.date) {
      setStatus("Please fill in all required fields.");
      return;
    }
    setApplications([...applications, { ...form, id: Date.now() }]);
    setForm(defaultApp);
    setStatus("Application added.");
  };

  const handleDelete = (id: number): void => {
    setApplications(applications.filter(app => app.id !== id));
  };

  const sendSummaryEmail = (): void => {
    const summary = applications
      .map(app => `• ${app.company} - ${app.position} (${app.status}) on ${app.date}`)
      .join("<br/>");

    const templateParams: EmailTemplateParams = {
      to_name: "Job Seeker",
      message: summary,
    };

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, USER_ID)
      .then(() => setStatus("Summary email sent successfully!"))
      .catch(() => setStatus("Failed to send email."));
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Job Application Tracker</h1>

      <form onSubmit={handleSubmit}>
        <input name="company" placeholder="Company" value={form.company} onChange={handleChange} required />
        <input name="position" placeholder="Position" value={form.position} onChange={handleChange} required />
        <input type="date" name="date" value={form.date} onChange={handleChange} required />
        <select name="status" value={form.status} onChange={handleChange}>
          <option>Applied</option>
          <option>In Review</option>
          <option>Interviewing</option>
          <option>Rejected</option>
          <option>Offer</option>
        </select>
        <textarea name="notes" placeholder="Notes or links" value={form.notes} onChange={handleChange} />
        <button type="submit">Add Application</button>
      </form>

      <hr />
      <h2>Applications</h2>
      {applications.map(app => (
        <div key={app.id}>
          <p><b>{app.company}</b> - {app.position} ({app.status})</p>
          <small>{app.date}</small>
          <br />
          <button onClick={() => handleDelete(app.id)}>Delete</button>
          <hr />
        </div>
      ))}

      <button onClick={sendSummaryEmail}>Send Weekly Summary Email</button>

      {status && <p>{status}</p>}
    </div>
  );
};

export default App;
