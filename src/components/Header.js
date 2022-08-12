import React from "react";
import { NavLink as ReactRouterDomNavLink } from "react-router-dom";
import styled from "styled-components";

const NavLink = ({ isActive, children, ...props }) => {
  return <ReactRouterDomNavLink {...props}>{children}</ReactRouterDomNavLink>;
};

const HeaderBlock = styled.ul`
  width: 100%;
  display: table;
  list-style: none;
  margin: 0;
  padding: 0;
  li {
    width: 33.334%;
    display: table-cell;
  }
`;
const HeaderItem = styled(NavLink)`
  width: 100%;
  display: block;
  height: 44px;
  border-bottom: 1px solid #d4d6dc;
  line-height: 42px;
  color: #333;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  &.active {
    height: 42px;
    border-bottom: 3px solid #0062df;
    color: #0062df;
    font-weight: 700;
  }
`;

const Header = () => {
  return (
    <HeaderBlock>
      <li>
        <HeaderItem to="/">원화</HeaderItem>
      </li>
      <li>
        <HeaderItem to="/BTC">BTC</HeaderItem>
      </li>
      <li>
        <HeaderItem to="/USDT">USDT</HeaderItem>
      </li>
    </HeaderBlock>
  );
};

export default React.memo(Header);
