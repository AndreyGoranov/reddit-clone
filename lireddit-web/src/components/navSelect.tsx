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
import { getIcon } from "../utils/getIcon";

interface SubNavbarProps {
  handleChoice: ChangeEventHandler<HTMLSelectElement>;
}

const NavSelect: React.FC<SubNavbarProps> = () => {
  const [selected, setSelected] = useState(FeedsEnum.HOME);
  const [open, setOpen] = useState(false);
  const [clickable, setClickable] = useState(true);
  const openSideNavigation = (e) => {
    e.preventDefault();
    setOpen(false);
    setClickable(false);
    console.log("open side nav");
  };

  return (
    <Box ml={5} minWidth={300}>
      {clickable ? (
        <Menu isOpen={open} onClose={() => setOpen(false)}>
          <MenuButton
            className="menu-button"
            minWidth={300}
            textAlign="start"
            background="white"
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
          <MenuList>
            <p className="label">Feeds</p>
            {Object.keys(FeedsEnum).map((key) => (
              <MenuItem
                className="nav-menu-item"
                onClick={() => setSelected(FeedsEnum[key])}
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
                onClick={() => setSelected(OthersEnum[key])}
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
