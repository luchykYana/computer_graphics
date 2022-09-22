import {Outlet} from "react-router";
import {Footer} from "../../components";

const FractalPage = () => {
    return (
        <div>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export {FractalPage};