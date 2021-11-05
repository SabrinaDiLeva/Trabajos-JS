const jsonHelper = require("./lecturaEscritura");
let archivos = require ("./lecturaEscritura");
let arrayBicis = archivos.leerJson('bicicletas')
//console.log(arrayBicis)
let carrera={
    bicicletas: arrayBicis,
    bicicletasPorTanda: 4,
    listarBicicletas: function(array){
        return array.forEach(function(bici){
            let estado=""
            if (bici.dopaje===false){
                estado= "habilitado"
            }else{
                estado= "inhabilitado"
            }
            console.log("Ciclista: "+ bici.ciclista+", Marca: "+bici.marca+", Rodado: "+bici.rodado+ ", Peso: "+bici.peso+ " kg, Largo: "+bici.largo+ " cm, Estado: "+ estado)
        })
    },
    ciclistasHabilitados: function(){
        let habilitados=this.bicicletas.filter(function(bici){
            return bici.dopaje==false
        })
        return habilitados
    },
    buscarPorId: function(id){
        let encontrado=this.bicicletas.find(bici => bici.id==id)
        return encontrado
    },
    filtrarPorPeso: function(peso_max){
        let habilitados= this.ciclistasHabilitados()
        return habilitados.filter(habilitado => habilitado.peso<=peso_max)
    },
    ordenarPorRodado: function(){
        return this.bicicletas.sort(function(a,b){
            return a.rodado-b.rodado
        })
    },
    largoPromedio: function(){
        suma=0
        for(let i=0;i<this.bicicletas.length;i++){
            suma=suma+this.bicicletas[i].largo
        }
        return "Largo promedio: "+(suma/this.bicicletas.length).toFixed()+" cm"
    },
    /*largoPromedio : () => {
        let suma= carrera.bicicletas.reduce((total, bici) => total+= bici.largo, 0);
        return "Largo promedio: "+(suma/carrera.bicicletas.length).toFixed()+" cm"
    },*/
    aumentarPeso: function(aumento,id){
        let encontrado=this.buscarPorId(id)
        if (encontrado){
            encontrado.peso=encontrado.peso+aumento 
            jsonHelper.escribirJson('bicicletas',this.bicicletas)
        }
        return encontrado
    },
    generarTanda: function(rodado_max,peso_min){
        let habilitados= this.ciclistasHabilitados()
        let primerFiltro= habilitados.filter(habilitado => habilitado.peso>=peso_min)
        let segundoFiltro= primerFiltro.filter(bici => bici.rodado<=rodado_max)
        if (segundoFiltro.length>this.bicicletasPorTanda){
            return segundoFiltro.slice(0,this.bicicletasPorTanda)
        } else{
            return segundoFiltro
        }
    },
    calcularPodio: function(tanda){
        let ordenados=tanda.sort(function(a,b){
            return b.puntaje-a.puntaje
        })
        console.log("El ganador es "+ ordenados[0].ciclista+" con un puntaje de "+ordenados[0].puntaje+", el segundo puesto es "+ ordenados[1].ciclista+ " con un puntaje de "+ordenados[1].puntaje+" y el tercer puesto es "+ordenados[2].ciclista+" con un puntaje de "+ordenados[2].puntaje)
    }
}
//carrera.listarBicicletas(arrayBicis)

let habilitados= carrera.ciclistasHabilitados()
//carrera.listarBicicletas(habilitados)

let encontrado=carrera.buscarPorId(11)
//console.log(encontrado)
if (encontrado!=undefined){
    //carrera.listarBicicletas([encontrado])
}else{
    //console.log(undefined)
}

let filtroPeso=carrera.filtrarPorPeso(8)
//carrera.listarBicicletas(filtroPeso)

let ordenRodado=carrera.ordenarPorRodado()
//carrera.listarBicicletas(ordenRodado)

console.log(carrera.largoPromedio())

let modificado= carrera.aumentarPeso(1,1)
//carrera.listarBicicletas([modificado])

let tanda=carrera.generarTanda(25,8)
//carrera.listarBicicletas(tanda)

//carrera.calcularPodio(carrera.generarTanda(25,8))