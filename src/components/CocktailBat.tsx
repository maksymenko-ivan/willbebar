import React, { useEffect, useState } from 'react';

const CocktailBat: React.FC = () => {
  const [pos, setPos] = useState({ x: -200, y: 200 });
  const [isPerched, setIsPerched] = useState(false);
  const [rotation, setRotation] = useState(0);
  
  const batImg = "https://static.vecteezy.com/system/resources/thumbnails/061/849/136/small/realistic-bat-illustration-with-outstretched-wings-symbol-of-night-mystery-and-halloween-themes-isolated-on-transparent-background-png.png";
  const cocktailImg = "https://static.tildacdn.net/tild3234-3133-4466-b639-316630383064/craiyon_210049_image.png";

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const findNewTarget = () => {
      const targets = document.querySelectorAll('h1, h2, h3, .section-tag, .stat-number');
      const visibleTargets = Array.from(targets).filter(el => {
        const rect = el.getBoundingClientRect();
        // Ensure it's in a good reading zone
        return rect.top > 150 && rect.top < window.innerHeight - 150;
      });

      if (visibleTargets.length > 0) {
        const target = visibleTargets[Math.floor(Math.random() * visibleTargets.length)];
        const rect = target.getBoundingClientRect();
        
        // Land precisely on the top-left of the first letter
        const targetX = rect.left + window.scrollX;
        const targetY = rect.top + window.scrollY;
        
        setIsPerched(false);
        // Bank during flight
        setRotation(targetX > pos.x ? 15 : -15);
        
        // Move the combined entity
        setPos({ x: targetX, y: targetY });

        // Once arrived (after transition), stop rotation and "perch"
        setTimeout(() => {
          setRotation(0);
          setIsPerched(true);
        }, 3500); // Matches the CSS transition duration
      }
    };

    const moveCycle = () => {
      findNewTarget();
      timer = setTimeout(moveCycle, 20000); // Move every 20 seconds
    };

    // Initial delay before first move
    timer = setTimeout(moveCycle, 2000);

    const handleScroll = () => {
      setIsPerched(false);
      clearTimeout(timer);
      timer = setTimeout(moveCycle, 4000); // Settle after 4s of no scrolling
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, [pos.x, pos.y]);

  return (
    <div 
      className={`unified-bat-familiar ${isPerched ? 'perched' : 'flying'}`}
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        transform: `rotate(${rotation}deg)`,
      }}
    >
      <div className="familiar-container">
        {/* THE BAT - Segmented Wings */}
        <div className="bat-body-wrapper">
          <div className="wing-l"><img src={batImg} alt="" /></div>
          <div className="torso"><img src={batImg} alt="" /></div>
          <div className="wing-r"><img src={batImg} alt="" /></div>
        </div>

        {/* THE COCKTAIL - Directly in paws */}
        <div className="clutched-cocktail">
          <img src={cocktailImg} alt="Signature Drink" />
        </div>
      </div>

      <style>{`
        .unified-bat-familiar {
          position: absolute;
          pointer-events: none;
          z-index: 10000;
          /* Offset so the glass itself lands on the letter */
          margin-left: -55px; 
          margin-top: -45px;
          transition: all 3.5s cubic-bezier(0.45, 0, 0.55, 1);
        }

        .familiar-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
        }

        .bat-body-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 140px;
          height: 80px;
          filter: drop-shadow(0 10px 25px rgba(0,0,0,0.6));
        }

        .wing-l, .wing-r {
          width: 65px;
          height: 80px;
          overflow: hidden;
          position: relative;
        }

        .wing-l { transform-origin: right center; }
        .wing-r { transform-origin: left center; }

        .wing-l img, .wing-r img, .torso img {
          width: 140px;
          height: 80px;
          position: absolute;
          top: 0;
          object-fit: contain;
          filter: brightness(0.6) contrast(1.2);
        }

        .wing-l img { left: 0; }
        .wing-r img { right: 0; }
        .torso {
          width: 10px;
          height: 80px;
          overflow: hidden;
          position: relative;
          z-index: 2;
        }
        .torso img { 
          left: -65px; 
          filter: brightness(0.85) contrast(1.1); /* Body slightly lighter brown */
        }

        .clutched-cocktail {
          width: 32px;
          height: auto;
          margin-top: -30px; /* Position in paws */
          z-index: 3;
          filter: drop-shadow(0 0 10px rgba(212, 175, 55, 0.4));
          animation: cargoSway 4s infinite alternate ease-in-out;
        }

        .clutched-cocktail img { width: 100%; height: auto; display: block; }

        /* Animations */
        .flying .wing-l { animation: flapL 0.2s infinite alternate ease-in-out; }
        .flying .wing-r { animation: flapR 0.2s infinite alternate ease-in-out; }
        .flying .torso { animation: bodyBob 0.2s infinite alternate ease-in-out; }

        .perched .wing-l { animation: foldL 4s infinite alternate ease-in-out; }
        .perched .wing-r { animation: foldR 4s infinite alternate ease-in-out; }

        @keyframes flapL {
          from { transform: rotateY(0deg) rotateZ(0deg); }
          to { transform: rotateY(45deg) rotateZ(15deg); }
        }
        @keyframes flapR {
          from { transform: rotateY(0deg) rotateZ(0deg); }
          to { transform: rotateY(-45deg) rotateZ(-15deg); }
        }
        @keyframes bodyBob {
          from { transform: translateY(0); }
          to { transform: translateY(-4px); }
        }
        @keyframes foldL {
          from { transform: rotateZ(5deg); }
          to { transform: rotateZ(12deg); }
        }
        @keyframes foldR {
          from { transform: rotateZ(-5deg); }
          to { transform: rotateZ(-12deg); }
        }
        @keyframes cargoSway {
          from { transform: rotate(-4deg) translateX(-1px); }
          to { transform: rotate(4deg) translateX(1px); }
        }

        @media (max-width: 768px) {
          .unified-bat-familiar { display: none; }
        }
      `}</style>
    </div>
  );
};

export default CocktailBat;
