import {Outlet} from 'react-router';
import {Footer} from '../../components';

import css from './FigureMovementPage.module.css'

const FigureMovementPage = () => {
    return (
        <div>
            <Outlet/>
            <Footer color={"red"}/>
        </div>
    );
};

export {FigureMovementPage};