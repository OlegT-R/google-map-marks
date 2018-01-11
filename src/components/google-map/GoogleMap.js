import React from 'react';
import PropTypes from 'prop-types';
import Map from '../../services/MapService';

export default class GoogleMap extends React.PureComponent {
    static propTypes = {
        dots: PropTypes.arrayOf(PropTypes.object),
        center: PropTypes.object.isRequired,
        onDragMarker: PropTypes.func,
    };

    static defaultProps = {
        dots: [],
    };

    constructor(props) {
        super(props);
        this.map = null;
        this.markers = [];
    }

    componentDidMount() {
        const {dots, center} = this.props;
        this.mapService = new Map(this.mapContainer, center, this.onDragMarker);
        this.mapService.updateMap(dots);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.center !== this.props.center){
            this.mapService && this.mapService.setCenter(nextProps.center);
        }
    }

    onDragMarker = (uuid, position) => {
        this.props.onDragMarker && this.props.onDragMarker(uuid, position);
    };


    render() {
        const {dots} = this.props;
        this.mapService && this.mapService.updateMap(dots);
        return (
            <div className="map-container"
                 style={{width: '100%', height: '40rem'}}
                 ref={(div) => this.mapContainer = div}>
            </div>
        );
    }
}
