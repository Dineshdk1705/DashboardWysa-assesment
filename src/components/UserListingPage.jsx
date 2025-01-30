/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Pagination from "./shared/Pagination";
import UserCard from "./shared/UserCard";
import { useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

const UserListingPage = ({ users, isLoading }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { id } = useParams();
  const storedUserId = localStorage.getItem("userId");
  const [selectedUserId, setSelectedUserId] = useState(id || storedUserId || 1);
  const itemsPerPage = 8;
  const totalPage = Math.ceil(users?.length / itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [users]);

  const handleUserSelect = (userId) => {
    setSelectedUserId(userId);
  };

  return (
    <ul className="">
      {isLoading ? (
        <div>
          {[...Array(10)].map((_, i) => (
            <Skeleton
              key={i}
              height={60}
              baseColor="#B0D3E8"
              highlightColor="#CBE3F2"
            />
          ))}
        </div>
      ) : users?.length > 0 ? (
        users
          .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
          .map((user) => {
            return (
              <UserCard
                key={user.id}
                user={user}
                selectedUserId={selectedUserId}
                handleUserSelect={handleUserSelect}
              />
            );
          })
      ) : (
        <div className="text-center font-semibold text-xl mt-10 text-gray-400">
          User not found {":("}
        </div>
      )}

      {!isLoading && users?.length > itemsPerPage && (
        <div className="mt-4 lg:mt-12">
          <Pagination
            currentPage={currentPage}
            totalPageCount={totalPage}
            setCurrentPage={setCurrentPage}
            enableColor={"#000000"}
            disableColor={"#ADADAD"}
          />
        </div>
      )}
    </ul>
  );
};

export default UserListingPage;
