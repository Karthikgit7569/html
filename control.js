
let age=18;
if(age<18){
    console.log("you are a minor");
}
else if(age>=18&&age<65){
    console.log("you are an adult");
}
else{
    console.log("you are a senior citizen");
}
console.log("\n");
 

let number=5;
if(number<0){
    console.log("negative");
}
else if(number>0){
    console.log("positive");
}
else{ console.log("equal to zero");

 }
 console.log("\n");



 let day =4
 switch(day){
    case 1:
        console.log("monday");
        break;
    case 2:
        console.log("tuesday");
        break;
    case 3:
        console.log("wednesday");
        break ;
    case 4:
        console.log("thursday");
        break;
    case 5:
        console.log("friday");
        break;
    case 6:
        console.log("saturday");
        break;
    case 7:
        console.log("sunday");
        break;
     }



for(let i=0;i<5;i++){
    console.log("Iteration:",i);
}
console.log("\n");

while(j<5){
    console.log("while loop Iteration",j);
    j++;
}
console.log("\n");
let k=0;
do{
    console.log("do while loop iteration:",k);
    k++;
}while(k<5);