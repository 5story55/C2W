var options = document.getElementById("people");
var personOption;
var allPeople = [];
var rowCount = 2;
var size = 0;
var chosenCol = "";
var chosenRow = 0;
var newPerson = {};
const url =
  "https://script.google.com/macros/s/AKfycbzojs9dIr-pr54z2zCEXxklX5h1wIRBHt1ktH8Wwg9KC62R4iDaaCftIK7rHJzrjC3nVQ/exec";
getData();
function getData() {
  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      json.data.forEach((ele) => {
        newPerson = {
          name: ele.name,
          chain: ele.chain,
          clip1: ele.clip1,
          clip2: ele.clip2,
        clip3: ele.clip3,
          clip4: ele.clip4,
            clip5: ele.clip5,
          clip6: ele.clip6,
          row: rowCount,
        };
        if (ele.fixedname !== "") newPerson.name = ele.fixedname;
        if (newPerson.chain === "") {
          if (ele.chaintwo !== "") newPerson.chain = ele.chaintwo;
          if (ele.chainthree !== "") newPerson.chain = ele.chainthree;
          if (ele.chainfour !== "") newPerson.chain = ele.chainfour;
        }
        if (ele.fixedchain !== "") newPerson.chain = ele.fixedchain;
        allPeople.push(newPerson);
        personOption = document.createElement("option");
        personOption.value =
          newPerson.name + " + " + fixChainFromData(newPerson.chain);
        personOption.id = rowCount;
        if (ele.fixedrecordingdate!=="ללא תאריך"&&(newPerson.name !== "" || newPerson.chain !== "")) {
            console.log(allPeople[size]);
            options.append(personOption);
        }
        rowCount++;
        size++;
      });
    });
}
function reset() {
  document.location.reload();
}
function clearValues() {
  document.getElementById("clip1").value = "";
  document.getElementById("clip2").value = "";
document.getElementById("clip3").value = "";
  document.getElementById("clip4").value = "";
    document.getElementById("clip5").value = "";
  document.getElementById("clip6").value = "";
  document.getElementById("nameB4").innerHTML = "";
    for(var i=1;i<=6;i++){
    document.getElementById("clip"+i+"Change").innerHTML="הוספת קליפ"+i;
    }
}
function submitData() {
  clearValues();
  for (var i = 0; i < allPeople.length; i++) {
    var nameAndChain = document.getElementById("peopleList").value.split(" + ");
    if (
      allPeople[i].name === nameAndChain[0] &&
      fixChainFromData(allPeople[i].chain) === nameAndChain[1]
    ) {
      chosenRow = allPeople[i].row;
      document.getElementById("nameB4").innerHTML = allPeople[i].name;
      document.getElementById("clip1B4").innerHTML = allPeople[i].clip1;
      document.getElementById("clip2B4").innerHTML = allPeople[i].clip2;
        document.getElementById("clip3B4").innerHTML = allPeople[i].clip3;
      document.getElementById("clip4B4").innerHTML = allPeople[i].clip4; 
        document.getElementById("clip5B4").innerHTML = allPeople[i].clip5;
      document.getElementById("clip6B4").innerHTML = allPeople[i].clip6;
      console.log("row:" + chosenRow);
    }
  }
}
function change(id) {
    var textEntered="";
    var dataElement;
    if(id==="1"){
        chosenCol = "clip1";
        textEntered=document.getElementById("clip1").value;
        dataElement=document.getElementById("clip1Change");
    }
   if(id==="2"){
        chosenCol = "clip2";
        textEntered=document.getElementById("clip2").value;
        dataElement=document.getElementById("clip2Change");
    }
     if(id==="3"){
        chosenCol = "clip3";
        textEntered=document.getElementById("clip3").value;
        dataElement=document.getElementById("clip3Change");
    }
   if(id==="4"){
        chosenCol = "clip4";
        textEntered=document.getElementById("clip4").value;
        dataElement=document.getElementById("clip4Change");
    }
 if(id==="5"){
        chosenCol = "clip5";
        textEntered=document.getElementById("clip5").value;
        dataElement=document.getElementById("clip5Change");
    }
   if(id==="6"){
        chosenCol = "clip6";
        textEntered=document.getElementById("clip6").value;
        dataElement=document.getElementById("clip6Change");
    }
  console.log("col: " + chosenCol);
  if (chosenRow === 0) {
    alert("נא לבחור מישהו מהטבלה כדי לשנות");
  }
  const temp = {
    text: textEntered,
    row: chosenRow,
    col: chosenCol,
  };
  if (chosenRow > 0) {
    sendData(temp, dataElement);
      dataElement.innerHTML="התעדכן";
  }
}
function sendData(obj, ele) {
  console.log(obj);
  let formData = new FormData();
  formData.append("data", JSON.stringify(obj));
  console.log(obj);
  fetch(url, {
    method: "POST",
    body: formData,
  })
    .then((rep) => {
      console.log(obj);
      return rep.json();
    })
    .then((json) => {
      console.log(obj);
      console.log(json);
    });
  
}
function fixChainFromData(chain) {
  var splittedChain; //
  if (chain.includes(" (") || chain.includes("-")) {
    splittedChain = chain.split(" (");
    var moresplitted;
    if (splittedChain[0].includes("-")) {
      moresplitted = splittedChain[0].split("-");
      return moresplitted[1].trim();
    }
    return splittedChain[0].trim();
  }
  return chain;
}
setTimeout(() => {
  const loader = document.getElementById("loader");
  loader.style.display = "none";
}, 2050);
