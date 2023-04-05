"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UsuarioDao_1 = __importDefault(require("../dao/UsuarioDao"));
class UsuarioControlador extends UsuarioDao_1.default {
    consulta(req, res) {
        UsuarioControlador.obtenerusuario(res);
    }
    crear(req, res) {
        const elCorreo = { correoUsuario: req.body.correoUsuario };
        UsuarioControlador.crearUsuario(elCorreo, req.body, res);
    }
    eleminar(req, res) {
        UsuarioControlador.eliminarUsuario(req.params.codigo, res);
    }
    actualizar(req, res) {
        UsuarioControlador.actualizarUsuario(req.params.codigo, req.body, res);
    }
}
const usuarioControlador = new UsuarioControlador();
exports.default = usuarioControlador;
