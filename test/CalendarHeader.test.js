import React from 'react';
import CalendarHeader from '../client/src/component/CalendarHeader.jsx';
import moment from 'moment';
import { mount } from 'enzyme';

describe('CalendarHeader', () => {
  const wrapper = mount(<CalendarHeader renderDay={moment()} />);
  const instance = wrapper.instance();

  beforeEach(() => {
    wrapper.setProps({
      renderDay: moment()
    });
  });

  it('should return the month and year of renderDay when getMonthAndYear is called', () => {
    expect(instance.getMonthAndYear()).toEqual(moment().format('MMMM Y'));
  });

  it('should call onPreHandler when left arrow is clicked', () => {
    const onPreHandlerMock = jest.fn();
    wrapper.setProps({
      onPreHandler: onPreHandlerMock
    })
    wrapper.find('#prevButton').simulate('click');
    expect(onPreHandlerMock).toBeCalled();
  })
  
  it('should call onNextHandler when right arrow is clicked', () => {
    const onNextHandlerMock = jest.fn();
    wrapper.setProps({
      onNextHandler: onNextHandlerMock
    })
    wrapper.find('#nextButton').simulate('click');
    expect(onNextHandlerMock).toBeCalled();
  })

});