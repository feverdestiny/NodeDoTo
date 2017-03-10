/**
 * Created by Administrator on 2017/3/7.
 */

var clickType = 'temper'; //默认温度
$(function () {

    $('.weather_other li').on('click', function () {
        $(this).addClass('weather_other_active').siblings('.weather_other_active').removeClass('weather_other_active');
        clickType = this.type;
        BuildWeatherOtherInfo(gresult);
    });

    init();

    var srcurl = "";
    var gresult = {};

    function init() {
        getWeather();
    }

    function getWeather() {
        $.ajax({
            type: 'GET',
            url: 'https://api.caiyunapp.com/v2/z8osO2ISJV3YzQy2/102.725834,25.021974/forecast.json',
            dataType: 'jsonp',
            data: '',
            jsonp: 'callback',
            success: function (result) {
                console.log(result);
                $('#description').text(result.result.hourly.description);
                BuildWeatherInfo(result);
                gresult = result;
                BuildWeatherOtherInfo(result);
            },
            error: function (jqXHR, textStatus, errorThrown) {
            }
        });
    }
    function BuildWeatherInfo(weather) {
        $('#weatherInfoDiv').children('li').remove();
        var weatherInfo = document.getElementById('weatherInfoDiv')
        for (i = 0; i < 5; i++) {
            var objLi = document.createElement('li')
            var objItem = document.createElement('div')
            objItem.setAttribute('class', 'WeatherItem')
            objItem.setAttribute('style', 'padding-top:0px');
            var objDocure = document.createElement('div');
            objDocure.setAttribute('class', 'weatherItemDiv');
            var weatherDay = weatherInfoChoose(weather.result.daily.skycon[i].value);
            objDocure.innerHTML = weatherDay;
            var objImage = document.createElement('img');
            objImage.setAttribute('src', "../views/images/weather/" + srcurl);

            objImage.setAttribute('width', '80');

            var objtemper = document.createElement('div');
            objtemper.setAttribute('class', 'weatherItemDiv');
            var weatherDay2 = parseFloat(weather.result.daily.temperature[i].min).toFixed(0) + '~' + parseFloat(weather.result.daily.temperature[i].max).toFixed(0) + '℃';
            objtemper.innerHTML = weatherDay2;
            // var temperature=weather.result.daily.temperature[i].min+'~'+weather.result.daily.temperature[i].max+'℃';

            var weatherDate = document.createElement('div');
            weatherDate.setAttribute('class', 'weatherItemDiv');
            weatherDate.innerHTML = weather.result.daily.aqi[i].date;
            var weatherWeek = document.createElement('div');
            weatherWeek.setAttribute('class', 'weatherItemDiv');
            weatherWeek.innerHTML = GetWeekToDate(weather.result.daily.aqi[i].date);
            objItem.appendChild(objImage);
            objItem.appendChild(objDocure);
            objItem.appendChild(objtemper);
            objItem.appendChild(weatherDate);
            objItem.appendChild(weatherWeek);

            objLi.appendChild(objItem);
            weatherInfo.appendChild(objLi);
        }
    }

    function weatherInfoChoose(type) {
        var weatherDay = "";
        if (type == 'CLEAR_DAY') {
            weatherDay = '晴天';
            srcurl = '100.png'
        } else if (type == 'CLEAR_NIGHT') {
            weatherDay = '晴夜';
            srcurl = '104.png'
        } else if (type == 'PARTLY_CLOUDY_DAY') {
            weatherDay = '多云';
            srcurl = '101.png'
        } else if (type == 'PARTLY_CLOUDY_NIGHT') {
            weatherDay = '多云';
            srcurl = '101.png'
        } else if (type == 'CLOUDY') {
            weatherDay = '阴';
            srcurl = '102.png'
        } else if (type == 'RAIN') {
            weatherDay = '雨';
            srcurl = '305.png'
        } else if (type == 'SNOW') {
            weatherDay = '雪';
            srcurl = '304.png'
        } else if (type == 'WIND') {
            weatherDay = '风';
            srcurl = '201.png'
        } else if (type == 'FOG') {
            weatherDay = '雾';
            srcurl = '208.png'
        } else if (type == 'HAZE') {
            weatherDay = '霾';
        } else if (type == 'SLEET') {
            weatherDay = '冻雨';
        }
        return weatherDay;
    }


    function GetWeekToDate(day) {
        var week = "";
        switch (new Date(day).getDay()) {
            case 0:
                week = "星期天";
                break;
            case 1:
                week = "星期一";
                break;
            case 2:
                week = "星期二";
                break;
            case 3:
                week = "星期三";
                break;
            case 4:
                week = "星期四";
                break;
            case 5:
                week = "星期五";
                break;
            case 6:
                week = "星期六";
                break;
        }
        return week;
    }


    function BuildWeatherOtherInfo(data) {
        BuildTmperweather(data.result.hourly, clickType);
    }


    //温度
    function BuildTmperweather(data, type) {
        //初始化echarts实例1
        var mycharts = echarts.init(document.getElementById('weather_foot'));
        //温度
        if (type == 'temper') {
            var WEATHER_DATE_X = [];
            var WEATHER_DATE_Y = [];
            for (x in data.temperature) {
                WEATHER_DATE_X.push(data.temperature[x].datetime);
                WEATHER_DATE_Y.push(parseFloat(data.temperature[x].value).toFixed(0));
            }

            //图表的配置
            var optionTimper = {
                title: {},
                color: ['rgba(255, 255, 255, 0.44)', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
                backgroundColor: 'rgba(255, 255, 255, 0.07)',
                textStyle: {
                    color: '#fff'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },

                xAxis: {
                    data: WEATHER_DATE_X,
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(255, 255, 255, 0.3'
                        }
                    }
                },
                yAxis: {
                    name: '℃',
                    type: 'value',
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: 'rgba(255, 255, 255, 0.2)'
                        }
                    },
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: 'rgba(255, 255, 255, 0.2)'
                        }
                    }

                },
                series: [{
                    name: '温度',
                    type: 'line',
                    data: WEATHER_DATE_Y,
                    markPoint: {
                        data: [
                            {type: 'max', name: '最大值'},
                            {type: 'min', name: '最小值'}
                        ]
                    },
                    // markLine: {
                    //     data: [
                    //         {type: 'average', name: '平均值'}
                    //     ]
                    // }
                }]
            };
            //初始化图表内容
            mycharts.setOption(optionTimper);
        }

