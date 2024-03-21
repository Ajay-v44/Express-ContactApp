import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddContact = () => {
  const navigate = useNavigate();
  const [values, setvalues] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const handleOnChange = async (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setvalues((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleOnSubmit = async (e) => {
    try {
      e.preventDefault();
      const cookieString = document.cookie;
      if (cookieString && cookieString.includes("jwtToken=")) {
        var cookieToken = cookieString
          .split("; ")
          .find((row) => row.startsWith("jwtToken="))
          .split("=")[1];
      }
      const response =await axios.post(
        "/api/contact",
        {
          name: values.name,
          email: values.email,
          phone: values.phone,
        },
        {
          headers: {
            Authorization: `Bearer ${cookieToken}`,
          },
        }
      );
      if (response.status === 201) {
        navigate("/");
        toast.success((await response).data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something Went Wrong");
    } finally {
      setvalues({
        name: "",
        email: "",
        phone: "",
      });
    }
  };
  return (
    <div className="mt-20">
      <form className="max-w-sm mx-auto" onSubmit={handleOnSubmit}>
        <div className="mb-5">
          <label
            for="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={values.email}
            onChange={handleOnChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="name@flowbite.com"
            required
          />
        </div>
        <div className="mb-5">
          <label
            for="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Name
          </label>
          <input
            type="text"
            id="password"
            name="name"
            value={values.name}
            onChange={handleOnChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          />
        </div>
        <div className="mb-5">
          <label
            for="repeat-password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Phone Number
          </label>
          <input
            type="number"
            id="repeat-password"
            name="phone"
            value={values.phone}
            onChange={handleOnChange}
            minLength={10}
            maxLength={10}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Create new contact
        </button>
      </form>
    </div>
  );
};

export default AddContact;
