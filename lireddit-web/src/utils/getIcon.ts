import {
  faHouse,
  faCoins,
  faTv,
  faSignal,
  faArrowsToCircle,
  faPersonCircleExclamation,
  faPlus,
  faUserCog,
  faMessage,
  faBell,
  faThumbsDown,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { FeedsEnum, OthersEnum } from "../enums/navigationEnum";

export const getIcon = (item: FeedsEnum | OthersEnum | null) => {
  if (item === FeedsEnum.HAPPENING_NOW) {
    return faTv;
  }

  if (item === FeedsEnum.ALL_POSTS) {
    return faSignal;
  }

  if (item === FeedsEnum.POPULAR) {
    return faArrowsToCircle;
  }

  if (item === FeedsEnum.MY_POSTS) {
    return faPersonCircleExclamation;
  }

  if (item === OthersEnum.COINS) {
    return faCoins;
  }

  if (item === OthersEnum.CREATE_POST) {
    return faPlus;
  }

  if (item === OthersEnum.USER_SETTINGS) {
    return faUserCog;
  }

  if (item === OthersEnum.MESSAGES) {
    return faMessage;
  }

  if (item === OthersEnum.NOTIFICATIONS) {
    return faBell;
  }

  if (item === OthersEnum.MOST_DISLIKED) {
    return faThumbsDown;
  }

  if (item === OthersEnum.MOST_LIKED) {
    return faThumbsUp;
  }

  return faHouse;
};
