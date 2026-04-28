# 🏥 MediQueue - Clinic Queue Management System

##  Project Overview

MediQueue is a simple and smart clinic queue management system built using HTML, CSS, and JavaScript. It helps clinics manage patient queues efficiently by assigning priority based on patient symptoms and age.

Instead of following a first-come-first-serve approach, this system ensures that critical patients are treated first.

---

##  Key Features

* Generate token for each patient
* Automatic priority assignment based on symptoms
* Age-based priority adjustment (children & elderly)
* Receptionist dashboard to manage queue
* Real-time queue update using localStorage

---

##  Unique Selling Point (USP)

The main highlight of this project is its **priority-based token system**:

* Patients enter their symptoms (like fever, cough, chest pain)
* Each symptom is assigned a score
* Age is also considered (higher priority for children and elderly)
* Final priority is calculated automatically

 This ensures that emergency patients are always treated first.

---

##  Tech Stack Used

* HTML – Structure of the web pages
* CSS – Styling 
* JavaScript – Logic, data handling, and integration
* localStorage – To store and share data between pages

---

##  Folder Structure

```
MediQueue/
│
├── patient/
│   ├── patient.html
│   ├── patient.css
│   ├── patient.js
│
├── receptionist/
│   ├── receptionist.html
│   ├── receptionist.css
│   ├── receptionist.js
│
├── assets/
│   └── (optional common files)
│
└── README.md
```

---

##  Workflow

### 1. Patient Side

* Patient enters details (name, age, symptoms)
* System calculates score based on symptoms + age
* Priority is assigned automatically:

  * Emergency
  * Serious
  * Normal
* Token is generated and stored in localStorage

### 2. Receptionist Side

* Fetches patient data from localStorage
* Sorts patients by priority
* Displays queue in table format
* Allows receptionist to:

  * Call next patient
  * Clear queue

---

##  Priority Logic

### Symptom Scoring Example:

* Fever → 2
* Cough → 2
* Headache → 1
* Breathing Issue → 5
* Chest Pain → 5

### Age Factor:

* Age ≤ 12 → +2 points
* Age ≥ 60 → +3 points

### Final Priority:

* Score ≥ 7 → Emergency
* Score 4–6 → Serious
* Score 0–3 → Normal

---

##  Integration

* Both patient and receptionist pages are connected using **localStorage**
* Data added on patient side is instantly available on receptionist side
* Queue updates dynamically

