var allPeople = [];
var reallyAllPeople = [];
var rowCount = 2;
var rowCountEng=2;
var peopleOptions0 = document.getElementById("people0");
var peopleOptions = document.getElementById("people");
document.getElementById("reels").style.visibility = "hidden";
var personOption;
var size = 0;
const url =
  "https://script.google.com/macros/s/AKfycbzXoN1d21aGDuS7dUEj9vz6v952hwbKmueQaPdJ20QbrDkH9X6485Vh2IxnYgTbVBR7kA/exec";
const urlEng="https://script.google.com/macros/s/AKfycbyYASxRIl0jbkL5vINcjk7lrXpdmrV2B3dtFI7s0k-x966yo7wx0ENxdyjplJUZz09TYA/exec";
var newPerson = {};
var currPerson = [[],[],[],[]];
var messes = [
    { name: "", lines: [] },
  { name: "", lines: [] },
  { name: "", lines: [] },
  { name: "", lines: [] },
  { name: "", lines: []},
{ name: "", lines: []},
{ name: "", lines: []},
{ name: "", lines: []}];
var fullTexts = [[], [], [], [],[],[],[],[]];
var allRows=[];
var allRowsWithClip1=[];
var allRowsWithClip2=[];
var allRowsWithClip3=[];
var allRowsWithClip4=[];
var allRowsWithClip5=[];
var allRowsWithClip6=[];
var allRowsWithFull=[];
var allRowsTotal=0;
var allRowsWithClip1total=0;
var allRowsWithClip2total=0;
var allRowsWithClip3total=0;
var allRowsWithClip4total=0;
var allRowsWithClip5total=0;
var allRowsWithClip6total=0;
var allRowsWithFullTotal=0;
var crewDataURL =
  "https://script.google.com/macros/s/AKfycbz7IgSM1Rhei0PPSgEHwxD_YHtyevYhZt32Mje9asUeGE20_J8a59XYw0xNFJMxjDKXKA/exec";
