import React, { useState, useEffect } from "react";
import Navigation from "../components/FooterNav";

const DetailsSite = () => {
  const [intensity, setIntensity] = useState(50);
  const [powerOn, setPowerOn] = useState(
    localStorage.getItem("powerOn") === "true" ? true : false
  );
  const [updatedState, setUpdatedState] = useState(null);

  const handleIntensityChange = (event) => {
    setIntensity(event.target.value);
  };

  const togglePower = () => {
    const endpoint =
      "http://192.168.8.100/api/TpTi4Vomw1kfnwys7trHAe58FnGkqi6UYbVsanYS/lights/48/state";

    const color = powerOn ? [1, 1] : [0.3227, 0.329];

    fetch(endpoint, {
      method: "PUT",
      body: JSON.stringify({
        on: !powerOn,
        xy: color,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Power state changed successfully:", data);
        setPowerOn((prev) => !prev);
        localStorage.setItem("powerOn", !powerOn);
        console.log("Updated state:", powerOn);
        setUpdatedState(powerOn);
      })
      .catch((error) => {
        console.error("Error changing power state:", error);
      });
  };

  const changeColor = (color) => {
    const endpoint =
      "http://192.168.8.100/api/TpTi4Vomw1kfnwys7trHAe58FnGkqi6UYbVsanYS/lights/48/state";

    fetch(endpoint, {
      method: "PUT",
      body: JSON.stringify({
        xy: color,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Color changed successfully:", data);
      })
      .catch((error) => {
        console.error("Error changing color:", error);
      });
  };

  const handleAddColor = () => {
    console.log("tilføj flere farver funktion her min ven");
  };

  const handleSceneClick = (scene) => {
    switch (scene) {
      case "Birthday":
        const pinkColor = [0.4361, 0.2225];
        const whiteColor = [0.3227, 0.329];

        let currentColor = pinkColor;
        setInterval(() => {
          changeColor(currentColor);
          currentColor = currentColor === pinkColor ? whiteColor : pinkColor;
        }, 500);
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    setUpdatedState(powerOn);
  }, [powerOn]);

  const handleLightButtonClick = (newIntensity) => {
    setIntensity(newIntensity);
  };

  return (
    <>
      <div className="flex justify-between p-8 items-center">
        <span className="absolute top-8">
          <img src="src/assets/backbtn.png" alt="" />
        </span>
        <h1 className="text-white text-3xl font-bold">
          Chosen <br /> Room
          <p className="text-base text-[#FFD239] mt-2">4 light</p>
        </h1>
        <span>
          <img src="src/assets/hanglight.png" alt="" />
        </span>
      </div>
      <span className="p-4 pb-8 pt-8 flex gap-4 overflow-x-scroll scrollbar-hidden">
        <button
          className={`flex-shrink-0 flex justify-around items-center bg-white p-2 rounded-xl text-[#002D67] w-[124px] h-[45px] font-bold text-xs focus:outline-none focus:ring ${
            intensity === 100 ? "bg-yellow-300" : ""
          }`}
          onClick={() => handleLightButtonClick(100)}
        >
          <img src="src/assets/light.png" alt="" />
          Main light
        </button>
        <button
          className={`flex-shrink-0 flex justify-around items-center bg-white p-2 rounded-xl text-[#002D67] w-[124px] h-[45px] font-bold text-xs focus:outline-none focus:ring ${
            intensity === 75 ? "bg-yellow-300" : ""
          }`}
          onClick={() => handleLightButtonClick(75)}
        >
          <img src="src/assets/light.png" alt="" />
          Desk light
        </button>
        <button
          className={`flex-shrink-0 flex justify-around items-center bg-white p-2 rounded-xl text-[#002D67] w-[124px] h-[45px] font-bold text-xs focus:outline-none focus:ring ${
            intensity === 25 ? "bg-yellow-300" : ""
          }`}
          onClick={() => handleLightButtonClick(25)}
        >
          <img src="src/assets/light.png" alt="" />
          Bed light
        </button>
      </span>
      <div className="absolute end-10 top-[333px]">
        <button onClick={togglePower}>
          <img
            src={powerOn ? "src/assets/poweron.png" : "src/assets/poweroff.png"}
            alt=""
          />
        </button>
      </div>
      <div className="bg-[#F6F8FB] min-h-screen rounded-t-3xl p-8">
        <h2 className="text-lg font-bold text-[#002D67]">Intensity</h2>
        <div className="flex items-center mt-4 mb-8">
          <img src="src/assets/solution.png" alt="" />
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={intensity}
            onChange={handleIntensityChange}
            className="w-full mx-4 bg-yellow-300 appearance-none h-1 rounded-xl"
          />
          <img src="src/assets/solution+.png" alt="" />
        </div>
        <h2 className="text-lg font-bold text-[#002D67] mb-4">Colors</h2>
        <ul className="flex gap-3">
          <li>
            <button
              className={`bg-red-400 p-2 rounded-full text-transparent w-8 h-8 focus:outline-none focus:ring ${
                updatedState ? "border-gray-500" : ""
              }`}
              onClick={() => changeColor([0.675, 0.322])}
            >
              Red
            </button>
          </li>
          <li>
            <button
              className={`bg-green-400 p-2 rounded-full text-transparent w-8 h-8 focus:outline-none focus:ring ${
                updatedState ? "border-gray-500" : ""
              }`}
              onClick={() => changeColor([0.41, 0.51721])}
            >
              Green
            </button>
          </li>
          <li>
            <button
              className={`bg-blue-400 p-2 rounded-full text-transparent w-8 h-8 focus:outline-none focus:ring ${
                updatedState ? "border-gray-500" : ""
              }`}
              onClick={() => changeColor([0.167, 0.04])}
            >
              Blue
            </button>
          </li>
          <li>
            <button
              className={`bg-yellow-400 p-2 rounded-full text-transparent w-8 h-8 focus:outline-none focus:ring ${
                updatedState ? "border-gray-500" : ""
              }`}
              onClick={() => changeColor([0.443, 0.5099])}
            >
              Yellow
            </button>
          </li>
          <li>
            <button
              className={`bg-purple-400 p-2 rounded-full text-transparent w-8 h-8 focus:outline-none focus:ring ${
                updatedState ? "border-gray-500" : ""
              }`}
              onClick={() => changeColor([0.322, 0.168])}
            >
              Purple
            </button>
          </li>
          <li>
            <button
              className={`bg-white p-2 rounded-full w-8 h-8 flex justify-center items-center text-center font-semibold focus:outline-none focus:ring ${
                updatedState ? "border-gray-500" : ""
              }`}
              onClick={handleAddColor}
            >
              +
            </button>
          </li>
        </ul>
        <h2 className="text-lg font-bold text-[#002D67] mt-6">Scenes</h2>
        <ul className="mt-4 flex justify-center flex-wrap gap-6">
          <li>
            <button
              className={`flex justify-evenly items-center bg-[#FF9B9B] p-2 rounded-xl text-white w-[150px] h-[55px] font-bold text-xs focus:outline-none focus:ring`}
              onClick={() => handleSceneClick("Birthday")}
            >
              <img src="src/assets/whitesurface.png" alt="" />
              Birthday
            </button>
          </li>
          <li>
            <button
              className={`flex justify-evenly items-center bg-[#A693EB] p-2 rounded-xl text-white w-[150px] h-[55px] font-bold text-xs focus:outline-none focus:ring`}
              onClick={() => handleSceneClick("Party")}
            >
              <img src="src/assets/whitesurface.png" alt="" />
              Party
            </button>
          </li>
          <li>
            <button
              className={`flex justify-evenly items-center bg-[#93CAEB] p-2 rounded-xl text-white w-[150px] h-[55px] font-bold text-xs focus:outline-none focus:ring`}
              onClick={() => handleSceneClick("Relax")}
            >
              <img src="src/assets/whitesurface.png" alt="" />
              Relax
            </button>
          </li>
          <li>
            <button
              className={`flex justify-evenly items-center bg-[#89DD94] p-2 rounded-xl text-white w-[150px] h-[55px] font-bold text-xs focus:outline-none focus:ring`}
              onClick={() => handleSceneClick("Fun")}
            >
              <img src="src/assets/whitesurface.png" alt="" />
              Fun
            </button>
          </li>
        </ul>
      </div>
      <Navigation />
    </>
  );
};

export default DetailsSite;
