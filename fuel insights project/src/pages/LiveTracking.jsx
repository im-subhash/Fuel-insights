import React, { useState } from 'react'
import { useEffect } from 'react';

import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import LiveData from './data/mydata';


const LiveTracking = () => {
  const [labels , setLabels] = useState([1,2]);
  const [milege, setMilege] = useState([0,30]);
  const [idx, setIdx] = useState(3);

 
  useEffect(() => {
    const timer = setTimeout(() => {
      if(idx ==75) clearTimeout(timer);

      setIdx(prevIdx => prevIdx + 1);
      setLabels(prevLabels => [...prevLabels, idx]);
      setMilege(prevMilege => [...prevMilege, LiveData[idx]?.Mileage]);

      console.log(labels, milege);
    }, 700);


    return () => clearTimeout(timer);
  }, [idx, labels, milege]); 
  
 

  return (
    <div className="flex justify-center items-center h-screen bg-slate-950">
      <div className=" bg-zinc-100 w-3/4 p-10 rounded-3xl shadow-xl">
        <Line
        data={{
          labels : labels,
          datasets: [{
            label: 'Your car fuel economy',
            data: milege,
            fill: true,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
      
          }],
          options:{
            scales: {
              y: {
                suggestedMin: 0,
                suggestedMax: 25,
              }
            },
        
            animations: {
              duration: 2 // Disable animations
            }
          }
        
          
        }}
        />
          
      </div>

   
      </div>
   
  );
}

export default LiveTracking;
