import { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom"
import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users} from "../components/Users"

export const Dashboard = () => {
    return (
        <div className="space-y-3">
            <Appbar/>
            <Balance/>
            <Users/>
        </div>
    );
};
