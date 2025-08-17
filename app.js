var newPerson = {};
var size = 0;
var allPeople = [];
var allPeopleEng = [];
var listSubs = document.createElement("ul");
var listCreate= document.createElement("ul");
var listSend= document.createElement("ul");
var listDiv=document.getElementById("listDiv");
var optionList;
var optionDiv;
var optionBut;
var optionInput;
var day;
var month;
var recDate;
var chainName;
var firstSendDay;
var secondSendDay;
var tableRow = 2;
var newTask = {};
var allTasks = [];
var allTasksEng = [];
var tasks4lols = [];
var tasks4lolsEng = [];
var tasks4person;
var tasks4personEng;
var clipsToChange=0;
var indiclipsToChange=0;
var subsDateVal=1;
var clipsCreateDateVal=2;
var clip1sendDateVal=21;
var clip2sendDateVal=28;
var clip3sendDateVal=35;
var clip1removeDateVal=14;
var clip2removeDateVal=14;
var clip3removeDateVal=14;
var nullTask=[];
var tasks4personB4 = {};
var tasks4personB4Eng = {};
var loaderStatus = document.getElementById("loaderStatus");
const url =
  "https://script.google.com/macros/s/AKfycbzojs9dIr-pr54z2zCEXxklX5h1wIRBHt1ktH8Wwg9KC62R4iDaaCftIK7rHJzrjC3nVQ/exec";
const taskurl =
  "https://script.google.com/macros/s/AKfycby17a_vfiR8IXwkNb8Uk2ZxAet_I1qkJd6y9n_nZRfl2S5-6pad8EmH9GyxRB0WrO78Aw/exec";
const timingDataURL =
    "https://script.google.com/macros/s/AKfycbzh6afzt8FHJ8DC7eACCbofDucc-K5gupE09xeMpkbnveNbrWJZAkdqiShaYrb-AyiTlg/exec";

var today = changeTimeZone(new Date(), 'Asia/Jerusalem');
var todaysDay = today.getDate();
var todaysMonth = today.getMonth() + 1;
var todaysCurrentDate = todaysDay + "." + todaysMonth;
console.log("today: " + today);

getTimingData();
    setTimeout(() => {
      getData();
    }, 1000);   

