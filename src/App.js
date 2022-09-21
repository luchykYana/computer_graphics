import React, {Component} from 'react';
import {Route, Routes} from "react-router";

import {ColorModelsPage, FigureMovementPage, FirstPage, FractalPage} from "./pages";
import {Content} from "./components";

import './App.css';

class App extends Component {
    render() {
        return (
            <Routes>
                <Route path={'/'} element={<FirstPage/>}/>
                <Route path={'content'} element={<Content/>}>
                    <Route path={'fractal'} element={<FractalPage/>}/>
                    <Route path={'color-models'} element={<ColorModelsPage/>}/>
                    <Route path={'move-figure'} element={<FigureMovementPage/>}/>
                </Route>
            </Routes>
        );
    }
}

export default App;