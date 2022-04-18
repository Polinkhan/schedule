import { clock, add, login, eve, setTime } from "./functions.js";
import {pullData} from "./DB.js"

eve();
clock();

let data = await pullData();

let sortData = [];
if (data.length == 0) {
  document.querySelector(".error").classList.remove("hide");
}
while (data.length > 0) {
  let index = -1;
  let date = new Date(data[0]["_date"]);
  date.setTime(setTime(date, data[0]["_time"]));

  data.forEach(function (elem, i) {
    let cdate = new Date(elem["_date"]);
    cdate.setTime(setTime(cdate, elem["_time"]));

    if (cdate.getTime() <= date.getTime()) {
      date = cdate;
      index = i;
    }
  });
  sortData.push(data[index]);
  data.splice(index, 1);
}
sortData.forEach(function (elem, i) {
  elem.index = i;
  add(elem);
});

document.querySelector(".login").addEventListener("click", login);
document.querySelector(".keybtn").addEventListener("click", () => {
  let input = document.querySelector(".loginInput");
  if (input.value) {
    if (input.value == 12345) {
      location.href = "https://polinkhan.github.io/schedule/add.html";
    } else {
      input.value = "wrong!!";
      setTimeout(() => {
        input.value = "";
      }, 1000);
    }
  }
});
