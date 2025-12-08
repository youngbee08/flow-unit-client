import React, { useState, useEffect } from "react";

const CountdownButton = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);
  const { days, hours, minutes, seconds } = timeLeft;

  return (
    <button className="bg-tertiary text-primary font-semibold text-xs lg:text-sm px-5 py-2 cursor-pointer transition-all rounded-[18px]">
      {days > 0
        ? `${days}d ${hours}h ${minutes}m ${seconds}s left`
        : `${hours}h ${minutes}m ${seconds}s left`}
    </button>
  );
};

export default CountdownButton;