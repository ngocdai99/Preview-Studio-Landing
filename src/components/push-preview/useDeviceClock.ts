"use client";

import { useState, useEffect } from "react";

export function useDeviceClock() {
  const [time, setTime] = useState<string>("9:41");
  const [fullDate, setFullDate] = useState<string>("Saturday, Nov 15");
  const [shortDate, setShortDate] = useState<string>("Sat, Nov 15");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, "0");
      setTime(`${hours}:${minutes}`);

      const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const shortDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      const day = days[now.getDay()];
      const shortDay = shortDays[now.getDay()];
      const month = months[now.getMonth()];
      const dateNum = now.getDate();

      setFullDate(`${day}, ${month} ${dateNum}`);
      setShortDate(`${shortDay}, ${month} ${dateNum}`);
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return { time, fullDate, shortDate };
}
