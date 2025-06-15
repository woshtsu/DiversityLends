import React from 'react';

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export const Card: React.FC<CardProps> = ({ children, className = "" }) => {
  return (
    <div
      className={`bg-white shadow-lg rounded-lg p-6 max-w-md w-full mx-auto ${className}`}
    >
      {children}
    </div>
  );
}