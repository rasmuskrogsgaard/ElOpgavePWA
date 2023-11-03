fetch('https://www.elprisenligenu.dk/api/v1/prices/2023/10-30_DK2.json')
  .then(response => response.json())
  .then(data => {
    const filteredData = data.filter(item => {
      const time = new Date(item.time_start);
      const hours = time.getHours();
      return hours >= 19 || hours <= 3;
    });
    console.log(filteredData);
    const container = document.getElementById('data-container');

    for (let i = 0; i < 8; i++) {
      if (i < filteredData.length) {
        const item = filteredData[i];

        const row = document.createElement('div');
        row.classList.add('data-row');

        const timeStart = document.createElement('p');
        const time = new Date(item.time_start);
        const hours = time.getHours();
        const minutes = time.getMinutes();
        const formattedHours = hours.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');
        timeStart.textContent = `kl.${formattedHours}:${formattedMinutes}`;

        const dkkPerKWh = document.createElement('p');
        dkkPerKWh.textContent = `${item.DKK_per_kWh} kr`;

        row.appendChild(timeStart);
        row.appendChild(dkkPerKWh);

        container.appendChild(row);
      }
    }
  })
  .catch(error => console.error('Error:', error));
