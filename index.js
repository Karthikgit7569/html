// console.log("Hello World");
// function sayHello(){
//     console.log("Hello from sayHello function");
// }
// sayHello();
// console.log("This is a simple javascript program");
// console.log("one");
// console.log("two");
// setTimeout(()=>{
//     console.log("Hello world");

// },5000);
// console.log("three");
// console.log("four");
// function sum(a,b){
//     console.log(a+b);
// }
// function calculator(a,b,ds){
// ds(a,b);
// }
// calculator(5,10,sum);
// calculator(5,10,(a,b) => {
//     console.log(a+b);
// });
// getData(1)
// getData(2)
// getData(3)


// function getData(dataid,getnextdata){
//     setTimeout(()=>{
//         console.log("Fetching data for id:",dataid);
//         if(getnextdata){
//             getnextdata();
//         }
//     },2000);
// }

// getData(1,()=>{
//     console.log("getting data 2 .....")
//     getData(2,()=>{
//         console.log("getting dat 3....")
//         getData("3");
//     });
// });




// const myPromise=new Promise((resolve, reject) => {
//     setTimeout(() => {
//         const success=true;
//         if(success) {
//             resolve("Data fetched successfully");
//         } else{
//             reject("Error fetching data");
//         }
//     },2000);
// });
// myPromise.then((data) => {
//     console.log("Promise resolved with data:",data);

//    } )
//    .catch(error => {
//     console.error("promise rejected with error",error);
//    });




// let promise= new Promise((resolve, reject) => {
//     console.log("iam, a promise");
//     if(1<0){
//         resolve(123);
//     }
//     reject("something went wrong")
// }
// );
// function getData(dataid){
//     return new Promise((resolve, reject) => {
//         setTimeout(()=>{
//             console.log("Fetching data for id:", dataid);
//             resolve("success");
//         },2000);
//     });
// }
// let result =getData(123);
// result;
// getData(101).then(result=>{
//     console.log("First fetch", result);
//     return getData(102);
// })
// .then(result=>{
//     console.log("second fetch:", result);
//     return getData(103);
// })
// .then(result =>{
//     console.log("third fetch", result);

// })
// .catch(err=>{
//     console.error("error occured", err);
// });
// const getPromise = () => {
//     return new Promise((resolve, reject) => {
//         console.log("I am a promise");
//         reject("Something went wrong");

//     });
// };

// let result = getPromise();

// result.then(data => {
//     console.log("Data:", data);
// })
// .catch(error => {
//     console.error("Error occurred:", error);
// });

// function asyncFunc1(){
//     return new Promise(function(resolve, reject)=>{
//         setTimeout(()=>{}
//     )
//         })
// }
function getData(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Fetching data for id:",id);
            resolve(id);
        },1000);
    });
}
async function fetchData(){
    try{
        const data1 = await getData(101);
        console.log("first fetch:",data1);
        const data2 = await getData(102);
        console.log("second fetch:", data2);
        const data3 = await getData(103);
        console.log("third fetch:",data3);
    } catch(error){
        console.error("Error occurred",error);
    }
}

fetchData();
async function getnextData(){
    console.log("getting data 1...");
    await getData(1);
    console.log("getting data2...");
    await getData(2);
    console.log("getting data 3....");
    await getData(3);
}
    getnextData();