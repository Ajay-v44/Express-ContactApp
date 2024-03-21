import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const HomePage = () => {
  const navigate = useNavigate();
  const [Loading, setLoading] = useState(false);
  const [values, Setvalues] = useState(null);
  const token = useSelector((state) => state.token);
  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        navigate("/login");
      } else {
        setLoading(true);
        try {
          const response = await axios.get("/api/contact", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.data.data.length !== 0) {
            Setvalues(response.data.data);
          } else {
            Setvalues(null);
          }
        } catch (err) {
          console.log(err);
          toast.error("Something went wrong");
        } finally {
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [token]);
  console.log(values);
  return (
    <div className="mt-20">
      {Loading ? (
        <Loader />
      ) : (
        <>
          {!values ? (
            <div className="flex justify-center items-center">
              <div className="max-w-sm mt-20 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                  <img
                    className="rounded-t-lg"
                    src="/docs/images/blog/image-1.jpg"
                    alt=""
                  />
                </a>
                <div className="p-5">
                  <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      No Contacts
                    </h5>
                  </a>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    Make Frnds Add Some Contact.
                  </p>
                  <Link
                    to={"/add"}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Add Contact
                    <svg
                      className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <>
              <Link
                to={"/add"}
                className="text-white relative  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Create new contact
              </Link>
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-0 md:mx-10 top-5">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Username
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Phone
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Edit
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Delete
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {values.map((value, id) => (
                      <tr
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        key={id}
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {value.name}
                        </th>
                        <td className="px-6 py-4">{value.email}</td>
                        <td className="px-6 py-4">{value.phone}</td>
                        <td className="px-6 py-4">
                          <a
                            href="#"
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            Edit
                          </a>
                        </td>
                        <td className="px-6 py-4">Delete</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default HomePage;
