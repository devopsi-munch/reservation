import React from 'react';
import moment from 'moment';
import styles from '../style/CalendarGrid.css'

class CalendarGrid extends React.Component {
  constructor(props) {
    super(props);

    this.onClickHandler = this.onClickHandler.bind(this);
  }

  getFirstDayOfMonth() {
    const {renderDay} = this.props;
    const firstDay = moment(renderDay).startOf('month').format('d'); 
    return firstDay;
  };

  onClickHandler(event){
    this.props.onChosenHandler(event.target.attributes.value.value);
    this.props.toggleCalender();
  }

  render() {
    const {chosenDay, renderDay} = this.props;

    let emptyDaysInMonth = [];
    for (let i = 0; i < this.getFirstDayOfMonth(); i++) {
      emptyDaysInMonth.push(
        <td key={`emptyDay${i}`} className={`${styles.calendarDay} empty`}>{''}</td>
      );
    }

    let daysInMonth = [];
    for (let k = 1; k <= renderDay.daysInMonth(); k++) {
      let renderDayYearMonth = renderDay.format('YYYY MM');
      let currentYearMonthMatch = moment().format('YYYY MM') === renderDayYearMonth;
      let chosenYearMonthMatch = chosenDay.format('YYYY MM') === renderDayYearMonth;
      let currentDayClass = k == moment().format('D') && currentYearMonthMatch ? styles.currentDay : '';
      let chosenDayClass = k == chosenDay.format('D') && chosenYearMonthMatch ? styles.chosenDay : '';
      let value = moment(`${renderDayYearMonth} ${k}`, 'YYYY MM D').unix();
      daysInMonth.push(
        <td id={`nonEmptyDay${k}`} key={`nonEmptyDay${k}`} className={`${styles.calendarDay} ${currentDayClass} ${chosenDayClass}`} value={value}>
          {k}
        </td>
      );
    }

    var totalSlots = [...emptyDaysInMonth, ...daysInMonth];
    if (totalSlots.length % 7 !== 0) {
      var count = 1;
      while (totalSlots.length % 7 !== 0) {
        totalSlots.push(<td key={`afterLastDay${count}`} className={`${styles.calendarDay} empty`}>{''}</td>);
        count++;
      }
    }


    let rows = [];
    let cells = [];

    totalSlots.forEach((row, i) => {
      if (i % 7 !== 0) {
        cells.push(row); // if index not equal 7 that means not go to next week
      } else {
        rows.push(cells); // when reach next week we contain all td in last week to rows 
        cells = []; // empty container 
        cells.push(row); // in current loop we still push current row to new container
      }
      if (i === totalSlots.length - 1) { // when end loop we add remain date
        rows.push(cells);
      }
    });

    let allDaysInMonth = rows.map((week, i) => {
      if (week.length > 0) {
        return <tr key={`Day${i}`} onClick={this.onClickHandler}>{week}</tr>;
      }
    });

    return (
      <tbody>{allDaysInMonth}</tbody>
    )
  }
}

export default CalendarGrid;