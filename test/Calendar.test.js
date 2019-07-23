import React from 'react';
import Calendar from '../client/src/component/Calendar.jsx';
import moment from 'moment';
import { mount } from 'enzyme';

describe('Calendar', () => {
  const wrapper = mount(<Calendar chosenDay={moment()}/>);
  const instance = wrapper.instance();

  beforeEach(() => {
    wrapper.setState({
      renderDay: moment(),
      calendarDisplay: false
    });
  });
  

  it('should display calendar when date picker is clicked', () => {
    expect(wrapper.state('calendarDisplay')).toBe(false);
    wrapper.find('#datePicker').simulate('click');
    expect(wrapper.state('calendarDisplay')).toBe(true);
  });

  it('should render last month when onPreHandler is called', () => {
    expect(wrapper.state('renderDay').format('YYYY MM DD')).toBe(moment().format('YYYY MM DD'));
    instance.onPreHandler();
    const expectedRenderDay = moment().subtract(1, 'month').format('YYYY MM DD')
    expect(wrapper.state('renderDay').format('YYYY MM DD')).toBe(expectedRenderDay);
  });

  it('should render next month when onNextHandler is called', () => {
    expect(wrapper.state('renderDay').format('YYYY MM DD')).toBe(moment().format('YYYY MM DD'));
    instance.onNextHandler();
    const expectedRenderDay2 = moment().add(1, 'month').format('YYYY MM DD')
    expect(wrapper.state('renderDay').format('YYYY MM DD')).toBe(expectedRenderDay2);
  });
  
});
