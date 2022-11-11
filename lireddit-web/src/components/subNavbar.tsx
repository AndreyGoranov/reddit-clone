import React from "react";
import { SubNavbarEnum } from "../enums/subNavbar.enum";

interface SubNavbarProps {
  handleChoice: Function;
}

const SubNavbar: React.FC<SubNavbarProps> = ({ handleChoice }) => {
  return (
    <div className="subNav">
      {Object.keys(SubNavbarEnum).map((key) => (
        <span
          key={key}
          className="sub-nav-item"
          onClick={() => handleChoice(SubNavbarEnum[key])}
        >
          {SubNavbarEnum[key]}
        </span>
      ))}
    </div>
  );
};

export default SubNavbar;
