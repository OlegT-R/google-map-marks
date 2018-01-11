import React from 'react';
import {shallow, mount, render} from 'enzyme';
import sinon from 'sinon';
import GoogleMap from './GoogleMap';
import Input from '../input/Input';

describe('<GoogleMap />', () => {

    it('should render a google maps', () => {
        const center = {
            long: 0,
            lat: 0,
        };
        const wrapper = shallow(<GoogleMap center={center}/>);
        expect(wrapper).toMatchSnapshot();
    });

    it('test set props', () => {
        const center = {
            long: 0,
            lat: 0,
        };
        const wrapper = mount(<TrackEditor center={center} />);
        expect(wrapper.props().dots).to.equal(center);
    });

    it('test render map', () => {
        const center = {
            long: 0,
            lat: 0,
        };
        const wrapper = render(<TrackEditor center={center}/>);
        expect(wrapper.find('.gm-style').length).to.equal(1);
    });

    it('calls componentDidMount', () => {
        sinon.spy(TrackEditor.prototype, 'componentDidMount');
        const wrapper = mount(<TrackEditor />);
        expect(TrackEditor.prototype.componentDidMount).to.have.property('callCount', 1);
        TrackEditor.prototype.componentDidMount.restore();
    });

});
