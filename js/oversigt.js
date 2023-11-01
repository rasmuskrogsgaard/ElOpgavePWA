fetch('https://www.elprisenligenu.dk/api/v1/prices/2023/10-30_DK2.json')
  .then(response => response.json())
  .then(data => {
    if (data.length > 0) {
      
      const firstItem = data[0];

    
      console.log(firstItem);

      const container = document.getElementById('data-container');

      const dataDiv = document.createElement('div');

      const dkkPerKWh = document.createElement('p');
      dkkPerKWh.textContent = `${firstItem.DKK_per_kWh} kr`;

     
      
      dataDiv.appendChild(dkkPerKWh);
    
   

      container.appendChild(dataDiv);
    } else {
      console.error('error');
    }
  })
  .catch(error => console.error('Error:', error));


  function myFunction() {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }