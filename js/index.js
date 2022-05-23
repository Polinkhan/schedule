import { clock, add, eve, setTime } from "./functions.js";
import { pullData,SignUp,Login,SIGNOUT } from "./DB.js";
eve();

let data = await pullData();

let canvas = document.querySelector(".offcanvas-header");
let loginHead = document.querySelector(".loginHead");
let back = document.querySelector(".back");
let loginDiv = document.querySelector(".loginDiv");
let forgotDiv = document.querySelector(".forgotDiv")
let signupDiv = document.querySelector(".signupDiv");

function fadeCss() {
  canvas.classList.toggle("hideLogin");
  loginDiv.style.height = "0px";
  back.classList.toggle("hideLogin");
}
function fadeCssOut() {
  loginDiv.classList.toggle("hideLogin");
  canvas.classList.toggle("hideLogin");
}

document.querySelector(".forgetpass").addEventListener("click", () => {
  fadeCssOut();
  setTimeout(() => {
    fadeCss();
    forgotDiv.classList.toggle("hideLogin");
    loginHead.innerText = "Reset Password";
  }, 500);
});

document.querySelector(".goSignUp").addEventListener("click", () => {
  fadeCssOut();
  setTimeout(() => {
    fadeCss();
    forgotDiv.style.height = "0px";
    signupDiv.classList.toggle("hideLogin");
    loginHead.innerText = "Sign Up Now";
  }, 500);
});

document.querySelector(".back").addEventListener("click", () => {
  forgotDiv.classList.add("hideLogin");
  signupDiv.classList.add("hideLogin");
  canvas.classList.toggle("hideLogin");
  back.classList.toggle("hideLogin");
  setTimeout(() => {
    fadeCssOut();
    loginHead.innerText = "Login Now";
  }, 500);
});

document.querySelector(".logout").addEventListener("click",()=>{
  SIGNOUT();
})

document.querySelector(".LOGIN").addEventListener("click",()=>{
  let email = document.forms["loginForm"]["email"].value;
  let pass = document.forms["loginForm"]["pass"].value
  if(email && pass){
    Login(email,pass);
  }
})

document.querySelector(".SIGNUP").addEventListener("click",()=>{
  let email = document.forms["signUpForm"]["email"].value;
  let pass = document.forms["signUpForm"]["pass"].value;
  let conpass = document.forms["signUpForm"]["con-pass"].value;
  if(pass == conpass){
    SignUp(email,pass);
  }
})
clock();
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
