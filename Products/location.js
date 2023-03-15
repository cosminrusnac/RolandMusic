let buttonLocation = document.getElementById("location-button");

buttonLocation.addEventListener("click", ()=> {
   navigator.geolocation ?  navigator.geolocation.getCurrentPosition(getLocation) :
      button.innerText = "Something went wrong!";
});

const getLocation = position => {
    buttonLocation.innerText = 'Loading...'
    let {latitude, longitude} = position.coords; 
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=b94175d87c6b4264a4ea033c7e83f7aa`)
    .then(response => response.json())
    .then(response => {
        let allDetails = response.results[0].components; 
        console.table(allDetails);
        let {county, postcode, country, village} = allDetails; 
        buttonLocation.innerText = `${county}, ${postcode}, ${country}`; 
    })
    .catch(()=> { 
        buttonLocation.innerText = "Something went wrong!";
    });
}




