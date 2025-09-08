import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

//  DB
let users = [{ id: 1, email: "user@test.com", password: "123456" }];
let treatments = [
  { id: "t1", name: "Physiotherapy" },
  { id: "t2", name: "Chemotherapy" },
  { id: "t3", name: "Radiation Therapy" },
  { id: "t4", name: "Dental Cleaning" },
   { id: "t5", name: "Cardiology Consultation" },
  { id: "t6", name: "Dermatology Consultation" },
  { id: "t7", name: "Orthopedic Surgery" },
  { id: "t8", name: "Pediatric Vaccination" },
  { id: "t9", name: "ENT Checkup" },
  { id: "t10", name: "General Health Checkup" },

];
let userTreatments = { 1: [] };

// Login
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ message: "Invalid credentials" });
  res.json({ token: "fake-jwt-token", user });
});

// Get catalog
app.get("/catalog", (req, res) => {
  res.json(treatments);
});

// Get treatments
app.get("/treatments", (req, res) => {
  res.json(userTreatments[1] || []);
});

// Add treatment
app.post("/treatments", (req, res) => {
  const { id, name } = req.body;
  const exists = userTreatments[1].find((t) => t.id === id);
  if (exists) return res.status(400).json({ message: "Already Add this Treatment" });
  userTreatments[1].push({ id, name });
  res.json({ id, name });
});

// Delete treatment
app.delete("/treatments/:id", (req, res) => {
  userTreatments[1] = userTreatments[1].filter((t) => t.id !== req.params.id);
  res.json({ success: true });
});

app.listen(4000, () => console.log("API running at http://localhost:4000"));
