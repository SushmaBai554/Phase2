var param;
var paramValue;
var query;
query=window.location.search.substring(1).split("?");
for(i in query){
  param=query[i].split("=");
  paramValue=parseInt(param[1]);
}
var request;
  var idb=window.indexedDB || window.mozIndexedDB || window.msIndexedDB || window.webkitIndexedDB;
if(!idb in window){
  alert("Browser is not supported");
}
var open=idb.open("StoreData",1);
console.log("indexedDB is created");
open.onupgradeneeded=function(event){
  var request=event.target.result;
  var storeDB=request.createObjectStore("Formdata",{keyPath:"id",autoIncrement:true});
}
  open.onerror=function(error){
    console.log("object store is not created",+error);
  }
  open.onsuccess=function(event){
    request=event.target.result;
    var transaction=request.transaction("Formdata","readwrite");
    var storeDB=transaction.objectStore("Formdata");
    var info=storeDB.get(paramValue);
    info.onsuccess=function(data){
    console.log(data.target.result);
    display(data.target.result);
  }
  }
  var main=document.querySelector(".main");
  var left=document.querySelector(".left");
  var right=document.querySelector(".right");
  function display(data){
    var img=document.createElement("img");
    img.src="images/163847.svg";
    left.append(img);
    var h3=document.createElement("h2");
    h3.textContent=data.name;
    left.append(h3);
    var h4=document.createElement("h3");
    h4.textContent=data.role;
    left.append(h4);
    var h2=document.createElement("h3");
    h2.textContent=data.email;
    left.append(h2);
    var h1=document.createElement("h3");
    h1.textContent=data.mobile;
    left.append(h1);
    //right
    main.append(left);
    var head=document.createElement("h2");
    head.textContent="carrer Objective"
    right.append(head);
    var pc=document.createElement("p");
    pc.textContent=data.carrer;
    right.append(pc);
    var pc1=document.createElement("h2");
    pc1.textContent="Graduation Details";
    right.append(pc1);
    var table=document.createElement("table");
    let row='';
    table.border='3';
    row += "<tr>"+"<th>"+"name of ins" +"</th>"+
    "<th>"+"degree" +"</th>"+
    "<th>"+"branch" +"</th>"+
    "<th>"+"percen" +"</th>"+
    "</tr>";

    for(i in data.education){
      row += "<tr>"+"<td>"+data.education[i].college +"</td>"+
      "<td>"+data.education[i].degree +"</td>"+
      "<td>"+data.education[i].branch +"</td>"+
      "<td>"+data.education[i].marks +"</td>"+
      "</tr>";
    }
    table.innerHTML=row;
    right.append(table);
    var d1=document.createElement("h1");
    d1.textContent="Skills";
    right.append(d1);
    var d2=document.createElement("h2");
    d2.textContent=data.skills;
    right.append(d2);
    main.append(right);
    }
