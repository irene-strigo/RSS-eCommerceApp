import { ReactNode } from 'react';
import './page-wrapper.css';
import React from 'react';

interface IPageWrapperProps {
  items?: ReactNode;
}
const PageWrapper: React.FC<IPageWrapperProps> = ({ items }) => {
  return <div className="page-wrapper">{items}</div>;
};

export default PageWrapper;
