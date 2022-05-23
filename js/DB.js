import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBLAXBrRpNN3dLVpKNW86OOAp4zWVQa2bg",
  authDomain: "schedule2-1e725.firebaseapp.com",
  projectId: "schedule2-1e725",
  storageBucket: "schedule2-1e725.appspot.com",
  messagingSenderId: "518440926789",
  appId: "1:518440926789:web:30e843eb69f9f615b66d2c",
  measurementId: "G-KD0LXCLH62",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const logdb = getFirestore();
const colRef = collection(db, "schedules");
const logRef = collection(logdb, "log");

const auth = getAuth(app);

export let SignUp = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("SignUp Complete");
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
};

export let Login = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      document.querySelector(".btn-close").click();
      const user = userCredential.user;
      console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};
let userName = "";
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log(location.href);
    const uid = user.uid;
    let i = 0;
    while (user.email.charAt(i) != "@") {
      userName += user.email.charAt(i);
      i++;
    }
    
    document.querySelector(".userName").innerHTML = "Welcome " + userName;
    setTimeout(() => {
      document.querySelector(".welcome").classList.toggle("apear");
    }, 1000);
    setTimeout(() => {
      document.querySelector(".welcome").classList.toggle("apear");
    }, 4000);

    let loginLogo = document.querySelector(".loginLogo");
    let loginHead = document.querySelector(".loginHead");
    let afterLogin = document.querySelector(".afterLogin");
    let loginDiv = document.querySelector(".loginDiv");
    let forgotDiv = document.querySelector(".forgotDiv");
    let signupDiv = document.querySelector(".signupDiv");
    let back = document.querySelector(".back");

    loginLogo.innerHTML = "<i class='fa-solid fa-p'></i>";
    loginHead.innerText = "Welcome " + userName;
    afterLogin.classList.remove("hideLogin");
    loginDiv.classList.add("hideLogin");
    signupDiv.classList.add("hideLogin");
    back.classList.add("hideLogin");
    loginDiv.style.height = "0px";
    forgotDiv.style.height = "0px";
    signupDiv.style.height = "0px";

  } else {
    // https://polinkhan.github.io/schedule/add.html
    if (location.href == "https://polinkhan.github.io/schedule/add.html") {
      document.querySelector(".notLogIn").click();
      document.querySelector(".modal-back").addEventListener("click", () => {
        location.href = "./index.html";
      });
    }
  }
});
export let resetPass = (email) => {
  console.log(email);
  sendPasswordResetEmail(auth, email)
    .then(() => {
      document.querySelector(".forgotDiv").innerHTML = "A reset link sent to your email address</br> ["+email+"]";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
};

export let SIGNOUT = () => {
  signOut(auth).then((location.href = "./index.html"));
};

export let getUserName = () => {
  return userName;
};
export let pullLog = async () => {
  let y = await getDocs(logRef);
  return y.docs[0].data().logString;
};

export let pullData = async () => {
  let x = await getDocs(colRef);
  if (x.empty) return false;
  let data = [];
  x.forEach((elem) => data.push({ ...elem.data(), id: elem.id }));
  return data;
};

export let pushData = (item, name) => {
  let id = document.querySelector("#status");
  id.innerHTML = "Upload in progess!!";
  addDoc(colRef, item).then(() => {
    id.innerHTML = "Upload Complete!!";
    updateLog(userName + " added a schedule [" + name + "] ");
    setTimeout(() => {
      id.innerHTML = "";
    }, 1000);
  });
};

export let deleteData = (point, id, name) => {
  const docRef = doc(db, "schedules", id);
  deleteDoc(docRef).then(() => {
    let div = point.parentNode.parentNode;
    div.classList.remove("row");
    div.innerHTML = "delete done";
    updateLog(userName + " deleted a schedule [" + name + "]");
    setTimeout(() => {
      div.innerHTML = "";
      div.classList.remove("del-items");
    }, 1000);
  });
};

export let updateData = async (item, id, index) => {
  let y = await getDocs(logRef);
  const docRef = doc(db, "schedules", id);
  updateDoc(docRef, {
    _name: item._name,
    _date: item._date,
    _time: item._time,
  }).then(
    updateLog(userName + " updated a schedule [" + item._name + "]"),
    (document.forms[
      "updateForm"
    ].innerHTML = `<div class="text-center py-3 text-primary ">Update Done</div>`),
    setTimeout(() => {
      location.href = "./add.html";
    }, 1500)
  );
};
export let updateLog = async (str) => {
  str = " <hr/>[ " + new Date().toLocaleString() + " ] => " + str;
  let y = await getDocs(logRef);
  const docRef = doc(logdb, "log", y.docs[0].id);
  const prev = y.docs[0].data().logString;
  updateDoc(docRef, {
    logString: str + prev,
  });
};
