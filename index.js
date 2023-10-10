"use strict";
let token = 0;
let arrIdTracks = [];
const playList = document.querySelector(".audio-player-blok__general");
const divTracks = document.querySelector(".audio-player-blok__general-track");
const tracks = document.querySelector(
  ".audio-player-blok__category-btn_tracks"
);
const iframe = document.querySelector(".iframe-block__playlist");
const openPlaylist = document.querySelector(
  ".audio-player-blok__category-btn_playlist"
);
openPlaylist.addEventListener("click", () => {
  request();
});
tracks.addEventListener("click", () => {
  playList.classList.add("hidden");
  hidden(divTracks);
});

playList.addEventListener("click", (event) => {
  request();
  openPlayer(event);
  hidden(iframe);
});
divTracks.addEventListener("click", (event) => {
  openTracksPlayer(event);
});
async function request() {
  let response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials&client_id=848d5484976b43358d8181457a608633&client_secret=95732fe9e9b145cb8f8b8c37d18e15bf",
  });
  let result = await response.json();
  let token = result.access_token;
  getToken(token);
}
setTimeout(request);
function getToken(meanToken) {
  token = meanToken;
  getAlbumData(token);
}
async function getAlbumData(token) {
  const settings = {
    headers: {
      Authorization: "Bearer" + " " + `${token}`,
    },
  };
  const arrShowerPlaylist = await fetch(
    "https://api.spotify.com/v1/playlists/37i9dQZF1DWSqmBTGDYngZ",
    settings
  );
  const arrRussianPlayList = await fetch(
    "https://api.spotify.com/v1/playlists/37i9dQZF1DX2ShoIPZoN3Y",
    settings
  );
  const arrClassicPlaylist = await fetch(
    "https://api.spotify.com/v1/playlists/37i9dQZF1DX56bqlsMxJYR",
    settings
  );
  const arrPartyPlayList = await fetch(
    "https://api.spotify.com/v1/playlists/37i9dQZF1DWVWiyE9VDkCO",
    settings
  );
  const arrKaraokePlayList = await fetch(
    "https://api.spotify.com/v1/playlists/37i9dQZF1DWYOkVTse9lln",
    settings
  );
  const arrAlonePlayList = await fetch(
    "https://api.spotify.com/v1/playlists/37i9dQZF1DWYBF1dYDPlHw",
    settings
  );
  const dataShowerPlaylist = await arrShowerPlaylist.json();
  const dataRussianPlayList = await arrRussianPlayList.json();
  const dataClassicPlayList = await arrClassicPlaylist.json();
  const dataPartyPlayList = await arrPartyPlayList.json();
  const dataKaraokePlayList = await arrKaraokePlayList.json();
  const dataAlonePlayList = await arrAlonePlayList.json();
  const arrGeneralPlaylist = [
    dataShowerPlaylist,
    dataRussianPlayList,
    dataClassicPlayList,
    dataPartyPlayList,
    dataKaraokePlayList,
    dataAlonePlayList,
  ];
  // const arrGeneralTracks=[dataAlonePlayList]
  createTracks(arrGeneralPlaylist);
  createPlaylist(arrGeneralPlaylist);
}
function createTracks(arr) {
  divTracks.innerHTML = "";
  const arrTracks = [];
  let globalTrackArr = [];
  arr.forEach((element) => {
    arrTracks.push(element.tracks.items);
    globalTrackArr = arrTracks.flat();
  });
  globalTrackArr.forEach((element) => {
    let src =
      "https://open.spotify.com/embed/track/" +
      `${element.track.id}` +
      "?utm_source=generator";
    arrIdTracks.push(src);
    divTracks.insertAdjacentHTML(
      `beforeend`,
      `<div class='audio-player-blok__music-track'><p class="audio-player-blok__track-artist">${element.track.artists[0].name}</p>
      <p class="audio-player-blok__track-name">${element.track.name}</p></div>`
    );
  });
}
function createPlaylist(arr) {
  playList.innerHTML = "";
  hidden(playList);
  divTracks.classList.add("hidden");
  const arrPlaylist = arr;
  arrPlaylist.forEach((element) => {
    playList.insertAdjacentHTML(
      `beforeend`,
      `<div class='audio-player-blok__music'><div class="audio-player-blok__music-img ">
      <img src=${element.images[0].url} class="audio-player-blok__item-img">
      </div><p class="audio-player-blok__item-text">${element.name}</p>
      <p class="audio-player-blok__item-descr">${element.description}</p></div>`
    );
  });
}
function openTracksPlayer(event) {
  console.log(divTracks.children[0].children);
  for (let index = 0; index < arrIdTracks.length; index++) {
    arrIdTracks[index] == divTracks.children[index];
    if (
      event.target == divTracks.children[index] ||
      event.target == divTracks.children[index].children[0] ||
      event.target == divTracks.children[index].children[1]
    ) {
      iframe.src = arrIdTracks[index];
    }
  }
  hidden(iframe);
}
function openPlayer(event) {
  const target = event.target;
  if (
    target.textContent.includes("Shower") ||
    target.textContent.includes("Splash")
  ) {
    iframe.src =
      "https://open.spotify.com/embed/playlist/37i9dQZF1DWSqmBTGDYngZ?utm_source=generator";
  } else if (target.textContent.includes("поп")) {
    iframe.src =
      "https://open.spotify.com/embed/playlist/37i9dQZF1DX2ShoIPZoN3Y?utm_source=generator";
  } else if (target.textContent.includes("Classic")) {
    iframe.src =
      "https://open.spotify.com/embed/playlist/37i9dQZF1DX56bqlsMxJYR?utm_source=generator";
  } else if (
    target.textContent.includes("Party") ||
    target.textContent.includes("Mitsingen")
  ) {
    iframe.src =
      "https://open.spotify.com/embed/playlist/37i9dQZF1DWVWiyE9VDkCO?utm_source=generator";
  } else if (
    target.textContent.includes("Karaoke") ||
    target.textContent.includes("Saca")
  ) {
    iframe.src =
      "https://open.spotify.com/embed/playlist/37i9dQZF1DWYOkVTse9lln?utm_source=generator";
  } else if (target.textContent.includes("Indie") || target.textContent.includes("vocal")) {
    iframe.src =
      "https://open.spotify.com/embed/playlist/37i9dQZF1DWYBF1dYDPlHw?utm_source=generator";
  }
}
function hidden(teg) {
  teg.classList.remove("hidden");
}

