var React = require('react');
var AppActions = require('../../actions/app-actions');
var LocationFilter = require('../filters/location-filter.js');
var DateFilter = require('../filters/date-filter.js');

var Weather = React.createClass({

  render: function() {
    var weather = this.props.weather;
    return (
      <div className="weather">
        <div className={"title"}>WEATHER CHANNEL</div>
        <LocationFilter places={this.props.places} />
        Place: <b>{weather.place_name}</b> <br />
        Maximum Temperatute : <b>{weather.temperature_max}</b> <br />
        Minimum Temperature : <b>{weather.temperature_min}</b> <br />
        Chances Of Rain : <b>{weather.precipitation_probability}%</b> <br />
        <DateFilter dates={this.props.dates} />
      </div>
    );
  }
});

module.exports = Weather;


