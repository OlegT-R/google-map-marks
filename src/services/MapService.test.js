import React from 'react';
import MapService from './MapService';

describe('MapService', () => {
    it('test constructor', () => {
        const wrapper = <div />;
        const center = {
            lng: 0,
            lat: 0,
        };
        const onDrag = () => null;
        const map = new MapService(wrapper, center, onDrag);
        expect(map.center).to.equal(center);
        expect(map.map).to.be.instanceOf(google.maps);
    });

    it('test adding dots', () => {
        const wrapper = <div />;
        const center = {
            lng: 0,
            lat: 0,
        };
        const onDrag = () => null;
        const map = new MapService(wrapper, center, onDrag);
        const dots = [
            {lng: 1, lat: 1, name: '1', uuid: '1'},
            {lng: 2, lat: 2, name: '2', uuid: '2'}
        ];
        map.update(dots, center);
        expect(map.markers.length).to.equal(2);
    });

    it('test remooving dots', () => {
        const wrapper = <div />;
        const center = {
            lng: 0,
            lat: 0,
        };
        const onDrag = () => null;
        const map = new MapService(wrapper, center, onDrag);
        const initDots = [
            {lng: 1, lat: 1, name: '1', uuid: '1'},
            {lng: 2, lat: 2, name: '2', uuid: '2'}
        ];
        const newDots = [
            {lng: 1, lat: 1, name: '1', uuid: '1'},
        ];
        map.update(initDots, center);
        expect(map.markers.length).to.equal(1);
    });
});
