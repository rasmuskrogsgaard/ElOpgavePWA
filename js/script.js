fetch('https://www.elprisenligenu.dk/api/v1/prices/2023/10-30_DK2.json')
  .then(response => response.json())
  .then(data => {
    if (data.length > 0) {
      const firstItem = data[0];
      console.log(firstItem);

      const dkkPerKWhElement = document.getElementById('dkk-per-kwh');
      const timeStartElement = document.getElementById('time-start');
      const timeEndElement = document.getElementById('time-end');

      dkkPerKWhElement.textContent = `${firstItem.DKK_per_kWh} kr pr kwh`;

      const startTime = new Date(firstItem.time_start);
      const endTime = new Date(firstItem.time_end);

      
      const startTimeFormatted = startTime.toLocaleTimeString('da-DK', { timeStyle: 'short' });
      const endTimeFormatted = endTime.toLocaleTimeString('da-DK', { timeStyle: 'short' });

      timeStartElement.textContent = `${startTimeFormatted}`;
      timeEndElement.textContent = ` ${endTimeFormatted}`;
    } else {
      console.error('error');
    }
  })
  .catch(error => console.error('Error:', error));
