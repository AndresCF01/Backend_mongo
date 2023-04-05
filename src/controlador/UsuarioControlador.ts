import { Request, Response } from "express";
import cifrar from "bcryptjs";
import jwt from "jsonwebtoken";
import UsuarioDao from "../dao/UsuarioDao";



class UsuarioControlador extends UsuarioDao {
  public consulta(req: Request, res: Response) {
    UsuarioControlador.obtenerusuario(res);
  }

  public crear(req: Request, res: Response) {
    const elCorreo = {correoUsuario:req.body.correoUsuario};
    UsuarioControlador.crearUsuario(elCorreo,req.body, res);
  }

  public eleminar(req: Request, res: Response) {
    UsuarioControlador.eliminarUsuario(req.params.codigo, res);
  }
  public actualizar(req: Request, res: Response) {
    UsuarioControlador.actualizarUsuario(req.params.codigo,req.body, res);
  }
}

const usuarioControlador = new UsuarioControlador();
export default usuarioControlador;
