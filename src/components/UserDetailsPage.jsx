/* eslint-disable react/prop-types */

import { MdEdit } from "react-icons/md";
import Skeleton from "react-loading-skeleton";

const UserDetailsPage = ({ user, isLoading }) => {
  if (isLoading) {
    return (
      <div className="w-full flex flex-col gap-5 z-50">
        {[110, 225, 180, 100].map((h, i) => (
          <Skeleton
            key={i}
            height={h}
            baseColor="#E8E8E8"
            highlightColor="#FFFFFF"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="w-full text-sm">
      {/* Bio */}
      <div className="flex justify-between px-3 py-2 md:px-5 md:py-4 border border-[#8ca7c5] rounded-md mb-7">
        <div className="">
          <h1 className="text-lg font-semibold mb-2">
            {user?.firstName} {user?.lastName}
          </h1>
          <p className="text-gray-500 text-sm mb-[2px]">
            {user?.company?.title}
          </p>
          <p className="text-gray-400 text-sm">
            {user?.address?.city}, {user?.address?.state},{" "}
            {user?.address?.country}
          </p>
        </div>
        <button className="flex items-center h-6 px-2 py-1 mt-1 rounded-md text-[#8ca7c5] border border-[#8ca7c5] cursor-pointer">
          <MdEdit className="mr-1" /> Edit
        </button>
      </div>

      {/* Personal information */}
      <div className="flex justify-between px-3 py-2 md:px-5 md:py-4 border border-[#8ca7c5] rounded-md mb-7">
        <div className="">
          <h1 className="text-lg font-semibold mb-2">Personal Information</h1>
          <p className="text-gray-500 text-sm mb-[2px]">Role: {user?.role}</p>
          <p className="text-gray-500 text-sm mb-[2px]">Email: {user?.email}</p>
          <p className="text-gray-500 text-sm mb-[2px]">
            Username: {user?.username}
          </p>
          <p className="text-gray-500 text-sm mb-[2px]">
            Gender: {user?.gender}
          </p>

          <p className="text-gray-500 text-sm mb-[2px]">
            DOB: {user?.birthDate}
          </p>
          <p className="text-gray-500 text-sm mb-[2px]">
            Blood group: {user?.bloodGroup}
          </p>

          <p className="text-gray-500 text-sm mb-[2px]">Phone: {user?.phone}</p>
        </div>
        <button className="flex items-center h-6 px-2 py-1 mt-1 rounded-md text-[#8ca7c5] border border-[#8ca7c5] cursor-pointer">
          <MdEdit className="mr-1" /> Edit
        </button>
      </div>

      {/* Address */}
      <div className="flex justify-between px-3 py-2 md:px-5 md:py-4 border border-[#8ca7c5] rounded-md mb-7">
        <div className="">
          <h1 className="text-lg font-semibold mb-2">Address</h1>
          <p className="text-gray-500 text-sm mb-[2px]">
            Address: {user?.address?.address}
          </p>
          <p className="text-gray-500 text-sm mb-[2px]">
            City: {user?.address?.city}
          </p>
          <p className="text-gray-500 text-sm mb-[2px]">
            State: {user?.address?.state}
          </p>

          <p className="text-gray-500 text-sm mb-[2px]">
            Country: {user?.address?.country}
          </p>
          <p className="text-gray-500 text-sm mb-[2px]">
            Postal code: {user?.address?.postalCode}
          </p>
        </div>
        <button className="flex items-center h-6 px-2 py-1 mt-1 rounded-md text-[#8ca7c5] border border-[#8ca7c5] cursor-pointer">
          <MdEdit className="mr-1" /> Edit
        </button>
      </div>

      {/* Company */}
      <div className="flex justify-between px-3 py-2 md:px-5 md:py-4 border border-[#8ca7c5] rounded-md">
        <div className="">
          <h1 className="text-lg font-semibold mb-2">Company</h1>
          <p className="text-gray-500 text-sm mb-[2px]">
            Name: {user?.company?.name}
          </p>
          <p className="text-gray-500 text-sm mb-[2px]">
            Title: {user?.company?.title}
          </p>
          <p className="text-gray-500 text-sm mb-[2px]">
            Department: {user?.company?.department}
          </p>
        </div>
        <button className="flex items-center h-6 px-2 py-1 mt-1 rounded-md text-[#8ca7c5] border border-[#8ca7c5] cursor-pointer">
          <MdEdit className="mr-1" /> Edit
        </button>
      </div>
    </div>
  );
};

export default UserDetailsPage;
