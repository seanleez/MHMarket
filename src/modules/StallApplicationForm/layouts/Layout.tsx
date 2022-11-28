import React, { ReactNode } from 'react';

import './Layout.scss';

interface ILayout {
  children: ReactNode;
}

const Layout = ({ children }: ILayout) => {
  return (
    <div className='stall-modal-layout'>
      <span className='stall-modal-title'>New market stall application</span>
      <div className='stall-modal-header'>
        <div className='stall-modal-header__company-name'>
          MH-Market
        </div>
        <div className='stall-modal-header__sologan'>
          BUSINESS PERMITS AND LICENSING DEPARTMENT
        </div>
      </div>
      <div>{ children }</div>
    </div>
  );
};

export default Layout;