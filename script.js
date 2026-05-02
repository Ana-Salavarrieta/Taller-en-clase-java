//datos//
let nombreCompleto = "";
let edad = 0;
let tipodeDocumento = "";
let numerodeDocumento = "";

let comisiones = 0;
let totalhorasExtra = 0;
let niveldeRiesgo = 0;

//formulario//
const formsdatosGenerales = document.getElementById("datosGenerales");

//constantes//
const salariominimolegalVigente = 1750905;
const subsidiodeTrasporte = 249095;
const uvT = 52.37;

const psalud = 0.04;
const pension = 0.04;
const fondoSolidaridadPorcentaje = 0.01;

//riesgos//
const riego1 = 0.522;
const riego2 = 1.044;
const riego3 = 2.436;
const riego4 = 4.350;
const riego5 = 6.960;

//evento//
formsdatosGenerales.addEventListener("submit", function (e) {
    e.preventDefault();

    //captura//
    nombreCompleto = document.getElementById("nombre").value;
    edad = parseInt(document.getElementById("edad").value);
    tipodeDocumento = document.getElementById("tipoDocumento").value;
    numerodeDocumento = document.getElementById("numeroDocumento").value;

    let salarioBasico = parseFloat(document.getElementById("salario").value);
    comisiones = parseFloat(document.getElementById("comisiones").value) || 0;
    totalhorasExtra = parseFloat(document.getElementById("horasExtra").value) || 0;
    niveldeRiesgo = parseInt(document.getElementById("riesgo").value);

    //validacion doc//
    if (edad < 7 && tipodeDocumento !== "RC") {
        alert("Debe tener RC");
        return;
    }

    if (edad >= 7 && edad < 18 && tipodeDocumento !== "TI") {
        alert("Debe tener TI");
        return;
    }

    if (edad >= 18 && !["CC", "CE", "PP"].includes(tipodeDocumento)) {
        alert("Documento inválido");
        return;
    }

    //validacion edad//
    if (edad < 18) {
        alert("Menor de edad");
        return;
    }

    if (edad >= 18 && edad < 25) {
        alert("Beneficiario");
        return;
    }

    if (edad >= 60) {
        alert("Solo pensión");
        return;
    }

    //calculos//
    let calculoIbc = (salarioBasico + comisiones + totalhorasExtra) * 0.7;

    //auxilio//
    let auxilioTransporte = 0;
    if (salarioBasico <= (salariominimolegalVigente * 2)) {
        auxilioTransporte = subsidiodeTrasporte;
    }

    //salud pension//
    let valorSalud = calculoIbc * psalud;
    let valorPension = calculoIbc * pension;

    //fondo//
    let fondoSolidaridad = 0;
    if (calculoIbc >= (salariominimolegalVigente * 4)) {
        fondoSolidaridad = calculoIbc * fondoSolidaridadPorcentaje;
    }

    //retencion//
    let ingresosNoConstitutivos = valorSalud + valorPension;
    let ingresoGravado = calculoIbc - ingresosNoConstitutivos;
    let ingresoUVT = ingresoGravado / uvT;

    function calcularRetencionUVT(ingresoUVT) {
        if (ingresoUVT <= 95) return 0;
        if (ingresoUVT <= 150) return (ingresoUVT - 95) * 0.19;
        if (ingresoUVT <= 360) return ((ingresoUVT - 150) * 0.28) + 10;
        if (ingresoUVT <= 640) return ((ingresoUVT - 360) * 0.33) + 69;
        if (ingresoUVT <= 945) return ((ingresoUVT - 640) * 0.35) + 162;
        if (ingresoUVT <= 2300) return ((ingresoUVT - 945) * 0.37) + 268;
        return ((ingresoUVT - 2300) * 0.39) + 770;
    }

    let retencion = calcularRetencionUVT(ingresoUVT);

    //arl//
    let porcentajeRiesgo = 0;

    switch (niveldeRiesgo) {
        case 1: porcentajeRiesgo = riego1; break;
        case 2: porcentajeRiesgo = riego2; break;
        case 3: porcentajeRiesgo = riego3; break;
        case 4: porcentajeRiesgo = riego4; break;
        case 5: porcentajeRiesgo = riego5; break;
        default:
            alert("Riesgo inválido");
            return;
    }

    let arl = calculoIbc * (porcentajeRiesgo / 100);

    //resultados//
    console.log("Nombre:", nombreCompleto);
    console.log("IBC:", calculoIbc);
    console.log("Auxilio:", auxilioTransporte);
    console.log("Salud:", valorSalud);
    console.log("Pensión:", valorPension);
    console.log("Fondo:", fondoSolidaridad);
    console.log("Retención:", retencion);
    console.log("ARL:", arl);
});