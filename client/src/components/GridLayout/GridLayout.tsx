// GridLayout.tsx
import React, { FC } from 'react';
import './gridLayout.scss';

interface GridLayoutProps {
  children: React.ReactNode[];
}

const GridLayout: FC<GridLayoutProps> = ({ children }) => {
  return (
    <div className="grid-layout">
      {children.map((child, index) => (
        <div key={index} className="grid-item">
          {child}
        </div>
      ))}
    </div>
  );
};

export default GridLayout;
