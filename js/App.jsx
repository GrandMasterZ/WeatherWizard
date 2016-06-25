import TimerMixin from 'react-timer-mixin';
const React = require('react')
const ReactDOM = require('react-dom')
const Form = require('./Form.jsx')
const Report = require('./Report.jsx')
const $ = require('jquery')
require('./map.js')

var ReportUI = React.createClass({

    mixins: [TimerMixin],
    getInitialState: function () {
        return {
            weather: {},
            location: {},
            info: {},
            currentCity: {},
            forecastDelivered: false,
            forecast: [],
            indexNeeded: 0
        }
    },
    
    addIndexByOne: function()
    {
        this.setState({indexNeeded: this.state.indexNeeded+1})
    },
    
    downIndexByOne: function()
    {
        this.setState({indexNeeded: this.state.indexNeeded-1})
    },
    
    setToDefault: function()
    {
        this.setState({indexNeeded: 0})
    },

    loadWeatherByCity: function (city) {
        var report = document.getElementById('reportUI');
        var url = 'http://api.apixu.com/v1/forecast.json?key=a76117fc3c5841c7b5c152812161206&q=' + city + '&days=10';
        this.setToDefault();
        $.ajax({
            url: url,
            dataType: 'json',
            cache: false,
            beforeSend: function() {
                $(report).attr('class', 'blur');
            },
            success: function (data) {
                this.setState({location: data.location, weather: data.current, info: data.current.condition, forecast: data.forecast.forecastday});
                $(report).attr('class', '');
                $("#cityText").val('');
                $("#nextDay").prop('disabled', false);
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }
        });
    },

    searchByCity: function ()
    {
        var report = document.getElementById('reportUI');
        console.log(report);
        this.setState({forecastDelivered:false});
        var text = document.getElementById('cityText').value;
        this.loadWeatherByCity(text);
        this.setState({currentCity:text});
    },

    loadWeatherByLocation: function()
    {
        var city;
        this.setState({currentCity: city});
        var getIpUrl='http://ip-api.com/json';
        $.ajax({
            url: getIpUrl,
            dataType: 'json',
            cache: false,
            success: function(data) {
                city = data.city;
                this.loadWeatherByCity(city);
                this.setState({currentCity:city});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    componentDidMount: function()
    {
        this.loadWeatherByLocation();
        this.setInterval(() => {this.loadWeatherByCity(this.state.currentCity);}, 60000);
        $(document.body).on('keydown', this.submitEnter);
    },

    submitEnter:function(e)
    {
        if (e.keyCode === 13) {
            this.setState({forecastDelivered:false});
            var text = document.getElementById('cityText').value;
            this.loadWeatherByCity(text);
            this.setState({currentCity:text});
        }
    },

    changeForecastStatus:function()
    {
        this.setState({forecastDelivered:true});
    },
    
    render: function() {
        return (
            <div>
                <Form search={this.searchByCity} />
                <Report forecast={this.state.forecast} weather={this.state.weather} 
                        location={this.state.location} changeStatus={this.changeForecastStatus} 
                        status={this.state.forecastDelivered} info={this.state.info} 
                        indexDown={this.downIndexByOne} index={this.state.indexNeeded}
                        indexUp={this.addIndexByOne} />
            </div>
        );
    }
});

ReactDOM.render(<ReportUI/>, document.getElementById('reportUI'))