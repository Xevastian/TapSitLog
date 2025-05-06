import React from 'react';
import { Icon } from '@iconify/react';
import '../../styles/topNavBar.css';

export default function TopNavBar() {
  return (
    <nav className="top-nav-bar">
      <div className="logo">TapSitLog</div>
      <div className="nav-icons">
        <button className="icon-button">
          <Icon icon="mdi:bell" width="24" height="24" />
        </button>
        <button className="icon-button">
          <Icon icon="mdi:gear" width="24" height="24" />
        </button>
      </div>
    </nav>
  );
}
