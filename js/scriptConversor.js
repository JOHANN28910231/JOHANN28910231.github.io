
  async function convertirDivisa(){

  const importe = parseFloat(document.getElementById('importe').value);
  const conversionA = document.getElementById('conversionA').value;
  const conversionB = document.getElementById('conversionB').value;
  const resultado = document.getElementById('resultado');

  //Validación de la cantidad ingresada por el usuario
  if(isNaN(importe) || importe <= 0){
    resultado.textContent = 'Ingrese una cantidad válida';
  }

  const apiKey = "6036eda8249d394f800f3af8";
  const apiURL = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

  try {
    //Acceder a las tasas de divisas en tiempo real
    const respuesta = await fetch(apiURL);
    const data = await respuesta.json();

    if(data.result !== 'success'){
      resultado.textContent = 'No fue posible obtener las tasas de cambio. Intente más tarde.';
      return;
    }

    const tasas = data.conversion_rates;
     // Validar que ambas monedas existan

    if(!tasas[conversionA] || !tasas[conversionB]){
      resultado.textContent = 'Una de las monedas no está disponible';
    }

    const importeEnUSD = importe / tasas[conversionA];

    const importeConvertido = importeEnUSD * tasas[conversionB];

    resultado.textContent = `${importe}${conversionA} = ${importeConvertido.toFixed(2)} ${conversionB}`;

  }catch (error){
    resultado.textContent = "Error de conexión. Revisa tu internet e intenta nuevamente.";
    console.error("Error:", error);
  }

}

document.getElementById('boton-convertir').addEventListener('click', convertirDivisa);