function getTimingData() {

    fetch(timingDataURL)
        .then((res) => {
            return res.json();
        })
        .then((json) => {
            json.data.taskTiming.forEach((ele) => {
                                        loaderStatus.innerHTML = "בודקת תזמוני משימות...";
               if(ele.taskname==="subs"&&ele.daysfromrecordingdate!==""){
                        subsDateVal=ele.daysfromrecordingdate;
                    
                    console.log("changed subsDateVal - "+subsDateVal);
                }
                if(ele.taskname==="clipscreate"&&ele.daysfromrecordingdate!==""){
                        clipsCreateDateVal=ele.daysfromrecordingdate;
                    
                    console.log("changed clipsCreateDateVal - "+clipsCreateDateVal);
                }
                if(ele.taskname==="clip1send"&&ele.daysfromrecordingdate!==""&&ele.daystodeletetask!==""){
                        clip1sendDateVal=ele.daysfromrecordingdate;
                    
                    console.log("changed clip1sendDateVal - "+clip1sendDateVal);
                    clip1removeDateVal=ele.daystodeletetask;
                    
                    console.log("changed clip1removeDateVal - "+clip1removeDateVal);
                }
                if(ele.taskname==="clip2send"&&ele.daysfromsendclip1!==""&&ele.daystodeletetask!==""){
                        clip2sendDateVal=ele.daysfromsendclip1;
                    
                    console.log("changed clip2sendDateVal - "+clip2sendDateVal);
                    clip2removeDateVal=ele.daystodeletetask;
                    
                    console.log("changed clip2removeDateVal - "+clip2removeDateVal);
                }
                if(ele.taskname==="clip3send"&&ele.daysfromrecordingdate!==""&&ele.daystodeletetask!==""){
                        clip3sendDateVal=ele.daysfromrecordingdate;
                    
                    console.log("changed clip3sendDateVal - "+clip3sendDateVal);
                    clip3removeDateVal=ele.daystodeletetask;
                    
                    console.log("changed clip3removeDateVal - "+clip3removeDateVal);
                }
                if(ele.daysfromrecordingdate===""&&ele.daysfromsigndate===""&&ele.daystodeletetask===""){
                   nullTask.push(ele.taskname)
               } 
                
            });
            console.log("null Tasks: "+nullTask);

        });
}
function getData() {
  getTasksDataFromPerson();
  document.getElementById("today").innerHTML =
    "היום " + todaysCurrentDate + " לבצע:";
  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((json) => {
        json.data.forEach((ele, index) => { 
        newPerson = {
          name: ele.name,
          recordingdate: "",
            nextrecdate:"",
          clipscreatedate: "",
            clip1senddate:"",
            clip2senddate:"",
            clip1sent:"",
            clip2sent:"",
            subsdate:"",
            livechain:false,
            feedback:ele.feedback,
          link: ele.linkfull,
          row: tableRow,
            chain: ele.chain,
             id: ele.id
        };
        tableRow++;
        setTimeout(() => {
                    if (ele.id) {
                        loaderStatus.innerHTML = "בודקת חרוז " + ele.id + "...";
                        console.log("בודקת חרוז " + ele.id);
                   }
                    if (index === json.data.length - 2) { 
                        setTimeout(() => {
                            loaderStatus.style.display = "none";
                            const loader = document.getElementById("loader");
                            loader.style.display = "none";
                        }, 20);
                    }
                }, Math.max(0, index*20-1000)); 
        if(ele.linkfull===""){
            newPerson.link=ele.linkfive;
        }
        if (ele.fixedname !== "") newPerson.name = ele.fixedname;
        if (newPerson.chain === "") {
          if (ele.chaintwo !== "") {
            newPerson.chain = ele.chaintwo;
          }
          if (ele.chainthree !== "") newPerson.chain = ele.chainthree;
          if (ele.chainfour !== "") newPerson.chain = ele.chainfour;
        }
        if (ele.fixedchain !== "") newPerson.chain = ele.fixedchain;
        if(ele.chainlive!==""){
             newPerson.livechain=true;
        }
        if (ele.recordingdate !== "")
            newPerson.recordingdate = changeTimeZone(new Date(ele.recordingdate), 'Asia/Jerusalem');
        if (ele.nextrecdate !== "")
          newPerson.nextrecdate = changeTimeZone(new Date(ele.nextrecdate), 'Asia/Jerusalem');
        if (ele.fixedrecordingdate !== ""&&ele.fixedrecordingdate!=="ללא תאריך")
          newPerson.recordingdate = changeTimeZone(new Date(ele.fixedrecordingdate), 'Asia/Jerusalem');
        if (ele.clip1date !== "")
          newPerson.clip1sent = changeTimeZone(new Date(ele.clip1date), 'Asia/Jerusalem');
        if (ele.clip2date !== "")
          newPerson.clip2sent = changeTimeZone(new Date(ele.clip2date), 'Asia/Jerusalem');
        if(ele.name==="הגר יבין"){
            clipsToChange=ele.fixedphone;
            document.getElementById("clipsB4").innerHTML=clipsToChange+" קליפים חדשים להפוך לשורטים";
            indiclipsToChange=ele.fixedinterviewerphone;
            document.getElementById("indiclipsB4").innerHTML=indiclipsToChange+" קליפים עצמאיים להפוך לשורטים";
        }
        if (newPerson.recordingdate !== ""&&ele.fixedrecordingdate!=="ללא תאריך") {
          newPerson.clipscreatedate = changeTimeZone(new Date(clipsCreateDate(newPerson.recordingdate)), 'Asia/Jerusalem');
          newPerson.subsdate =changeTimeZone(new Date(subsDate(newPerson.recordingdate)), 'Asia/Jerusalem');
          day = newPerson.recordingdate.getDate();
          month = newPerson.recordingdate.getMonth() + 1;
          recDate = day + "." + month;

          if (
            (newPerson.clipscreatedate < today ||
              (newPerson.clipscreatedate.getDate() === today.getDate() &&
                newPerson.clipscreatedate.getMonth() === today.getMonth() &&
                newPerson.clipscreatedate.getYear() === today.getYear())) &&
            getTasksDataFromPersonCont(newPerson.row, "clipscreate") ===
              "not yet"&&!nullTask.includes("clipscreate")&&newPerson.livechain===false)
           {
            newTask = {
              name: newPerson.name,
              recordingdate: newPerson.recordingdate,
              type: "clipscreate",
                link:newPerson.link,
              row: newPerson.row,
                clip1date:newPerson.clip1sent,
                clip2date:newPerson.clip2sent,
                feedback:newPerson.feedback,
                chain:newPerson.chain
            };

            if (!taskAlreadyExist(newTask)) {
              console.log("new task!");
              console.log(newTask);
              allTasks.push(newTask);
              changeStatus(newPerson.row, newTask.type, "add");
            }
          }
          if (
            (newPerson.subsdate < today ||
              (newPerson.subsdate.getDate() === today.getDate() &&
                newPerson.subsdate.getMonth() === today.getMonth() &&
                newPerson.subsdate.getYear() === today.getYear())) &&
            getTasksDataFromPersonCont(newPerson.row, "subs") ===
              "not yet"&&!nullTask.includes("subs"))
           {
            newTask = {
              name: newPerson.name,
              recordingdate: newPerson.recordingdate,
              type: "subs",
                link:newPerson.link,
              row: newPerson.row,
                clip1date:newPerson.clip1sent,
                clip2date:newPerson.clip2sent,
                 feedback:newPerson.feedback,
                chain:newPerson.chain
            };

            if (!taskAlreadyExist(newTask)) {
              console.log("new task!");
              console.log(newTask);
              allTasks.push(newTask);
              changeStatus(newPerson.row, newTask.type, "add");
            }
          }    
          console.log(newPerson);
          allPeople.push(newPerson);
        
      //  if (newPerson.nextrecdate !== "") {
          newPerson.clip1senddate = changeTimeZone(new Date(clip1sendDate(newPerson.recordingdate)), 'Asia/Jerusalem');
          day = newPerson.recordingdate.getDate();
          month = newPerson.recordingdate.getMonth() + 1;
          recDate = day + "." + month;

          if (
            (newPerson.clip1senddate < today ||
              (newPerson.clip1senddate.getDate() === today.getDate() &&
                newPerson.clip1senddate.getMonth() === today.getMonth() &&
                newPerson.clip1senddate.getYear() === today.getYear())) &&
            getTasksDataFromPersonCont(newPerson.row, "clip1send") ===
              "not yet"&&!nullTask.includes("clip1send")&&newPerson.livechain===false)
           {
            newTask = {
              name: newPerson.name,
              recordingdate: newPerson.recordingdate,
              type: "clip1send",
                link:newPerson.link,
              row: newPerson.row,
                clip1date:newPerson.clip1sent,
                clip2date:newPerson.clip2sent,
                 feedback:newPerson.feedback,
                chain:newPerson.chain
            };

            if (!taskAlreadyExist(newTask)) {
              console.log("new task!");
              console.log(newTask);
              allTasks.push(newTask);
              changeStatus(newPerson.row, newTask.type, "add");
            }
          }
        newPerson.clip1removeDate = changeTimeZone(new Date(clip1removeDate(newPerson.recordingdate)), 'Asia/Jerusalem');

         if (
            (newPerson.clip1removeDate < today ||
              (newPerson.clip1removeDate.getDate() === today.getDate() &&
                newPerson.clip1removeDate.getMonth() === today.getMonth() &&
                newPerson.clip1removeDate.getYear() === today.getYear())) &&
            getTasksDataFromPersonCont(newPerson.row, "clip1send") ===
              "active"
          ) {autoEndTask(newPerson.row,"clip1send");}
          console.log(newPerson);
          allPeople.push(newPerson);
       // }
        if (newPerson.clip1sent !== "") {
          newPerson.clip2senddate = changeTimeZone(new Date(clip2sendDate(newPerson.clip1sent)), 'Asia/Jerusalem');
          day = newPerson.recordingdate.getDate();
          month = newPerson.recordingdate.getMonth() + 1;
          recDate = day + "." + month;
          if (
            (newPerson.clip2senddate < today ||
              (newPerson.clip2senddate.getDate() === today.getDate() &&
                newPerson.clip2senddate.getMonth() === today.getMonth() &&
                newPerson.clip2senddate.getYear() === today.getYear())) &&
            getTasksDataFromPersonCont(newPerson.row, "clip2send") ===
              "not yet"&&!nullTask.includes("clip2send")&&newPerson.livechain===false)
           {
            newTask = {
              name: newPerson.name,
              recordingdate: newPerson.recordingdate,
              type: "clip2send",
              link:newPerson.link,
              row: newPerson.row,
                clip1date:newPerson.clip1sent,
                clip2date:newPerson.clip2sent,
                feedback:newPerson.feedback,
                chain:newPerson.chain
            };

            if (!taskAlreadyExist(newTask)) {
              console.log("new task!");
              console.log(newTask);
              allTasks.push(newTask);
              changeStatus(newPerson.row, newTask.type, "add");
            }
          }
         newPerson.clip2removeDate = changeTimeZone(new Date(clip2removeDate(newPerson.clip1sent)), 'Asia/Jerusalem');

         if (
            (newPerson.clip2removeDate < today ||
              (newPerson.clip2removeDate.getDate() === today.getDate() &&
                newPerson.clip2removeDate.getMonth() === today.getMonth() &&
                newPerson.clip2removeDate.getYear() === today.getYear())) &&
            getTasksDataFromPersonCont(newPerson.row, "clip2send") ===
              "active"
          ) {autoEndTask(newPerson.row,"clip2send");}
          console.log(newPerson);
          allPeople.push(newPerson);
        }
       // if (newPerson.clip2sent !== "") {
          newPerson.clip3senddate = changeTimeZone(new Date(clip3sendDate(newPerson.recordingdate)), 'Asia/Jerusalem');
          day = newPerson.recordingdate.getDate();
          month = newPerson.recordingdate.getMonth() + 1;
          recDate = day + "." + month;
          if (
            (newPerson.clip3senddate < today ||
              (newPerson.clip3senddate.getDate() === today.getDate() &&
                newPerson.clip3senddate.getMonth() === today.getMonth() &&
                newPerson.clip3senddate.getYear() === today.getYear())) &&
            getTasksDataFromPersonCont(newPerson.row, "clip3send") ===
              "not yet"&&!nullTask.includes("clip3send")&&newPerson.livechain===false)
           {
            newTask = {
              name: newPerson.name,
              recordingdate: newPerson.recordingdate,
              type: "clip3send",
              link:newPerson.link,
              row: newPerson.row,
                clip1date:newPerson.clip1sent,
                clip2date:newPerson.clip2sent,
                feedback:newPerson.feedback,
                chain:newPerson.chain
            };

            if (!taskAlreadyExist(newTask)) {
              console.log("new task!");
              console.log(newTask);
              allTasks.push(newTask);
              changeStatus(newPerson.row, newTask.type, "add");
            }
          }
            newPerson.clip3removeDate = changeTimeZone(new Date(clip3removeDate(newPerson.recordingdate)), 'Asia/Jerusalem');

         if (
            (newPerson.clip3removeDate < today ||
              (newPerson.clip3removeDate.getDate() === today.getDate() &&
                newPerson.clip3removeDate.getMonth() === today.getMonth() &&
                newPerson.clip3removeDate.getYear() === today.getYear())) &&
            getTasksDataFromPersonCont(newPerson.row, "clip3send") ===
              "active"
          ) {autoEndTask(newPerson.row,"clip3send");}
          console.log(newPerson);
          allPeople.push(newPerson);
       // } 
            }
      });
      taskData();
    });
    
}