import { download } from "server/reply";
import ServicesRequest from "./servis";


const btnOpenRegModal = document.querySelector(".modal__signup");
const loginForm = document.querySelector(".modal__content");
const regForm = document.querySelector(".registr__form");
const regExitBtn = document.querySelector("#registrExit_btn");
btnOpenRegModal.addEventListener("click", () => {
  toggleRegModal(regForm, loginForm);
});
regExitBtn.addEventListener("click", () => {
  toggleRegModal(loginForm, regForm);
});

function toggleRegModal(elOpen, elClose) {
  elOpen.classList.remove("none");
  elClose.classList.add("none");
}



const userReg = document.querySelector("#registUserName");
const userEmail = document.querySelector("#registEmail");
const userPassword = document.querySelector("#registPassword");
const userCopyPassword = document.querySelector("#registCopyPassword");
const regSendBtn = document.querySelector("#registr_btn");

regSendBtn.addEventListener("click", regUserService);

async function regUserService() {
  if (userReg.value == "" || userEmail.value == "" || userPassword == "")
    return null;
  if (userPassword.value != userCopyPassword.value) return null;
  await ServicesRequest.postUser(getInfoUser());
  regForm.reset();
  toggleRegModal(loginForm, regForm);
}
function getInfoUser() {
  return {
    nameUser: userReg.value,
    emailUser: userEmail.value,
    passUser: userPassword.value,
  };
}
async function getUsers() {
  const resp = await fetch("http://localhost:3001/users");
  return resp.json();
}


const logEmail = document.querySelector(".modal__email");
const logPass = document.querySelector(".modal__password");
const autBtn = document.querySelector(".modal__cancelbtn");

autBtn.addEventListener("click", authorization);

async function authorization() {
  const arrUsers = await getUsers();
  const arrAuthUsers = arrUsers.filter(
    (item) => item.emailUser == logEmail.value && item.passUser == logPass.value
  );
  
  if (arrAuthUsers.length == 0) {
    return alert("Проверьте правильность введенных данных");
  }
  {
    loginForm.classList.add("none");
    const modalWindow = document.querySelector(".modal-window");
    modalWindow.classList.add("nonewindow");
    const audioPlayerBlokMedia = document.querySelector(
      ".audio-player-blok__media"
    );
    audioPlayerBlokMedia.classList.remove("none");
    loginForm.reset();
  }
}

const exitBtn = document.querySelector(".audio-player-blok__btn");
exitBtn.addEventListener("click", secondRegistr);
function secondRegistr() {
  const audioPlayerBlokMedia = document.querySelector(
    ".audio-player-blok__media"
  );
  audioPlayerBlokMedia.classList.remove("none");
  const modalWindow = document.querySelector(".modal-window");
  const mainAudioPlayerBlock = document.querySelector(
    ".audio-player-blok__media"
  );
  modalWindow.classList.remove("nonewindow");
  toggleRegModal(loginForm, regForm);
}
