import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import moment from 'moment';

import './UserModal.css';

class UserModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      showDate: false,
    };
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.handleOnClickDate = this.handleOnClickDate.bind(this);
  }

  handleRequestClose() {
    this.props.closeModal();
  }

  handleOnClickDate() {
    let { showDate } = this.state;
    showDate = !showDate;
    this.setState(prevState => ({
      showDate,
    }));
  }

  onDateChange(date) {
    console.log('date: ', date);
    this.setState(prevState => ({
      date,
      showDate: false,
    }));
  }

  renderActivityDetails() {
    const { date } = this.state;
    const { activity_periods } = this.props.selectedUser;
    for (let i = 0; i < activity_periods.length; i++) {
      // For getting date and time
      const startDate = activity_periods[i].start_time.substring(0,activity_periods[i].start_time.lastIndexOf(' '));
      const startTime = activity_periods[i].start_time.substring(activity_periods[i].start_time.lastIndexOf(' '));
      const endTime = activity_periods[i].end_time.substring(activity_periods[i].start_time.lastIndexOf(' '));
      if (new Date(startDate).getTime() === new Date(moment(date).format('MMM DD YYYY')).getTime()) {
        return (
          <div className="time-log">
            <div className="time-display">
              <div className="time-left"> {startTime}
                <div className="time-icon"> <i className="fa fa-sign-in icon-login-Logout" aria-hidden="true"></i> </div>
              </div>
              <div className="time-right"> Login </div>
            </div>
            <div className="time-display">
              <div className="time-left"> {endTime}
                <div className="time-icon">
                  <i className="fa fa-sign-out icon-login-Logout" aria-hidden="true"></i>
                </div>
              </div>
              <div className="time-right"> Logout </div>
            </div>
          </div>
        );
      }
    }

    return (
      <div className="no-data-found"> No Data Found</div>
    );
  }

  render() {
    const { showDate, date } = this.state;
    return (
      <div className="user-modal-container-overlay">
        <div className="user-modal-container">
          <div>
            <div className="close-bg-icon">
              <div className="close-icon" onClick={this.handleRequestClose}>
                <i className="fa fa-close"></i>
              </div>
            </div>
            <div className="user-modal-title"> Activity Periods </div>
            <div className="date-calendar-container">
              <div className="date-calendar-div" onClick={this.handleOnClickDate}>
                <div> Select Date </div>
                <div className="date-display">
                  {moment(date).format('DD-MM-YYYY')}
                </div>
              </div>
              {
                showDate &&
                <div className="calendar-container">
                  <Calendar
                    onChange={this.onDateChange}
                    value={date}
                  />
                </div>
              }
            </div>
            { this.renderActivityDetails() }
          </div>
        </div>
      </div>
    );
  }
}

export default UserModal;
