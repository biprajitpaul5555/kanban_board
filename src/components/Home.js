import React from "react";
import Card from "./Card";
import ColumnHeader from "./ColumnHeader";
import highPriority from "../icons_FEtask/Img - High Priority.svg";
import { useContext } from "react";
import DataContext from "../context/DataContext";
import Backlog from "../icons_FEtask/Backlog.svg";
import ToDo from "../icons_FEtask/To-do.svg";
import inprogress from "../icons_FEtask/in-progress.svg";
import done from "../icons_FEtask/Done.svg";
import cancelled from "../icons_FEtask/Cancelled.svg";
import noPriority from "../icons_FEtask/No-priority.svg";
import urgent from "../icons_FEtask/SVG - Urgent Priority colour.svg";
import high from "../icons_FEtask/Img - High Priority.svg";
import medium from "../icons_FEtask/Img - Medium Priority.svg";
import low from "../icons_FEtask/Img - Low Priority.svg";

const Home = () => {
    const { grouping, setGrouping, ordering, setOrdering, finalStage } = useContext(DataContext);
    let content;
    const statusHeadingArr = ["Backlog", "To Do", "In Progress", "Done", "Cancelled"];
    const statusLogoArr = [Backlog, ToDo, inprogress, done, cancelled];
    const userHeadingArr = ["Anoop sharma", "Yogesh", "Shankar Kumar", "Ramesh", "Suresh"];
    const prioHeadingArr = ["No priority", "Urgent", "High", "Medium", "Low"];
    const prioLogoArr = [noPriority, urgent, high, medium, low];

    if (grouping === "Status") {
        content = finalStage.map((arr, idx) => {
            <div className="column" key={idx}>
                <ColumnHeader logo={statusLogoArr[idx]} heading={statusHeadingArr[idx]} cnt={arr.length} />
                {arr.map((ticket, idx) => {
                    <Card key={idx} ticket={ticket} />;
                })}
            </div>;
        });
    } else if (grouping === "User") {
        content = finalStage.map((arr, idx) => {
            <div className="column" key={idx}>
                <ColumnHeader logo={"https://via.placeholder.com/30"} heading={userHeadingArr[idx]} cnt={arr.length} />
                {arr.map((ticket, idx) => {
                    <Card key={idx} ticket={ticket} />;
                })}
            </div>;
        });
    } else if (grouping === "Priority") {
        content = finalStage.map((arr, idx) => {
            <div className="column" key={idx}>
                <ColumnHeader logo={prioLogoArr[idx]} heading={prioHeadingArr[idx]} cnt={arr.length} />
                {arr.map((ticket, idx) => {
                    <Card key={idx} ticket={ticket} />;
                })}
            </div>;
        });
    }
    return (
        <div className="kanban-board">
            {content}
            {/* <div className="column">
                <ColumnHeader logo={highPriority} heading={"Todo"} cnt={4} />
                <Card />
                <Card />
                <Card />
                <Card />
            </div>

            <div className="column">
                <div className="column-header">In Progress</div>
                <Card />
            </div>

            <div className="column">
                <div className="column-header">Done</div>
                <Card />
                <Card />
            </div>

            <div className="column">
                <div className="column-header">Canceled</div>
            </div>
            <div className="column">
                <div className="column-header">Canceled</div>
                <Card />
            </div> */}
        </div>
    );
};

export default Home;
