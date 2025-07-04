export default function Logo() {
    return (
      <svg
        width="240"
        height="80"
        viewBox="0 0 250 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-lime-400"
      >
        <style>
          {`
            .wave {
              animation: waveMotion 3s ease-in-out infinite;
            }
            @keyframes waveMotion {
              0% { transform: translateY(0); }
              50% { transform: translateY(-2px); }
              100% { transform: translateY(0); }
            }
          `}
        </style>
        <text
          x="60"
          y="30"
          fontSize="20"
          fill="currentColor"
          fontWeight="bold"
          fontFamily="sans-serif"
        >
          Travel Vibe
        </text>
        <g className="wave" fill="currentColor">
          <path d="M10 30 Q 15 25, 20 30 T 30 30 T 40 30 T 50 30" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M20 30 L25 20 L30 30 Z" fill="currentColor" /> 
          <circle cx="25" cy="15" r="3" fill="currentColor" /> 
        </g>
      </svg>
    );
  }
  