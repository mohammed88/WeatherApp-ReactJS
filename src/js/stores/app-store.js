var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');
var assign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');

var CHANGE_EVENT = 'change';

var _data = [], _weatherData = [], _places = [], _dates = [], _currDate = "", _currPlace = "", _currWeather;

function _initializeWeatherData(data) {
  _data = (typeof data !== "object") ? JSON.parse(data) : data;
  _places = _.chain(_data).uniq('station_id').pluck('place_name').value();
  _dates = _.chain(_data).uniq('datetime').pluck('datetime').value();
  
  //Default values
  _currDate = _dates[0];
  _currPlace = "All";
  _weatherData = _.filter(_data, {datetime: _currDate});
  _currWeather = _weatherData[0];
}

function _filterByPlace(place) {
  _currPlace = place;
  _filter(_currPlace, _currDate);
}

function _filterByDate(date) {
  _currDate = date;
  _filter(_currPlace, _currDate);
}

function _filter(currPlace, currDate) {
  var filter = (currPlace == "All") ? {datetime: currDate} : {place_name: currPlace, datetime: currDate} ;
  _weatherData = _.filter(_data, filter);
  _setWeather(currPlace == "All"? _currWeather.station_id : _weatherData[0].station_id);
}

function _setWeather(stationId) {
  _currWeather = _.filter(_weatherData, {station_id: stationId})[0];
}

var AppStore = assign(EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getMapData: function() {
    return _weatherData;
  },

  getPlaces: function() {
    return _places;
  },

  getDates: function() {
    return _dates;
  },

  getWeather: function() {
    return _currWeather;
  },

  dispatcherIndex: AppDispatcher.register(function(payload) {
    var action = payload.action; // this is our action from handleViewAction
    switch(action.actionType){
      case AppConstants.SERVER_RESPONSE:
        _initializeWeatherData(payload.action.data);
        break;

      case AppConstants.FILTER_PLACE:
        _filterByPlace(payload.action.place);
        break;

      case AppConstants.FILTER_DATE:
        _filterByDate(payload.action.date);
        break;

      case AppConstants.GET_WEATHER:
        _setWeather(payload.action.index);
        break;
    }

    AppStore.emitChange();
    return true;
  })

})

module.exports = AppStore;
