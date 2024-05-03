import { async } from "@firebase/util";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../configs/config";
const TripAnalysisPage = () => {
  const [formData, setFormData] = useState({
    distanceTravel: 0,
    fuelConsuption: 0,
    vehicle: "HatchBack",
  });

  const [distanceTravel, setDistanceTravel] = useState(0);
  const [fuelConsuption, setFuelConsuption] = useState(0);
  const [vehicle, setVehicle] = useState("Compact");
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState("");

  // function changeHandler(event) {
  //   const { name, value , gtype } = event.target;
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     [name]: parseInt(value, 10), // Convert the input value to an integer
  //   }));
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("process analysis called");
    if (!(distanceTravel == 0 || fuelConsuption == 0)) {
      try {
        console.log(distanceTravel, fuelConsuption, vehicle);
        const response = await fetch(`${BASE_URL}fuel-economy/analysis`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            vehicleClass: vehicle,
            distanceTraveled: distanceTravel,
            fuelConsumed: fuelConsuption,
          }),
        });

        const data = await response.json();
        setAnalysisResult(data);
        console.log("analysis result ----", analysisResult);
      } catch (err) {
        console.log("analysis error : ", err);
      }
    } else {
      setError("All fields are required!");
    }
  };

  function saveDataHandler(event) {
    event.preventDefault();
    console.log(formData);
  }

  return (
    <div className="min-h-screen  bg-gradient-to-t from-gray-700 to-black">
      <div className="flex flex-col items-center justify-center px-6 py-8 md:h-full lg:py-0">
        <div className="">
          <div className="flex flex-col items-center justify-center px-6 py-8  md:h-full lg:py-0 mt-14">
            <div className="w-full bg-white rounded-lg shadow dark:boxd16 md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:px-16 md:space-y-6 sm:p-8 h-full">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Trip Analysis
                </h1>

                <form className="space-y-4 md:space-y-6">
                  {/* Distance travelled in km */}
                  {!analysisResult && (
                    <>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Distance travelled
                        </label>
                        <input
                          type="number"
                          name="distanceTravel"
                          id="distanceTravel"
                          onChange={(e) =>
                            setDistanceTravel(parseInt(e.target.value))
                          }
                          value={distanceTravel}
                          placeholder="enter the distance travelled in km"
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          required=""
                        />
                      </div>

                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Fuel Consuption
                        </label>
                        <input
                          type="number"
                          name="fuelConsuption"
                          id="fuelConsuption"
                          onChange={(e) =>
                            setFuelConsuption(parseInt(e.target.value))
                          }
                          value={fuelConsuption}
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="fuel consuption in litres"
                          required=""
                        />
                      </div>

                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Vehcile Class
                        </label>
                        <select
                          id="vehicle"
                          className="p-1 pr-4 bg-gray-600  border border-gray-300 text-gray-400  rounded-lg"
                          name="vehicle"
                          onChange={(e) => setVehicle(e.target.value)}
                          value={vehicle}
                        >
                          <option id="compact">Compact</option>
                          <option id="suv">SUV</option>
                          <option id="sedan">Sedan</option>
                          <option id="truck">Truck</option>
                          <option id="van">Van</option>
                          <option id="hatchback">Hatch Back</option>
                        </select>
                      </div>
                      <p className="text-red-500">{error ? error : ""}</p>
                      <div className="flex justify-center">
                        <button
                          onClick={(e) => handleSubmit(e)}
                          className=" text-white bg-blue-600 p-2 rounded-md px-20"
                        >
                          Submit
                        </button>
                      </div>
                    </>
                  )}
                  {/* //////////// the result section ////////////// */}
                  {analysisResult && (
                    <div>
                      <div className="text-gray-600 flex justify-center ">
                        <h1>--------------------------------</h1>
                      </div>
                      <div className=" flex gap-3">
                        <div className="mb-2 ">
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Average Fuel Economy
                          </label>
                          <input
                            type="number"
                            value={analysisResult.averageFuelEconomy.toFixed(2)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="fuel consuption in litres"
                            required=""
                          />
                        </div>

                        <div className="mb-2 mt-auto ">
                          <label className="block  mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Your Fuel Economy
                          </label>
                          <input
                            type="number"
                            value={analysisResult.userFuelEconomy.toFixed(2)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="fuel consuption in litres"
                            required=""
                          />
                        </div>
                      </div>
                      <div className="mb-2">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Classification
                        </label>
                        <div
                          style={{
                            backgroundColor: `${analysisResult.classification}`,
                          }}
                          className="bg-gray-300 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="fuel consuption in litres"
                          required=""
                        >
                          {" "}
                        </div>
                      </div>

                      <div className="bg-gray-800 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                            <span className="text-gray-300">
                              Everything is fine
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <div className="w-4 h-4 bg-yellow-500 rounded-full mr-2"></div>
                            <span className="text-gray-300">
                              Unusual behavior, visit your service center
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
                            <span className="text-gray-300">
                              High chance of fuel leakage or theft
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-center">
                        <button
                          onClick={(e) => setAnalysisResult(null)}
                          className=" text-white bg-blue-600 p-2 rounded-md px-20"
                        >
                          Check Again
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
          {/* ///////////////////// */}
        </div>
      </div>
    </div>
  );
};

export default TripAnalysisPage;
