import axios from "axios";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
export const SendMoney = () => {
    const [amount, setAmount] = useState("");
    const [message, setMessage] = useState("");
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name =searchParams.get("name");
    return (
        <div className="flex h-screen items-center justify-center">
            <div className="w-[365px] rounded-lg bg-white p-4 shadow dark:bg-gray-800">
                <div className="m-3">
                    <div className="font-bold text-4xl mb-2 text-white">Send Money</div>
                    <div className="text-slate-500 text-md mb-2">How much would you like to send?</div>
                    <input
                        onChange={(e)=>{
                            setAmount(e.target.value);
                        }}
                        className="w-full mt-1 p-2 border border-[#A0ABBB] rounded-[4px] text-black"
                        placeholder="Enter your amount here"
                        type="text"
                    />
                </div>
                <div className="m-3">
                    <div className="flex items-center gap-x-2 p-3 bg-neutral-100 rounded-[4px]">
                        <img
                            className="h-10 w-10 rounded-full"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIf4R5qPKHPNMyAqV-FjS_OTBB8pfUV29Phg&s"
                            alt="Friend 1"
                        />
                        <div className="font-semibold text-black">{name}</div>
                    </div>
                </div>
                <div className="m-3">
                    <button className="w-full py-2 bg-green-700 rounded-[4px] text-white font-semibold" onClick={async ()=>{
                        const response = await axios.post("http://localhost:3000/api/v1/account/transfer",{
                            to : id,
                            amount
                        },{
                            headers: {
                                Authorization: "Bearer " + localStorage.getItem("token")
                            }                            
                        })
                        .then(response => {
                            setMessage("Transaction successful!")
                        })
                        .catch(error => {
                            setMessage("Transaction failed. Please try again")
                        })
                    }}>
                    Send
                    </button>
                    <p className="text-white">{message}</p>
                </div>
            </div>
        </div>
    );
};
