import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../context/user";

export default function Header() {
  const { currentUser } = useUser();
  return (
    <nav className="bg-slate-200 border-b-red-500 border">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a
          href="https://patika.dev/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center space-x-3"
        >
          <span className="self-center text-2xl font-semibold whitespace-nowrap tracking-tighter">
            Final Case
          </span>
        </a>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          ></svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="w-full h-full font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0">
            <li>
              <Link
                to={"/"}
                className="block py-2 px-3 text-gray-900 bg-blue-700 rounded md:bg-transparent hover:text-red-500 md:p-0"
                aria-current="page"
              >
                Başvuru Yap
              </Link>
            </li>
            <li>
              <Link
                to={"/sorgulama"}
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 hover:text-red-500 md:p-0"
              >
                Sorgulama
              </Link>
            </li>
            <li>
              {!currentUser ? (
                <Link
                  to={"/giris"}
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 hover:text-red-500 md:p-0"
                >
                  Giriş Yap
                </Link>
              ) : (
                <Link
                  to={"/admin"}
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 hover:text-red-500 md:p-0"
                >
                  Yönetici Paneli
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
