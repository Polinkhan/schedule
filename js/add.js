import { input, eve, dadd } from "./functions.js";
import { deleteData, pullData, updateData, pullLog } from "./DB.js";

eve();

document.querySelector(".submit").addEventListener("click", input);

let log = await pullLog();
document.querySelector(".logString").innerHTML = log;

let data = await pullData();
if(data){
  data.forEach(function (elem, i) {
    dadd(elem, i);
  });
}

$(document).ready(function () {
  $(".del").click(function () {
    document.querySelector(".delete").addEventListener("click",()=>{
      deleteData(this, data[this.value].id, data[this.value]._name);
      console.log("hello")
    })
  });
  $(".update").click(function () {
    let forms = $(".update_form");
    for (let i = 0; i < forms.length; i++) {
      if(i!=this.value) forms[i].classList.remove("hide");
    }
    forms[this.value].classList.toggle("hide");
  });
  $(".update_submit").click(function () {
    eve();
    let index = Number(this.parentNode.value);
    const form = document.forms[index + 1];
    let item = {};
    for (let i = 0; i < form.length - 1; i++) {
      item[form[i].name] = form[i].value;
    }
    updateData(item, data[index].id,index+1);
  });
});
