var options = document.getElementById("people");
var personOption;
var allPeople = [];
var rowCount = 2;
var size = 0;
var optionsCrew = document.getElementById("crew");
var crewOption;
var crewList = [];
var currCrew = {};
var ChosenCol=0;
var chosenRow = 0;
var newCrewMem;
var currClipNum=1;
var currClipLink="";
var currtextType=1;
var wannaFixGuestPhone = true;
const date = changeTimeZone(new Date(), 'Asia/Jerusalem');
var day = date.getDate();
var month = date.getMonth() + 1;
var year = date.getFullYear();
var currentDate = day + "." + month;
const url =
  "https://script.google.com/macros/s/AKfycbwU9saIFvyVAo-q-xdZcKbNDPUm46IIVSmrLCYMg7aSzsWnj9JvsKHdT-qO2AQOq2WNnA/exec";
var newPerson = {};
var currPerson = {};
var messes = [
  { name: "", lines: [] },
  { name: "", lines: [] },
  { name: "", lines: [] },
  { name: "", lines: [] },
  { name: "", lines: [] },
  { name: "", lines: [] },
  { name: "", lines: [] },
  { name: "", lines: [] },
  { name: "", lines: [] },
  { name: "", lines: [] }
];
var fullTexts = [[], [], [], [], [], [], [], [],[], []];
var crewDataURL =
  "https://script.google.com/macros/s/AKfycbz7IgSM1Rhei0PPSgEHwxD_YHtyevYhZt32Mje9asUeGE20_J8a59XYw0xNFJMxjDKXKA/exec";
getCrewData();
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
          phone: ele.phone,
          chain: ele.chain,
            feedback:ele.feedback,
          clip1: ele.clip1,
          clip2: ele.clip2,
            clip3: ele.clip3,
          clip4: ele.clip4,
            clip5: ele.clip5,
          clip6: ele.clip6,
          row: rowCount
        };
        if (ele.fixedname !== "") newPerson.name = ele.fixedname;
        if (ele.fixedphone !== "") newPerson.phone = ele.fixedphone;
        if (newPerson.chain === "") {
          if (ele.chaintwo !== "") {
            newPerson.chain = ele.chaintwo;
          }
          if (ele.chainthree !== "") newPerson.chain = ele.chainthree;
          if (ele.chainfour !== "") newPerson.chain = ele.chainfour;
        }
        if (ele.fixedchain !== "") newPerson.chain = ele.fixedchain;
        allPeople.push(newPerson);
        personOption = document.createElement("option");
        personOption.value =
          newPerson.name + " + " + fixChainFromData(newPerson.chain);
          const params = new URLSearchParams(window.location.search);
            const nameP = params.get('name');
            const chainP = params.get('chain');
          const numP = params.get('num');
            if (nameP&&chainP&&nameP===newPerson.name&&chainP===fixChainFromData(newPerson.chain)) {
                document.getElementById("peopleList").value =newPerson.name + " + " + fixChainFromData(newPerson.chain);
            }
            if(numP){
                 document.getElementById("clipNum").value = numP;
                if(numP==='1'){
                    document.getElementById("textType").value="0";
                }
                if(numP==='2'){
                    document.getElementById("textType").value="1";
                }
                if(numP==='3'){
                    document.getElementById("textType").value="2";
                }
            }
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
function getCrewData() {
  fetch(crewDataURL)
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      json.data.crew.forEach((ele) => {
        newCrewMem = {
          name: ele.name,
          phone: ele.phone,
        };
        crewList.push(newCrewMem);
        crewOption = document.createElement("option");
        crewOption.value = newCrewMem.name;
        optionsCrew.append(crewOption);
        if(newCrewMem.name==="רחל"){
            document.getElementById("crewList").value = "רחל"; 
        }
      });
     
    });
    
}
function getMessData() {
  var newMess;
  fetch(crewDataURL)
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      json.data.messages.forEach((ele) => {
        newMess = {
          name: ele.name,
          lines: [
            ele.line1,
            ele.line2,
            ele.line3,
            ele.line4,
            ele.line5,
            ele.line6,
            ele.line7,
            ele.line8,
            ele.line9,
            ele.line10,
            ele.line11,
            ele.line12,
            ele.line13,
            ele.line14,
            ele.line15,
            ele.line16,
            ele.line17,
            ele.line18,
            ele.line19,
            ele.line20,
            ele.line21,
            ele.line22,
            ele.line23,
            ele.line24,
            ele.line25,
            ele.line26,
            ele.line27,
            ele.line28,
            ele.line29,
            ele.line30
          ],
        };
        for (var i = 1; i <= 10; i++) {
          if (newMess.name===("משלוח קליפים " + i)) {
            messes[i - 1] = newMess;
          }
        }
      });
      for (var i = 4; i <= 9; i++) {
        for (var j = 0; j < messes[i].lines.length; j++) {
          cutMess(messes[i].lines, i + 1);
        }
      }
      console.log("currtextType:"+currtextType);
      for (var j = 0; j < messes[currtextType].lines.length; j++) {
          console.log(messes[currtextType].lines);
          cutMess(messes[currtextType].lines,currtextType + 1);
        }
      
    });
  console.log(fullTexts);
}