getData();
getDataEng();
const date = changeTimeZone(new Date(), 'Asia/Jerusalem');
var day = date.getDate();
var month = date.getMonth() + 1;
document.getElementById("meta").style.visibility = "hidden";
var chosenRows=[];
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
        linkfull: ele.linkfull,
            link555:ele.linkfive,
            link55yt:ele.linkshortyt,
            title: ele.topicofstory,
            id:ele.id,
            clip1:ele.clip1,
            clip2:ele.clip2,
            clip3:ele.clip3,
            clip4:ele.clip4,
            clip5:ele.clip5,
            clip6:ele.clip6,
            meta:ele.meta,
            outofmeta:ele.outofmeta,
            clipsAmount:0,
            timesSent:0,
            row: rowCount 
        };
        if (ele.fixedname !== "") newPerson.name = ele.fixedname;
        if (ele.fixedtopicofstory !== "")
          newPerson.title = ele.fixedtopicofstory;
        if (newPerson.chain === "") {
          if (ele.chaintwo !== "") {
            newPerson.chain = ele.chaintwo;
          }
          if (ele.chainthree !== "") newPerson.chain = ele.chainthree;
          if (ele.chainfour !== "") newPerson.chain = ele.chainfour;
        }
        if (ele.fixedchain !== "") newPerson.chain = ele.fixedchain;
        personOption = document.createElement("option");
        personOption.value =
          newPerson.name + " + " + fixChainFromData(newPerson.chain);
        if (ele.fixedrecordingdate!=="ללא תאריך"&&(newPerson.name !== "" || newPerson.chain !== "")) {
              var anotherOption=personOption;
          peopleOptions0.append(anotherOption);
          peopleOptions.append(personOption);
        }
          reallyAllPeople.push(newPerson);
          if(newPerson.id!==""){
              allRowsTotal++;
          }
          if(newPerson.clip1!==""){
              allRowsWithClip1total++;
          }
          if(newPerson.clip2!==""){
              allRowsWithClip2total++;
          }
          if(newPerson.clip3!==""){
              allRowsWithClip3total++;
          }
          if(newPerson.clip4!==""){
              allRowsWithClip4total++;
          }
          if(newPerson.clip5!==""){
              allRowsWithClip5total++;
          }
          if(newPerson.clip6!==""){
              allRowsWithClip6total++;
          }
          if(newPerson.linkfull!==""){
              allRowsWithFullTotal++;
          }
          if(ele.clip1!==""){
              newPerson.clipsAmount++;
          }
          if(ele.clip2!==""){
              newPerson.clipsAmount++;
          }
          if(ele.clip3!==""){
              newPerson.clipsAmount++;
          }
          if(ele.clip4!==""){
              newPerson.clipsAmount++;
          }
          if(ele.clip5!==""){
              newPerson.clipsAmount++;
          }
          if(ele.clip6!==""){
              newPerson.clipsAmount++;
          }
          if(newPerson.meta!==""){
              for(var j=0;j<newPerson.meta.length;j++){
                if (newPerson.meta[j] === ',') {
                    newPerson.timesSent++;
                }
              }
          }
          if(newPerson.id!==""&&((newPerson.timesSent!==newPerson.clipsAmount&&newPerson.clipsAmount!==0)||newPerson.meta==="")&&newPerson.outofmeta===""){
            allPeople.push(newPerson);
            console.log(allPeople[size]);
              allRows.push({row:newPerson.row, id:newPerson.id,lang:"heb"});
              if(newPerson.clip1!==""){
                  allRowsWithClip1.push({row:newPerson.row, id:newPerson.id,lang:"heb",meta:newPerson.meta});
              }
               if(newPerson.clip2!==""){
                  allRowsWithClip2.push({row:newPerson.row, id:newPerson.id,lang:"heb",meta:newPerson.meta});
              }
             if(newPerson.clip3!==""){
                  allRowsWithClip3.push({row:newPerson.row, id:newPerson.id,lang:"heb",meta:newPerson.meta});
              }
               if(newPerson.clip4!==""){
                  allRowsWithClip4.push({row:newPerson.row, id:newPerson.id,lang:"heb",meta:newPerson.meta});
              }
               if(newPerson.clip5!==""){
                  allRowsWithClip5.push({row:newPerson.row, id:newPerson.id,lang:"heb",meta:newPerson.meta});
              }
               if(newPerson.clip6!==""){
                  allRowsWithClip6.push({row:newPerson.row, id:newPerson.id,lang:"heb",meta:newPerson.meta});
              }
              if(newPerson.linkfull!==""){
                  allRowsWithFull.push({row:newPerson.row, id:newPerson.id,lang:"heb",meta:newPerson.meta});
              }
              size++;
          }
          rowCount++;
      });
        console.log("rc:"+rowCount+" size:"+size);
      console.log("ids:"+allRows.length+" idswclip1:"+allRowsWithClip1.length+" idswclip2:"+allRowsWithClip2.length+" idswclip3:"+allRowsWithClip3.length+" idswclip4:"+allRowsWithClip4.length+" idswclip5:"+allRowsWithClip5.length+" idswclip6:"+allRowsWithClip6.length+" idswfull:"+allRowsWithFull.length);
      document.getElementById("numWithClip1").innerHTML=allRowsWithClip1.length;
      document.getElementById("allNumWithClip1").innerHTML=allRowsWithClip1total;
      document.getElementById("numWithClip2").innerHTML=allRowsWithClip2.length;
      document.getElementById("allNumWithClip2").innerHTML=allRowsWithClip2total;
      document.getElementById("numWithClip3").innerHTML=allRowsWithClip3.length;
      document.getElementById("allNumWithClip3").innerHTML=allRowsWithClip3total;
      document.getElementById("numWithClip4").innerHTML=allRowsWithClip4.length;
      document.getElementById("allNumWithClip4").innerHTML=allRowsWithClip4total;
      document.getElementById("numWithClip5").innerHTML=allRowsWithClip5.length;
      document.getElementById("allNumWithClip5").innerHTML=allRowsWithClip5total;
      document.getElementById("numWithClip6").innerHTML=allRowsWithClip6.length;
      document.getElementById("allNumWithClip6").innerHTML=allRowsWithClip6total
       document.getElementById("numWithAll").innerHTML=allRows.length;
      document.getElementById("allNumWithAll").innerHTML=allRowsTotal;
      document.getElementById("numWithFull").innerHTML=allRowsWithFull.length;
      document.getElementById("allNumWithFull").innerHTML=allRowsWithFullTotal;
       
      if(allRows.length<4||allRowsWithClip1
        .length<4||allRowsWithClip2
        .length<4||allRowsWithFull.length<4){
          clearList();
      }else{
        submitData();
      }
    });
    rowCount = 2;
}
function getDataEng() {
  fetch(urlEng)
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      json.data.forEach((ele) => {
        newPerson = {
          name: ele.name,
          chain: ele.chain,
        linkfull: ele.linkfull,
            link555:ele.linkfive,
            link55yt:ele.linkshortyt,
            title: ele.topicofstory,
            id:ele.id,
            clip1:ele.clip1,
            clip2:ele.clip2,
            clip3:ele.clip3,
            clip4:ele.clip4,
            clip5:ele.clip5,
            clip6:ele.clip6,
            meta:ele.meta,
            outofmeta:ele.outofmeta,
            clipsAmount:0,
            timesSent:0,
            row: rowCountEng 
        };
        if (ele.fixedname !== "") newPerson.name = ele.fixedname;
        if (ele.fixedtopicofstory !== "")
          newPerson.title = ele.fixedtopicofstory;
        if (ele.fixedchain !== "") newPerson.chain = ele.fixedchain;
          //reallyAllPeople.push(newPerson);
          if(newPerson.id!==""){
              allRowsTotal++;
          }
          if(newPerson.clip1!==""){
              allRowsWithClip1total++;
          }
          if(newPerson.clip2!==""){
              allRowsWithClip2total++;
          }
          if(newPerson.clip3!==""){
              allRowsWithClip3total++;
          }
          if(newPerson.clip4!==""){
              allRowsWithClip4total++;
          }
          if(newPerson.clip5!==""){
              allRowsWithClip5total++;
          }
          if(newPerson.clip6!==""){
              allRowsWithClip6total++;
          }
          if(newPerson.linkfull!==""){
              allRowsWithFullTotal++;
          }
         if(ele.clip1!==""){
              newPerson.clipsAmount++;
          }
          if(ele.clip2!==""){
              newPerson.clipsAmount++;
          }
          if(ele.clip3!==""){
              newPerson.clipsAmount++;
          }
          if(ele.clip4!==""){
              newPerson.clipsAmount++;
          }
          if(ele.clip5!==""){
              newPerson.clipsAmount++;
          }
          if(ele.clip6!==""){
              newPerson.clipsAmount++;
          }
          if(newPerson.meta!==""){
              for(var j=0;j<newPerson.meta.length;j++){
                if (newPerson.meta[j] === ',') {
                    newPerson.timesSent++;
                }
              }
          }
          if(newPerson.id!==""&&((newPerson.timesSent!==newPerson.clipsAmount&&newPerson.clipsAmount!==0)||newPerson.meta==="")){
            allPeople.push(newPerson);
            console.log(allPeople[size]);
              allRows.push({row:newPerson.row, id:newPerson.id,lang:"eng"});
              if(newPerson.clip1!==""){
                  allRowsWithClip1.push({row:newPerson.row, id:newPerson.id,lang:"eng",meta:newPerson.meta});
              }
               if(newPerson.clip2!==""){
                  allRowsWithClip2.push({row:newPerson.row, id:newPerson.id,lang:"eng",meta:newPerson.meta});
              }
              if(newPerson.clip3!==""){
                  allRowsWithClip3.push({row:newPerson.row, id:newPerson.id,lang:"eng",meta:newPerson.meta});
              }
               if(newPerson.clip4!==""){
                  allRowsWithClip4.push({row:newPerson.row, id:newPerson.id,lang:"eng",meta:newPerson.meta});
              }
              if(newPerson.clip5!==""){
                  allRowsWithClip5.push({row:newPerson.row, id:newPerson.id,lang:"eng",meta:newPerson.meta});
              }
               if(newPerson.clip6!==""){
                  allRowsWithClip6.push({row:newPerson.row, id:newPerson.id,lang:"eng",meta:newPerson.meta});
              }
              if(newPerson.linkfull!==""){
                  allRowsWithFull.push({row:newPerson.row, id:newPerson.id,lang:"eng",meta:newPerson.meta});
              }
              size++;
          }
          rowCountEng++;
      });
        console.log("rceng:"+rowCountEng+" size:"+size);
      console.log("ids:"+allRows.length+" idswclip1:"+allRowsWithClip1.length+" idswclip2:"+allRowsWithClip2.length+" idswclip3:"+allRowsWithClip3.length+" idswclip4:"+allRowsWithClip4.length+" idswclip5:"+allRowsWithClip5.length+" idswclip6:"+allRowsWithClip6.length+" idswfull:"+allRowsWithFull.length);
      document.getElementById("numWithClip1").innerHTML=allRowsWithClip1.length;
      document.getElementById("allNumWithClip1").innerHTML=allRowsWithClip1total;
      document.getElementById("numWithClip2").innerHTML=allRowsWithClip2.length;
      document.getElementById("allNumWithClip2").innerHTML=allRowsWithClip2total;
      document.getElementById("numWithClip3").innerHTML=allRowsWithClip3.length;
      document.getElementById("allNumWithClip3").innerHTML=allRowsWithClip3total;
      document.getElementById("numWithClip4").innerHTML=allRowsWithClip4.length;
      document.getElementById("allNumWithClip4").innerHTML=allRowsWithClip4total;
      document.getElementById("numWithClip5").innerHTML=allRowsWithClip5.length;
      document.getElementById("allNumWithClip5").innerHTML=allRowsWithClip5total;
      document.getElementById("numWithClip6").innerHTML=allRowsWithClip6.length;
      document.getElementById("allNumWithClip6").innerHTML=allRowsWithClip6total
       document.getElementById("numWithAll").innerHTML=allRows.length;
      document.getElementById("allNumWithAll").innerHTML=allRowsTotal;
      document.getElementById("numWithFull").innerHTML=allRowsWithFull.length;
      document.getElementById("allNumWithFull").innerHTML=allRowsWithFullTotal;
      if(allRows.length<4||allRowsWithClip1
        .length<4||allRowsWithClip2
        .length<4||allRowsWithFull.length<4){
          clearList();
      }else{
        submitData();
      }
    });
}
function reset() {
  document.location.reload();
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
          ]
        };
        for (var i = 1; i <= 8; i++) {
          if (newMess.name.includes("מטא " + i)) {
            messes[i - 1] = newMess;
              console.log(newMess);
          }
        }
      });
      for (var i = 1; i <= 2; i++) {
        for (var j = 0; j < messes[i].lines.length; j++) {
          cutMessGen(messes[i].lines, i + 1);
        }
      }
      for (var i = 3; i <= 6; i++) {
        for (var j = 0; j < messes[i].lines.length; j++) {
          cutMess(messes[i].lines, i + 1,i-3);
        }
      }
      for (var j = 0; j < messes[7].lines.length; j++) {
        cutMessGen(messes[i].lines, 8);
      }
    });
  console.log(fullTexts);
}
setTimeout(() => {
  const loader = document.getElementById("loader");
  loader.style.display = "none";
}, 5050);
setTimeout(() => {
   const loader0 = document.getElementById("loader0");
  loader0.style.display = "none";
}, 2050);
function cutMessReels(linesArr, messType,person) {
  var currText = "";
  var testDiv = document.getElementById("text1");
  removeAllChildNodes(testDiv);
  var i = 0;
  while (linesArr[i] !== "end") {
    if (linesArr[i].includes("firstNameOfGuest")) {
      linesArr[i] = linesArr[i].replace(
        "firstNameOfGuest",
        fixFirstName(person.name)
      );
    }
    if (linesArr[i].includes("fullNameOfGuest")) {
      linesArr[i] = linesArr[i].replace("fullNameOfGuest", person.name);
    }
    if (linesArr[i].includes("nameOfChain")) {
      linesArr[i] = linesArr[i].replace("nameOfChain", fixChainFromData(person.chain));
    }
    if (linesArr[i].includes("title")) {
      linesArr[i] = linesArr[i].replace("title", person.title);
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
    while (linesArr[i].includes("*")) {
            linesArr[i] = linesArr[i].replace("*", "");
    }

    var testH4 = document.createElement("h4");
    if (linesArr[i] !== "") {
      if (linesArr[i + 1] === "") {
        testH4.classList.add("mb-3");
      }
      if (linesArr[i + 1] !== "") {
        testH4.classList.add("mb-0");
      }
      testH4.innerHTML = linesArr[i];
      testDiv.append(testH4);
    }
    i++;
  }
  fullTexts[messType - 1] = currText;
}    
function getRandomClip(per){
    var clipNum=Math.floor(Math.random() * per.clipsAmount) + 1;
    console.log("clip num chosen:"+clipNum);
    if(clipNum===2){
        return per.clip2;
    }
    if(clipNum===3){
        return per.clip3;
    }
    if(clipNum===4){
        return per.clip4;
    }
    if(clipNum===5){
        return per.clip5;
    }
    if(clipNum===6){
        return per.clip6;
    }
    return per.clip1;
}
function cutMess(linesArr, messType,personNum) {
  var currText = "";
  var testDiv = document.getElementById("text" + messType);
  removeAllChildNodes(testDiv);
  
  var i = 0;
  while (linesArr[i] !== "end") {
    if (linesArr[i].includes("firstNameOfGuest")) {
      linesArr[i] = linesArr[i].replace(
        "firstNameOfGuest",
        fixFirstName(currPerson[personNum].name)
      );
    }
    if (linesArr[i].includes("fullNameOfGuest")) {
      linesArr[i] = linesArr[i].replace("fullNameOfGuest", currPerson[personNum].name);
    }
    if (linesArr[i].includes("nameOfChain")) {
      linesArr[i] = linesArr[i].replace("nameOfChain", fixChainFromData(currPerson[personNum].chain));
    }
    if (linesArr[i].includes("title")) {
      linesArr[i] = linesArr[i].replace("title", currPerson[personNum].title);
    }
    if (linesArr[i].includes("fullLink")) {
      linesArr[i] = linesArr[i].replace("fullLink", currPerson[personNum].linkfull);
    }
    if (linesArr[i].includes("link555")) {
      linesArr[i] = linesArr[i].replace("link555", currPerson[personNum].link555);
    }
    if (linesArr[i].includes("link55youtube")) {
      linesArr[i] = linesArr[i].replace("link55youtube", currPerson[personNum].link55yt);
    }
    if (linesArr[i].includes("linkclip")) {
      linesArr[i] = linesArr[i].replace("linkclip", getRandomClip(currPerson[personNum]));
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
    while (linesArr[i].includes("*")) {
            linesArr[i] = linesArr[i].replace("*", "");
    }

    var testH4 = document.createElement("h4");
    if (linesArr[i] !== "") {
      if (linesArr[i + 1] === "") {
        testH4.classList.add("mb-3");
      }
      if (linesArr[i + 1] !== "") {
        testH4.classList.add("mb-0");
      }
      testH4.innerHTML = linesArr[i];
      testDiv.append(testH4);
    }
    i++;
  }
  fullTexts[messType - 1] = currText;
}
function cutMessGen(linesArr, messType) {
  var currText = "";
  var testDiv = document.getElementById("text" + messType);
  removeAllChildNodes(testDiv);
  
  var i = 0;
  while (linesArr[i] !== "end") {
    
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
    while (linesArr[i].includes("*")) {
            linesArr[i] = linesArr[i].replace("*", "");
    }

    var testH4 = document.createElement("h4");
    if (linesArr[i] !== "") {
      if (linesArr[i + 1] === "") {
        testH4.classList.add("mb-3");
      }
      if (linesArr[i + 1] !== "") {
        testH4.classList.add("mb-0");
      }
      testH4.innerHTML = linesArr[i];
      testDiv.append(testH4);
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
function submitData() {
    document.getElementById("quickChange").innerHTML="ניקוי שדה פרסום מטא והחזרת החרוז להגרלה";
    for(var i=1;i<=4;i++){
        document.getElementById(i+"Copy").innerHTML="העתקת פוסט";
    }
document.getElementById("meta").style.visibility = "hidden";
    var num1=allRowsWithClip1
   [Math.floor(Math.random()*allRowsWithClip1
               .length)];
    var num2=allRowsWithFull[Math.floor(Math.random()*allRowsWithFull.length)];
    while(num1===num2){
        num2=allRowsWithFull[Math.floor(Math.random()*allRowsWithFull.length)];
    }
    var num3=allRows[Math.floor(Math.random()*allRows.length)];
    while(num3===num1||num3===num2){
        num3=allRows[Math.floor(Math.random()*allRows.length)];
    }
    var num4=allRowsWithClip1
   [Math.floor(Math.random()*allRowsWithClip1
               .length)];
    while(num4===num3||num4===num2||num4===num1){
        num4=allRowsWithClip1
       [Math.floor(Math.random()*allRowsWithClip1
                   .length)]
    }
    var pickedRows=[num1,num2,num3,num4];
    console.log(pickedRows);
    chosenRows=pickedRows;
    
   // document.getElementById("allNamesB4").innerHTML="נבחרו: ";
  for (var i = 0; i < allPeople.length; i++) {
      for(var j=0;j<=3;j++){
          
            if (allPeople[i].id === pickedRows[j].id) {
                 
            document.getElementById("meta").style.visibility = "visible";
              currPerson[j] = allPeople[i];
                console.log(currPerson);
               // document.getElementById("allNamesB4").innerHTML+=allPeople[i].name+", ";
                document.getElementById("name"+(j+1)+"B4").innerHTML = allPeople[i].name+" - שרשרת "+fixChainFromData(allPeople[i].chain);
            }
      }
  }
getMessData();
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
    splittedName[0] === "Dr."||
     splittedName[0] === "הרב" ||
     splittedName[0] === "ד״ר" ||
     splittedName[0] === 'עו"ד'||
      splittedName[0] === 'עו״ד'
      
  ) {
    return splittedName[1];
  }
  return splittedName[0];
}
function clearList(){
   for(var i=2;i<rowCount;i++){
       const temp = {
                 text: "",
                 row: i,
                 col: "meta",
             };
     sendData(temp, document.getElementById("meta"));
   }
  for(var i=2;i<rowCount;i++){
       const temp = {
                 text: "",
                 row: i,
                 col: "meta",
             };
     sendData(temp, document.getElementById("meta"));
   }
   for(var i=2;i<rowCount;i++){
       const temp = {
                 text: "",
                 row: i,
                 col: "meta",
             };
     sendData(temp, document.getElementById("meta"));
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
      ele.innerHTML = json.val;
    });
}
function sendDataEng(obj, ele) {
  console.log(obj);
  let formData = new FormData();
  formData.append("data", JSON.stringify(obj));
  console.log(obj);
  fetch(urlEng, {
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
      ele.innerHTML = json.val;
    });
}
function quickChange() {
    var chosenPersonRow = 0;
     var nameAndChain = document.getElementById("peopleList0").value.split(" + ");
  for (var i = 0; i < reallyAllPeople.length; i++) {   
    if (
      reallyAllPeople[i].name === nameAndChain[0] &&
      fixChainFromData(reallyAllPeople[i].chain) === nameAndChain[1]
    ) {
      console.log(nameAndChain);
      chosenPersonRow = reallyAllPeople[i].row;
    }
  }
  if (chosenPersonRow === 0) {
    alert("נא לבחור חרוז");
  }

  if (chosenPersonRow > 0) {
    const temp = {
      text: "",
      row: chosenPersonRow,
      col: "meta",
    };
    sendData(temp, document.getElementById("quickChange"));
    document.getElementById("quickChange").innerHTML="התעדכן";
  }
}
function submit(){
  removeAllChildNodes(document.getElementById("text7"));
    document.getElementById("7Copy").innerHTML="העתקת פוסט";
    document.getElementById("reels").style.visibility = "hidden";
    var chosenPerson = {row:0};
     var nameAndChain = document.getElementById("peopleList").value.split(" + ");
  for (var i = 0; i < reallyAllPeople.length; i++) {   
    if (
      reallyAllPeople[i].name === nameAndChain[0] &&
      fixChainFromData(reallyAllPeople[i].chain) === nameAndChain[1]
    ) {
      chosenPerson = reallyAllPeople[i];
    }
  }
    console.log(chosenPerson);
  if (chosenPerson.row===0) {
    alert("נא לבחור חרוז");
  }
  if (chosenPerson.row >0) {
  /*    
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
          ]
        };
          if (newMess.name.includes("מטא 7")) {
            messes[i - 1] = newMess;
              console.log(newMess);
          }
              })
      });
      
      */
      
      getMessData();
      for (var j = 0; j < messes[0].lines.length; j++) {
          cutMessReels(messes[0].lines, 1, chosenPerson);
        }
          document.getElementById("reels").style.visibility = "visible";

      
  }
}
function copy0(id) {
  var text = fullTexts[id - 1];
  var elem = document.createElement("textarea");
  document.body.appendChild(elem);
  elem.value = text;
  elem.select();
  document.execCommand("copy");
  document.body.removeChild(elem);
  document.getElementById(id+"Copy").innerHTML="הועתק";
}
function copy(id) {
  var text = fullTexts[id - 1];
  var elem = document.createElement("textarea");
  document.body.appendChild(elem);
  elem.value = text;
  elem.select();
  document.execCommand("copy");
  document.body.removeChild(elem);
    var prev=chosenRows[id-4].meta;
    console.log(chosenRows[id-4]);
    const temp = {
                     text: prev+""+(date.getMonth()+1)+"/"+date.getDate()+"/"+date.getFullYear()+", ",
                     row: chosenRows[id-4].row,
                     col: "meta",
                 };
     if(chosenRows[id-4].lang==="heb"){           
        sendData(temp, document.getElementById("meta")); 
     }
    if(chosenRows[id-4].lang==="eng"){           
        sendDataEng(temp, document.getElementById("meta")); 
     }
  document.getElementById(id+"Copy").innerHTML="הועתק";
}
function changeMetaAll(id){
    if(confirm("האם את באמת רוצה לאפס את מערכת הגרלת הפוסטים לפרסום?")){
        var dataElement=document.getElementById(id+"Change");
        chosenCol="meta";
        console.log("col: "+chosenCol);
        for(var j=0;j<10;j++){
           for(var i=2;i<rowCount;i++){
               const temp = {
                         text: "",
                         row: i,
                         col: "meta",
                     };
                sendData(temp, dataElement);
            }
        }
        dataElement.innerHTML="התעדכן";
        console.log("בוצע");
    }
    else{
        console.log("לא בוצע שינוי");
    }
}
function changeTimeZone(date, timeZone) {
  if (typeof date === 'string') {
    return new Date(new Date(date).toLocaleString('en-US', { timeZone }));
  }
  return new Date(date.toLocaleString('en-US', { timeZone }));
}
