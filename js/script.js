fetch('https://www.elprisenligenu.dk/api/v1/prices/2023/10-30_DK2.json')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));


function myFuction(data){
    return data
}

  const data = ('https://www.elprisenligenu.dk/api/v1/prices/2023/10-30_DK2.json')
  const mapData = data.map(myFuction)