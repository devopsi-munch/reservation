import React from 'react';
import styles from '../style/CalendarHeader.css'

class CalendarHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  getMonthAndYear() {
    const month = this.props.renderDay.format('MMMM');
    const year = this.props.renderDay.format('Y')
    return `${month} ${year}`;
  }

  render() {

    const {onPreHandler, onNextHandler} = this.props;
    const weekdayshort = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const weekdayShortName = weekdayshort.map((day, index) => {
      return <th key={`${index}day`} className={styles.weekdays}>{day}</th>
    });


    return (
      <thead className={styles.headerContainer}>
        <tr>
          <td colSpan='1' id='prevButton' className={styles.leftArrow} onClick={onPreHandler}>«</td>
          <td colSpan='5' className={styles.monthYear}>{this.getMonthAndYear()}</td>
          <td colSpan='1' id='nextButton' className={styles.rightArrow} onClick={onNextHandler}>»</td>
        </tr>
        <tr>{weekdayShortName}</tr>
      </thead>
    )
  }
}

export default CalendarHeader;