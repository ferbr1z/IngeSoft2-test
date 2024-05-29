/*
Should have functions that returns stuff like this
// Crear un cliente aleatorio
let cliente = {};
cliente.nombre = Math.random().toString(36).substring(7);
cliente.apellido = Math.random().toString(36).substring(7);
cliente.ruc = Math.floor(100000 + Math.random() * 900000);
cliente.telefono = "0985" + Math.random().toString().substring(2, 10);
cliente.email = Math.random().toString(36).substring(7) + "@gmail.com";
cliente.direccion = Math.random().toString(36).substring(7);

// Generar una contraseña segura
let newPassword = "Aa1@" + Math.random().toString(36).substring(7);

let servicio = {};
servicio.nombre = Math.random().toString(36).substring(7);
servicio.descripcion = Math.random().toString(36).substring(7);
servicio.costoMensual = Math.floor(Math.random() * 1000) + 1000;
servicio.costoSemanal = Math.floor(Math.random() * 1000);
servicio.entrenador = "Julio";
*/

const generateClient = () => {
    let client = {};
    client.nombre = Math.random().toString(36).substring(7);
    client.apellido = Math.random().toString(36).substring(7);
    client.ruc = Math.floor(100000 + Math.random() * 900000);
    client.telefono = "0985" + Math.random().toString().substring(2, 10);
    client.email = Math.random().toString(36).substring(7) + "@gmail.com";
    client.direccion = Math.random().toString(36).substring(7);
    return client;
}

const generatePassword = () => {
    return "Aa1@" + Math.random().toString(36).substring(7);
}

const generateService = () => {
    let service = {};
    service.nombre = Math.random().toString(36).substring(7);
    service.descripcion = Math.random().toString(36).substring(7);
    service.costoMensual = Math.floor(Math.random() * 1000) + 1000;
    service.costoSemanal = Math.floor(Math.random() * 1000);
    service.entrenador = "Julio";
    return service;
}

module.exports = {
    generateClient,
    generatePassword,
    generateService
}