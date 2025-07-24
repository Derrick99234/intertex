import React from "react";
import Image from "next/image";

function UserProfileComponent() {
  const user = {
    "First Name": "ABC200023",
    "Last Name": "John Doe",
    "User ID": "john.doe@example.com",
    "Email Address": "john.doe@example.com",
    "Phone Number": "+1 (555) 123-4567",
    DOB: "1990-01-01",
    "Date Created": "2023-01-01",
    "No. of Orders": 15,
    "No. of Pending Orders": 13,
  };
  return (
    <div className="max-w-4xl">
      <h2 className="text-center text-2xl font-semibold">User Details</h2>
      <div className="flex border border-gray-300 rounded p-8 justify-between max-h-[50rem]  mt-5">
        <div className="flex items-center flex-col gap-4 w-[30%]">
          <Image
            src="/images/customers/bithop.jpg"
            alt="User Profile"
            className="rounded-full border border-gray-300 object-cover object-left w-[8rem] h-[8rem]"
            width={100}
            height={100}
          />
          <span>ABC200023</span>
        </div>

        <div className="w-[66.67%]">
          {Object.entries(user).map(([key, value]) => (
            <div key={key} className="grid grid-cols-2 mb-8">
              <span className="font-semibold capitalize">{key}:</span>
              <span className="text-gray-700">{value}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-between my-8 px-3">
        <div className="">
          <button
            className={`border border-secondary py-1 rounded-sm px-4 mr-3 text-sm cursor-pointer bg-secondary text-white`}
          >
            Edit User
          </button>
          <button
            className={`border border-secondary py-1 rounded-sm text-secondary px-4 text-sm cursor-pointer`}
          >
            Send Email
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600 font-semibold">
            Deactivate User
          </span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-7 h-4 bg-black peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-secondary"></div>
          </label>
        </div>
      </div>
    </div>
  );
}

export default UserProfileComponent;
