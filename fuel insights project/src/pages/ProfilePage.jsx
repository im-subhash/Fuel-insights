import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { Icon } from "react-icons-kit";
import { BASE_URL } from "../configs/config.js";
import { v1 as uuid } from "uuid";
import { storage } from "../firebase.js";
import {
  list,
  listAll,
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState(user ? user.name : "");
  const [gender, setGender] = useState(user ? user.gender : "");
  const [role, setRole] = useState(user ? user.role : "");
  const [email, setEmail] = useState(user ? user.email : "");
  const [phone, setPhone] = useState(user ? user.phone : "");
  const [dob, setDob] = useState(user ? user.dob : "");
  const [city, setCity] = useState(user ? user.city : "");
  const [state, setState] = useState(user ? user.state : "");
  const [country, setCountry] = useState(user ? user.country : "");
  const [organizationName, setOrganizationName] = useState(
    user ? user.organizationName : ""
  );
  const [currentYear, setCurrentYear] = useState(user ? user.currentYear : "");
  const [education, setEducation] = useState(user ? user.education : "");
  const [field, setField] = useState(user ? user.field : "");
  const [specialization, setSpecialization] = useState(
    user ? user.specialization : ""
  );
  const [avatarUrl, setAvatarUrl] = useState( user?.avatar ? user.avatar : "");
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem(
      'userData'
    );
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setGender(user.gender);
      setRole(user.role);
      setEmail(user.email);
      setPhone(user.phone);
      setDob(user.dob);
      setCity(user.city);
      setState(user.state);
      setCountry(user.country);
      setCurrentYear(user.currentYear);
      setEducation(user.education);
      setField(user.field);
      setOrganizationName(user.organizationName);
      setSpecialization(user.specialization);
      setAvatarUrl(user.avatar);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (role) {
      const data = {
        id: user._id,
        name,
        gender,
        role,
        email,
        phone,
        dob,
        city,
        state,
        country,
        organizationName,
        currentYear,
        field,
        education,
        specialization,
        avatar : avatarUrl
      };
      const response = await fetch(`${BASE_URL}user/update-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const updatedData = await response.json();
      const stringFied = JSON.stringify(updatedData.data);
      if (updatedData.status === "success") {
        console.log("updatedData", updatedData.data);
        localStorage.setItem("userData", stringFied);
      }
    }
  };

  const uploadProfilePic = async (e) => {
    e.preventDefault()
    console.log("upload clicked");
    const profileId = uuid();
    if (!avatar) return;
    const contentRef = ref(storage, `profileImg/${profileId}`);
    uploadBytes(contentRef, avatar).then((data) => {
      console.log("file uploaded");
      const contentlistRef = ref(storage, "profileImg/");
      listAll(contentlistRef).then((response) => {
        const item = response.items.filter((item) => {
          return item.name == profileId;
        });
        getDownloadURL(item[0]).then((url) => {
          console.log("download url", url);
          setAvatarUrl(url);
          submitProfilePic(avatarUrl);
          const avatar = avatarUrl
      
        });
      });
    });
  };

  const submitProfilePic = async (url) => {
    if (user) {
      try {
        console.log("tyring to upload")
        const response = await fetch(`${BASE_URL}user/update-user`, {
          method: "POST",
          headers: {
            "Content-type": "Application/json",
          },
          body: JSON.stringify({
            id: user._id,
            avatar: avatarUrl,
          }),
        });
        const data = await response.json();
        console.log("success profile upload :", data);
       
        
      } catch (err) {
        console.log("profile upload err");
      }
    }
  };

  return (
    <div className="p-12 text-white ">
      <div className="gap-10 mb-8 text-white mt-20">
        <div className=" h-full border-r-2 border-gray-200  max-w-l w-full text-white">
          <form className="flex flex-col gap-4 mr-4 text-white">
            <div className="flex flex-col gap-4 justify-center items-center text-white">
              <img
                src={
                  avatarUrl
                    ? avatarUrl
                    : "https://www.366icons.com/media/01/profile-avatar-account-icon-16699.png"
                }
                alt="profile"
                className="rounded-full h-44 w-44 object-cover cursor-pointer self-center mt-2"
              />
              
              <input  id="file-input" type="file" className="text-white" onChange={(e)=>setAvatar(e.target.files[0])} />
              <div>
                {!user?.avatar && (
                  <button
                    type="file"
                    className="mtext-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none text-white focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                    onClick={(e) => uploadProfilePic(e)}
                  >
                    upload
                  </button>
                )}
                {user?.avatar && (
                  <button className="mtext-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none text-white focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                  onClick={(e)=>uploadProfilePic(e)}>
                    Change
                    
                  </button>
                )}
                {user?.avatar && (
                  <button className="mtext-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none text-white focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                    Remove
                  </button>
                )}
              </div>
            </div>
            <h1 className="text-2xl font-semibold text-left my-10">
              Personal Details
            </h1>
            <div className="flex flex-row gap-4">
              <div className="w-1/3">
                <label
                
                  htmlFor="name"
                  className="text-base font-medium text-gray-300"
                >
                  {" "}
                  Full Name{" "}
                </label>
                <div className="mt-2 ">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                    id="name"
                  ></input>
                </div>
              </div>
              <div className="w-1/3">
                <label
                  htmlFor="email"
                  className="text-base font-medium text-gray-900"
                >
                  {" "}
                  Email address{" "}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                  ></input>
                </div>
              </div>
              <div className="w-1/3">
                <label
                  htmlFor="name"
                  className="text-base font-medium text-gray-900"
                >
                  {" "}
                  Phone No.{" "}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="number"
                    maxLength="10"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="98765XXX"
                    id="pohone_no"
                  ></input>
                </div>
              </div>
            </div>

            <div className="flex flex-row gap-4">
              <div className="w-1/3">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor=""
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    State{" "}
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full  rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    onChange={(e) => setState(e.target.value)}
                    placeholder="State"
                    value={state}
                    id="state"
                  ></input>
                </div>
              </div>
              <div className=" w-1/3">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="city"
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    City{" "}
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City"
                    value={city}
                    id="city"
                  ></input>
                </div>
              </div>
              <div className=" w-1/3">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="Country"
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Country{" "}
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    id="country"
                  ></input>
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-4">
              <div className="w-1/3">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="dob"
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    DOB{" "}
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    id="dob"
                  ></input>
                </div>
              </div>
              <div className="w-1/3">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="gender"
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Gender{" "}
                  </label>
                </div>
                <div className="flex flex-row mt-2 gap-5">
                  <div className="flex items-center mb-4">
                    <input
                      id="male"
                      type="radio"
                      name="default-radio"
                      onChange={(e) => setGender("male")}
                      checked={gender === "male"}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      for="default-radio-1"
                      className="ms-2 text-sm font-medium "
                    >
                      Male
                    </label>
                  </div>
                  <div className="flex items-center mb-4">
                    <input
                      id="default-radio-2"
                      type="radio"
                      checked={gender === "female"}
                      name="default-radio"
                      onChange={(e) => setGender("female")}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      for="default-radio-2"
                      className="ms-2 text-sm font-medium "
                    >
                      Female
                    </label>
                  </div>
                </div>
              </div>
              <div className="w-1/3">
                <label
                  htmlFor="email"
                  className="text-base font-medium text-gray-900"
                >
                  {" "}
                  Role{" "}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    value={role}
                    id="role"
                  ></input>
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-base font-medium text-gray-900"
                >
                  {" "}
                  Password{" "}
                </label>
              </div>
              <div className="mt-2">
                <input
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="password"
                  placeholder="Password"
                  id="password"
                ></input>
              </div>
            </div>
          </form>
        </div>

        <div className="w-full">
          <div>
            <div className="h-full ">
              <h1 className="text-2xl font-semibold text-left my-10">
                Academics Records
              </h1>
              <form className="flex flex-col gap-4">
                <div className="flex flex-row gap-6">
                  <div className="w-1/2">
                    <label
                      htmlFor="name"
                      className="text-base font-medium text-gray-900"
                    >
                      {" "}
                      Organization Name{" "}
                    </label>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="text"
                        placeholder="Enter your organization name"
                        
                        value={organizationName}
                        onChange={(e) => setOrganizationName(e.target.value)}
                      ></input>
                    </div>
                  </div>

                  <div className="w-1/2">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="education"
                        className="text-base font-medium text-gray-900"
                      >
                        {" "}
                        Education{" "}
                      </label>
                    </div>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="text"
                        placeholder="Enter your current education"
                        id="Degree"
                        value={education}
                        onChange={(e) => setEducation(e.target.value)}
                      ></input>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row gap-6">
                  <div className="w-1/2">
                    <label
                      htmlFor="name"
                      className="text-base font-medium text-gray-900"
                    >
                      {" "}
                      Field{" "}
                    </label>
                    <div className="mt-2">
                      <input
                      key={500000}
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="text"
                        onChange={(e) => setField(e.target.value)}
                        value={field}
                        placeholder="Your field (e.g, CSE, PCM .etc)"
                        id="5001"
                      ></input>
                    </div>
                  </div>
                  {user?.role === "teacher" && (
                    <div className="w-1/2">
                      <label
                        htmlFor="name"
                        className="text-base font-medium text-gray-900"
                      >
                        {" "}
                        Specialization{" "}
                      </label>
                      <div className="mt-2">
                        <input
                          className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                          type="text"
                          onChange={(e) => setSpecialization(e.target.value)}
                          value={specialization}
                          placeholder="Your field (e.g, CSE, PCM .etc)"
                          id="5000"
                        ></input>
                      </div>
                    </div>
                  )}
                  {user?.role === "student" && (
                    <div className="w-1/2">
                      <label
                        htmlFor="name"
                        className="text-base font-medium text-gray-900"
                      >
                        {" "}
                        Current Year{" "}
                      </label>
                      <div className="mt-2">
                        <input
                          className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                          type="number"
                          maxLength="10"
                          onChange={(e) => setCurrentYear(e.target.value)}
                          value={currentYear}
                          placeholder="20XX-20XX"
                          id="field"
                        ></input>
                      </div>
                    </div>
                  )}
                </div>
              </form>
              <p className="text-green-700 mt-5" id="bookNotExist"></p>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={(e) => handleSubmit(e)}
        className="bg-sky-600 w-full  text-white font-medium rounded-lg p-3 uppercase hover:opacity-90 disabled:opacity-80"
      >
        update
      </button>
    </div>
  );
}
