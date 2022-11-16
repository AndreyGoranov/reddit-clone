import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import React, { ChangeEventHandler, useState } from "react";
import { FeedsEnum, OthersEnum } from "../enums/navigationEnum";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChevronDownIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import { getIcon } from "../utils/getNavigationIcon";

interface SubNavbarProps {
  clickable: boolean;
  selected: FeedsEnum & OthersEnum;
  isSideNav: boolean;
  handleChoice: Function;
  handleNavigationTools: Function;
}

const NavSelect: React.FC<SubNavbarProps> = ({
  selected,
  isSideNav,
  handleChoice,
  handleNavigationTools,
  clickable,
}) => {
  const [open, setOpen] = useState(isSideNav);

  const openSideNavigation = (e) => {
    e.preventDefault();
    setOpen(false);
    handleNavigationTools();
  };

  return (
    <Box ml={5} minWidth={300}>
      {clickable ? (
        <Menu
          closeOnBlur={!isSideNav}
          closeOnSelect={!isSideNav}
          isOpen={open}
          onClose={() => setOpen(false)}
        >
          {!isSideNav ? (
            <MenuButton
              className={!open ? "menu-button" : "menu-button-active"}
              onClick={() => setOpen(!open)}
              as={Button}
              leftIcon={<FontAwesomeIcon icon={getIcon(selected)} />}
              rightIcon={
                <span>
                  {open ? (
                    <ChevronLeftIcon onClick={(e) => openSideNavigation(e)} />
                  ) : null}
                  <ChevronDownIcon />
                </span>
              }
            >
              {selected}
            </MenuButton>
          ) : null}
          <MenuList className={!isSideNav ? "menu-list" : "side-menu-list"}>
            {isSideNav ? (
              <i
                onClick={() => handleNavigationTools()}
                className="fa-solid fa-xmark close-icon"
              />
            ) : null}
            <p className="label">Feeds</p>
            {Object.keys(FeedsEnum).map((key) => (
              <MenuItem
                className="nav-menu-item"
                onClick={() => handleChoice(FeedsEnum[key])}
                icon={<FontAwesomeIcon icon={getIcon(FeedsEnum[key])} />}
                key={key}
              >
                {FeedsEnum[key]}
              </MenuItem>
            ))}
            <p className="label">Others</p>
            {Object.keys(OthersEnum).map((key) => (
              <MenuItem
                className="nav-menu-item"
                onClick={() => handleChoice(OthersEnum[key])}
                icon={<FontAwesomeIcon icon={getIcon(OthersEnum[key])} />}
                key={key}
              >
                {OthersEnum[key]}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      ) : (
        <div className="readonly-nav-selection">
          <FontAwesomeIcon icon={getIcon(selected)} />
          <span>{selected}</span>
        </div>
      )}
    </Box>
  );
};

export default NavSelect;
