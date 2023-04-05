"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UsuarioEsquema_1 = __importDefault(require("../esquema/UsuarioEsquema"));
class UsuarioDao {
    static obtenerusuario(res) {
        return __awaiter(this, void 0, void 0, function* () {
            const datos = yield UsuarioEsquema_1.default.find().sort({ _id: -1 });
            res.status(200).json(datos);
        });
    }
    static crearUsuario(correo, parametros, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const existe = yield UsuarioEsquema_1.default.findOne(correo);
            if (existe) {
                res
                    .status(400)
                    .json({ repuesta: "El Usuario ya Existe en la base de datos" });
            }
            else {
                parametros.claveUsaurio = bcryptjs_1.default.hashSync(parametros.claveUsaurio, 8);
                const objUsuario = new UsuarioEsquema_1.default(parametros);
                objUsuario.save((elError, elObjecto) => {
                    if (elError) {
                        res.status(400).json({ repuesta: "El Usuario no se puede crear " });
                    }
                    else {
                        const miInfomacion = {
                            codUsuario: elObjecto._id,
                            correo: correo,
                        };
                        const millavePrivada = String(process.env.CLAVE_SECRETA);
                        const miToken = jsonwebtoken_1.default.sign(miInfomacion, millavePrivada, { expiresIn: 85400 });
                        res.status(200).json({
                            Token: miToken
                        });
                    }
                });
            }
        });
    }
    static eliminarUsuario(codigo, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //const existe = await UsuarioEsquema.findById(codigo);
            const existe = yield UsuarioEsquema_1.default.findById(codigo).exec();
            if (existe) {
                UsuarioEsquema_1.default.findByIdAndDelete(codigo, (elError, elObjecto) => {
                    if (elError) {
                        res
                            .status(400)
                            .json({ repuesta: "El Usuario no se puede ELiminar " });
                    }
                    else {
                        res.status(200).json({
                            repuesta: "El Usuario Eliminado correctamente",
                            eliminar: elObjecto,
                        });
                    }
                });
            }
            else {
                res.status(400).json({ repuesta: "El Usuario no existe" });
            }
        });
    }
    static actualizarUsuario(codigo, objJson, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // const existe = await UsuarioEsquema.findById(codigo);
            const existe = yield UsuarioEsquema_1.default.findById(codigo).exec();
            if (existe) {
                UsuarioEsquema_1.default.findByIdAndUpdate({ _id: codigo }, { $set: objJson }, (elError, elObjecto) => {
                    if (elError) {
                        res
                            .status(400)
                            .json({ repuesta: "El Usuario no se puede Actualizar " });
                    }
                    else {
                        res.status(200).json({
                            repuesta: "El Usuario Actualizar correctamente",
                            antes: elObjecto,
                            despues: objJson
                        });
                    }
                });
            }
            else {
                res.status(400).json({ repuesta: "El Usuario no existe" });
            }
        });
    }
}
exports.default = UsuarioDao;
