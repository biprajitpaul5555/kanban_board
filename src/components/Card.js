import React from "react";
import todo from "../icons_FEtask/To-do.svg";
import exclamation from "../icons_FEtask/SVG - Urgent Priority colour.svg";

const Card = () => {
    return (
        <div className="card">
            <div className="card-header">
                <div className="task-id">CAM-11</div>
                <div className="profile-pic">
                    <img src="https://via.placeholder.com/30" alt="User Profile" />
                </div>
            </div>
            <div className="card-body">
                <img src={todo} alt="todo" />
                <h4 style={{ display: "inline" }}>Conduct Security Vulnerability Assessment</h4>
                <div className="tag-section">
                    <div className="icon-tag">
                        {/* <span>⚠️</span> */}
                        <span>
                            <img src={exclamation} alt="exclamation" />
                        </span>
                    </div>
                    <div className="label-tag">
                        <span>Feature Request</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
