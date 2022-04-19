import { pushData, updateLog } from "./DB.js";
export let userName;
let hrs, min, ms;
let htmlElement = `<div class="row my-4 text-center"><div id="topic" class="my-auto textfield col-4 label1"></div><div id="text" class="textfield col-4 label2 "></div><div id="timeLeft" class="textfield col-4 label3 fw-bold"></div></div>`;

let build = (index) => {
  return `<div class="row my-3 text-center del-items"><div class="col-1" ></div><div id="name" class="my-auto textfield col-7 label4 rounded bg-primary text-white fw-bold"></div ><div class = "col-4 p-0"><button type ="submit" value = "${index}" class="btn text-white fw-bold bg-danger del"><i class="fa-solid fa-trash-can"></i></button></div>`;
};

let msToTime = (s) => {
  let ms = s % 1000;
  s = (s - ms) / 1000;
  let secs = s % 60;
  s = (s - secs) / 60;
  let mins = s % 60;
  s = (s - mins) / 60;
  let hrs = s % 24;
  let days = (s - hrs) / 24;

  let day = days > 1 ? "days" : "day";

  return `${days} ${day}<br/> ${hrs}h: ${mins}m: ${secs + 1}s`;
};

let getDate = (date) => {
  switch (date.substring(5, 7)) {
    case "01":
      return `${date.substring(8, 10)} jan`;
    case "02":
      return `${date.substring(8, 10)} feb`;
    case "03":
      return `${date.substring(8, 10)} mar`;
    case "04":
      return `${date.substring(8, 10)} apr`;
    case "05":
      return `${date.substring(8, 10)} may`;
    case "06":
      return `${date.substring(8, 10)} jun`;
    case "07":
      return `${date.substring(8, 10)} jul`;
    case "08":
      return `${date.substring(8, 10)} aug`;
    case "09":
      return `${date.substring(8, 10)} sep`;
    case "10":
      return `${date.substring(8, 10)} oct`;
    case "11":
      return `${date.substring(8, 10)} nov`;
    case "12":
      return `${date.substring(8, 10)} dec`;
  }
};

let toHrsMin = (time, start, end) => {
  return time.substring(start, end);
};

let localTime = (date, time) => {
  let ampm;
  toHrsMin(time, 0, 2) > 12 ? (ampm = "PM") : (ampm = "AM");
  return `[ ${getDate(date)} ] <br/> at ${toHrsMin(time, 0, 2) % 12}:${toHrsMin(
    time,
    3,
    5
  )} ${ampm}`;
};

export let setTime = (de, time) => {
  hrs = toHrsMin(time, 0, 2) * 60;
  min = toHrsMin(time, 3, 5) * 1;
  ms = (hrs + min) * 60000;
  de.setHours(0);
  return de.getTime() + ms;
};

export let input = () => {
  const form = document.forms["userInput"];

  if (form["_date"].value && form["_time"].value) {
    console.log(new Date(form["_date"].value).getTime(), new Date().getTime());
    if (new Date(form["_date"].value).getTime() > new Date().getTime()) {
      let item = {};
      for (let i = 0; i < form.length - 1; i++) {
        item[form[i].name] = form[i].value;
      }
      updateLog(" <hr/>" + userName + " added a schedule [" +form["_name"].value+"] "+new Date().toLocaleString());
      pushData(item);
    } else {
      let status = document.querySelector("#status");
      status.innerHTML = "Enter Correct Date You Idiot!! 😤";
      setTimeout(() => {
        status.innerHTML = "";
      }, 3000);
    }
  }
};

export let eve = () => {
  $("form").submit(function (e) {
    e.preventDefault();
  });
};

export let clock = () => {
  setInterval(() => {
    document.getElementById("clock").innerText = new Date().toLocaleString();
  }, 1000);
};

export let add = (item) => {
  document.getElementById("items").innerHTML += htmlElement;
  let subject = document.querySelectorAll("#topic")[item.index];
  let date = document.querySelectorAll("#text")[item.index];
  let time = document.querySelectorAll("#timeLeft")[item.index];
  let d = new Date(item._date);
  d.setTime(setTime(d, item._time));

  subject.innerHTML = item._name;
  date.innerHTML = localTime(item._date, item._time);
  time.innerHTML = "Loading ...";

  setInterval(() => {
    document.querySelectorAll("#timeLeft")[item.index].innerHTML = msToTime(
      d.getTime() - new Date().getTime()
    );
  }, 1000);
};

export let dadd = (item, index) => {
  console.log(item);
  document.getElementById("deleteItems").innerHTML += build(index);
  document.querySelectorAll("#name")[index].innerHTML =
    item._name + "<br/> [" + item._date.substring(5, 10) + "]";
};

export let setCookie = (cname, cvalue, exdays) => {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
};

export let getCookie = (cname) => {
  let name = cname + "=";
  let ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

userName = getCookie("username");
if (userName == "") {
  userName = prompt("Please enter your name:", "");
  if (userName != "" && userName != null) {
    setCookie("username", userName, 365);
  }
}
