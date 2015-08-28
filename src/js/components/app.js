var React = require('react');

var AppActions = require('../actions/app-actions');
var AppStore = require('../stores/app-store.js');
var Weather = require('./weather/weather.js');

var React = require('react');
var ReactGoogleMaps = require('react-googlemaps');
var GoogleMapsAPI = window.google.maps;

var Map = ReactGoogleMaps.Map;
var Marker = ReactGoogleMaps.Marker;
var OverlayView = ReactGoogleMaps.OverlayView;


var App = React.createClass({
  handleClick: function(item) {
    AppActions.getWeather(item.station_id);
  },

  fetchData: function() {
    AppActions.getData();
  },

  getInitialState: function() {
    return {
      items: [{latitude: 52.3167, longitude: 5.5500}],
      places: [],
      dates: [],
      weather: {temparature_max:'', temparature_min:'', precipitation_probabaility: '', place_name: ''}
    }
  },

  componentWillMount: function() {
    this.fetchData();
    AppStore.addChangeListener(this.onChange);
  },

  componentWillUnmount: function() {
    AppStore.removeChangeListener(this.onChange)
  },

  onChange: function(){
    this.setState({
      items: AppStore.getMapData(),
      places: AppStore.getPlaces(),
      dates: AppStore.getDates(),
      weather: AppStore.getWeather()
    });
  },

  render: function() {
    var that = this;
    var items = this.state.items.map(function(item, i) {
      return (
        <Marker
            onClick={function() {that.handleClick.call(this, item)}}
            position={new GoogleMapsAPI.LatLng(item.latitude,  item.longitude)} 
            key={i}
            index={item.station_id} 
            animation={GoogleMapsAPI.Animation.DROP} />
      );
    });

    return (
      <div>
        <Map
          width={'100vw'}
          height={'100vh'}
          initialZoom={8}
          center={new GoogleMapsAPI.LatLng(this.state.items[0].latitude,  this.state.items[0].longitude)}
          mapTypeId={GoogleMapsAPI.MapTypeId.TERRAIN}
          disableDefaultUI={true}>
          {items}
        </Map>
        <Weather weather={this.state.weather} dates={this.state.dates} places={this.state.places} />
      </div>
    );
  }
});

module.exports = App;
