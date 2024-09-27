import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios";
import { useNavigate } from "react-router-dom"

export const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className=" flex items-center justify-center min-h-screen w-full bg-black">
      <div className="flex justify-center">
        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <Heading label={"Sign In"} />
          <SubHeading label={"Enter your account log in information below"} />
          <InputBox onChange={(e) => { setUsername(e.target.value) }} placeholder="jamalpursiddharth02@gmail.com" label={"Email"} />
          <InputBox onChange={(e) => { setPassword(e.target.value) }} placeholder="123456" label={"Password"} />
          <div className="pt-4">
            <Button
              onClick={async () => {
                try {
                  // Send login credentials to the backend for verification6
                  const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                  username,
                  password,
                  });
                  // Check if the response indicates a successful login
                  if (response.status === 200 && response.data.token) {
                    // Navigate to the dashboard if login is successful
                    navigate("/dashboard");
                  } else {
                    // If login fails, display an error message
                    alert("Invalid login credentials. Please try again.");
                  }
                } catch (error) {
                    console.error("Error during login:", error.response?.data || error.message);
                    alert("Error during login, please check your credentials or try again.");
                  }
                }}
                label={"Sign In"}
              />
            </div>
          <BottomWarning label={"Don't have an account"} buttonText="Sign Up" to={"/signup"}/>
        </div>
      </div>
    </div>
  );
}
