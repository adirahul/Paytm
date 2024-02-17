import axios from "axios";
import React, { useEffect, useState } from "react";
import { userProps } from "../utils/interfaces/userProps";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [users, setUsers] = useState<userProps[]>([]);
  const [query, setQuery] = useState<string>("");
  const navigate = useNavigate()


  useEffect(() => {
    async function getUsers() {
      const token = localStorage.getItem("token");
      let config = {
        headers: {
          Authorization: token,
        },
      };
      const response = await axios.get(
        "http://localhost:8000/api/v1/user/bulk?filter=" + query,
        config
      );
      console.log(response.data);
      setUsers(response.data.data);
    }
    getUsers();
  }, [query]);
  return (
    <>
      <div className="h-screen px-8">
        <Header>
          <div className="h-[20vh] flex items-center">
            <h2 className="flex-grow text-2xl font-bold">Payments App</h2>
            <div className="flex items-center">
              <h4 className="pr-6 ">Hello</h4>
              <button className="bg-gray-200 w-12 h-12 rounded-[50%]">U</button>
            </div>
          </div>
        </Header>
        <Content>
          <div className="h-[80vh]">
            <h2 className="text-lg text-gray-900 font-bold">
              Your Balance : $9000
            </h2>
            <div className="text-lg mt-10 font-bold">Users</div>
            <input
              type="text"
              name=""
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full my-2 p-4 font-medium border-2 rounded-md"
              placeholder="Search users"
            />

            {users.map((user, index) => (
              <div key={index} className="flex my-4 items-center">
                <div className="flex flex-grow items-center">
                  <button className="bg-gray-200 w-12 h-12 rounded-[50%]">
                    {user.firstName[0]}
                  </button>
                  <h4 className="pl-6 ">{user.username}</h4>
                </div>
                <button onClick={() => navigate(`/send?id=${user.id}&firstname=${user.firstName}`)} className="bg-black text-white w-40 h-10 rounded-md">
                  Send Money
                </button>
              </div>
            ))}
          </div>
        </Content>
      </div>
    </>
  );
}

function Header({ children }) {
  return <>{children}</>;
}

function Content({ children }) {
  return <>{children}</>;
}

export default Dashboard;
