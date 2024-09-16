// ListLayout.tsx
import React, { FC } from 'react';
import './ListLayout.scss';

interface ListLayoutProps {
  children: React.ReactNode[];
}

const ListLayout: FC<ListLayoutProps> = ({ children }) => {
  return (
    <div className="list-layout">
      {children.map((child, index) => (
        <div key={index} className="list-item">
          {child}
        </div>
      ))}
    </div>
  );
};

export default ListLayout;
