"use client";
import React, { useState, useEffect } from "react";
import Cover from "@/public/imgJS/Cover";
import Cover1 from "@/public/imgJS/Cover1";
import Cover2 from "@/public/imgJS/Cover2"; 
import Cover3 from "@/public/imgJS/Cover3";

const images = [
  <Cover key="1" />,
  <Cover1 key="2" />,
  <Cover2 key="3" />,
  <Cover3 key="4" />,
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="carousel">
      <div className="carousel-image">{images[currentIndex]}</div>
    </div>
  );
};

export default Carousel;
