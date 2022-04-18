import { pushData,pullData } from "./DB.js";

let hrs, min, ms;
let htmlElement = `<div class="row my-4 text-center"><div id="topic" class="my-auto textfield col-4 label1"></div><div id="text" class="textfield col-4 label2 "></div><div id="timeLeft" class="textfield col-4 label3"></div></div>`;

let build = (index) => {
  return `<div class="row my-4 text-center"><div class="col-1" ></div><div id="name" class="my-auto textfield col-6 label1"></div><button type ="submit" value = "${index}" class=" btn text-danger fw-bold textfield col-4 label3 bg-label del">Delete</button>`;
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
  return `${days}D ${hrs}H ${mins}M ${secs + 1}S left`;
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
  return `[ .. ${getDate(date)} .. ] ${toHrsMin(time, 0, 2) % 12}:${toHrsMin(
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

  if (form["_date"].value) {
    console.log(new Date(form["_date"].value).getTime(), new Date().getTime());
    if (new Date(form["_date"].value).getTime() > new Date().getTime()) {
      let item = {};
      for (let i = 0; i < form.length - 1; i++) {
        item[form[i].name] = form[i].value;
      }
      pushData(item);
    } else {
      console.log("enter correct date");
    }
  }
};

export let eve = () => {
  $("form").submit(function (e) {
    e.preventDefault();
  });
};

export let login = () => {
  document.querySelector(".login").classList.add("hide");
  document.querySelector(".loginInput").classList.remove("hide");
  document.querySelector(".keybtn").classList.remove("hide");
};

export let hideLogin = () => {
  document.querySelector(".loginInput").classList.add("hide");
  document.querySelector(".keybtn").classList.add("hide");
};

export let clock = () => {
  setInterval(() => {
    document.getElementById("clock").innerText = new Date().toLocaleString();
  }, 0);
};

export let add = (item) => {
  document.getElementById("items").innerHTML += htmlElement;

  let d = new Date(item._date);
  d.setTime(setTime(d, item._time));

  document.querySelectorAll("#topic")[item.index].innerHTML = item._name;
  document.querySelectorAll("#text")[item.index].innerHTML = localTime(
    item._date,
    item._time
  );

  setInterval(() => {
    document.querySelectorAll("#timeLeft")[item.index].innerHTML = msToTime(
      d.getTime() - new Date().getTime()
    );
  }, 0);
};

export let dadd = (item, index) => {
  console.log(item);
  document.getElementById("deleteItems").innerHTML += build(index);
  document.querySelectorAll("#name")[index].innerHTML =
    item._name + " [" + item._date.substring(5, 10) + "]";
};

// export let getData = async () => {
//   let data = [];
//   let x = await pullData();
//   x.forEach((elem) => data.push({ ...elem.data(), id: elem.id }));
//   return data;
// };
