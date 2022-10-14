import {Outlet} from 'react-router';

import {Footer} from '../../components';

const ColorModelsPage = () => {
    return (
        <div>
            <Outlet/>
            <Footer color={"yellow"}/>
        </div>
    );
};

export {ColorModelsPage};