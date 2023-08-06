import "./sidebar.scss";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons';

const Sidebar = (props) => {
    const FilterTicker = () => {
        let list = [];

        for (const k in props.data) {
            list.push(<li key={k}><a onClick={() => props.tickerFunction(props.data[k]['name'])}>{props.data[k]['name']}
                <FontAwesomeIcon icon={faChevronRight}/></a></li>)
        }
        list.push(<li key={props.data.length + 1}><a onClick={() => props.tickerFunction("all")}>All
            <FontAwesomeIcon icon={faChevronRight}/></a></li>)
        return list;
    }

    return (
        <div className="sidebar">
            <div className="top">
                <div className="logo">Ace Admin</div>
            </div>
            <div className="filter">
                <ul>
                    <p className="title">Filter</p>
                    <FilterTicker/>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar;
