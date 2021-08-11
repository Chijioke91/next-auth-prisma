import { FC } from 'react';
import Nav from './Nav';

const Layout: FC = ({ children }) => {
  return (
    <>
      <Nav />
      {children}
    </>
  );
};

export default Layout;
