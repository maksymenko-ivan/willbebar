import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

interface MagneticCardProps {
  to: string;
  className?: string;
  children: React.ReactNode;
}

const MagneticCard: React.FC<MagneticCardProps> = ({ to, className, children }) => {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    
    const { clientX, clientY } = e;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    
    // Calculate rotation based on cursor position relative to card center
    // Range roughly -10 to 10 degrees
    const x = ((clientY - (top + height / 2)) / height) * -15; 
    const y = ((clientX - (left + width / 2)) / width) * 15;
    
    setRotate({ x, y });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <Link
      ref={cardRef}
      to={to}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transition: rotate.x === 0 ? 'transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)' : 'transform 0.1s linear',
        zIndex: rotate.x === 0 ? 1 : 10 // Lift the active card
      }}
    >
      {children}
    </Link>
  );
};

export default MagneticCard;
