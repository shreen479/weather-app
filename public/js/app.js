
console.log('Client side JS file is loaded')

const WeatherForm = document.querySelector('form')
const searchValue= document.querySelector('input')

const msgOne = document.querySelector('#message1')
const msgTwo = document.querySelector('#message2')

WeatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = searchValue.value

    msgOne.textContent = 'Loading..'
    msgTwo.textContent = ''

   // const link = 'http://localhost:3000/weather?address='+location
      const link = '/weather?address='+location  
    fetch(link).then( (response) => {
    
        response.json().then( (data) => {
            console.log(data)
            if(data.error){
                console.log(data.error)
                msgOne.textContent = data.error
            } else {
                console.log(data.location)
                console.log(data.temperature)
                console.log(data.precipProbability)
                msgOne.textContent = 'Location    : ' + data.location
                msgTwo.textContent = data.summary + ' Temperature is currently ' + data.temperature + ' with ' + data.precipProbability + '% rain.'
            }
        
        } )
    } )

    
})