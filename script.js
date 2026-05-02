//Datos de usuario//
//punto1//

let nombreCompleto = "";
let edad = "";
let tipodeDocumento = "";
let nùmerodeDocumento = ""; 

//punto3//

let salario = "";
let comisiones = "";
let totalhorasExtra = "";
let niveldeRiesgo= "";


//formulario//
const formsdatosGenerales= document.getElementById("datosGenerales");

//constantes//

const salariominimolegalVigente = 1750905 ;
const salariominimointegralVigente = 22761765;
const subsidiodeTrasporte = 249095;
const uvT = 52.37;
const psalud = 0.04;
const pension = 0.04;
const fondodesolidaridadPensonal=0.01;

//riesgos//

const riego1= 0.522;
const riego2= 1.044;
const riego3= 2.436;
const riego4= 4.350;
const riego5= 6.960;

formsdatosGenerales.addEventListener("submit", function (e) {
    e.preventDefault();
    
    //Capturar datos//
    nombreCompleto = document.getElementById("nombre").value;
    edad = parseInt(document.getElementById("edad").value);
    tipodeDocumento = document.getElementById("tipoDocumento").value;
    numerodeDocumento = document.getElementById("numeroDocumento").value;

    let salarioBasico = parseFloat(document.getElementById("salario").value);
    comisiones = parseFloat(document.getElementById("comisiones").value) || 0;
    totalhorasExtra = parseFloat(document.getElementById("horasExtra").value) || 0;
    niveldeRiesgo = parseInt(document.getElementById("riesgo").value);

    //tipo de documento//

    if (edad < 7 && tipodeDocumento !== "RC") {
        alert("Para esta edad debe tener Registro Civil (RC)");
        return;
    }

    if (edad >= 7 && edad < 18 && tipodeDocumento !== "TI") {
        alert("Para esta edad debe tener Tarjeta de Identidad (TI)");
        return;
    }

    if (edad >= 18 && tipodeDocumento !== "CC" && tipodeDocumento !== "CE" && tipodeDocumento !== "PP") {
        alert("Debe tener documento válido (CC, CE o PP)");
        return;
    }


    //if y else//

    if (edad < 18)  {
        alert("Eres menor de edad. No puedes continuar.");
        return;
    }

    if (edad >= 18 && edad < 25 ){
        alert("Eres beneficiario por cotizante. No puedes continuar.");
        return;
    }

    if (edad >= 60){
        alert("Solo debes ingresar valor de la pension.");
        return;
    }

    if (edad >= 25 && edad < 60 ){
        //se calculan obligaciones//
    }
    // calculer retencion de fuente //

    function calcularRetencionUVT(ingresoUVT) {
    let retencionUVT = 0;

    if (ingresoUVT <= 95) {
        retencionUVT = 0;
    } else if (ingresoUVT <= 150) {
        retencionUVT = (ingresoUVT - 95) * 0.19;
    } else if (ingresoUVT <= 360) {
        retencionUVT = ((ingresoUVT - 150) * 0.28) + 10;
    } else if (ingresoUVT <= 640) {
        retencionUVT = ((ingresoUVT - 360) * 0.33) + 69;
    } else if (ingresoUVT <= 945) {
        retencionUVT = ((ingresoUVT - 640) * 0.35) + 162;
    } else if (ingresoUVT <= 2300) {
        retencionUVT = ((ingresoUVT - 945) * 0.37) + 268;
    } else {
        retencionUVT = ((ingresoUVT - 2300) * 0.39) + 770;
    }

    return retencionUVT;
}

//punto4//

    let calculoIbc = (salarioBasico + comisiones + totalhorasExtra) * 0.7;

    let auxilioTransporte = 0;
    if (salarioBasico <= (salariominimolegalVigente * 2)) {
        auxilioTransporte = subsidiodeTrasporte;
    }

    let valorPension = calculoIbc * pension;
    let valorSalud = calculoIbc * psalud;

    let fondoSolidaridad = 0;
     if (calculoIbc >= (salariominimolegalVigente * 4)) {
        valorPension += fondoSolidaridad;
    }
    let ingresosNoConstitutivos = valorSalud + valorPension;
    let ingresoGravado = calculoIbc - ingresosNoConstitutivos;
    let ingresoUVT = ingresoGravado / uvT;

    let retencionUVT = 0;

    //ARL//

    let porcentajeRiesgo = 0;

    switch (niveldeRiesgo) {
        case 1: porcentajeRiesgo = riego1; break;
        case 2: porcentajeRiesgo = riego2; break;
        case 3: porcentajeRiesgo = riego3; break;
        case 4: porcentajeRiesgo = riego4; break;
        case 5: porcentajeRiesgo = riego5; break;
         default:
            alert("Nivel de riesgo inválido");
            return;
    }

    let arl = calculoIbc * (porcentajeRiesgo / 100);

     //RESULTADOS//

    console.log({
        nombreCompleto,
        edad,
        tipodeDocumento,
        numerodeDocumento,
        calculoIbc,
        auxilioTransporte,
        valorSalud,
        valorPension,
        fondoSolidaridad,
        arl
    });

});