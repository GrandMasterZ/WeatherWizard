const React = require('react')

var Report = React.createClass({
    render: function() {
        return (
            <div className="reportBox">
                <h2> {this.props.location.name} </h2>
                <h2> {this.props.location.localtime} </h2>
                <div class="row margin">
                    <input className="col-xs-4 noPadding reportButton" type="button" value="Previous day"/>
                    <input className="col-xs-4 noPadding reportButton" type="button" value="Next day"/>
                    <input className="col-xs-4 noPadding reportButton" type="button" value="Calendar"/>
                </div>
                <p className="temp">{this.props.info.text} {this.props.weather.feelslike_c}℃ <img src={'http:' + this.props.info.icon} /> </p>
                <p className="temp"> {this.props.weather.humidity} <img width="64" height="64" src="/home/asdsda/Desktop/WeatherWizard/images/Humidity1.png" /> </p>
                <p> Wind direction {this.props.weather.wind_dir}</p>
                <p> Wind speed {this.props.weather.wind_kph} kph</p>
                <p> Last updated: {this.props.weather.last_updated} </p>
            </div>
        );
    }
});

module.exports = Report