function getTasksDataFromPerson() {
  fetch(taskurl)
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      json.data.forEach((ele) => {
        tasks4personB4 = {
          row: ele.row,
          clipscreatestatus: ele.clipscreate8,
          clip1sendstatus: ele.clip1send9,
          clip2sendstatus: ele.clip2send10,
          subsstatus:ele.subs11,
           clip3sendstatus: ele.clip3send12, 
        };
        tasks4lols.push(tasks4personB4);
      });
    });
}
function getTasksDataFromPersonCont(row, type) {
  var result = "def result";
  for (var i = 0; i < tasks4lols.length; i++) {
    if (row === tasks4lols[i].row) {
      if (type === "clipscreate") {
        result = tasks4lols[i].clipscreatestatus;
      }
      if (type === "clip1send") {
        result = tasks4lols[i].clip1sendstatus;
      }
      if (type === "clip2send") {
        result = tasks4lols[i].clip2sendstatus;
      }
      if (type === "subs") {
        result = tasks4lols[i].subsstatus;
      }
       if (type === "clip3send") {
        result = tasks4lols[i].clip3sendstatus;
      }
    }
  }
  return result;
}
function taskData() {
  fetch(taskurl)
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      json.data.forEach((ele) => {
        tasks4person = {
          row: ele.row,
          clipscreatestatus: ele.clipscreate8,
           clip1sendstatus: ele.clip1send9,
          clip2sendstatus: ele.clip2send10,
            subsstatus:ele.subs11,
            clip3sendstatus: ele.clip3send12
        };
        var currPerson = getPersonFromRow(tasks4person.row);
        if (tasks4person.clipscreatestatus === "active") {
          newTask = {
            name: currPerson.name,
            recordingdate: currPerson.recordingdate,
            type: "clipscreate",
            row: currPerson.row,
            clip1date:currPerson.clip1sent,
              clip2date:currPerson.clip2sent,
              feedback:currPerson.feedback,
              chain:newPerson.chain
          };
          if (!taskAlreadyExist(newTask)) {
            console.log("new task!");
            console.log(newTask);
            allTasks.push(newTask);
          }
        }
        if (tasks4person.clip1sendstatus === "active") {
          newTask = {
            name: currPerson.name,
            recordingdate: currPerson.recordingdate,
            type: "clip1send",
            row: currPerson.row,
            clip1date:currPerson.clip1sent,
              clip2date:currPerson.clip2sent,
              feedback:currPerson.feedback,
              chain:newPerson.chain
          };
          if (!taskAlreadyExist(newTask)) {
            console.log("new task!");
            console.log(newTask);
            allTasks.push(newTask);
          }
        }
      if (tasks4person.clip2sendstatus === "active") {
          newTask = {
            name: currPerson.name,
            recordingdate: currPerson.recordingdate,
            type: "clip2send",
            row: currPerson.row,
            clip1date:currPerson.clip1sent,
              clip2date:currPerson.clip2sent,
               feedback:currPerson.feedback,
              chain:newPerson.chain
          };
          if (!taskAlreadyExist(newTask)) {
            console.log("new task!");
            console.log(newTask);
            allTasks.push(newTask);
          }
        }
        if (tasks4person.subsstatus === "active") {
          newTask = {
            name: currPerson.name,
            recordingdate: currPerson.recordingdate,
            type: "subs",
            row: currPerson.row,
            clip1date:currPerson.clip1sent,
              clip2date:currPerson.clip2sent,
              feedback:currPerson.feedback,
              chain:newPerson.chain
          };
          if (!taskAlreadyExist(newTask)) {
            console.log("new task!");
            console.log(newTask);
            allTasks.push(newTask);
          }
        }
        if (tasks4person.clip3sendstatus === "active") {
          newTask = {
            name: currPerson.name,
            recordingdate: currPerson.recordingdate,
            type: "clip3send",
            row: currPerson.row,
            clip1date:currPerson.clip1sent,
              clip2date:currPerson.clip2sent,
              feedback:currPerson.feedback,
              chain:newPerson.chain
          };
          if (!taskAlreadyExist(newTask)) {
            console.log("new task!");
            console.log(newTask);
            allTasks.push(newTask);
          }
        }
      });
      
      if (allTasks.length > 0) {
        allTasks=sortByType(allTasks);
        createTasks();
      }
      console.log(size);
      optionList = document.createElement("dt");
      optionList.id = "label";
      
      if(allTasks.length===0){
        optionList.innerHTML = "אין הקלטות חדשות";
      }
      listSubs.append(optionList);
      listCreate.append(optionList);
      listSend.append(optionList);
    });
}
function sortByType(arr) {
    var typesOrder = ["sub", "clipscreate", "clip1send", "clip2send", "clip3send"];
   return arr.sort((a, b) => typesOrder.indexOf(b.type) - typesOrder.indexOf(a.type));
}



