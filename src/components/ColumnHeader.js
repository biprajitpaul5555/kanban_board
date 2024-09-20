import React from "react";
import add from "../icons_FEtask/add.svg";
import threeDot from "../icons_FEtask/3 dot menu.svg";

const ColumnHeader = ({ logo, heading, cnt }) => {
    return (
        <div className="column-header">
            <div style={{ display: "flex", marginRight: "4px" }}>
                <img src={logo} alt="logo" />
                <p>{heading}</p>
                <p>{cnt}</p>
            </div>
            <div>
                <img src={add} alt="add" />
                <img src={threeDot} alt="threeDot" />
            </div>
        </div>
    );
};

export default ColumnHeader;
