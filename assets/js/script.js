const input = document.getElementById("input_datos");
const submitButton = document.getElementById("submitButton");
const renderChart = document.getElementById("renderChart");
const monedaSelect = document.getElementById("moneda_select");
let chart;
// Función para obtener los datos de la moneda desde la API
async function getCurrencyData(moneda) {
    try {
        const response = await fetch(`https://mindicador.cl/api/${moneda}`);
        if (!response.ok) {
            throw new Error(`Error al obtener datos de la API. Estado:  ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error al obtener datos de la API: ${error.message}`);
        throw error;
    }
}

// Función para convertir la moneda y mostrar el resultado
async function convertAndDisplayCurrency() {
    const selectedCurrency = monedaSelect.value;
    if (selectedCurrency === "choice") {
        alert("Oh no! A wild error appeared. It's super effective! Please select a valid currency.");
        return;
    }
    const inputValue = parseFloat(input.value);
    if (isNaN(inputValue)) {
        alert("Uh-oh! The error used a critical hit. You must enter a valid numeric value.");
        return;
    }

    try {
        const currencyData = await getCurrencyData(selectedCurrency);
        const exchangeRate = currencyData.serie[0].valor;
        const convertedAmount = inputValue / exchangeRate;
        const currencySymbol = currencyData.codigo;
        renderChart.innerHTML = `${inputValue} CLP equivale a ${convertedAmount.toFixed(2)} ${currencySymbol}`;
    } catch (error) {
        console.error(error.message);
    }
}

// Event listener para el botón de búsqueda
submitButton.addEventListener("click", convertAndDisplayCurrency);
