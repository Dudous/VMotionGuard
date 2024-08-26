const sendData = () => { 
    if('geolocation' in navigator){
        navigator.geolocation.getCurrentPosition(function(position){
            console.log(position)

            // Create a form element
            let form = document.createElement('form');
            form.action = '/'; // URL to which the form will be submitted
            form.method = 'POST';   // HTTP method for submission

            // Create input elements
            let inputX = document.createElement('input');
            inputX.type = 'text';
            inputX.name = 'cordX';
            inputX.value = position.coords.latitude;

            let inputY = document.createElement('input');
            inputY.type = 'text';
            inputY.name = 'cordY';
            inputY.value = position.coords.longitude;

            // Append inputs to the form
            form.appendChild(inputX);
            form.appendChild(inputY);

            document.body.appendChild(form)

            form.submit();

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
}, 2000);