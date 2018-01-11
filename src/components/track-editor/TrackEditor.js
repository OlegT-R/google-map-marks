import React from 'react';
import PropTypes from 'prop-types';
import Input from '../input/Input';
import './track-editor.scss';
import Sortable from 'react-sortablejs';

export default class TrackEditor extends React.PureComponent {
    static propTypes = {
        onAdd: PropTypes.func,
        onRemove: PropTypes.func,
        onChangeSort: PropTypes.func,
        dots: PropTypes.arrayOf(PropTypes.object),
    };

    static defaultProps = {
        dots: [],
    };

    onRemove = (e, index) => {
        e.stopPropagation();
        this.props.onRemove && this.props.onRemove(index);
    };

    render() {
        const {onAdd, dots, onChangeSort} = this.props;
        return (
            <div className="track-editor">
                <Input placeholder="Новая точка маршрута" onChanged={onAdd} clearAfterChanged/>
                <div className="dots-container">
                    <Sortable options={{animation: 120}} onChange={onChangeSort}>
                        {dots.map((item, index) =>
                            <div key={index} className="dot-item" title={item.name} data-id={index}>
                                <div className="cut-text">{item.name}</div>
                                <span className='ico-close' onClick={(e) => this.onRemove(e, index)}/>
                            </div>
                        )}
                    </Sortable>
                </div>
            </div>
        );
    }
}
