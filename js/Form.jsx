const React = require('react')

var Form = React.createClass({
    render: function() {
        return (
            <div>
                <h2> Weather Wizard </h2>
                <div class="row margin">
                    <input className="col-md-9 col-sm-12 col-xs-12 cityInput" id="cityText" type="text" placeholder="Enter location"/>
                    <button className="col-md-3 col-sm-12 col-xs-12 confirmButton" type="button" onClick={this.props.search}>
                        <span className="glyphicon glyphicon-search"></span> Search
                    </button>
                </div>
                <div className="line">

                </div>
            </div>
        );
    }
});

module.exports = Form