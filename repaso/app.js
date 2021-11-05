let archivos = require ("./lecturaEscritura");
let arrayAutos = archivos.leerJson('autos')

// PARA VER SI FUNCIONA EL IMPORT
//console.log(arrayAutos)

//PUNTO 1
let carrera={
    autos: arrayAutos,
    autosPorTanda: 6,
    autosHabilitados: function(){
        let autosFiltrados= this.autos.filter(function(obj){
            return obj.sancionado== false
        })
        return autosFiltrados
    },
    listarAutos: function(){
        this.autos.forEach(function(auto){
            let estado=""
            if (auto.sancionado==true){
                estado="sancionado"
            } else{
                estado="habilitado"
            }
            console.log("Piloto: "+ auto.piloto+ ", patente: "+ auto.patente+ ", velocidad: "+ auto.velocidad+ ", peso: "+ auto.peso+ ", estado: "+ estado)
        })
    },
    buscarPorPatente: function(nro){
        let encontrado=this.autos.find(auto => auto.patente==nro)
        console.log(encontrado)
    },
    filtrarPorCilindrada: function(cilindrada){
        let habilitados= this.autosHabilitados()
        return habilitados.filter(habilitado => habilitado.cilindrada<=cilindrada)
    },
    ordenarPorVelocidad: function(){
        return this.autos.sort(function(a,b){
            return a.velocidad-b.velocidad
        })
    },
    habilitarVehiculo: function(patente){
        let autosActualizados= this.autos.map(auto => {
            if (auto.patente==patente){
                auto.sancionado=false
            }
            return auto
        })
        console.log(autosActualizados)
        archivos.escribirJson('autos',autosActualizados)
    },
    generarTanda: function(cilindrada, peso){
        let primerFiltro= this.filtrarPorCilindrada(cilindrada)
        let segundoFiltro=primerFiltro.filter(filtrado => filtrado.peso<=peso)
        if(segundoFiltro.length>6){
            let tanda=[]
            for(let i=0; i<this.autosPorTanda; i++){
                tanda.push(segundoFiltro[i])
            }
            return tanda
        }else{
            return segundoFiltro
        }
    },
    pesoPromedio: function(){
        let tanda= this.generarTanda(1600,1600)
        //console.log(tanda)
        suma=0
        for(let i=0; i<tanda.length;i++){
            suma=suma+tanda[i].peso
        }
        return "Peso promedio: "+(suma/tanda.length).toFixed()+" kg"
    },
    listarPodio: function(tanda){
        let ordenados= tanda.sort(function(a,b){
            return b.puntaje-a.puntaje
        })
        let ganadores=[]
        for (let i=0; i<3; i++){
            ganadores.push(ordenados[i])
        }
        console.log(ganadores)
    }

}
//console.log(carrera.autosHabilitados())
//carrera.listarAutos()
//carrera.buscarPorPatente("CJK982")
//console.log(carrera.filtrarPorCilindrada(1600))
//console.log(carrera.ordenarPorVelocidad())
//carrera.habilitarVehiculo("JHV223")
//arrayAutos = archivos.leerJson('autos')
//console.log(arrayAutos)
//console.log(carrera.generarTanda(2500,2500))
//console.log(carrera.pesoPromedio())
carrera.listarPodio(carrera.generarTanda(2000,1600))