//风速
        if (type == 'wind') {
            var windData_Date = [];
            var windData_Speed = [];
            var windData_Direction = [];
            var windData = [];
            for (x in data.wind) {
                windData_Date.push(data.wind[x].datetime);
                windData_Speed.push(data.wind[x].speed);
                windData_Direction.push(data.wind[x].direction);
                windData.push([data.wind[x].datetime, data.wind[x].speed, data.wind[x].direction])
            }
            var dataBJ = windData;


            var schema = [
                {name: 'date', index: 0, text: '日'},
                {name: 'speed', index: 1, text: '风速'},
                {name: 'direction', index: 2, text: '风向'},
            ];


            var itemStyle = {
                normal: {
                    opacity: 0.8,
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            };

            windoption = {
                color: ['rgba(255, 255, 255, 0.44)', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
                backgroundColor: 'rgba(255, 255, 255, 0.07)',
                textStyle: {
                    color: '#fff'
                },


                tooltip: {
                    padding: 10,
                    borderColor: '#777',
                    borderWidth: 1,
                    formatter: function (obj) {
                        var value = obj.value;
                        return '<div style="border-bottom: 1px solid rgba(255,255,255,0.2); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'
                            + value[0]
                            + '</div>'
                            + schema[1].text + '：' + value[1] + '<br>'
                            + schema[2].text + '：' + value[2] + '<br>'
                            ;
                    }
                },
                xAxis: {
                    data: windData_Date,
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(255, 255, 255, 0.3'
                        }
                    }
                    // type: 'value',
                    // name: '日期',
                    // nameGap: 16,
                    // nameTextStyle: {
                    //     color: '#fff',
                    //     fontSize: 14
                    // },
                    // max: 31,
                    // splitLine: {
                    //     show: false
                    // },
                    // axisLine: {
                    //     lineStyle: {
                    //         color: '#eee'
                    //     }
                    // }
                },
                yAxis: {
                    type: 'value',
                    name: '风速',
                    nameLocation: 'end',
                    nameTextStyle: {
                        color: '#fff',
                    },
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(255, 255, 255, 0.3)'
                        }
                    },
                    splitLine: {
                        show: false
                    }
                },
                visualMap: [
                    {
                        left: 'right',
                        top: '10%',
                        dimension: 2,
                        min: 200,
                        max: 280,
                        itemWidth: 10,
                        itemHeight: 60,
                        calculable: true,
                        precision: 0.1,
                        text: ['风向'],
                        textGap: 20,
                        textStyle: {
                            color: '#fff'
                        },
                        inRange: {
                            symbolSize: [0, 40]
                        },

                        controller: {
                            inRange: {
                                color: ['rgba(255, 255, 255, 0.3)']
                            },
                            outOfRange: {
                                color: ['rgba(255, 255, 255, 0.07)']
                            }
                        }
                    },

                ],
                series: [
                    {
                        name: '风向',
                        type: 'scatter',
                        itemStyle: itemStyle,
                        data: dataBJ
                    },

                ]
            };

            mycharts.setOption(windoption);
        }

        //降雨量
        if (type == 'precipitation') {

            var precipitationdata_x = [];
            var precipitationdata_y = [];

            for (x in data.precipitation) {
                precipitationdata_x.push(data.precipitation[x].datetime);
                precipitationdata_y.push(parseFloat(data.precipitation[x].value).toFixed(0));
            }

            //图表的配置
            var optioPrecipitation = {
                title: {},
                color: ['rgba(255, 255, 255, 0.44)', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
                backgroundColor: 'rgba(255, 255, 255, 0.07)',
                textStyle: {
                    color: '#fff'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },

                xAxis: {
                    data: precipitationdata_x,
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(255, 255, 255, 0.3'
                        }
                    }
                },
                yAxis: {
                    name: 'mm',
                    type: 'value',
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: 'rgba(255, 255, 255, 0.2)'
                        }
                    },
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: 'rgba(255, 255, 255, 0.2)'
                        }
                    }

                },
                series: [{
                    name: '降水量',
                    type: 'line',
                    data: precipitationdata_y,
                    markPoint: {
                        data: [
                            {type: 'max', name: '最大值'},
                            // {type: 'min', name: '最小值'}
                        ]
                    },
                    // markLine: {
                    //     data: [
                    //         {type: 'average', name: '平均值'}
                    //     ]
                    // }
                }]
            };
            //初始化图表内容
            mycharts.setOption(optioPrecipitation);
        }
        //pm2.5
        if (type == 'pm2') {

            var pm2data_x = [];
            var pm2data_y = [];

            for (x in data.pm25) {
                pm2data_x.push(data.pm25[x].datetime);
                pm2data_y.push(parseFloat(data.pm25[x].value).toFixed(0));
            }

            //图表的配置
            var optioPm2 = {
                title: {},
                color: ['rgba(255, 255, 255, 0.44)', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
                backgroundColor: 'rgba(255, 255, 255, 0.07)',
                textStyle: {
                    color: '#fff'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },

                xAxis: {
                    data: pm2data_x,
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(255, 255, 255, 0.3'
                        }
                    }
                },
                yAxis: {
                    name: 'μg/m3',
                    type: 'value',
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: 'rgba(255, 255, 255, 0.2)'
                        }
                    },
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: 'rgba(255, 255, 255, 0.2)'
                        }
                    }

                },
                series: [{
                    name: 'PM2',
                    type: 'line',
                    data: pm2data_y,
                    markPoint: {
                        data: [
                            {type: 'max', name: '最大值'},
                            {type: 'min', name: '最小值'}
                        ]
                    },
                    // markLine: {
                    //     data: [
                    //         {type: 'average', name: '平均值'}
                    //     ]
                    // }
                }]
            };
            //初始化图表内容
            mycharts.setOption(optioPm2);
        }

        //云量
        if (type == 'cloudrate') {

            var cloudrate_x = [];
            var cloudrate_y = [];

            for (x in data.pm25) {
                cloudrate_x.push(data.cloudrate[x].datetime);
                cloudrate_y.push(parseFloat(data.cloudrate[x].value).toFixed(0));
            }

            //图表的配置
            var optioCloudrate = {
                title: {},
                color: ['rgba(255, 255, 255, 0.44)', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
                backgroundColor: 'rgba(255, 255, 255, 0.07)',
                textStyle: {
                    color: '#fff'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },

                xAxis: {
                    data: cloudrate_x,
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(255, 255, 255, 0.3'
                        }
                    }
                },
                yAxis: {
                    name: 'μg/m3',
                    type: 'value',
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: 'rgba(255, 255, 255, 0.2)'
                        }
                    },
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: 'rgba(255, 255, 255, 0.2)'
                        }
                    }

                },
                series: [{
                    name: '云量',
                    type: 'line',
                    data: cloudrate_y,
                    markPoint: {
                        data: [
                            {type: 'max', name: '最大值'},
                            {type: 'min', name: '最小值'}
                        ]
                    },
                    // markLine: {
                    //     data: [
                    //         {type: 'average', name: '平均值'}
                    //     ]
                    // }
                }]
            };
            //初始化图表内容
            mycharts.setOption(optioCloudrate);
        }

    }


});