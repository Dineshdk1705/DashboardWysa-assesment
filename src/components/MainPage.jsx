import { useEffect, useState } from "react";
import UserDetailsPage from "./UserDetailsPage";
import TodosPage from "./TodosPage";
import { useParams } from "react-router-dom";
import { RiUserSearchLine } from "react-icons/ri";
import { useDrawer } from "../context/DrawerContext";

const MainPage = () => {
  const [selectedTab, setSelectedTab] = useState("user-details");
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [userTodos, setUserTodos] = useState([]);
  const [todoLoading, setTodoLoading] = useState(false);
  const { setIsOpen } = useDrawer();

  useEffect(() => {
    getUserById();
    getTodosByUserId();
  }, [id]);

  const getUserById = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `https://dummyjson.com/users/${id !== undefined ? id : 1}`
      );
      const data = await res.json();
      setUser(data);
    } catch (error) {
      console.log("error while fetching user by id ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getTodosByUserId = async () => {
    try {
      setTodoLoading(true);
      const res = await fetch(
        `https://dummyjson.com/todos/user/${id !== undefined ? id : 1}`
      );
      const data = await res.json();
      setUserTodos(data.todos);
    } catch (error) {
      console.log("error while fetching todos by id ", error);
    } finally {
      setTodoLoading(false);
    }
  };

  return (
    <div className="bg-white w-full py-10 px-7 lg:pt-28 lg:px-18">
      <div className="font-semibold mb-7">
        <button
          className={`mr-7 border-b-2 ${
            selectedTab === "user-details"
              ? "text-[#49ABE3] border-[#49ABE3]"
              : "border-transparent"
          } `}
          onClick={() => setSelectedTab("user-details")}
        >
          User Details
        </button>
        <button
          className={`border-b-2 ${
            selectedTab === "todos"
              ? "text-[#49ABE3] border-[#49ABE3]"
              : "border-transparent"
          }`}
          onClick={() => setSelectedTab("todos")}
        >
          To-dos
        </button>
      </div>
      {selectedTab === "user-details" ? (
        <UserDetailsPage user={user} isLoading={isLoading} />
      ) : (
        <TodosPage
          userTodos={userTodos}
          userId={user.id}
          todoLoading={todoLoading}
        />
      )}
      <div className="absolute right-5 top-5 bg-[#727272] border border-white w-10 h-10 shadow-md shadow-gray-300 rounded-full flex lg:hidden justify-center items-center">
        <RiUserSearchLine
          size={20}
          color="white"
          onClick={() => setIsOpen(true)}
        />
      </div>
    </div>
  );
};

export default MainPage;
