"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioEntidad = void 0;
class UsuarioEntidad {
    constructor(nomp, esta, corr, mail, fecha, cope) {
        this.nombreUsuario = nomp;
        this.estadoUsuario = esta;
        this.correoUsuario = corr;
        this.claveUsaurio = mail;
        this.FechaCreacionUsuario = fecha;
        this.codPerfil = cope;
    }
}
exports.UsuarioEntidad = UsuarioEntidad;
exports.default = UsuarioEntidad;
