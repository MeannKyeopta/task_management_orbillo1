const express = require('express');
const taskRoutes = require("./routes/taskRoutes.js");
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use("/tasks", taskRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));