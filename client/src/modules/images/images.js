import editIcon from "modules/images/assets/editIcon.png"
import deleteIcon from "modules/images/assets/deleteIcon.png"
import cancelIcon from "modules/images/assets/cancelIcon.png"
import confirmIcon from "modules/images/assets/confirmIcon.png"
import addIcon from "modules/images/assets/addIcon.png"

import unrated from "modules/images/assets/6hex.png"
import oneHex from "modules/images/assets/1hex2.png"
import twoHex from "modules/images/assets/2hex2.png"
import threeHex from "modules/images/assets/3hex2.png"
import fourHex from "modules/images/assets/4hex2.png"
import fiveHex from "modules/images/assets/5hex2.png"
import sixHex from "modules/images/assets/6hex2.png"

import slab from "modules/images/assets/slab.png"
import overhang from "modules/images/assets/overhang.png"

const images = {
  editIcon,
  deleteIcon,
  cancelIcon,
  confirmIcon,
  addIcon,
  unrated,
  oneHex,
  twoHex,
  threeHex,
  fourHex,
  fiveHex,
  sixHex,
  slab,
  overhang,
}

export function getHexImage(rating) {
  switch (rating) {
  case -1:
    return images.unrated
  case 0:
    return images.sixHex
  case 1:
    return images.oneHex
  case 2:
    return images.twoHex
  case 3:
    return images.threeHex
  case 4:
    return images.fourHex
  case 5:
    return images.fiveHex
  case 6:
    return images.sixHex
  }
}

export function getBoulderTypeImage(boulderType) {
  switch (boulderType) {
  case "Slab":
    return images.slab
  case "Overhang":
    return images.overhang
  }
}

export default images
