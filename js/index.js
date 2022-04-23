import { clock, add, eve, setTime,userName } from "./functions.js";
import { pullData, pullLog } from "./DB.js";
eve();

window.onload = () =>{
  document.querySelector(".welcome").classList.add("apear");
}

document.querySelector(".userName").innerText = userName; 
let log = await pullLog();
let data = await pullData();
document.querySelector(".logString").innerHTML += log;
clock();
console.log(data)
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

document.querySelector(".login").addEventListener("click", () => {
  location.href = "./add.html";
});
document.querySelector(".log-txt").addEventListener("click", () => {
  document.querySelector(".logString").classList.toggle("txt_shift");
  document.querySelector(".fa-angles-down").classList.toggle("rotate");
});
