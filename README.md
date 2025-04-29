# 🌱 Smart Agriculture Dashboard – Frontend

This repository contains the frontend application for the project **"Scalable Big Data Architecture for Industrial IoT Data Integration in Agriculture"**.  
It provides real-time monitoring and historical analytics of environmental and soil sensor data for agricultural fields.

---

## 🔍 Features

- **Live Monitoring Page**:  
  Real-time display of temperature, humidity, water level, and NPK (Nitrogen, Phosphorus, Potassium) levels via WebSocket.
  
- **Analytics Page**:  
  Visualizes historical averages of environmental conditions across customizable timeframes.

- **Sign-In Page**:  
  Simulated user login to initialize frontend session handling.

- **WebSocket Integration**:  
  Instant sensor data updates without manual page refresh.

- **REST API Integration**:  
  Fetches statistical and real-time data from backend services.

---

## 🛠️ Tech Stack

- **React** (with Vite)
- **TypeScript**
- **TanStack Query** (React Query)
- **Chart.js** or **Recharts** (for data visualization)
- **WebSocket API**
- **Axios** (for REST API calls)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/ilfat-code/iot-dashboard.git
cd iot-dashboard
```

### 2. Install dependencies
```bash
yarn install
```

### 3. Environment variables
Create a **.env** file in the root directory with the following content:
```bash
VITE_API_BASE_URL=http://localhost:8080/api
```

### 4. Start development server
```bash
yarn dev
```