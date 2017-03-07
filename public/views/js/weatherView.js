/**
 * Created by Administrator on 2017/3/7.
 */
$(function () {
    init();
});
function init() {
    getWeather();
}
function getWeather() {
    $.ajax({
        type: 'GET',
        url: 'https://api.caiyunapp.com/v2/TAkhjf8d1nlSlspN/102.725834,25.021974/forecast.json',
        dataType: 'jsonp',
        data: '',
        jsonp: 'callback',
        success: function (result) {
            console.log(result);
            BuildWeatherInfo(result);
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    });

    function BuildWeatherInfo(weather) {
        $('#weatherInfoDiv').children('li').remove();
        var weatherInfo = document.getElementById('weatherInfoDiv')
        for (i = 0; i < 5; i++) {
            var objLi = document.createElement('li')
            var objItem = document.createElement('div')
            objItem.setAttribute('class', 'WeatherItem')
            objItem.setAttribute('style', 'padding-top:0px');
            var objImage = document.createElement('img');
            objImage.setAttribute('src', "../views/images/weather/303.png");
            objImage.setAttribute('width', '80');
            var objDocure = document.createElement('div');
            objDocure.setAttribute('class', 'weatherItemDiv');
            var weatherDay = weatherInfoChoose(weather.result.daily.skycon[i].value);
            objDocure.innerHTML = weatherDay;
            var objTemperature = document.createElement('div');
            objTemperature.setAttribute('class', 'weatherItemDiv');
            // var temperature=weather.result.daily.temperature[i].min+'~'+weather.result.daily.temperature[i].max+'℃';
            var temperature = "123";
            objTemperature.innerHTML(temperature);
            objItem.appendChild(objImage);
            objItem.appendChild(objDocure);
            objItem.appendChild(objTemperature);
            objLi.appendChild(objItem);
            weatherInfo.appendChild(objLi);
        }
    }

    function weatherInfoChoose(type) {
        var weatherDay = "";
        if (type == 'CLEAR_DAY') {
            weatherDay = '晴天';
        } else if (type == 'CLEAR_NIGHT') {
            weatherDay = '晴夜';
        } else if (type == 'PARTLY_CLOUDY_DAY') {
            weatherDay = '多云';
        } else if (type == 'PARTLY_CLOUDY_NIGHT') {
            weatherDay = '多云';
        } else if (type == 'CLOUDY') {
            weatherDay = '阴';
        } else if (type == 'RAIN') {
            weatherDay = '雨';
        } else if (type == 'SNOW') {
            weatherDay = '雪';
        } else if (type == 'WIND') {
            weatherDay = '风';
        } else if (type == 'FOG') {
            weatherDay = '雾';
        } else if (type == 'HAZE') {
            weatherDay = '霾';
        } else if (type == 'SLEET') {
            weatherDay = '冻雨';
        }
        return weatherDay;
    }
}