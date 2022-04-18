
import { input, eve, dadd } from "./functions.js";
import { deleteData,pullData} from "./DB.js";

eve();
document.querySelector(".submit").addEventListener("click", input);
document.querySelector(".back").addEventListener("click", ()=>{
  location.href = "./index.html";
});

  let data = await pullData();
  data.forEach(function (elem, i) {
    dadd(elem, i);
  });
  $(document).ready(function(){
    $(".del").click(function(){
     if(confirm("are you sure you want to delete? This will also delete the data from the database ")){
         deleteData(this,data[this.value].id);
     }
    });
  });