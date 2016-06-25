const React = require('react')
const $ = require('jquery')

var Report = React.createClass({

    previousDayData: function() {
        this.props.indexDown();
        $("#nextDay").prop('disabled', false);
        if(this.props.index==1)
        {
            $("#prevDay").prop('disabled', true);
        }
    },

    nextDayData: function() {
        this.props.changeStatus();
        this.props.indexUp();
        $("#prevDay").prop('disabled', false);
        if(this.props.index==8)
        {
            $("#nextDay").prop('disabled', true);
        }
    },

    render: function() {
        let reportContent;
        if(this.props.status)
        {
            reportContent = (
                <div className="reportBox">
                    <h2> {this.props.location.name} <span> ({this.props.location.country}) </span> </h2>
                    <h2> {this.props.forecast[this.props.index].date} </h2>
                    <div class="row margin">
                        <input onClick={this.previousDayData} className="col-xs-4 noPadding reportButton" type="button" value="Previous day" id="prevDay"/>
                        <input onClick={this.nextDayData} className="col-xs-4 noPadding reportButton" type="button" value="Next day" id="nextDay" />
                        <input className="col-xs-4 noPadding reportButton" type="button" value="Calendar"/>
                    </div>
                    <h2> Day average </h2>
                    <p className="temp">{this.props.forecast[this.props.index].day.avgtemp_c} <img src={'http:' + this.props.forecast[this.props.index].day.condition.icon} /> </p>
                    <p> Wind speed max: {this.props.forecast[this.props.index].day.maxwind_kph} kph</p>
                </div>
            )
        }
        else
        {
            reportContent = (
                <div className="reportBox">
                    <h2> {this.props.location.name} <span> ({this.props.location.country}) </span> </h2>
                    <h2> {this.props.location.localtime} </h2>
                    <div class="row margin">
                        <input className="col-xs-4 noPadding reportButton" type="button" value="Previous day"/>
                        <input onClick={this.nextDayData} className="col-xs-4 noPadding reportButton" type="button" value="Next day"/>
                        <input className="col-xs-4 noPadding reportButton" type="button" value="Calendar"/>
                    </div>
                    <p className="temp">{this.props.info.text} {this.props.weather.feelslike_c}℃ <img src={'http:' + this.props.info.icon} /> </p>
                    <p className="temp"> {this.props.weather.humidity} <img width="64" height="64" src="/home/asdsda/Desktop/WeatherWizard/images/Humidity1.png" /> </p>
                    <p> Wind direction {this.props.weather.wind_dir}</p>
                    <p> Wind speed {this.props.weather.wind_kph} kph</p>
                    <p> Last updated: {this.props.weather.last_updated} </p>
                </div>
            )
        }
        return (
            <div className="reportBox">
                {reportContent}
            </div>
        );
    }
});

module.exports = Report