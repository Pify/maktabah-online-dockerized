import React from "react";

const Welcome: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100",
        textAlign: "center",
        
      }}
    >
      <p
        style={{
          fontFamily: "'Amiri', serif",
          fontSize: "40px",
          color: "#6b4226", // warm, gentle tone
          direction: "rtl",
          lineHeight: 1.6,
          whiteSpace: "pre-line",
          padding: "20px 40px",
          borderRadius: "12px",
          backgroundColor: "rgba(255, 255, 255, 0.85)", // subtle card feel
          boxShadow: "0px 4px 12px rgba(0,0,0,0.08)", // gentle shadow
        }}
      >
        مَرْحَبًا {`\n`} يَا طَالِبَ العِلْمِ
      </p>
    </div>
  );
};

export default Welcome;
