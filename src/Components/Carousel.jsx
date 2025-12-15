import React, { useEffect, useState } from "react";

const slides = [
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
  "https://images.unsplash.com/photo-1542626991-cbc4e32524cc?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1494172961521-33799ddd43a5",
];

export default function Carousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-full rounded-lg">
      <img
        src={slides[index]}
        alt="carousel"
        className="w-full h-full object-cover transition-all duration-700"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Text content */}
      <div className="absolute bottom-10 left-8 text-white drop-shadow-lg">
        <h2 className="text-3xl font-bold">Welcome to Kanban App</h2>
        <p className="text-lg mt-2">Manage tasks visually & smartly 🚀</p>
      </div>
    </div>
  );
}
