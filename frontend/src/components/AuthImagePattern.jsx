import React from "react";

const AuthImagePattern = ({ title, subtitle, owner }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
      <div className="text-center">
        {/* Block Pattern */}
        <div className="grid grid-cols-3 w-[300px] h-[300px] mx-auto mb-4">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`w-24 h-24 bg-blue-500 rounded-md flex items-center justify-center
              ${i % 2 === 0 ? "animate-bounce" : "animate-pulse"} shadow-lg`}
            />
          ))}
        </div>
        {/* Centered Text */}
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-base-content/60">{subtitle}</p>

        {/* Clickable Owner Name Linking to Portfolio */}
        <p className="text-base-content/60">
          <a
            href="https://my-portfolio-six-tau-59.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline font-semibold"
          >
            {owner}
          </a>
        </p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
