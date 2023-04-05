import  PerfilEntidad  from './PerfilEntidad';

export class UsuarioEntidad {
  public nombreUsuario: string;
  public correoUsuario: string;
  public claveUsaurio: string;
  public FechaCreacionUsuario: Date;
  public estadoUsuario: number;
  public codPerfil: PerfilEntidad;

  constructor(nomp: string, esta: number,corr : string, mail:string, fecha: Date, cope:PerfilEntidad) {
    this.nombreUsuario = nomp;
    this.estadoUsuario = esta;
    this.correoUsuario = corr;
    this.claveUsaurio = mail;
    this.FechaCreacionUsuario = fecha;
    this.codPerfil = cope ;
  }
}

export default UsuarioEntidad;
