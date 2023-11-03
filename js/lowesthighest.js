fetch('https://www.elprisenligenu.dk/api/v1/prices/2023/10-30_DK2.json')
  .then(response => response.json())
  .then(data => {
    if (data.length > 0) {
      const sortedData = data.sort((a, b) => a.DKK_per_kWh - b.DKK_per_kWh);

      const lowestValue = sortedData[0].DKK_per_kWh;
      const highestValue = sortedData[sortedData.length - 1].DKK_per_kWh;

    
      const lowestValueElement = document.getElementById('lowest-value');
      const highestValueElement = document.getElementById('highest-value');

      lowestValueElement.textContent = `${lowestValue} kr pr kwh`;
      highestValueElement.textContent = `${highestValue} kr pr kwh`;
    } else {
      console.error('No data available');
    }
  })
  .catch(error => console.error('Error:', error));
