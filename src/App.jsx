import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainPage from "./components/MainPage";
import Sidebar from "./components/shared/Sidebar";
import { Toaster } from "react-hot-toast";
import { DrawerProvider } from "./context/DrawerContext";
import { useEffect, useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";

function App() {
  const [usersData, setUsersData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getUsers = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("https://dummyjson.com/users");
      const data = await res.json();
      if (data) {
        setUsersData(data.users);
      }
    } catch (error) {
      console.log("error while fetching users: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 1300,
          style: {
            background: "#333",
            color: "#fff",
          },
        }}
      />
      <DrawerProvider>
        <div className="flex">
          <Sidebar usersData={usersData} isLoading={isLoading} />
          <Routes>
            <Route path="/users/:id" element={<MainPage />} />
            <Route path="/" element={<MainPage />} />
          </Routes>
        </div>
      </DrawerProvider>
    </>
  );
}

export default App;
