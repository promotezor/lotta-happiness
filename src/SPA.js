"use strict";

import {model} from './SPA';
import {view} from './SPA';
import {controller} from './SPA';

let MAIN_PAGE;
let PLAY_PAGE;
let ABOUT_PAGE;
let RULES_PAGE;
let pages;

document.addEventListener("DOMContentLoaded", () => {

  MAIN_PAGE = document.getElementById("main")
  PLAY_PAGE = document.getElementById("play")
  ABOUT_PAGE = document.getElementById("about")
  RULES_PAGE = document.getElementById("rules")
  pages = [MAIN_PAGE, PLAY_PAGE, RULES_PAGE, ABOUT_PAGE];

  window.onhashchange = switchToStateFromURLHash;
  return switchToStateFromURLHash();
});

var SPAState = {};

export function switchToStateFromURLHash() {
  var URLHash = window.location.hash;

  var stateStr = URLHash.substr(1);

  var pageHTML = "";
  switch (stateStr) {
    case "main":
        showPage(MAIN_PAGE, pages);
      break;
    case "play":
      showPage(PLAY_PAGE, pages);
      break;
      case "rules":
        showPage(RULES_PAGE, pages);
        break;
    case "about":
        showPage(ABOUT_PAGE, pages);
      break;
    default:
      showPage(MAIN_PAGE, pages);
      break;
  }
  // document.getElementById("IPage").innerHTML = pageHTML;
}

// function switchToState(newState) {
//   var stateStr = newState.pagename;
//   location.hash = stateStr;

// }


function showPage(visible, hidden) {
  hidden.forEach(item => {
      item.style.display = 'none';
  }, self);
  visible.style.display = 'block';
}

// function confirmExit() {
//   const result = confirm('Вы точно хотите выйти? Результаты будут потеряны');
//   if (!result) {
//       playGame();
//       continueGame();
//   } else delGameOver();
// }

