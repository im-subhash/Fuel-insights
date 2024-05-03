import React from 'react'
import { Chart as ChartJs} from 'chart.js/auto';
import {Bar, Doughnut, Line,Pie} from "react-chartjs-2";

export const Dashboard = () => {
  return (
    <div className="mb-20 mx-auto text-white  grid grid-cols-2 gap-4 w-5/6 ">
      <div className="col-span-2 bg-white h-fit w-full mt-20  rounded-xl mx-auto">
         <Bar
          data={{
            labels:["A","B","C","D","E"],
            datasets : [
              {
                label: "Expected",
              data: [15,15,15,15,15,15]
            },
            {
              label: "Your Car",
            data: [14,18,10,11,8,6]
          },
            ]
          }}
        />
      </div>
      <div className=" bg-white h-80 flex justify-center rounded-xl mb-20">
        
      <Pie
          data={{
            labels:["Green","Yellow","Red"],
            datasets : [
              {
                label: "Classification",
                data: [62,27,11],
                backgroundColor: [
                  "rgba(0, 128, 0, 1)",
                  "rgba(240, 240, 0, 1)",
                  "rgba(255, 0, 0, 1)"
                ]
            }
            ]
          }}
        />
      </div>
      <div className="bg-white h-80 rounded-xl">
      <Line
          data={{
            labels:["Trip 1","Trip 2","Trip 3","Trip 4","Trip 5","Trip 6"],
            datasets : [
              {
                label: "Expected",
              data: [15,15,15,15,15,15]
            },
            {
              label: "Your Car",
            data: [14,18,10,11,8,6]
          },
            ]
          }}
        />
      </div>
    </div>
  );
  
  }
