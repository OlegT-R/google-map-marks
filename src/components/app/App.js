import React, {Component} from 'react';
import AppScene from '../app-scene/AppScene';

class App extends Component {
    render() {
        return (
            <section className="app">
                <div className="grid">
                    <h1>Тестовое задание: редактор маршрутов.</h1>
                    <AppScene />
                </div>
            </section>
        );
    }
}

export default App;
