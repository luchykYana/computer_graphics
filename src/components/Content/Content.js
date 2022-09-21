import {Outlet} from "react-router";

import {Header} from "../Header/Header";

const Content = () => {
    return (
        <div>
            <Header/>
            <Outlet/>
        </div>
    );
};

export {Content};