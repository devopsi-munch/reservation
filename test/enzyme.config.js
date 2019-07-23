import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import '@babel/polyfill';

Enzyme.configure({ adapter: new Adapter() });

export default shallow;