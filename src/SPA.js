"use strict";
let MAIN_PAGE;
let PLAY_PAGE;
let ABOUT_PAGE;
let pages;

document.addEventListener("DOMContentLoaded", () => {

  MAIN_PAGE = document.getElementById("main")
  PLAY_PAGE = document.getElementById("play")
  ABOUT_PAGE = document.getElementById("about")
  pages = [MAIN_PAGE, PLAY_PAGE, ABOUT_PAGE];

  console.log(MAIN_PAGE, pages, "QQ");

  window.onhashchange = switchToStateFromURLHash;
  return switchToStateFromURLHash();
});

var SPAState = {};

export function switchToStateFromURLHash() {
  var URLHash = window.location.hash;

  var stateStr = URLHash.substr(1);

  console.log("Новое состояние приложения:");
  console.log(SPAState);

  var pageHTML = "";
  switch (stateStr) {
    case "play":
      showPage(PLAY_PAGE, pages);
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

function switchToState(newState) {
  var stateStr = newState.pagename;
  location.hash = stateStr;

}

function switchToMainPage() {
  switchToState({ pagename: "Main" });
}

function switchToPhotoPage(photoId) {
  switchToState({ pagename: "Photo", photoid: photoId });
}

function switchToAboutPage() {
  switchToState({ pagename: "About" });
}

function showPage(visible, hidden) {
  hidden.forEach(item => {
      item.style.display = 'none';
  }, self);
  visible.style.display = 'block';
}

function confirmExit() {
  const result = confirm('Вы точно хотите выйти? Результаты будут потеряны');
  if (!result) {
      playGame();
      continueGame();
  } else delGameOver();
}

