
import { Response } from "express";
import cifrar from "bcryptjs";
import jwt from "jsonwebtoken";
import UsuarioEsquema from "../esquema/UsuarioEsquema";

class UsuarioDao {

  protected static async obtenerusuario(res: Response): Promise<any> {
    const datos = await UsuarioEsquema.find().sort({ _id: -1 });
    res.status(200).json(datos);
  }

  protected static async crearUsuario(
    correo: any,
    parametros: any,
    res: Response
  ): Promise<any> {
    const existe = await UsuarioEsquema.findOne(correo);
    if (existe) {
      res
        .status(400)
        .json({ repuesta: "El Usuario ya Existe en la base de datos" });
    } else {
      parametros.claveUsaurio = cifrar.hashSync(parametros.claveUsaurio,8);
      const objUsuario = new UsuarioEsquema(parametros);
      objUsuario.save((elError, elObjecto) => {
        if (elError) {
          res.status(400).json({ repuesta: "El Usuario no se puede crear " });
        } else {
          const miInfomacion={ 
            codUsuario: elObjecto._id,
            correo: correo,
          };
          const millavePrivada = String (process.env.CLAVE_SECRETA);
          const miToken = jwt.sign(miInfomacion,millavePrivada,{expiresIn:85400});
          res.status(200).json({
            Token:miToken
          });
        }
      });
    }
  }
  protected static async eliminarUsuario(
    codigo: any,
    res: Response
  ): Promise<any> {
    //const existe = await UsuarioEsquema.findById(codigo);
     const existe = await UsuarioEsquema.findById(codigo).exec();
    if (existe) {
      UsuarioEsquema.findByIdAndDelete(
        codigo,
        (elError: any, elObjecto: any) => {
          if (elError) {
            res
              .status(400)
              .json({ repuesta: "El Usuario no se puede ELiminar " });
          } else {
            res.status(200).json({
              repuesta: "El Usuario Eliminado correctamente",
              eliminar: elObjecto,
            });
          }
        }
      );
    } else {
      res.status(400).json({ repuesta: "El Usuario no existe" });
    }
  }
  protected static async actualizarUsuario(
    codigo: any,
    objJson: any,
    res: Response
  ): Promise<any> {
    // const existe = await UsuarioEsquema.findById(codigo);
    const existe = await UsuarioEsquema.findById(codigo).exec();
    if (existe) {
      UsuarioEsquema.findByIdAndUpdate(
        { _id: codigo },
        { $set: objJson },
        (elError: any, elObjecto: any) => {
          if (elError) {
            res
              .status(400)
              .json({ repuesta: "El Usuario no se puede Actualizar " });
          } else {
            res.status(200).json({
              repuesta: "El Usuario Actualizar correctamente",
              antes: elObjecto,
              despues:objJson
            });
          }
        }
      );
    } else {
      res.status(400).json({ repuesta: "El Usuario no existe" });
    }
  }
}

export default UsuarioDao;
