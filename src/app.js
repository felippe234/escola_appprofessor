import express from "express";
import ProfessorRoutes from "./app/routes/ProfessorRoutes.js";
import cors from "cors";


const app = express();
const port = 4002;

// ✅ Middleware para permitir requisições de outros domínios
app.use(cors({
  origin: ["http://localhost:3000","http://192.168.0.27:3000","http://192.168.0.30:3000" ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(ProfessorRoutes);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

export default app;
