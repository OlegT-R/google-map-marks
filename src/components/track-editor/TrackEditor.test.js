import React from 'react';
import {shallow, mount, render} from 'enzyme';
import sinon from 'sinon';
import TrackEditor from './TrackEditor';
import Input from '../input/Input';

describe('<TrackEditor />', () => {

    it('should render a track editor', () => {
        const wrapper = shallow(<TrackEditor />);
        expect(wrapper).toMatchSnapshot();
    });

    it('test set props', () => {
        const wrapper = mount(<TrackEditor dots={[]} />);
        expect(wrapper.props().dots).to.equal([]);
        wrapper.setProps({ dots: ['dot1'] });
        expect(wrapper.props().leftArea).to.equal('dot1');
    });

    it('test render <Input /> components', () => {
        const wrapper = shallow(<TrackEditor />);
        expect(wrapper.find(Input)).to.have.length(1);
    });

    it('test render 3 dots', () => {
        const dots = [{name: '1'}, {name: '2'}, {name: '3'}];
        const wrapper = render(<TrackEditor dots={dots}/>);
        expect(wrapper.find('.dot-item').length).to.equal(3);
    });

    it('simulates click events', () => {
        const onButtonClick = sinon.spy();
        const wrapper = shallow(<TrackEditor onAdd={onButtonClick} />);
        wrapper.find('button').simulate('click');
        expect(onButtonClick).to.have.property('callCount', 1);
    });
});
