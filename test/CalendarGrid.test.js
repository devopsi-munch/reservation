import React from 'react';
import CalendarGrid from '../client/src/component/CalendarGrid.jsx';
import moment from 'moment';
import { mount } from 'enzyme';

describe('CalendarGrid', () => {
  const wrapper = mount(<CalendarGrid chosenDay={moment()} renderDay={moment()}/>);
  const instance = wrapper.instance();

  beforeEach(() => {
    wrapper.setProps({
      chosenDay: moment(),
      renderDay: moment()
    });
  });

  it('should return first day of month when getFirstDayOfMonth is called', () => {
    const expectedFirstDayOfMonth = moment().startOf('month').format('d');
    expect(instance.getFirstDayOfMonth()).toEqual(expectedFirstDayOfMonth);
  });

  it('should invoke onChosenHandler and toggleCalendar when a date is chosen', () => {
    const onChosenHandlerMock = jest.fn();
    const toggleCalenderMock = jest.fn();
    wrapper.setProps({
      onChosenHandler: onChosenHandlerMock,
      toggleCalender: toggleCalenderMock
    });
    wrapper.find('#nonEmptyDay1').simulate('click');
    expect(onChosenHandlerMock).toBeCalled();
    expect(toggleCalenderMock).toBeCalled();
  });

});