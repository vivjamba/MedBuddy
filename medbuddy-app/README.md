# **MedBuddy**

MedBuddy is a SMART on FHIR–enabled medication-tracking web application designed to help patients review their prescribed medications, log adherence, and interact with FHIR resources in a secure, standards-based environment.

Developed by **Pulkit Saxena** and **Vivien Jamba** for Georgia Tech CS 6440.

Live Deployment: **[https://medbuddy-mu.vercel.app/](https://medbuddy-mu.vercel.app/)**


# **Overview**

Medication management is often difficult, especially for patients taking multiple prescriptions. Existing apps often lack integration with clinical systems.

**MedBuddy** uses SMART on FHIR to securely retrieve real medication data (MedicationRequest) and log adherence. The app demonstrates interoperability concepts using only client-side technologies.

---

# **Features**

* SMART on FHIR OAuth2 login
* Retrieve and display active medications
* Display dosage, frequency, and prescriber details
* Client-side only — no custom backend required
* Built with Next.js App Router
* Deployed via Vercel

---

# **Project Background**

### Problem

Patients struggle with managing medications and often rely on standalone apps that do not reflect real medical data.

### Goal

Build a lightweight, interoperable medication-tracking application using FHIR standards and SMART on FHIR authentication.

### Functionality Implemented

* OAuth2 login via SMART on FHIR
* Fetching medication data (`MedicationRequest`)
* UI adherance tracking
* Simple, intuitive UI for patients

---

# **Architecture & Technical Design**

### Technology Stack

* **Frontend:** Next.js (React)
* **Interoperability:** SMART on FHIR JavaScript client
* **Authentication:** OAuth2 (SMART)
* **Hosting:** Vercel
* **UI Design:** Figma
* **Version Control:** GitHub

### Data Flow

1. User authenticates via SMART on FHIR.
2. App receives access token and patient context.
3. App retrieves `MedicationRequest` data.
4. Patient logs adherence
5. UI updates to show adherence records.

---

# **Project Artifacts (Deliverable #1)**

This repository includes all required artifacts:

### 1. Source Code

Full Next.js project including components, utilities, and pages.

### 2. Sample / Test Data

All sample data is retrieved directly from the **SMART on FHIR sample server**.
No custom datasets are used.

### 3. Technical & User Documentation

* This README
* Setup & configuration notes
* Deployment instructions
* Sprint #2 documents (in `/docs`)

### 4. Diagrams & Mockups

Located in `/docs/diagrams`:

* UI screen mockups
* Architecture diagrams

---

# **Installation & Development Setup**

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Visit the local site:
[http://localhost:3000](http://localhost:3000)

### **Important: Local development requires a SMART on FHIR sample server instance.**

To run MedBuddy locally, you must:

1. Create a SMART sandbox instance at:
   [https://launch.smarthealthit.org](https://launch.smarthealthit.org)
2. Select an R4 FHIR server configuration
3. Register a client with your redirect URI (e.g. `http://localhost:3000`)
4. Use the generated `client_id` and `FHIR_ISS` values in your `next.config.js`

Without a configured SMART sandbox instance, authentication will not work locally.

---

# **SMART on FHIR Configuration**

MedBuddy uses the official **SMART on FHIR JS Client** for OAuth2 and data access.

### Required env variables

In `next.config.js` replace with the appropriate SMART on FHIR values:

```
FHIR_REDIRECT_URI: "http://localhost:3000/callback",
FHIR_CLIENT_ID: "<your_client_id>",
FHIR_ISSUER: "<your_fhir_issuer_url>",
```

### FHIR Version

* R4 (default SMART sample server)

---

# **Data Sources**

### SMART on FHIR Sandbox Server

Used for:

* Authentication
* Retrieving `MedicationRequest` resources

No other servers or datasets are used.

---

# **Mockups & Diagrams**

Available in `/docs/diagrams`:

* System architecture
* Medication list mockup
* Login/authentication mockups
* Adherence logging workflow

---

# **Deployment**

MedBuddy is deployed using **Vercel**, which provides first-class support for Next.js.

Live site:
**[https://medbuddy-mu.vercel.app/](https://medbuddy-mu.vercel.app/)**

For deployment instructions:
[https://nextjs.org/docs/app/building-your-application/deploying](https://nextjs.org/docs/app/building-your-application/deploying)

---

# **Sprint Task Chart**
| Task                                                                    | Sprint / Week | Start  | End    | Needs / Risks                              |
| ----------------------------------------------------------------------- | ------------- | ------ | ------ | ------------------------------------------ |
| 1. Set up repository and finalize functionality                         | Sprint 2      | Week 1 | Week 3 | Discuss Requirements                       |
| 2. Implement SMART on FHIR authentication                               | Sprint 3      | Week 3 | Week 4 | OAuth2 configuration and redirect handling |
| 3. Build initial medication list component and page (MedicationRequest) | Sprint 3      | Week 4 | Week 5 | Parsing and rendering FHIR fields          |
| 4. Set up hosting pipeline                                              | Sprint 4      | Week 4 | Week 4 | Vercel or GH Pages, permissions            |
| 5. Integrate data with medication list page (planned)                   | Sprint 4      | Week 5 | Week 6 | Connect SMART data to UI state             |
| 6. Adherence logging                         | Sprint 4      | Week 5 | Week 6 |                |
| 7. Final testing, documentation, and presentation prep                  | Sprint 5      | Week 8 | Week 9 | Time management and bug resolution         |


---

# **Additional Resources**

* Next.js: [https://nextjs.org/docs](https://nextjs.org/docs)
* SMART on FHIR: [https://smarthealthit.org](https://smarthealthit.org)
* SMART Client JS: [https://github.com/smart-on-fhir/client-js](https://github.com/smart-on-fhir/client-js)
* FHIR R4 Spec: [https://www.hl7.org/fhir/](https://www.hl7.org/fhir/)
