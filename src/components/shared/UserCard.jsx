import { Link } from "react-router-dom";
import { useDrawer } from "../../context/DrawerContext";

/* eslint-disable react/prop-types */
const UserCard = ({ user, selectedUserId, handleUserSelect }) => {
  const isSelected = user.id.toString() === selectedUserId?.toString();
  const { setIsOpen } = useDrawer();

  return (
    <Link
      to={`/users/${user.id}`}
      onClick={() => {
        handleUserSelect(user.id);
        setIsOpen(false);
        localStorage.setItem("userId", user?.id);
      }}
      className={`flex gap-2 h-16 border-b-[1px]  ${
        isSelected ? "bg-[#7eb3d3] text-white" : "hover:bg-[#629fc42e]"
      } border-[#629FC4] px-5 items-center`}
    >
      <img
        src={user?.image}
        className={`h-10 w-10 rounded-full border-2 ${
          isSelected ? "border-[#FFFFFF]" : "border-[#629FC4]"
        }`}
      />
      <h3>{user?.firstName}</h3>
      <h3>{user?.lastName}</h3>
    </Link>
  );
};

export default UserCard;
