import {sendVoice} from './output.js'
let weather;
let temp;
function init() {

}

function answer (source) {
    // let hours = new Date().getHours();
    // let minutes = new Date().getHours();
    let options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    function success(pos) {
        var crd = pos.coords;

        console.log('Ваше текущее метоположение:');
        console.log(`Широта: ${crd.latitude}`);
        console.log(`Долгота: ${crd.longitude}`);
        console.log(`Плюс-минус ${crd.accuracy} метров.`);

        fetch(`http://api.openweathermap.org/data/2.5/weather?APPID=233be40d31e782a9420d2cac9e9f0e2c&lat=${crd.latitude}&lon=${crd.longitude}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                temp = data.main.temp - 273.15;

                switch (data.weather[0].main) {
                    case 'Thunderstorm':
                        weather = 'гроза';
                        break;
                    case 'Drizzle':
                        weather = 'мелкий дождь';
                        break;
                    case 'Rain':
                        weather = 'дождь';
                        break;
                    case 'Snow':
                        weather = 'снег';
                        break;
                    case 'Mist':
                        weather = 'туман';
                        break;
                    case 'Smoke':
                        weather = 'дым';
                        break;
                    case 'Haze':
                        weather = 'мгла';
                        break;
                    case 'Dust':
                        weather = 'пыль';
                        break;
                    case 'Fog':
                        weather = 'туман';
                        break;
                    case 'Sand':
                        weather = 'песок';
                        break;
                    case 'Ash':
                        weather = 'зола';
                        break;
                    case 'Squall':
                        weather = 'шквал';
                        break;
                    case 'Tornado':
                        weather = 'торнадо';
                        break;
                    case 'Clear':
                        weather = 'ясно';
                        break;
                    case 'Clouds':
                        weather = 'облачно';
                        break;
                }

            });

    };

    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    };
    console.log(temp)
    navigator.geolocation.getCurrentPosition(success, error, options)
    return sendVoice({
        'ru': `Сейчас ${weather}, ${temp} ${temp.slice(-1)[0] === '1'?'градус':2<=parseInt(temp.toString().slice(-1)[0])<=4?'градуса':"градусов"}`,
        'en': `Now is ${weather}, ${temp} celcium`
    });



}

export {init, answer}