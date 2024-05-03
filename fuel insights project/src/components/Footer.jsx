import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer class=" shadow bg-gray-300">
      <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div class="sm:flex sm:items-center sm:justify-between">
        <div className="">
          <Link to="/" className="flex flex-row align-text-top">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/mykriyeta.appspot.com/o/knowledgebaseFiles%2F7639d1e0-cdcb-11ee-add7-ad44366ebdbf?alt=media&token=0ad89b6f-9034-4176-8008-5a5af83b3d76"
              className="w-32"
            />
            {/* <img src={logo} alt="" className=" w-40 object-cover" /> */}
          </Link>
        </div>
          <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-500">
            <li>
              <Link to="/about" class="hover:underline me-4 md:me-6">
                About
              </Link>
            </li>
            <li>
              <Link to="#" class="hover:underline me-4 md:me-6">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="#" class="hover:underline me-4 md:me-6">
                Licensing
              </Link>
            </li>
            <li>
              <Link to="/contact" class="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <hr class="my-6 border-gray-500 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span class="block text-sm text-gray-700 sm:text-center">
          © 2023{" "}
          <Link to="https://flowbite.com/" class="hover:underline">
            EduNetAi™
          </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
