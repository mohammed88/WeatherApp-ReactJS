var Dispatcher = require('flux').Dispatcher;
var assign = require('react/lib/Object.assign');

var AppDispatcher = assign(new Dispatcher(), {
  handleViewAction: function(action){
    console.log('action', action);
    this.dispatch({
      source: 'VIEW_ACTION',
      action: action
    })
  },

  handleServerAction: function(action){
    this.dispatch({
      source: 'SERVER_RESPONSE',
      action: action
    })
  }
});

module.exports = AppDispatcher;
