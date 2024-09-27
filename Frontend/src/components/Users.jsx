import axios from "axios";
import { Button } from "./Button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Users = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`)
            .then((response) => {
                setUsers(response.data.user);
            });
    }, [filter]);

    return (
        <div className="text-white">
            <nav className="dark:bg-gray-800 rounded shadow bg-white p-2">
                <div className="px-4 flex flex-col items-start text-white space-y-2">
                    <span className="font-semibold text-xl tracking-tight">
                        Search Users
                    </span>
                    <input
                        onChange={(e) => {
                            setFilter(e.target.value);
                        }}
                        type="text"
                        placeholder="Search users"
                        className="mt-2 p-1 rounded text-black"
                    />
                    {users.map((user) => (
                        <div key={user._id} className="p-2 bg-gray-700 rounded mt-2 w-full flex justify-between items-center">
                            <span className="text-white font-bold">{user.firstname + "  " + user.lastname}</span>
                            <span>
                                <Button
                                    onClick={() => navigate("/send?id="+user._id+"&name="+user.firstname)}
                                    label="Send Money"
                                />
                            </span>
                        </div>
                    ))}
                </div>
            </nav>
        </div>
    );
};

// function User({user}) {
//     const navigate = useNavigate();

//     return <div className="flex justify-between">
//         <div className="flex">
//             <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
//                 <div className="flex flex-col justify-center h-full text-xl">
//                     {user.firstName[0]}
//                 </div>
//             </div>
//             <div className="flex flex-col justify-center h-ful">
//                 <div>
//                     {user.firstName} {user.lastName}
//                 </div>
//             </div>
//         </div>

//         <div className="flex flex-col justify-center h-ful">
//             <Button onClick={(e) => {
//                 navigate("/send?id=" + user._id + "&name=" + user.firstName);
//             }} label={"Send Money"} />
//         </div>
//     </div>
// }