function createTasks() {
  for (var i = allTasks.length-1; i >=0; i--) {
    var tasksPerson = getPersonFromRow(allTasks[i].row);
    day = tasksPerson.recordingdate.getDate();
    month = tasksPerson.recordingdate.getMonth() + 1;
    recDate = day + "." + month;
    chainName=fixChainFromData(tasksPerson.chain);
    if (allTasks[i].type === "clipscreate") {
      ////////8
      optionDiv = document.createElement("div");
      optionDiv.classList.add("d-inline-flex");
      optionDiv.classList.add("flex-row");
      optionInput = document.createElement("input");
    optionBut=document.createElement("button");
        optionBut.innerHTML="להעתיק לינק";
        optionBut.classList.add("btn");
        //optionBut.classList.add("form-control");
        optionBut.classList.add("btn-light");
         optionBut.id = tasksPerson.link+"Copy"+allTasks[i].row;;
        optionBut.addEventListener("click", function () {
        copy(this);
      });
      optionInput.id = allTasks[i].row + "Checkclipscreate";
      optionInput.type = "checkbox";
      optionInput.classList.add("form-check-input");
        
      optionInput.addEventListener("click", function () {
        check(this);
      });
      optionDiv.append(optionInput);
      optionList = document.createElement("label");
      optionList.id = "clipscreate" + allTasks[i].row;
      optionList.innerHTML ="ליצור קליפים ל"+allTasks[i].name + " - " + recDate +" - "+tasksPerson.link+" - "+chainName+" - ";
      optionInput.classList.add("form-check-label");
      optionDiv.append(optionList);
        optionDiv.append(optionBut);
      listCreate.append(optionDiv);
      listCreate.append(document.createElement("br"));
      size++;
    }
    if (allTasks[i].type === "clip1send") {
      ////////9
      optionDiv = document.createElement("div");
      optionDiv.classList.add("d-inline-flex");
      optionDiv.classList.add("flex-row");
      optionInput = document.createElement("input");
      optionBut=document.createElement("button");
        optionBut.innerHTML="ביצוע";
        optionBut.classList.add("btn");
        optionBut.classList.add("btn-light");
        const params= 'name='+encodeURIComponent(allTasks[i].name)+'&chain='+encodeURIComponent(chainName)+'&num=1';
             optionBut.addEventListener("click", function () {
                window.location.href='./send.html?'+params;
            });
      optionInput.id = allTasks[i].row + "Checkclip1send";
      optionInput.type = "checkbox";
      optionInput.classList.add("form-check-input");
      optionInput.addEventListener("click", function () {
        check(this);
      });
      optionDiv.append(optionInput);
      optionList = document.createElement("label");
      optionList.id = "clip1send" + allTasks[i].row;
      optionList.innerHTML ="לשלוח פידבק + קליפ 1 ל"+allTasks[i].name + " - " + recDate +" - "+chainName;
      optionInput.classList.add("form-check-label");
      optionDiv.append(optionList);
      optionDiv.append(optionBut);
      listSend.append(optionDiv);
      listSend.append(document.createElement("br"));
      size++;
    }
    if (allTasks[i].type === "clip2send") {
      ////////10
      
      optionDiv = document.createElement("div");
      optionDiv.classList.add("d-inline-flex");
      optionDiv.classList.add("flex-row");
      optionInput = document.createElement("input");
      optionBut=document.createElement("button");
        optionBut.innerHTML="ביצוע";
        optionBut.classList.add("btn");
        optionBut.classList.add("btn-light");
        const params= 'name='+encodeURIComponent(allTasks[i].name)+'&chain='+encodeURIComponent(chainName)+'&num=2';
             optionBut.addEventListener("click", function () {
                window.location.href='./send.html?'+params;
            });
      optionInput.id = allTasks[i].row + "Checkclip2send";
      optionInput.type = "checkbox";
      optionInput.classList.add("form-check-input");
      optionInput.addEventListener("click", function () {
        check(this);
      });
      optionDiv.append(optionInput);
      optionList = document.createElement("label");
      optionList.id = "clip2send" + allTasks[i].row;
    if(allTasks[i].clip1date!==""){
        firstSendDay=allTasks[i].clip1date.getDate()+"."+(allTasks[i].clip1date.getMonth() + 1);
        optionList.innerHTML ="לשלוח פרגון + קליפ 2 ל"+allTasks[i].name + " - " + recDate+" - "+chainName+ " - קליפ 1 נשלח - "+firstSendDay+" "+allTasks[i].feedback;

      }
    if(allTasks[i].clip1date===""){
        optionList.innerHTML ="לשלוח פרגון + קליפ 2 ל"+allTasks[i].name + " - " + recDate+" - "+chainName+" "+allTasks[i].feedback;

    }
      optionInput.classList.add("form-check-label");
      optionDiv.append(optionList);
      optionDiv.append(optionBut);
      listSend.append(optionDiv);
      listSend.append(document.createElement("br"));
      size++;
    }
    if (allTasks[i].type === "subs") {
      ////////11
      optionDiv = document.createElement("div");
      optionDiv.classList.add("d-inline-flex");
      optionDiv.classList.add("flex-row");
      optionInput = document.createElement("input");
      optionInput.id = allTasks[i].row + "Checksubs";
      optionInput.type = "checkbox";
      optionInput.classList.add("form-check-input");
      optionInput.addEventListener("click", function () {
        check(this);
      });
      optionDiv.append(optionInput);
      optionList = document.createElement("label");
      optionList.id = "subs" + allTasks[i].row;
      optionList.innerHTML =allTasks[i].name + " - " + recDate +" - לחתוך LIVE + כתוביות (ראיון, 555, שורט) + להוריד שורט וחדר המתנה למחשב - "+chainName;
      optionInput.classList.add("form-check-label");
      optionDiv.append(optionList);
      listSubs.append(optionDiv);
      listSubs.append(document.createElement("br"));
      size++;
    }
    if (allTasks[i].type === "clip3send") {
      ////////12
     
      optionDiv = document.createElement("div");
      optionDiv.classList.add("d-inline-flex");
      optionDiv.classList.add("flex-row");
      optionInput = document.createElement("input");
      optionBut=document.createElement("button");
        optionBut.innerHTML="ביצוע";
        optionBut.classList.add("btn");
        optionBut.classList.add("btn-light");
        const params= 'name='+encodeURIComponent(allTasks[i].name)+'&chain='+encodeURIComponent(chainName)+'&num=3';
             optionBut.addEventListener("click", function () {
                window.location.href='./send.html?'+params;
            });
      optionInput.id = allTasks[i].row + "Checkclip3send";
      optionInput.type = "checkbox";
      optionInput.classList.add("form-check-input");
      optionInput.addEventListener("click", function () {
        check(this);
      });
      optionDiv.append(optionInput);
      optionList = document.createElement("label");
      optionList.id = "clip3send" + allTasks[i].row;
         if(allTasks[i].clip2date!==""){
        secondSendDay=allTasks[i].clip2date.getDate()+"."+(allTasks[i].clip2date.getMonth() + 1);
        optionList.innerHTML ="לשלוח הדרכה + קליפ 3 ל"+allTasks[i].name + " - " + recDate+" - "+chainName+ " - קליפ 2 נשלח - "+secondSendDay+" "+allTasks[i].feedback;
      }
    if(allTasks[i].clip2date===""){
        optionList.innerHTML ="לשלוח הדרכה + קליפ 3 ל"+allTasks[i].name + " - " + recDate+" - "+chainName+" "+allTasks[i].feedback;
    }
      
      optionInput.classList.add("form-check-label");
      optionDiv.append(optionList);
      optionDiv.append(optionBut);
      listSend.append(optionDiv);
      listSend.append(document.createElement("br"));
      size++;
    }
  }
}

