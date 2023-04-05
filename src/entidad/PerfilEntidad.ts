export class PerfilEntidad {
  public nombrePerfil: string;
  public estadoPerfil: number;

  constructor(nomp: string, esta: number) {
    this.nombrePerfil = nomp;
    this.estadoPerfil = esta;
  }
}

export default PerfilEntidad;
