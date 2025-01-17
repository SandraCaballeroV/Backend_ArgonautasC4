import conectarBD from './db/db.js';
import { UserModel } from './models/usuario/usuario';
import { Enum_EstadoUsuario, Enum_Rol, Enum_TipoObjetivo } from './models/enums/enums';
import { ProjectModel } from './models/proyecto/proyecto';
import { ObjectId } from 'mongoose';
import { ObjectiveModel } from './models/objective';
// METODOLOGÍA ONE TO MANY #1
const crearProyectoConObjetivos1 = async () => {
  const usuarioInicial = await UserModel.create({
    nombre: 'Sandra',
    apellido: 'Caballero',
    correo: 'scv@cc.com',
    identificacion: '1234',
    rol: Enum_Rol.administrador,
    estado: Enum_EstadoUsuario.autorizado,
  });
  const proyectoCreado = await ProjectModel.create({
    nombre: 'Proyecto Mision TIC',
    fechaInicio: new Date('2021/12/24'),
    fechaFin: new Date('2022/12/24'),
    presupuesto: 120000,
    lider: usuarioInicial._id,
  });
  const objetivoGeneral = await ObjectiveModel.create({
    descripcion: 'este es el objetivo general',
    tipo: Enum_TipoObjetivo.general,
    proyecto: proyectoCreado._id,
  });
  const objetivoEspecifico1 = await ObjectiveModel.create({
    descripcion: 'este es el objetivo especifico 1',
    tipo: Enum_TipoObjetivo.especifico,
    proyecto: proyectoCreado._id,
  });
  const objetivoEspecifico2 = await ObjectiveModel.create({
    descripcion: 'este es el objetivo especifico 2',
    tipo: Enum_TipoObjetivo.especifico,
    proyecto: proyectoCreado._id,
  });
};
const consultaProyectoConObjetivos1 = async () => {
  const proyecto = await ProjectModel.findOne({ _id: '618d52f71098bc9a121e95d5' });
  console.log('el proyecto que encontré fue', proyecto);
  const objetivos = await ObjectiveModel.find({ project: '618d52f71098bc9a121e95d5' });
  console.log('los objetivos del proyecto son: ', objetivos);
  const proyectoConObjetivos = { ...proyecto, objetivos };
  console.log('el proyecto con objetivos es: ', proyectoConObjetivos);
};
// METODOLOGIA ONE TO MANY #2
const crearProyectoConObjetivos2 = async () => {
  const usuarioInicial = await UserModel.create({
    nombre: 'Sandra',
    apellido: 'Caballero',
    correo: 'scv@cc.com',
    identificacion: '1234',
    rol: Enum_Rol.administrador,
    estado: Enum_EstadoUsuario.autorizado,
  });
  const objetivoGeneral = await ObjectiveModel.create({
    descripcion: 'este es el objetivo general',
    tipo: Enum_TipoObjetivo.general,
  });
  const objetivoEspecifico1 = await ObjectiveModel.create({
    descripcion: 'este es el objetivo especifico 1',
    tipo: Enum_TipoObjetivo.especifico,
  });
  const objetivoEspecifico2 = await ObjectiveModel.create({
    descripcion: 'este es el objetivo especifico 2',
    tipo: Enum_TipoObjetivo.especifico,
  });
  const proyectoCreado = await ProjectModel.create({
    nombre: 'Proyecto Mision TIC',
    fechaInicio: new Date('2021/12/24'),
    fechaFin: new Date('2022/12/24'),
    presupuesto: 120000,
    lider: usuarioInicial._id,
    objetivos: [objetivoGeneral._id, objetivoEspecifico1._id, objetivoEspecifico2._id],
  });
};
const consultaProyectoConObjetivos2 = async () => {
  const proyecto = await ProjectModel.find({ id: '618d578f431abaa895d7696d' }).populate(
    'objetivos'
  );
};
// METODOLOGIA ONE TO MANY #3
const crearProyectoConObjetivos3 = async () => {
  const usuarioInicial = await UserModel.create({
    nombre: 'Sandra',
    apellido: 'Caballero',
    correo: 'sandracaballero11@gmail.com',
    identificacion: '1234',
    rol: Enum_Rol.administrador,
    estado: Enum_EstadoUsuario.autorizado,
  });
  const proyectoCreado = await ProjectModel.create({
    nombre: 'Proyecto Mision TIC',
    fechaInicio: new Date('2021/12/24'),
    fechaFin: new Date('2022/12/24'),
    presupuesto: 120000,
    lider: usuarioInicial._id,
    objetivos: [
      { descripcion: 'Este es el objetivo general', tipo: Enum_TipoObjetivo.general },
      { descripcion: 'Este es el objetivo especifico 1', tipo: Enum_TipoObjetivo.especifico },
      { descripcion: 'Este es el objetivo especifico 2', tipo: Enum_TipoObjetivo.especifico },
    ],
  });
};
const consultaProyectoConObjetivos3 = async () => {
  const proyectoCreado = await ProjectModel.find({ id: '618d5b22e4e2a99bddab693e' });
  console.log('proyecto', proyectoCreado);
};
const main = async () => {
  await conectarBD();
};
main();