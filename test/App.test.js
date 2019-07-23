import React from 'react';
import App from '../client/src/component/App.jsx';
import moment from 'moment';
import { mount } from 'enzyme';

describe('App', () => {

  const wrapper = mount(<App />);
  const instance = wrapper.instance();

  beforeEach(() => {
    wrapper.setState({
      chosenDay: moment(),
      chosenTime: '1900',
      partyNum: 4,
      spotLeft: null
    });
  });
  
  it('should update relative state when onChangeHandler is called', () => {
    expect(wrapper.state('chosenTime')).toBe('1900');
    instance.onChangeHandler('chosenTime', '2000');
    expect(wrapper.state('chosenTime')).toBe('2000');

    expect(wrapper.state('partyNum')).toBe(4);
    instance.onChangeHandler('partyNum', 7);
    expect(wrapper.state('partyNum')).toBe(7);
  });

  it('should update chosenDay when onChosenHandler is called', () => {
    expect(wrapper.state('chosenDay').format('YYYY MM DD')).toBe(moment().format('YYYY MM DD'));
    instance.onChosenHandler(1563066000);
    expect(wrapper.state('chosenDay').unix()).toBe(1563066000);
  });

  it('should display proper available spots message if they are low', async () => {
    await wrapper.setState({spotLeft: 30});
    expect(instance.displaySpotsLeftMessage()).toBe(undefined);
    
    await wrapper.setState({spotLeft: 5});
    const actualMessage = instance.displaySpotsLeftMessage().props.children.join('')
    const expectedMessage = `Reserve Soon! Only 1 reservation(s) available for party of 4`;
    expect(actualMessage).toEqual(expectedMessage);

    await wrapper.setState({spotLeft: 3});
    const actualMessage2 = instance.displaySpotsLeftMessage().props.children.join('')
    const expectedMessage2 = `Sorry, there's no more online reservations available for party of 4`;
    expect(actualMessage2).toEqual(expectedMessage2);
  });

  it('should invoke onChangeHandler when an an option is selected for time picker', () => {
    jest.spyOn(instance, 'onChangeHandler');
    wrapper.find('#timePicker').simulate('change', {target: { value : '2000'}});
    expect(instance.onChangeHandler).toBeCalled();
  })

  it('should invoke onChangeHandler when an an option is selected for party size picker', () => {
    jest.spyOn(instance, 'onChangeHandler');
    wrapper.find('#partySizePicker').simulate('change', {target: { value : '2000'}});
    expect(instance.onChangeHandler).toBeCalled();
  })
});

