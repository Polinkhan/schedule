import { pushData, updateLog, getUserName} from "./DB.js";

function loading(){
  document.querySelector('.loading-container').classList.add('fade-out');
}

function fadeOut(){
  setTimeout(loading,1500);
}

window.onload = fadeOut;

let hrs, min, ms;
let htmlElement = `<div class="row my-4 text-center"><div id="topic" class="my-auto textfield col-4 label1"></div><div id="text" class="textfield col-4 label2 "></div><div id="timeLeft" class="textfield col-4 label3 fw-bold"></div></div>`;

let build = (item,index) => {
  return `<div class="row my-3 text-center del-items justify-content-center position-relative"><div id="name" class="my-auto textfield col-5 label4 rounded bg-primary text-white fw-bold"></div><div class="col-3 p-0"><button type="submit"value="${index}"class="btn text-white fw-bold bg-danger update"><i class="fa-solid fa-pen-to-square"></i></button></div><div class="col-2 p-0"><button type="submit"value="${index}"class="btn text-white fw-bold bg-danger del " data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i class="fa-solid fa-trash-can"></i></button></div>
  
  <div class="update_form my-2"><form action="" name="updateForm" value="${index}" class="row border border-dark rounded" name="update_form"><div class="p-0 col-3 my-auto"><select class="update_field name bg-white" name="_name"><option value="${item._name}">${item._name}</option><option value="VIP">VIP</option><option value="VIP LAB">VIP LAB</option><option value="DBMS">DBMS</option><option value="DBMS LAB">DBMS LAB</option><option value="ALGORITHM">ALGORITHM</option><option value="ALGORITHM LAB">ALGORITHM LAB</option><option value="MACHINE LEARNING">MACHINE LEARNING</option><option value="ISM">ISM</option><option value="OTHER">OTHER</option></select></div><div class="p-0 col-4 my-3"><input class="update_field bg-white" type="date" name="_date" value="${item._date}" required/></div><div class="p-0 col-3 my-auto"><input class="update_field bg-white"type="time"name="_time"value="${item._time}"required/></div><button value="${index}" class="col-2 p-0 my-auto border-0 bg-main"><i class="border rounded-circle my-auto fa-solid fa-circle-check update_submit"></i></button></form></div></div>`;
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
let dx = new Date();
console.log((dx.toLocaleDateString()));

export let input = () => {
  const form = document.forms["userInput"];

  if (form["_date"].value && form["_time"].value) {
    console.log(new Date(form["_date"].value).getTime(), new Date().getTime());
    if (new Date(form["_date"].value).getTime() > new Date().getTime()) {
      let item = {};
      for (let i = 0; i < form.length - 1; i++) {
        item[form[i].name] = form[i].value;
      }
      pushData(item,form["_name"].value);
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
    document.getElementById("clock").innerHTML = new Date().toDateString()+" - "+new Date().toLocaleTimeString();
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
  document.getElementById("deleteItems").innerHTML += build(item,index);
  document.querySelectorAll("#name")[index].innerHTML =
    item._name + "<br/> [" + item._date.substring(5, 10) + "]";
};