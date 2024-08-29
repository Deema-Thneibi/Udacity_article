import axios from "axios";
import { validateURL } from "./checkURL";

const input = document.querySelector("form input")
const form = document.querySelector("form");
const error = document.querySelector(".error");
const agreement = document.getElementById("agreement");
const subjectivity = document.getElementById("subjectivity");
const confidence = document.getElementById("confidence");
const irony = document.getElementById("irony");
const score_tag = document.getElementById("score_tag");
const results = document.querySelectorAll(".result div");

document.addEventListener("DOMContentLoaded", e=>{
    e.preventDefault();
    error.style.display = "none";
});

const handleSubmit = async (event)=>{
    event.preventDefault();
    if(!validateURL(input.value)){
        show_error("Please, enter a valid URL");
        return;
    }
    
    const {data} = await axios.post('http://localhost:8000/', form, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const {msg, sample} = data;
      if(msg){
        show_error(msg);
        return;
      }
      show_results(sample);
}

const show_error = (msg) => {
    error.style.display = 'block';
    results.forEach(result=>{
        result.style.display = 'none';
    })
    error.innerHTML = `<p id="error" >${msg}</p>`;
}

const show_results = (sample) => {
    // error.innerHTML = '';
    error.style.display = 'none';
    results.forEach(result=>{
        result.style.display = 'block';
    })

     agreement.innerHTML = `<span>Agreement:</span> ${sample.agreement}`;
     subjectivity.innerHTML = `<span>Subjectivity:</span> ${sample.subjectivity}`;
     confidence.innerHTML = `<span>Confidence:</span> ${sample.confidence}`;
     irony.innerHTML = `<span>Irony:</span> ${sample.irony}`;
     score_tag.innerHTML = `<span>Score Tag:</span> ${sample.score_tag}`;

}

export  {handleSubmit}