function showTasks(id){
    removeAllChildNodes(listDiv);
    if(id==="subs"){
        listDiv.append(listSubs);
    }
    if(id==="create"){
        listDiv.append(listCreate);
    }
    if(id==="send"){
        listDiv.append(listSend);
    }
}
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
loaderStatus.innerHTML = "מתחילה בדיקת נתונים...";

setTimeout(() => {
//  const loader = document.getElementById("loader");
//  loader.style.display = "none";
  showTasks("subs");
}, 2050);
function taskAlreadyExist(task) {
   
  for (var i = 0; i < allTasks.length; i++) {
    if (allTasks[i].row === task.row && allTasks[i].type === task.type)
      return true;
  }
  return false;
}
function copy(ele){
    var splitId = ele.id.split("Copy");
  var text = splitId[0];
     var elem = document.createElement("textarea");
  document.body.appendChild(elem);
  elem.value = text;
  elem.select();
  document.execCommand("copy");
  document.body.removeChild(elem);
  document.getElementById(ele.id).innerHTML="הועתק";
    
}
function check(ele) {
  var splitId = ele.id.split("Check");
  var type = splitId[1];
  var row = splitId[0];
  console.log(ele.id);
  if (document.getElementById(row + "Check" + type).checked) {
    changeStatus(row, type, "remove");
    document.getElementById(type + "" + row).style.textDecoration =
      "line-through";
    console.log("type:" + type + " row:" + row + " checked");
  } else {
    changeStatus(row, type, "add");
    document.getElementById(type + "" + row).style.textDecoration = "none";
    console.log("type:" + type + " row:" + row + " unchecked");
  }
}
function changeStatus(row, type, action) {
  var updatedStatus;
  if (row === 0) {
    alert("נא לבחור מישהו מהטבלה כדי לשנות");
  }
  if (action === "add") {
    updatedStatus = "active";
  }
  if (action === "remove") {
    updatedStatus = "completed";
  }
  send2sendData(row, type, updatedStatus);
  return updatedStatus;
}
function send2sendData(row, type, updatedStatus) {
  const temp = {
    text: updatedStatus,
    row: row,
    col: type,
  };
  if (row > 0) {
    sendData(temp);
  }
}
function sendData(obj) {
  console.log(obj);
  let formData = new FormData();
  formData.append("data", JSON.stringify(obj));
  console.log(obj);
  fetch(taskurl, {
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
function getPersonFromRow(row) {
  for (var i = 0; i < allPeople.length; i++) {
    if (row === allPeople[i].row) {
      return allPeople[i];
    }
  }
  return;
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

function changeClips(id) {
     var chosenCol=id;
    
    if(id==="guestphone"){
        var textEntered=document.getElementById("clips").value;
        console.log("clipsB4: "+clipsToChange);
        var dataElement=document.getElementById("clipsChange");
        var ogSum=clipsToChange;
        document.getElementById("clipsB4").innerHTML=parseInt(parseInt(textEntered)+parseInt(ogSum))+" קליפים חדשים להפוך לשורטים";
    }
    if(id==="interphone"){
        var textEntered=document.getElementById("indiclips").value;
        console.log("indiclipsB4: "+indiclipsToChange);
        var dataElement=document.getElementById("indiclipsChange");
        var ogSum=indiclipsToChange;
        document.getElementById("indiclipsB4").innerHTML=parseInt(parseInt(textEntered)+parseInt(ogSum))+" קליפים עצמאיים להפוך לשורטים";
    }
      console.log("col: " + chosenCol);
    if(textEntered===""){
        textEntered=0;
    }
          var temp = {
            text: parseInt(parseInt(textEntered)+parseInt(ogSum)),
            row: 97,
            col: chosenCol,
          };
        sendData2(temp,dataElement);
        dataElement.innerHTML="כמות הקליפים התעדכנה";
    
}
function sendData2(obj, ele) {
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
function autoEndTask(row,type){
    changeStatus(row, type, "remove");
    if(document.getElementById(type + "" + row)){
    document.getElementById(type + "" + row).style.textDecoration =
      "line-through";
    }
    console.log("type:" + type + " row:" + row + " checked");
}
function subsDate(date) {
    var next = changeTimeZone(new Date(date.getTime()), 'Asia/Jerusalem');
    next.setDate(date.getDate() + parseInt(subsDateVal));
    next.setHours(0, 0, 0);
    return next;
}
function clipsCreateDate(date) {
  var next = changeTimeZone(new Date(date.getTime()), 'Asia/Jerusalem');
  next.setDate(date.getDate() + parseInt(clipsCreateDateVal));
  next.setHours(0, 0, 0);
  return next;
}
function clip1sendDate(date) {
  var next = changeTimeZone(new Date(date.getTime()), 'Asia/Jerusalem');
  next.setDate(date.getDate() + parseInt(clip1sendDateVal));
  if (next.getDay() === 6) {
    next.setDate(next.getDate() + 1);
  }
  next.setHours(0, 0, 0);
  return next;
}
function clip2sendDate(date) {
  var next = changeTimeZone(new Date(date.getTime()), 'Asia/Jerusalem');
  next.setDate(date.getDate() + parseInt(clip2sendDateVal));
  if (next.getDay() === 6) {
    next.setDate(next.getDate() + 1);
  }
  next.setHours(0, 0, 0);
  return next;
}
function clip3sendDate(date) {
  var next = changeTimeZone(new Date(date.getTime()), 'Asia/Jerusalem');
  next.setDate(date.getDate() + parseInt(clip3sendDateVal));
  if (next.getDay() === 6) {
    next.setDate(next.getDate() + 1);
  }
  next.setHours(0, 0, 0);
  return next;
}
function clip1removeDate(date) {
  var next = changeTimeZone(new Date(date.getTime()), 'Asia/Jerusalem');
  next.setDate(date.getDate() + parseInt(clip1sendDateVal)+parseInt(clip1removeDateVal));
  next.setHours(0, 0, 0);
  return next;
}
function clip2removeDate(date) {
  var next = changeTimeZone(new Date(date.getTime()), 'Asia/Jerusalem');
next.setDate(date.getDate() + parseInt(clip2sendDateVal)+parseInt(clip2removeDateVal));  next.setHours(0, 0, 0);
  return next;
}
function clip3removeDate(date) {
  var next = changeTimeZone(new Date(date.getTime()), 'Asia/Jerusalem');
next.setDate(date.getDate() + parseInt(clip3sendDateVal)+parseInt(clip3removeDateVal));  next.setHours(0, 0, 0);
  return next;
}
function changeTimeZone(date, timeZone) {
  if (typeof date === 'string') {
    return new Date(new Date(date).toLocaleString('en-US', { timeZone }));
  }
  return new Date(date.toLocaleString('en-US', { timeZone }));
}
