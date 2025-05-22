---

# 📋 Job Application Tracker with Weekly Email Summaries

A lightweight, user-friendly web application to manage and track your job applications. Stay organized with key details and receive automated weekly summaries via email.

---

## 🚀 Features

* ✅ **Add, Edit, and Delete Job Applications**
  Seamlessly manage all your job applications in one place.

* 🔍 **Track Key Details**
  Store and view important information such as:

  * Company Name
  * Position Applied For
  * Application Date
  * Application Status (e.g., Applied, Interviewing, Rejected, Offer)
  * Notes or useful links

* 📊 **Filter and Organize**
  Filter applications by **status** or **company** to quickly find what you need.

* 📧 **Automated Weekly Email Summaries**
  Get a consolidated summary of your current job applications via email using **EmailJS** integration.

* 💾 **Local Storage Support**
  Application data is stored locally in your browser, ensuring persistence across sessions.

* 🌐 **Deployed via GitHub Pages**
  Easily accessible online without any backend setup.

---

## 🛠 Tech Stack

| Technology       | Description                                               |
| ---------------- | --------------------------------------------------------- |
| **React**        | Frontend framework for building interactive UI            |
| **TypeScript**   | Strongly-typed JavaScript for improved code quality       |
| **EmailJS**      | Enables client-side email functionality without a backend |
| **LocalStorage** | Stores application data locally in the browser            |
| **GitHub Pages** | Hosts and deploys the application as a static website     |

---

## 📦 Installation & Usage

### 🔧 Prerequisites

Ensure you have **Node.js** and **npm** installed.

### 📥 Clone the Repository

```bash
git clone https://github.com/your-username/job-application-tracker.git
cd job-application-tracker
```

### 📦 Install Dependencies

```bash
npm install
```

### ▶️ Start Development Server

```bash
npm start
```

The application will be available at `http://localhost:3000`.

---

## 🚀 Deployment

To build and deploy to GitHub Pages:

```bash
npm run build
npm install --save-dev gh-pages
npm run deploy
```

Ensure your `package.json` includes:

```json
"homepage": "https://your-username.github.io/job-application-tracker"
```

---

## 🧠 How It Works

* All application data is saved to **localStorage**.
* When the user clicks **"Send Weekly Summary Email"**, the data is formatted and sent using **EmailJS**.
* You need an EmailJS account with:

  * A service ID
  * A template ID (using variables like `{{to_name}}`, `{{message}}`)
  * Your public API key

Update the code with your EmailJS credentials to enable email functionality.

---

## 📬 Customize Email Summary

Email content is generated dynamically based on your current applications. You can modify the format in the `sendWeeklyEmail()` function.

---

## 👨‍💻 Contributions

Feel free to fork the project and submit pull requests. All improvements, whether for functionality, UI, or documentation, are welcome.

---

## 🛡 License

This project is open-source and available under the [MIT License](LICENSE).

---

