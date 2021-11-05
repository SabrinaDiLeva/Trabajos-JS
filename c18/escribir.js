const fs= require('fs');

let funcionesFS = {
    escribir: (ubicacion,dato) => fs.writeFileSync(ubicacion,dato),
    leer: ubicacion => fs.readFileSync(ubicacion)
}
module.exports=funcionesFS

funcionesFS.leer('./datosdptos')