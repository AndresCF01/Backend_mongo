import { Request, Response } from "express";
import PerfilDao from "../dao/PerfilDao";

class PerfilControlador extends PerfilDao {
  public consulta(req: Request, res: Response) {
    PerfilControlador.obtenerPerfiles(res);
  }

  public crear(req: Request, res: Response) {
    PerfilControlador.crearPerfile(req.body, res);
  }

  public eleminar(req: Request, res: Response) {
    PerfilControlador.eliminarPerfile(req.params.codigo, res);
  }
  public actualizar(req: Request, res: Response) {
    PerfilControlador.actualizarPerfile(req.params.codigo,req.body, res);
  }
}

const perfilControlador = new PerfilControlador();
export default perfilControlador;
