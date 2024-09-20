// import { createContext, useState, useEffect } from "react";
// import useAxiosFetch from "../hooks/useAxiosFetch";
// import axios from "axios";

// const DataContext = createContext({});

// export const DataProvider = ({ children }) => {
//     // const [data, setData] = useState({});
//     const [tickets, setTickets] = useState([]);
//     const [users, setUsers] = useState([]);
//     const [grouping, setGrouping] = useState("Status");
//     const [ordering, setOrdering] = useState("Priority");
//     const [finalStage, setFinalStage] = useState([]);

//     // const data = useAxiosFetch("https://api.quicksell.co/v1/internal/frontend-assignment/");
//     // console.log(data);
//     const fetchData = async () => {
//         try {
//             const response = await axios.get("https://api.quicksell.co/v1/internal/frontend-assignment/");
//             console.log(response);
//             console.log(response.data.tickets);
//             setTickets(response.data.tickets);
//             setUsers(response.data.users);
//             // setData(response.data);
//         } catch (err) {
//             // setData({});
//         }
//     };

//     useEffect(() => {
//         fetchData();
//     }, []);
//     // console.log(data);

//     useEffect(() => {
//         // setTickets(data.tickets);
//         // setUsers(data.users);
//         setTickets((cur) => {
//             return cur.map((ticket) => {
//                 const user = users.find((val) => val.id === ticket.userId);
//                 return { ...ticket, userName: user.name, userAvailable: user.available };
//             });
//         });
//     }, []);

//     let finalArr = [[], [], [], [], []];
//     useEffect(() => {
//         if (grouping === "Status") {
//             tickets.forEach((ticket) => {
//                 if (ticket.status === "Backlog") finalArr[0].push(ticket);
//                 else if (ticket.status === "Todo") finalArr[1].push(ticket);
//                 else if (ticket.status === "In progress") finalArr[2].push(ticket);
//                 else if (ticket.status === "Done") finalArr[3].push(ticket);
//                 else if (ticket.status === "Canceled") finalArr[4].push(ticket);
//             });
//         } else if (grouping === "User") {
//             tickets.forEach((ticket) => {
//                 if (ticket.userName === "Anoop sharma") finalArr[0].push(ticket);
//                 else if (ticket.userName === "Yogesh") finalArr[1].push(ticket);
//                 else if (ticket.userName === "Shankar Kumar") finalArr[2].push(ticket);
//                 else if (ticket.userName === "Ramesh") finalArr[3].push(ticket);
//                 else if (ticket.userName === "Suresh") finalArr[4].push(ticket);
//             });
//         } else if (grouping === "Priority") {
//             tickets.forEach((ticket) => {
//                 finalArr[4 - ticket.priority].push(ticket);
//             });
//         }

//         for (let i = 0; i < 5; i++) {
//             if (ordering === "Priority") finalArr[i].sort((a, b) => b - a);
//             else if (ordering === "Title") finalArr[i].sort();
//         }

//         console.log(finalArr);

//         setFinalStage(finalArr);
//     }, [grouping, ordering]);

//     return (
//         <DataContext.Provider value={{ grouping, setGrouping, ordering, setOrdering, finalStage }}>
//             {children}
//         </DataContext.Provider>
//     );
// };

// export default DataContext;
import { createContext, useState, useEffect } from "react";
import axios from "axios";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    const [tickets, setTickets] = useState([]);
    const [users, setUsers] = useState([]);
    const [grouping, setGrouping] = useState("Status");
    const [ordering, setOrdering] = useState("Priority");
    const [finalStage, setFinalStage] = useState([]);

    // Fetch data only when the component mounts
    const fetchData = async () => {
        try {
            const response = await axios.get("https://api.quicksell.co/v1/internal/frontend-assignment/");
            console.log(response.data);
            setTickets(response.data.tickets);
            setUsers(response.data.users);
        } catch (err) {
            console.error(err); // Log error for debugging
        }
    };

    // Use useEffect to fetch data only once (on component mount)
    useEffect(() => {
        fetchData(); // Fetch only once on mount
    }, []); // Empty dependency array ensures it runs only once when the component mounts

    // Only update tickets with users when both users and tickets are available
    useEffect(() => {
        if (tickets.length > 0 && users.length > 0) {
            const updatedTickets = tickets.map((ticket) => {
                const user = users.find((val) => val.id === ticket.userId);
                if (user) {
                    return { ...ticket, userName: user.name, userAvailable: user.available };
                }
                return ticket;
            });
            setTickets(updatedTickets); // Update the tickets once with user data
        }
    }, [tickets, users]); // Only run this when `tickets` or `users` change

    // Grouping and sorting logic
    useEffect(() => {
        if (tickets.length > 0) {
            let finalArr = [[], [], [], [], []]; // Define finalArr inside the useEffect

            if (grouping === "Status") {
                tickets.forEach((ticket) => {
                    if (ticket.status === "Backlog") finalArr[0].push(ticket);
                    else if (ticket.status === "Todo") finalArr[1].push(ticket);
                    else if (ticket.status === "In progress") finalArr[2].push(ticket);
                    else if (ticket.status === "Done") finalArr[3].push(ticket);
                    else if (ticket.status === "Canceled") finalArr[4].push(ticket);
                });
            } else if (grouping === "User") {
                tickets.forEach((ticket) => {
                    if (ticket.userName === "Anoop sharma") finalArr[0].push(ticket);
                    else if (ticket.userName === "Yogesh") finalArr[1].push(ticket);
                    else if (ticket.userName === "Shankar Kumar") finalArr[2].push(ticket);
                    else if (ticket.userName === "Ramesh") finalArr[3].push(ticket);
                    else if (ticket.userName === "Suresh") finalArr[4].push(ticket);
                });
            } else if (grouping === "Priority") {
                tickets.forEach((ticket) => {
                    finalArr[4 - ticket.priority].push(ticket);
                });
            }

            // Sort by ordering
            for (let i = 0; i < 5; i++) {
                if (ordering === "Priority")
                    finalArr[i].sort((a, b) => b.priority - a.priority); // Use actual values for comparison
                else if (ordering === "Title") finalArr[i].sort((a, b) => a.title.localeCompare(b.title)); // Sorting by title alphabetically
            }

            console.log("Final Array:", finalArr);
            setFinalStage(finalArr); // Only set after processing
        }
    }, [tickets, grouping, ordering]); // Re-run this effect when tickets, grouping, or ordering changes

    return (
        <DataContext.Provider value={{ grouping, setGrouping, ordering, setOrdering, finalStage }}>
            {children}
        </DataContext.Provider>
    );
};

export default DataContext;
