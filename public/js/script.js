const sendData = () => { 
    if('geolocation' in navigator){
        navigator.geolocation.getCurrentPosition(function(position){
            console.log(position)

            fetch('/' + position.coords.latitude + '/' + position.coords.longitude, {method: "POST"})

        }, function(error){
            console.log(error)
        })
    }
    else{
        alert('n deu :(')
    }
}


setInterval(() => {
    sendData();
}, 5000);