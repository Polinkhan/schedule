import { userName } from "./functions.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

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

export let pullLog = async () =>{
  let y = await getDocs(logRef);
  return y.docs[0].data().logString;
}

export let pullData = async () => {
  let x = await getDocs(colRef);
  let data = [];
  x.forEach((elem) => data.push({ ...elem.data(), id: elem.id }));
  return data;
};

export let pushData = (item) => {
  let id = document.querySelector("#status");
  id.innerHTML = "Upload in progess!!";
  addDoc(colRef, item).then(() => {
    id.innerHTML = "Upload Complete!!";
    setTimeout(() => {
      id.innerHTML = "";
    }, 1000);
  });
};

export let deleteData = (point, id,name) => {
  const docRef = doc(db, "schedules", id);
  deleteDoc(docRef).then(() => {
    let div = point.parentNode.parentNode;
    div.classList.remove("row");
    div.innerHTML = "delete done";
    updateLog("<hr/>" + userName + " deleted a schedule ["+name+"] "+new Date().toLocaleString());
    setTimeout(() => {
      div.innerHTML = "";
      div.classList.remove("del-items");
    }, 1000);
  });
};

export let updateLog = async(str) => {
  let y = await getDocs(logRef);
  const docRef = doc(logdb, "log", y.docs[0].id);
  const prev = y.docs[0].data().logString;
  updateDoc(docRef,{
    logString : str + prev
  })
};
