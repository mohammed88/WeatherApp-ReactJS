var React = require('react');
var AppActions = require('../../actions/app-actions');

var DateFilter = React.createClass({
  filterByDate: function(e) {
    AppActions.filterByDate(e.target.value);
  },

  render: function() {
    var dates = this.props.dates.map(function(item, i) {
      return (
        <option key={i}>{item}</option>
      );
    });
    return (
      <div className={"filter"}>
        DateTime :&nbsp;
        <select onChange={this.filterByDate} className={"date"}>
          {dates}
        </select>
      </div>
    );
  }
});

module.exports = DateFilter;
