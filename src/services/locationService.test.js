import React from 'react';
import getUserLocation from './locationService';

describe('locationService', () => {
    it('should return value', () => {
       const promise = getUserLocation();
        expect(promise).to.be.instanceOf(Promise);
    });
});
