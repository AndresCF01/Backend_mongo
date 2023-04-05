"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UsuarioControlador_1 = __importDefault(require("../controlador/UsuarioControlador"));
class UsuarioRuta {
    constructor() {
        this.rutaApi = (0, express_1.Router)();
        this.activarRutas();
    }
    activarRutas() {
        this.rutaApi.get("/consultar", UsuarioControlador_1.default.consulta);
        this.rutaApi.post("/crear", UsuarioControlador_1.default.crear);
        this.rutaApi.delete("/eliminar/:codigo", UsuarioControlador_1.default.eleminar);
        this.rutaApi.put("/actualizar/:codigo", UsuarioControlador_1.default.actualizar);
    }
}
const usuarioRuta = new UsuarioRuta();
exports.default = usuarioRuta.rutaApi;
