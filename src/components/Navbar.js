import React from "react";
import Display from "../icons_FEtask/Display.svg";
import down from "../icons_FEtask/down.svg";
import { useContext } from "react";
import DataContext from "../context/DataContext";

const Navbar = () => {
    // const { grouping, setGrouping, ordering, setOrdering, finalStage } = useContext(DataContext);
    const { setGrouping, setOrdering } = useContext(DataContext);

    function myFunction() {
        document.getElementById("myDropdown").classList.toggle("show");
    }

    const handleChange1 = (e) => {
        setGrouping(e.target.value);
    };
    const handleChange2 = (e) => {
        setOrdering(e.target.value);
    };
    return (
        <nav>
            <div className="dropdown">
                <button onClick={myFunction} className="dropbtn">
                    <img src={Display} alt="Display" />
                    Display
                    <img src={down} alt="down" />
                </button>
                <div id="myDropdown" className="dropdown-content">
                    <div>
                        <span>Grouping</span>
                        <select name="grouping" id="grouping" onChange={handleChange1}>
                            <option value="Status">Status</option>
                            <option value="User">User</option>
                            <option value="Priority">Priority</option>
                        </select>
                    </div>
                    <div>
                        <span>Ordering</span>
                        <select name="ordering" id="ordering" onChange={handleChange2}>
                            <option value="Priority">Priority</option>
                            <option value="Title">Title</option>
                        </select>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
