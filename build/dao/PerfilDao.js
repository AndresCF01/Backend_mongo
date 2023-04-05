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
const PerfilEsquema_1 = __importDefault(require("../esquema/PerfilEsquema"));
class PerfilDao {
    static obtenerPerfiles(res) {
        return __awaiter(this, void 0, void 0, function* () {
            const datos = yield PerfilEsquema_1.default.find().sort({ _id: -1 });
            res.status(200).json(datos);
        });
    }
    static crearPerfile(parametros, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const existe = yield PerfilEsquema_1.default.findOne(parametros);
            if (existe) {
                res
                    .status(400)
                    .json({ repuesta: "El Perfil ya Existe en la base de datos" });
            }
            else {
                const objPerfil = new PerfilEsquema_1.default(parametros);
                objPerfil.save((elError, elObjecto) => {
                    if (elError) {
                        res.status(400).json({ repuesta: "El Perfil no se puede crear " });
                    }
                    else {
                        res.status(200).json({
                            repuesta: "El Perfil Creado correctamente",
                            codigo: elObjecto._id,
                        });
                    }
                });
            }
        });
    }
    static eliminarPerfile(codigo, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const existe = yield PerfilEsquema_1.default.findById(codigo);
            //const existe = await PerfilEsquema.findById(codigo).exec();
            if (existe) {
                PerfilEsquema_1.default.findByIdAndDelete(codigo, (elError, elObjecto) => {
                    if (elError) {
                        res
                            .status(400)
                            .json({ repuesta: "El Perfil no se puede ELiminar " });
                    }
                    else {
                        res.status(200).json({
                            repuesta: "El Perfil Eliminado correctamente",
                            eliminar: elObjecto,
                        });
                    }
                });
            }
            else {
                res.status(400).json({ repuesta: "El Perfil no existe" });
            }
        });
    }
    static actualizarPerfile(codigo, objJson, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // const existe = await PerfilEsquema.findById(codigo);
            const existe = yield PerfilEsquema_1.default.findById(codigo).exec();
            if (existe) {
                PerfilEsquema_1.default.findByIdAndUpdate({ _id: codigo }, { $set: objJson }, (elError, elObjecto) => {
                    if (elError) {
                        res
                            .status(400)
                            .json({ repuesta: "El Perfil no se puede Actualizar " });
                    }
                    else {
                        res.status(200).json({
                            repuesta: "El Perfil Actualizar correctamente",
                            antes: elObjecto,
                            despues: objJson
                        });
                    }
                });
            }
            else {
                res.status(400).json({ repuesta: "El Perfil no existe" });
            }
        });
    }
}
exports.default = PerfilDao;
