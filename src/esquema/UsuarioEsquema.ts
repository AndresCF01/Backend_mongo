import {model, Schema,Types} from "mongoose";
import UsuarioEntidad from "./../entidad/UsuarioEntidad";

const UsuarioEsquema = new Schema<UsuarioEntidad>({
    nombreUsuario:{type:String,required:true,trim:true},
    estadoUsuario:{type: Number, enum:[1,2,3],default:1},
    correoUsuario:{type: String, required:true, unique:true},
    claveUsaurio:{type: String, required:true},
    FechaCreacionUsuario:{type: Date, default:Date.now()},
    codPerfil:{type:Types.ObjectId,ref:"Perfil",required:true}
},{versionKey:false});

export default model("Usuario", UsuarioEsquema, "Usuario");
