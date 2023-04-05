import { Response } from "express";
import PerfilEsquema from "../esquema/PerfilEsquema";

class PerfilDao {
  protected static async obtenerPerfiles(res: Response): Promise<any> {
    const datos = await PerfilEsquema.find().sort({ _id: -1 });
    res.status(200).json(datos);
  }

  protected static async crearPerfile(
    parametros: any,
    res: Response
  ): Promise<any> {
    const existe = await PerfilEsquema.findOne(parametros);
    if (existe) {
      res
        .status(400)
        .json({ repuesta: "El Perfil ya Existe en la base de datos" });
    } else {
      const objPerfil = new PerfilEsquema(parametros);
      objPerfil.save((elError, elObjecto) => {
        if (elError) {
          res.status(400).json({ repuesta: "El Perfil no se puede crear " });
        } else {
          res.status(200).json({
            repuesta: "El Perfil Creado correctamente",
            codigo: elObjecto._id,
          });
        }
      });
    }
  }
  protected static async eliminarPerfile(
    codigo: any,
    res: Response
  ): Promise<any> {
    const existe = await PerfilEsquema.findById(codigo);
    //const existe = await PerfilEsquema.findById(codigo).exec();
    if (existe) {
      PerfilEsquema.findByIdAndDelete(
        codigo,
        (elError: any, elObjecto: any) => {
          if (elError) {
            res
              .status(400)
              .json({ repuesta: "El Perfil no se puede ELiminar " });
          } else {
            res.status(200).json({
              repuesta: "El Perfil Eliminado correctamente",
              eliminar: elObjecto,
            });
          }
        }
      );
    } else {
      res.status(400).json({ repuesta: "El Perfil no existe" });
    }
  }
  protected static async actualizarPerfile(
    codigo: any,
    objJson: any,
    res: Response
  ): Promise<any> {
    // const existe = await PerfilEsquema.findById(codigo);
    const existe = await PerfilEsquema.findById(codigo).exec();
    if (existe) {
      PerfilEsquema.findByIdAndUpdate(
        { _id: codigo },
        { $set: objJson },
        (elError: any, elObjecto: any) => {
          if (elError) {
            res
              .status(400)
              .json({ repuesta: "El Perfil no se puede Actualizar " });
          } else {
            res.status(200).json({
              repuesta: "El Perfil Actualizar correctamente",
              antes: elObjecto,
              despues:objJson
            });
          }
        }
      );
    } else {
      res.status(400).json({ repuesta: "El Perfil no existe" });
    }
  }
}

export default PerfilDao;
