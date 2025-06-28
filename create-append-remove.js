
let aish=document.createElement("p");
aish.innerHTML="I am karthik";

document.getElementById("vasi").appendChild(aish);
aish.style.color="Green";
aish.style.position="absolute";
aish.style.fontSize="20px";
setTimeout(() => {
let re = document.getElementsByClassName("list")[4];
if (re) {
    re.remove();
}
},2000);
let newHeading = document.createElement("h2");
newHeading.innerHTML="This is a new heading added by javascript!";
newHeading.style.color="red";
newHeading.style.fontSize="30px";
document.body.appendChild(newHeading);
setTimeout(() => {
    let newText= document.createElement("p");
    newText.innerHTML="This is added after 3 seconds";
    newText.style.color="blue";
    document.body.appendChild(newText);
    newText.style.fontSize="30px";
},3000 );