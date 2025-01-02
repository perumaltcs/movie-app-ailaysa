
import './Layout.css';

import { Outlet } from 'react-router-dom';

import Navbar from '../navbar/Navbar';


const Layout = () => {
    return (
        <div className="layout">
            <div>
                <Navbar />
            </div>
            <div className='content'>
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
