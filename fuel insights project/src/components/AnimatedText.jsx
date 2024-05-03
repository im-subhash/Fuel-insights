import React, { useEffect, useState } from "react";

const AnimatedText = ({ text, delay, animate }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (animate) {
      const timeout = setTimeout(() => {
        setIsVisible(true);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [animate, delay]);

  return (
    <div
      className={`animate-typing  overflow-hidden whitespace-nowrap border-r-4 border-r-white pr-5 text-white font-bold font-Lexend md:text-2xl text-sm ${
        isVisible
          ? "opacity-100 translate-x-0"
          : "opacity-0 translate-x-[-100%]"
      }`}
    >
      {text}
    </div>
  );
};

const AnimatedTextGroup = () => {
  const [animationState, setAnimationState] = useState(0);

  useEffect(() => {
    const timeouts = [
      setTimeout(() => {
        setAnimationState(1);
      }, 1200),
      setTimeout(() => {
        setAnimationState(2);
      }, 2400),
    ];

    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, []);

  return (
    <div className="flex flex-col md:flex-row items-center">
      <AnimatedText
        text="Fuel Insights:"
        delay={0}
        animate={animationState >= 0}
      />
      <AnimatedText
        text="Protecting Every Drop,"
        delay={1200}
        animate={animationState >= 1}
      />
      <AnimatedText
        text="Preventing Every Drain"
        delay={2400}
        animate={animationState >= 2}
      />
    </div>
  );
};

export default AnimatedTextGroup;
