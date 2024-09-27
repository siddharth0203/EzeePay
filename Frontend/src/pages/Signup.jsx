import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios";
import { useNavigate } from "react-router-dom"

export const Signup = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className=" flex items-center justify-center min-h-screen w-full bg-black">
      <div className="flex justify-center">
        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <Heading label={"Sign up"} />
          <SubHeading label={"Enter your information to create an account"} />
          <InputBox onChange={(e) => { setFirstName(e.target.value) }} placeholder="Siddharth" label={"First Name"} />
          <InputBox onChange={(e) => { setLastName(e.target.value) }} placeholder="Jamalpur" label={"Last Name"} />
          <InputBox onChange={(e) => { setUsername(e.target.value) }} placeholder="jamalpursiddharth02@gmail.com" label={"Email"} />
          <InputBox onChange={(e) => { setPassword(e.target.value) }} placeholder="123456" label={"Password"} />
          <div className="pt-4">
            <Button onClick={async () => {
              try {
                const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                  username,
                  firstname,
                  lastname,
                  password
                });
                localStorage.setItem("token", response.data.token);
                navigate("/dashboard");
              } catch (error) {
                console.error("Signup error:", error.response?.data || error.message);
              }              
            }} label={"Sign up"} />
          </div>
          <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
        </div>
      </div>
    </div>
  );
}
