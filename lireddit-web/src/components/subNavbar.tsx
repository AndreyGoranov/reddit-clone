import React from "react";
// import { NavigationEnum } from "../enums/NavigationEnum";

interface SubNavbarProps {
  handleChoice: Function;
}

const SubNavbar: React.FC<SubNavbarProps> = ({ handleChoice }) => {
  return (
    // <div className="subNav">
    //   {Object.keys(NavigationEnum).map((key) => (
    //     <span
    //       key={key}
    //       className="sub-nav-item"
    //       onClick={() => handleChoice(NavigationEnum[key])}
    //     >
    //       {NavigationEnum[key]}
    //     </span>
    //   ))}
    <div>
      pesho
    </div>
  );
};

export default SubNavbar;
