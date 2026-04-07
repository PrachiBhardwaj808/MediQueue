# 🏥 Mediqueue
> **Intelligent Clinical Queue Management System**

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![JS](https://img.shields.io/badge/JavaScript-ES6+-yellow)

---

## 📌 Project Overview
**Mediqueue** is a high-performance web interface designed to automate patient check-ins. It replaces manual numbering with an algorithmic approach that prioritizes medical urgency.

> **The Problem:** Standard FIFO (First-In-First-Out) queues fail in healthcare because they don't account for emergencies.
> **The Solution:** A non-preemptive priority system that re-orders the queue dynamically based on patient vitals.

---

## 🚀 Key Features

| Feature | Description |
| :--- | :--- |
| **Token Generation** | Unique ID assignment for every patient. |
| **Emergency Logic** | One-click prioritization for urgent cases. |
| **Daily Auto-Reset** | System flushes cache every 24 hours at 00:00. |
| **Live Stamping** | ISO 8601 timestamps for accurate arrival tracking. |

---

## ⚙️ Core Functionality

### => Priority Sorting Engine
The system utilizes a custom sorting algorithm. Unlike a simple list, Mediqueue evaluates the `isEmergency` flag:
1. It scans the array for `priority: true`.
2. It moves these objects to the top.
3. It maintains the original arrival order within the priority group.

### => Temporal Persistence
Using the `localStorage` API, the system maintains state even during:
* Browser refreshes
* Unexpected power loss
* Accidental tab closure

---

## 🛠️ Technical Stack

* **Frontend:** HTML5 (Semantic), CSS3 (Flexbox/Grid)
* **Logic:** JavaScript (ES6+), Local Storage API
* **Standards:** ISO 8601 (Time), JSON (Data)

---

## 📂 System Architecture

```text
/Mediqueue
│
├── /css ──────────> Medical UI Aesthetic
├── /js ───────────> Logic & Reset Engine
├── /assets ───────> Branding & Icons
└── index.html ────> Patient Kiosk
