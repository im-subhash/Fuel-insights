import React, { useState, useEffect, useRef } from 'react';
import AvatarImg from "../assets/Avatar.jpg";
import { FaGithub } from 'react-icons/fa';

const cardsData = [
  { id: 1, name: 'Bhishek Parmar', profile: 'Full Stack Developer', github: 'https://github.com/Bhishek-Parmar', avatarUrl: AvatarImg },
  { id: 2, name: 'Ashwin Gorle', profile: 'Full Stack Developer', github: 'https://github.com/AshwinGorle', avatarUrl: AvatarImg },
  { id: 3, name: 'Chirag Patil', profile: 'Full Stack Developer', github: 'https://github.com/Chiragpatil05', avatarUrl: AvatarImg },
  { id: 4, name: 'Akshansh Gupta', profile: 'Full Stack Developer', github: 'https://github.com/akshanshdcode', avatarUrl: AvatarImg },
];

 const AboutUs = () => {
  const [start, setStart] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextStart = (start + 1) % (cardsData.length - 2);
      setStart(nextStart);
      if (containerRef.current) {
        containerRef.current.scrollLeft = nextStart * containerRef.current.offsetWidth;
      }
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [start]);

  return (
    <div className=' h-full   bg-gradient-to-t from-gray-700 to-black min-h-screen w-screen'>
    <div className='text-white flex justify-center items-center mt-20 text-5xl'>
        <h1 className=' font-Inconsolata mt-0'>About Us</h1>
    </div>
    <div className="flex justify-center items-center  overflow-hidden mt-20">
      <div ref={containerRef} className="flex md:flex-row flex-col overflow-x-hidden scroll-snap-type-x-mandatory" style={{ scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}>
        {cardsData.map((card) => (
          <div key={card.id} className="md:w-1/3 m-2 gap-2 w-full   px-4 flex-none scroll-snap-align-start">
            <div className=" p-4 bg-gradient-to-b from-gray-700 to-black shadow-md shadow-blacks border b border-gray-500 rounded-lg">
              <img src={card.avatarUrl} alt="Avatar" className="rounded-full mx-auto mb-4" />
              <p className="text-center text-white font-bold">{card.name}</p>
              <p className="text-center text-gray-300">{card.profile}</p>
              <a href={card.github} target="_blank" rel="noopener noreferrer"> 
              <button className="w-1/2 block mx-auto mt-2 rounded-full bg-gray-200 hover:shadow-lg font-semibold text-white px-6 py-2">
                <div className='flex justify-center items-center text-black'>
                  GitHub <FaGithub className='ml-2 text-[25px]' />
                </div>
              </button>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};


export default AboutUs;