import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';

export class NavMenu extends React.Component<{}, {}> {
    public render() {
        return <div className='collapse navbar-collapse'>
            <a className="navbar-brand" href="#">Save Property Tax</a> 
                    <div className="collapse navbar-collapse" id="navbarCollapse">                            
                        <NavLink to={'/'} exact activeClassName='active' className="navbar-brand">
                            <span className='glyphicon glyphicon-home'></span> Home
                        </NavLink>                            
                        <NavLink to={'/counter'} activeClassName='active' className="navbar-brand">
                                <span className='glyphicon glyphicon-education'></span> Counter
                        </NavLink>                     
                        <NavLink to={'/fetchdata'} activeClassName='active' className="navbar-brand">
                                <span className='glyphicon glyphicon-th-list'></span> Fetch data
                         </NavLink>
                    </div>
            </div>;
    }
}
