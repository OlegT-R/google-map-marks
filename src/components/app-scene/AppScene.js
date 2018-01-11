import React from 'react';
import uuid from 'uuid';
import FlexContainer from '../flex-container/flexContainer';
import TrackEditor from '../track-editor/TrackEditor';
import GoogleMap from '../google-map/GoogleMap';
import {getUserLocation} from '../../services/locationService';
import mapUtils from '../../utils/mapUtils';
import storage from '../../utils/localStorageUtils'

const storageKey = 'tzStorageKey';

async function initCenter() {
    const result = await getUserLocation();
    if (!result.error) {
        const center = {
            lng: result.lng,
            lat: result.lat,
        };
        this.setState({center: center});
    } else {
        alert(result.error.message);
    }
}

function getNewDot(name) {
    return {
        name: name,
        lng: 0,
        lat: 0,
        uuid: uuid.v1(),
    }
}

function getDefaultCenter(dots) {
    if (dots.length) {
        return {
            lng: dots[0].lng,
            lat: dots[0].lat,
        }
    }
    return mapUtils.defaultPosition;
}

export default class AppScene extends React.Component {

    static defaultProps = {
        dots: storage.getData(storageKey) || [],
    };

    constructor(props) {
        super(props);
        this.state = {
            dots: props.dots,
            center: getDefaultCenter(props.dots),
        }
    }

    componentDidMount() {
        // if(this.state.center === mapUtils.defaultPosition){//Todo: need this ->Not update center if dots exist in storage, center = 1'st dot?
        initCenter.call(this);
        //}
    }

    updateStorage = (dots) => {
        storage.setData(dots, storageKey);
    };

    onDotAdd = (name) => {
        name = name.trim();
        if (name === '') return;

        const {dots} = this.state;
        const newDots = dots.concat(getNewDot(name));
        this.setState({dots: newDots});
        this.updateStorage(dots);
    };

    onRemove = (index) => {
        const {dots} = this.state;
        dots.splice(index, 1);
        this.setState({dots: [...dots]});
        this.updateStorage(dots);
    };

    onDragMarker = (uuid, position) => {
        const {dots} = this.state;
        const changedDot = dots.find((el) => el.uuid === uuid);
        if (changedDot) {
            changedDot.lng = position.lng;
            changedDot.lat = position.lat;
        }
        this.updateStorage(dots);
    };

    onChangeSort = (positions) => {
        const sortedArray = [];
        const {dots} = this.state;
        for (let i = 0; i < positions.length; i++) {
            const position = +positions[i];
            sortedArray.push(dots[position]);
        }
        this.setState({dots: sortedArray});
        this.updateStorage(sortedArray);
    };

    render() {
        const {dots, center} = this.state;
        const leftArea = <TrackEditor
            onAdd={this.onDotAdd}
            onRemove={this.onRemove}
            dots={this.state.dots}
            onChangeSort={this.onChangeSort}/>;
        const rightArea = <GoogleMap dots={dots} center={center} onDragMarker={this.onDragMarker}/>;
        return <FlexContainer leftArea={leftArea} rightArea={rightArea}/>;
    }
}
