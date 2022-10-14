import {Outlet} from 'react-router';
import {Footer} from '../../components';

const FigureMovementPage = () => {
    return (
        <div>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export {FigureMovementPage};