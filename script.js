
const sentences = [
    "The quick brown fox jumps over the lazy dog.",
    "He is the decent boy.",
    "He is kindhearted person.",
    "Practice makes man perfect."

];
let CurrentSentence ='';
let timer =0;
let interval =null;
let errors = 0;
function StartGame(){
    CurrentSentence= sentences[Math.floor(Math.random() * sentences.length)];
    document.getElementById("sentenceDisplay").innerText = CurrentSentence;
    document.getElementById("inputArea").value ="";
    document.getElementById("inputArea").disabled =false;
    document.getElementById("inputArea").focus();
    document.getElementById("timer").innerText="0";
     document.getElementById("errors").innerText="0";
      document.getElementById("accuracy").innerText="100%";
      timer=0;
      errors=0;
      if(interval) clearInterval(interval);
      interval = setInterval(() =>{
        timer++;
        document.getElementById("timer").innerText = timer;
      },1000);
      document.getElementById("inputArea").addEventListener("input", handleTyping);

}
function handleTyping() {
    const typeText =document.getElementById("inputArea").value;
    const original = CurrentSentence.substring(0, typeText.length);
    if(typeText === CurrentSentence) {
        clearInterval(interval);
        document.getElementById("inputArea").disabled = true;
        alert("test complete! Time: " + timer + "s,Errors: " + errors);
        return;
    }
    if(typeText !== original){
        errors++;
        document.getElementById("errors").innerText = errors;
    }
    const accuracy = Math.max(
        0,
        Math.floor(
            ((typeText.length - errors) / Math.max(typeText.length,1)) *100
        )
        );
        document.getElementById("accuracy").innerText =accuracy + "%"

}
