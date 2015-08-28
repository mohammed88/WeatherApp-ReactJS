var React = require('react');
var AppActions = require('../../actions/app-actions');

var LocationFilter = React.createClass({
  filterByPlace: function(e) {
    AppActions.filterByPlace(e.target.value);
  },

  render: function() {
    var places = this.props.places.map(function(item, i) {
      return (
        <option key={i}>{item}</option>
      );
    });
    return (
      <div className={"filter"}>
          Location :&nbsp;
        <select onChange={this.filterByPlace}>
          <option>All</option>
          {places}
        </select>
        <hr />
      </div>
    );
  }
});

module.exports = LocationFilter;
