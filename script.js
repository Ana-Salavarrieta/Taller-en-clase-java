// Datos usuario//
let nombreCompleto = "";
let edad = 0;
let tipodeDocumento = "";
let numerodeDocumento = "";

let comisiones = 0;
let totalhorasExtra = 0;
let niveldeRiesgo = 0;

// Formulario//
const formsdatosGenerales = document.getElementById("datosGenerales");

// Constantes//
const salariominimolegalVigente = 1750905;
const subsidiodeTrasporte = 249095;
const uvT = 52.37;

const psalud = 0.04;
const pension = 0.04;
const fondoSolidaridadPorcentaje = 0.01;

// riesgo//
const riego1 = 0.522;
const riego2 = 1.044;
const riego3 = 2.436;
const riego4 = 4.350;
const riego5 = 6.960;

// evento//
formsdatosGenerales.addEventListener("submit", function (e) {
    e.preventDefault();

    // capture infromacion//
    nombreCompleto = document.getElementById("nombre").value;
    edad = parseInt(document.getElementById("edad").value);
    tipodeDocumento = document.getElementById("tipoDocumento").value;
    numerodeDocumento = document.getElementById("numeroDocumento").value;

    let salarioBasico = parseFloat(document.getElementById("salario").value) || 0;
    comisiones = parseFloat(document.getElementById("comisiones").value) || 0;
    totalhorasExtra = parseFloat(document.getElementById("horasExtra").value) || 0;
    niveldeRiesgo = parseInt(document.getElementById("riesgo").value);

    // Validaciones//
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

    // Calculos//
    let calculoIbc = (salarioBasico + comisiones + totalhorasExtra) * 0.7;

    let auxilioTransporte = 0;
    if (salarioBasico <= (salariominimolegalVigente * 2)) {
        auxilioTransporte = subsidiodeTrasporte;
    }

    let valorSalud = calculoIbc * psalud;
    let valorPension = calculoIbc * pension;

    let fondoSolidaridad = 0;
    if (calculoIbc >= (salariominimolegalVigente * 4)) {
        fondoSolidaridad = calculoIbc * fondoSolidaridadPorcentaje;
    }

    // Retencion//
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

    // Arl//
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

    // Total//
    let ingresos = salarioBasico + auxilioTransporte + comisiones + totalhorasExtra;

    let deducciones = valorSalud + valorPension + fondoSolidaridad + arl + retencion;

    let totalFinal = ingresos - deducciones;

    // Resltados//
    console.log("Nombre:", nombreCompleto);
    console.log("IBC:", calculoIbc);
    console.log("Ingresos:", ingresos);
    console.log("Deducciones:", deducciones);
    console.log("Total Final:", totalFinal);
    console.log("Auxilio:", auxilioTransporte);
    console.log("Salud:", valorSalud);
    console.log("Pensión:", valorPension);
    console.log("Fondo:", fondoSolidaridad);
    console.log("Retención:", retencion);
    console.log("ARL:", arl);
});