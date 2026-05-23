import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/config.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
const db = await connectDB();
const PORT = process.env.PORT || 8080;

app.get("/api/reporte-ventas", async (req, res) => {
  try {
    const ventasColeccion = db.collection("ventas");
    const pipeline = [
      {
        '$match': {
          'precio': {
            '$gt': 0
          }
        }
      }, {
        '$project': {
          'categoria': 1,
          'cantidad': 1,
          'recaudacionVenta': {
            '$multiply': [
              '$cantidad', '$precio'
            ]
          }
        }
      }, {
        '$group': {
          '_id': '$categoria',
          'totalRecaudado': {
            '$sum': '$recaudacionVenta'
          },
          'cantidadItems': {
            '$sum': '$cantidad'
          },
          'ventaPromedio': {
            '$avg': '$recaudacionVenta'
          }
        }
      }, {
        '$match': {
          'totalRecaudado': {
            '$gt': 315
          }
        }
      }, {
        '$sort': {
          'totalRecaudado': -1
        }
      }
    ]
    const reporte = await ventasColeccion.aggregate(pipeline).toArray();
    res
      .status(200)
      .json({ message: "se obtuvieron los datos", payload: reporte });
  } catch (error) {
    res
      .status(500)
      .json({ message: "No se pudo obtener los datos", payload: [] });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor de Datos activo en http://localhost:${PORT}`);
});
