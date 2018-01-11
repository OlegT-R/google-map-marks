import React from 'react';
import {shallow, mount} from 'enzyme';
import FlexContainer from './flexContainer';

describe('<FlexContainer />', () => {

    it('should render a flex container', () => {
        const wrapper = shallow(<FlexContainer leftArea={null} rightArea={null}/>);
        expect(wrapper).toMatchSnapshot();
    });

    it('allows us to set props', () => {
        const wrapper = mount(<FlexContainer leftArea='left' rightArea='right'/>);
        expect(wrapper.props().leftArea).to.equal('left');
        expect(wrapper.props().rightArea).to.equal('right');
        wrapper.setProps({ leftArea: 'leftArea' });
        expect(wrapper.props().leftArea).to.equal('leftArea');
    });
});