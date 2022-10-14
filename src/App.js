import React, {Component} from 'react';
import {Route, Routes} from 'react-router';

import {
    ColorModelsPage, ColorPracticePage,
    MovePracticePage, FigureMovementPage,
    FirstPage,LastPage,
    FractalPage,
    FractalPracticePage,
    FractalTestPage
} from './pages';
import {ColorModelsTheory, Content, FractalTheory, MoveFigureTheory} from './components';

import './App.css';

class App extends Component {
    render() {
        return (
            <Routes>
                <Route path={'/'} element={<FirstPage/>}/>

                <Route path={'content'} element={<Content/>}>

                    <Route path={'fractal'} element={<FractalPage/>}>
                        <Route index element={<FractalTheory/>}/>
                        <Route path={'practice'} element={<FractalPracticePage/>}/>
                        <Route path={'test'} element={<FractalTestPage/>}/>
                    </Route>

                    <Route path={'color-models'} element={<ColorModelsPage/>}>
                        <Route index element={<ColorModelsTheory/>}/>
                        <Route path={'practice'} element={<ColorPracticePage/>}/>
                    </Route>
                    <Route path={'move-figure'} element={<FigureMovementPage/>}>
                        <Route index element={<MoveFigureTheory/>}/>
                        <Route path={'practice'} element={<MovePracticePage/>}/>
                    </Route>

                </Route>

                <Route path={'finish'} element={<LastPage/>}/>
            </Routes>
        );
    }
}

export default App;