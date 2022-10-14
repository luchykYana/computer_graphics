import {Outlet} from 'react-router';
import {Footer} from '../../components';

const FigureMovementPage = () => {
    return (
        <div>
            <Outlet/>
            <Footer color={"red"}/>
        </div>
    );
};

export {FigureMovementPage};