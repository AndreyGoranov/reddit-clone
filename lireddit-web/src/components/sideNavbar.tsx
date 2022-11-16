import React from "react";
import { FeedsEnum, OthersEnum } from "../enums/navigationEnum";
import NavMenu from "./navMenu";

interface SideNavbarProps {
  isSideNav: boolean;
  selected: FeedsEnum & OthersEnum;
  handleChoice: Function;
  handleNavigationTools: Function;
}

const SideNavbar: React.FC<SideNavbarProps> = ({
  isSideNav,
  selected,
  handleChoice,
  handleNavigationTools,
}) => {
  return (
    <NavMenu
      clickable={true}
      selected={selected}
      isSideNav={isSideNav}
      handleChoice={handleChoice}
      handleNavigationTools={handleNavigationTools}
    />
  );
};

export default SideNavbar;
