import React from 'react';
import moment from 'moment';
import CalendarGrid from './CalendarGrid.jsx';
import CalendarHeader from './CalendarHeader.jsx';
import styles from '../style/Calendar.css'


class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      renderDay: moment(),
      calendarDisplay: false
    };

    this.toggleCalender = this.toggleCalender.bind(this);
    this.onPreHandler = this.onPreHandler.bind(this);
    this.onNextHandler = this.onNextHandler.bind(this);
  }

  toggleCalender() {
    this.setState({
      calendarDisplay: !this.state.calendarDisplay
    })
  }

  onPreHandler() {
    this.setState({
      renderDay: this.state.renderDay.subtract(1, 'month')
    });
  }

  onNextHandler() {
    this.setState({
      renderDay: this.state.renderDay.add(1, 'month')
    });
  }

  render() {
    return (
      <div>
        <div id='datePicker' className={styles.datePicker} onClick={this.toggleCalender}>
          <span className={styles.calendarIconPicker}>
            <i className='far fa-calendar-alt'></i>
          </span>
          <span className={styles.dateValue}>{this.props.chosenDay.format('dddd[,] MMMM D[,] YYYY')}</span>
          <span className={styles.dropdownIcon}>
            <i className="fas fa-caret-down"></i>
          </span>
        </div>
        {this.state.calendarDisplay
          ?
          <table className={styles.calendar}>
            <CalendarHeader renderDay={this.state.renderDay} onPreHandler={this.onPreHandler} onNextHandler={this.onNextHandler}/>
            <CalendarGrid chosenDay={this.props.chosenDay} renderDay={this.state.renderDay} onChosenHandler={this.props.onChosenHandler} toggleCalender={this.toggleCalender}/>
          </table>
          :
          null
        }        
      </div>
    )
  }
}

export default Calendar;