import { Router } from "express";
import usuarioControlador from "../controlador/UsuarioControlador";

class UsuarioRuta {
  public rutaApi: Router;

  constructor() {
    this.rutaApi = Router();
    this.activarRutas();
  }

  public activarRutas() {
    this.rutaApi.get("/consultar", usuarioControlador.consulta);
    this.rutaApi.post("/crear", usuarioControlador.crear);
    this.rutaApi.delete("/eliminar/:codigo", usuarioControlador.eleminar);
    this.rutaApi.put("/actualizar/:codigo", usuarioControlador.actualizar);
  }
}
const usuarioRuta = new UsuarioRuta();

export default usuarioRuta.rutaApi;
