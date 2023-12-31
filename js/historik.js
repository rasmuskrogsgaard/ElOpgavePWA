fetch('https://www.elprisenligenu.dk/api/v1/prices/2023/10-30_DK2.json')
  .then(response => response.json())
  .then(data => {
    if (data.length > 0) {
      
      const firstItem = data[0];

    
      console.log(firstItem);

      const container = document.getElementById('data-container');

      const dataDiv = document.createElement('div');


      const timeStart = document.createElement('p');
      timeStart.textContent = `${firstItem.time_start}`;
      
      const parsedTime = new Date(firstItem.time_start);
      timeStart.textContent = `${parsedTime.toLocaleString()}`;
      
    
      dataDiv.appendChild(timeStart);
        
      container.appendChild(dataDiv);
    } else {
      console.error('error');
    }
  })
  .catch(error => console.error('Error:', error));
