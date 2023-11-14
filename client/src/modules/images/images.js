import editIcon from "./editIcon.png"
import deleteIcon from "./deleteIcon.png"
import cancelIcon from "./cancelIcon.png"
import confirmIcon from "./confirmIcon.png"
import addIcon from "./addIcon.png"

import unrated from "./6hex.png"
import oneHex from "./1hex2.png"
import twoHex from "./2hex2.png"
import threeHex from "./3hex2.png"
import fourHex from "./4hex2.png"
import fiveHex from "./5hex2.png"
import sixHex from "./6hex2.png"

import slab from "./slab.png"
import overhang from "./overhang.png"

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
