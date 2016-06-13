import TimerMixin from 'react-timer-mixin';
const React = require('react')
const ReactDOM = require('react-dom')
const $ = require('jquery')
require('./map.js')

var ReportUI = React.createClass({

    mixins:[TimerMixin],
    getInitialState:function()
    {
        return {
            weather: {},
            location: {},
            info: {}
        }
    },

    loadWeatherByCity: function(city)
    {
        var url = 'http://api.apixu.com/v1/current.json?key=a76117fc3c5841c7b5c152812161206&q='+city;
        var _this = this;
        $.ajax({
            url: url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({location: data.location, weather: data.current, info:data.current.condition});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }
        });
    },

    loadWeatherByLocation: function()
    {
        var city;
        var getIpUrl='http://ip-api.com/json';
        $.ajax({
            url: getIpUrl,
            dataType: 'json',
            cache: false,
            success: function(data) {
                city = data.city;
                this.loadWeatherByCity(city);
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    componentDidMount: function()
    {
        this.loadWeatherByLocation();
        this.setInterval(() => {this.loadWeatherByLocation();}, 60000);
    },

    render: function() {
        console.log(this.state.info);
        return (
            <div className="reportBox">
                <h2> {this.state.location.name} </h2>
                <h2> {this.state.location.localtime} </h2>
                <div class="row margin">
                    <input className="col-xs-4 noPadding reportButton" type="button" value="Previous day"/>
                    <input className="col-xs-4 noPadding reportButton" type="button" value="Next day"/>
                    <input className="col-xs-4 noPadding reportButton" type="button" value="Calendar"/>
                </div>
                <p className="temp">{this.state.info.text} {this.state.weather.feelslike_c}℃ <img src={'http:' + this.state.info.icon} /></p>
                <p> Humidity {this.state.weather.humidity} </p>
                <p> Wind direction {this.state.weather.wind_dir}</p>
                <p> Wind speed {this.state.weather.wind_kph} </p>
                <p> Last updated: {this.state.weather.last_updated} </p>
            </div>
        );
    }
});

ReactDOM.render(<ReportUI/>, document.getElementById('reportUI'))