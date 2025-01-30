/* eslint-disable react/prop-types */
import { useCallback, useEffect, useState } from "react";
import UserListingPage from "../UserListingPage";
import { LuSearch } from "react-icons/lu";
import { useDrawer } from "../../context/DrawerContext";

const Sidebar = ({ usersData, isLoading }) => {
  const [searchInput, setSearchInput] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(usersData);
  const { isOpen, setIsOpen } = useDrawer();

  useEffect(() => {
    const updatedUsers = usersData?.filter((user) => {
      return (
        user.firstName
          .toLowerCase()
          .startsWith(searchInput.trim().toLowerCase()) ||
        user.lastName.toLowerCase().startsWith(searchInput.trim().toLowerCase())
      );
    });
    setFilteredUsers(updatedUsers);
  }, [searchInput, usersData]);

  const debounceHelper = (cb, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        cb(...args);
      }, delay);
    };
  };

  const debounceSearch = useCallback(
    debounceHelper((value) => setSearchInput(value), 600),
    []
  );

  return (
    <>
      {isOpen && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-40 transition-opacity duration-600 ${
            isOpen ? "opacity-40 visible" : "opacity-0 invisible"
          } lg:hidden z-30`}
          onClick={() => setIsOpen(false)}
        />
      )}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-full lg:h-screen w-80 bg-[#D5E9F5] shadow-lg py-7 z-50 transform transition-transform duration-300
          ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 lg:block`}
      >
        <div className="px-5 pb-4 border-b-1 border-[#629FC4]">
          <h1 className="font-medium text-2xl mb-8 md:mb-12">Users List</h1>
          <div className="w-full flex items-center bg-white rounded-md h-8">
            <LuSearch className="ml-3" color="#7D7D7D" />
            <input
              className="w-full h-full outline-none px-3 text-sm text-gray-500"
              placeholder="Search user..."
              onChange={(e) => debounceSearch(e.target.value)}
            />
          </div>
        </div>
        <UserListingPage users={filteredUsers} isLoading={isLoading} />
      </aside>
    </>
  );
};

export default Sidebar;
