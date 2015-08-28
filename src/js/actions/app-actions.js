var AppConstants = require('../constants/app-constants');
var AppDispatcher = require('../dispatchers/app-dispatcher');
var Promise = require('promise');
var $ = require('jquery');

var AppActions = {
  getData: function(){
    var promise = new Promise(function (resolve, reject) {
      $.get('assets/data.json', function (data) {
        if (data) resolve(data);
        //@TODO: Error handling
      });
    });
    var that = this;
    promise.then(function(p) {
      that.gotData(p);
    });
  },
  gotData: function(data){
    AppDispatcher.handleServerAction({
      actionType: AppConstants.SERVER_RESPONSE,
      data: data
    });
  },
  filterByPlace: function(place) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.FILTER_PLACE,
      place: place
    })
  },
  filterByDate: function(date) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.FILTER_DATE,
      date: date
    })
  },
  getWeather: function(index){
    AppDispatcher.handleViewAction({
      actionType: AppConstants.GET_WEATHER,
      index: index
    })
  },
}

module.exports = AppActions;