function cutMess(linesArr, messType) {
  var currText = "";
    var testDiv;
if(messType<5){
     testDiv = document.getElementById("texttextType");
    }
  if(messType>=5&&messType<=10){
        testDiv = document.getElementById("text" + messType);

    }
      removeAllChildNodes(testDiv);

  var crewMem;
  if (currCrew.name !== "") crewMem = currCrew.name;
  if (currCrew.name === "") crewMem = "";
  var i = 0;
  while (linesArr[i] !== "end") {
    if (linesArr[i].includes("firstNameOfGuest")) {
      linesArr[i] = linesArr[i].replace(
        "firstNameOfGuest",
        fixFirstName(currPerson.name)
      );
    }
    if (linesArr[i].includes("fullNameOfGuest")) {
      linesArr[i] = linesArr[i].replace("fullNameOfGuest", currPerson.name);
    }
    if (linesArr[i].includes("nameOfChain")) {
      linesArr[i] = linesArr[i].replace("nameOfChain", fixChainFromData(currPerson.chain));
    }
    if (linesArr[i].includes("linkclip")) {
      linesArr[i] = linesArr[i].replace("linkclip", currClipLink);
    }
    if (linesArr[i].includes("clipNum")) {
      linesArr[i] = linesArr[i].replace("clipNum", currClipNum);
    }
    if (linesArr[i].includes("crewName")) {
      linesArr[i] = linesArr[i].replace("crewName", crewMem);
    }
    if (linesArr[i] !== "") {
      if (linesArr[i + 1] !== "end") {
        currText += linesArr[i] + "\n";
      }
      if (linesArr[i + 1] === "end") {
        currText += linesArr[i];
      }
    }
    if (linesArr[i] === "") {
      currText += "\n";
    }
    var duplicateLine = linesArr[i];
    while (duplicateLine.includes("*")) {
      if (duplicateLine.includes("*")) {
        duplicateLine = duplicateLine.replace("*", "<strong>");
      }
      if (duplicateLine.includes("*")) {
        duplicateLine = duplicateLine.replace("*", "</strong>");
      }
    }

    var testH4 = document.createElement("h4");
    if (linesArr[i] !== "") {
      if (linesArr[i + 1] === "") {
        testH4.classList.add("mb-3");
      }
      if (linesArr[i + 1] !== "") {
        testH4.classList.add("mb-0");
      }
      testH4.innerHTML = duplicateLine;
     //if(messType>=5&&messType<=10){    
        testDiv.append(testH4);
     // }
    }
    i++;
  }
  fullTexts[messType - 1] = currText;
}
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
function reset() {
  document.location.reload();
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

function submit() {
    currClipNum=document.getElementById("clipNum").value;
    currtextType=parseInt(document.getElementById("textType").value);
        document.getElementById("clipdateChange").innerHTML="עדכון תאריך שליחת קליפ "+currClipNum;

    document.getElementById("feedback").value="-"+currentDate+" ";
  toFixGuestPhone();
  console.log("entered the submit in pre");
  crewChosen();
  document.getElementById("clipsSend").style.visibility = "hidden";
  if (checkInputs()) {
       if(currClipNum==='1'){
            currClipLink=currPerson.clip1;
        }
        if(currClipNum==='2'){
            currClipLink=currPerson.clip2;
        }
        if(currClipNum==='3'){
            currClipLink=currPerson.clip3;
        }
        if(currClipNum==='4'){
            currClipLink=currPerson.clip4;
        }
        if(currClipNum==='5'){
            currClipLink=currPerson.clip5;
        }
        if(currClipNum==='6'){
            currClipLink=currPerson.clip6;
        }
      console.log(currClipNum+" - "+currClipLink);
    document.getElementById("clipsSend").style.visibility = "visible";
    getMessData();
  }
  console.log("left submit in pre");
}
function submitData() {
        currClipNum=document.getElementById("clipNum").value;
    currtextType=parseInt(document.getElementById("textType").value);
    document.getElementById("feedback").value="-"+currentDate+" ";
  toFixGuestPhone();
     document.getElementById("feedbackChange").innerHTML="הוספת פידבק";
 document.getElementById("clipdateChange").innerHTML="עדכון תאריך שליחת קליפ "+currClipNum;

  for (var i = 0; i < allPeople.length; i++) {
    var nameAndChain = document.getElementById("peopleList").value.split(" + ");
    if (
      allPeople[i].name === nameAndChain[0] &&
      fixChainFromData(allPeople[i].chain) === nameAndChain[1]
    ) {
      currPerson = allPeople[i];
          if(currClipNum==='1'){
            currClipLink=currPerson.clip1;
        }
        if(currClipNum==='2'){
            currClipLink=currPerson.clip2;
        }
        if(currClipNum==='3'){
            currClipLink=currPerson.clip3;
        }
        if(currClipNum==='4'){
            currClipLink=currPerson.clip4;
        }
        if(currClipNum==='5'){
            currClipLink=currPerson.clip5;
        }
        if(currClipNum==='6'){
            currClipLink=currPerson.clip6;
        }
        console.log(currClipNum+" - "+currClipLink);
        chosenRow = allPeople[i].row;
        document.getElementById("feedbackB4").innerHTML = allPeople[i].feedback;
        document.getElementById("nameB4").innerHTML = allPeople[i].name;
      document.getElementById("guestPhone").value = fixPhoneDataGuest(
        allPeople[i].phone
      );
      console.log(currPerson);
    }
  }
}
function toFixGuestPhone() {
  if (document.getElementById("fixGuestPhone").checked === true) {
    wannaFixGuestPhone = true;
  } else wannaFixGuestPhone = false;
}
function checkInputs() {
  if (!checkPhoneGuest(document.getElementById("guestPhone").value)) {
    alert("מספר הטלפון לא תקין!");
    return false;
  }
  if (currCrew.name === "") {
    alert("לא נבחרה חברת צוות!");
    return false;
  }
  return true;
}
function checkPhoneGuest(phone) {
  if (wannaFixGuestPhone === true) {
    if (phone.length === 10 && phone[0] === "0" && phone[1] === "5")
      return true;
    return false;
  } else return true;
}
function crewChosen() {
  if (document.getElementById("crewList").value !== "") {
    for (var j = 0; j < crewList.length; j++) {
      if (document.getElementById("crewList").value === crewList[j].name) {
        currCrew = crewList[j];
      }
    }
  } else {
    currCrew.name = "";
    currCrew.phone = "";
  }
}
function fixPhoneDataGuest(phone) {
  if (wannaFixGuestPhone === true) {
    if (phone.includes("+972 ")) {
      phone = phone.replace("+972 ", "0");
    }
    if (phone.startsWith("972 ")) {
      phone = phone.replace("972 ", "0");
    }
    while (phone.includes(" ")) {
      phone = phone.replace(" ", "");
    }
    if (phone.includes("+")) {
      phone = phone.replace("+", "");
    }
    if (!phone.startsWith("0")) {
      phone = "0" + phone;
    }
    while (phone.includes("-")) {
      phone = phone.replace("-", "");
    }
  }
  return phone;
}
function fixFirstName(fullName) {
  if (!fullName.includes(" ")) return fullName;
  const splittedName = fullName.split(" ");
  if (
    splittedName[0] === 'ד"ר' ||
    splittedName[0] === "ד״ר" ||
    splittedName[0] === "דוקטור" ||
    splittedName[0] === "פרופסור" ||
    splittedName[0] === "פרופ'" ||
    splittedName[0] === "Dr." ||
     splittedName[0] === "הרב" ||
     splittedName[0] === "ד״ר" ||
     splittedName[0] === 'עו"ד'||
      splittedName[0] === 'עו״ד'
  ) {
    return splittedName[1];
  }
  return splittedName[0];
}
function copy(id) {
    
  var text = fullTexts[id - 1];
    if(id==="textType"){
       var text = fullTexts[currtextType]; 
    }
  var elem = document.createElement("textarea");
  document.body.appendChild(elem);
  elem.value = text;
  elem.select();
  document.execCommand("copy");
  document.body.removeChild(elem);
  alert("הטקסט הועתק!");
}
function phoneForWA(phone, toWho) {
  if (toWho === "guest") {
    if (wannaFixGuestPhone === true) {
      return "972" + phone.slice(1);
    }
    return phone;
  }
  return "972" + phone.slice(1);
}
function whatsAppMes(id) {
  const splittedId = id.split("_");
  var whichMes = splittedId[0];
   
  var toWho = splittedId[1];
  var phone;
  if (toWho === "guest") phone = document.getElementById("guestPhone").value;
  if (toWho === "crew") phone = currCrew.phone;
  var link =
    "https://api.whatsapp.com/send?phone=" +
    phoneForWA(phone, toWho) +
    "&text=" +
    encodeURIComponent(fullTexts[whichMes - 1]);
     if(whichMes==="textType"){
                 var link =
            "https://api.whatsapp.com/send?phone=" +
            phoneForWA(phone, toWho) +
            "&text=" +
            encodeURIComponent(fullTexts[currtextType]);
    }
  window.open(link, "_blank");
}
function change(id) {
    var textEntered= month+"/"+day+"/"+year;
    var dataElement=document.getElementById(id+"Change");
    chosenCol=("clip"+currClipNum+"date");
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
      dataElement.innerHTML="תאריך השליחה עודכן";
  }
}
function changeFeedback(id) {
    var textEntered=document.getElementById(id).value;
    console.log("feedbackB4: "+document.getElementById("feedbackB4").innerHTML);
    if(document.getElementById("feedbackB4").innerHTML!==""){
        var textEntered=document.getElementById("feedbackB4").innerHTML+" "+document.getElementById(id).value;
    }
    var dataElement=document.getElementById(id+"Change");
    chosenCol=id;
      console.log("col: " + chosenCol);
  if (chosenRow === 0) {
    alert("נא לבחור מישהו מהטבלה כדי לשנות");
  }
      var temp = {
        text: textEntered,
        row: chosenRow,
        col: chosenCol,
      };
  if (chosenRow > 0) {
    sendData(temp, dataElement);
      dataElement.innerHTML="פידבק התעדכן";
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
function changeTimeZone(date, timeZone) {
  if (typeof date === 'string') {
    return new Date(new Date(date).toLocaleString('en-US', { timeZone }));
  }
  return new Date(date.toLocaleString('en-US', { timeZone }));
}

