import "./navbar.scss";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';

/**
 * Navigation bar with logout function
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Navbar = (props) => {
    return (
        <div className="navbar">
            <div className="wrapper">
                <div className="items">
                    <div className="item">
                        Welcome, {props.userName}
                    </div>
                    <div className="item">
                        <FontAwesomeIcon icon={faUser}/>
                        <div className="profile">
                            <ul>
                                <li><a onClick={props.logoutFunc}>Logout</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar;
