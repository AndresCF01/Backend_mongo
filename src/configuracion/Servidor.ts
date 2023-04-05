import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import express from "express";
import ConexionDB from "./ConexionDB";

// imports para ruteo
import rutaApiPerfil from "../ruta/PerfilRuta";
import rutaApiUsario from "../ruta/UsuarioRuta";
//************************* */

class Servidor {
  public app: express.Application;

  constructor() {
    dotenv.config({ path: "variables.env" });
    ConexionDB();
    this.app = express();
    // carfar Configuraciones
    this.cargarConfiguracion();
    // Activar rutas
    this.activarRutas();
  }
  public cargarConfiguracion() {
    this.app.set("PORT", process.env.PORT);
    this.app.use(cors());
    this.app.use(morgan("dev"));
    this.app.use(express.json({ limit: "100MB" }));
    this.app.use(express.urlencoded({ extended: true }));
  }
  public activarRutas() {
    // Aqui van los endpoisnts
    this.app.use("/api/perfiles", rutaApiPerfil);
    this.app.use("/api/usuario", rutaApiUsario);
  }

  public iniciaServidor() {
    this.app.listen(this.app.get("PORT"), () => {
      console.log("Servidor escuchando en ", this.app.get("PORT"));
    });
  }
}

export default Servidor;
