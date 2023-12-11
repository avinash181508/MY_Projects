let addBtn=document.querySelector('.add-btn');
let addTaskFlag=false;
let modalPopup=document.querySelector('.modal-popup')
let addNameFlag=false;
let addNicknameFlag=false;
let modalCont=document.querySelector('.modal-cont');
let modalNameCont=document.querySelector('.modalname-cont');
let modalNickNameCont=document.querySelector('.modalnickname-cont');

let ticketsArr=[];

let lockClass='fa-lock';
let unlockClass='fa-lock-open'


addBtn.addEventListener('click',function(){
    addTaskFlag=!addTaskFlag;
    if(addTaskFlag===true){
        modalPopup.style.display='flex';
    }else{
        modalPopup.style.display='none';
    }
});

let selectName=document.querySelector('.selectname');
let selectNickname=document.querySelector('.selectnickname');

selectName.addEventListener('click',function(){
    addNameFlag=!addNameFlag;
    if(addNameFlag==true){
        modalNameCont.style.display='flex';
        modalNickNameCont.style.display='none';
        modalPopup.style.display='none'
        addTaskFlag=false;
        addNameFlag=false;
    }else{
        modalNameCont.style.display='none';
    }
})

selectNickname.addEventListener('click',function(){
    addNicknameFlag=!addNicknameFlag;
    if(addNicknameFlag==true){
        modalNickNameCont.style.display='flex';
        modalNameCont.style.display='none';
        modalPopup.style.display='none';
        addTaskFlag=false;
        addNicknameFlag=false;
    }else{
        modalNickNameCont.style.display='none';
    }
});

let nameSubmit=document.querySelector('.name-submit');
let nicknameSubmit=document.querySelector('.nickname-submit');

let modaltaskName=document.querySelector('.modaltask-name');
// let modalTaskArea=document.querySelector('.modal-taskarea');
let name1=document.querySelector('.name1');
let name2=document.querySelector('.name2');
let name3=document.querySelector('.name3');
let name4=document.querySelector('.name4');
let name5=document.querySelector('.name5');

let mainCont=document.querySelector('.main-cont');

modalNameCont.addEventListener('keydown',function(e){
    let key=e.key;
    if(key==='Enter'){
         createNameTicket(modaltaskName.value,name1.value,name2.value,name3.value,name4.value,name5.value);
        // createNameTicket(modaltaskName.value, modalTaskArea.value);
    }
    // modaltaskName.value="";
    // name1.value="";
    // name2.value="";
    // name3.value="";
    // name4.value="";
    // name5.value="";
    // console.log('name ticket created.')
});

 
function createNameTicket(ticketTask,n1,n2,n3,n4,n5,ticketID){
    let id=ticketID||dateid();
    let nameCont=document.createElement("div");
    nameCont.setAttribute("class","name-cont");
    nameCont.innerHTML=`<div class="task-name">${ticketTask}</div>
    <div class="name-id">${id}</div>
    <div class="taskarea">
      <br>
      <label>Names:</label>
      <ol>
        <li class="n1">${n1}</li>
        <li class="n2">${n2}</li>
        <li class="n3">${n3}</li>
        <li class="n4">${n4}</li>
        <li class="n5">${n5}</li>
      </ol>
    </div>
    <div class="name-lock">
      <i class="fa-solid fa-lock"></i>
    </div>`;

    mainCont.appendChild(nameCont);
    modalNameCont.style.display='none';

    if(!ticketID){

        
        ticketsArr.push({ticketTask,n1,n2,n3,n4,n5,ticketID:id});
        localStorage.setItem('tickets',JSON.stringify(ticketsArr));
    }
   

    handleLock(nameCont,id);
    handleRemoval(nameCont,id);

}
function dateid(){
    let d=new Date().getTime().toString();
    return d;
}
if(localStorage.getItem('tickets')){
    ticketsArr = JSON.parse(localStorage.getItem('tickets'))

    ticketsArr.forEach(function(ticket){

        
        createNameTicket(ticket.ticketTask ,ticket.n1, ticket.n2, ticket.n3, ticket.n4 ,ticket.n5, ticket.ticketID )
    })
}


function handleLock(ticket,id){
    let ticketLockElem=ticket.querySelector('.name-lock');
    let ticketLockIcon=ticketLockElem.children[0];
    //let ticketTaskArea=ticket.querySelector('.taskarea');
    let na1=ticket.querySelector('.n1');
    let na2=ticket.querySelector('.n2');
    let na3=ticket.querySelector('.n3');
    let na4=ticket.querySelector('.n4');
    let na5=ticket.querySelector('.n5');

    ticketLockIcon.addEventListener('click',function(){
        let idx=getIdx(id);
        if(ticketLockIcon.classList.contains(lockClass)){
            ticketLockIcon.classList.remove(lockClass);
            ticketLockIcon.classList.add(unlockClass);
            //ticketTaskArea.setAttribute('contenteditable','true');
            na1.setAttribute('contenteditable','true');
            na2.setAttribute('contenteditable','true');
            na3.setAttribute('contenteditable','true');
            na4.setAttribute('contenteditable','true');
            na5.setAttribute('contenteditable','true');
        }else{
            ticketLockIcon.classList.remove(unlockClass);
            ticketLockIcon.classList.add(lockClass);
            //ticketTaskArea.setAttribute('contenteditable','false');
            na1.setAttribute('contenteditable','false');
            na2.setAttribute('contenteditable','false');
            na3.setAttribute('contenteditable','false');
            na4.setAttribute('contenteditable','false');
            na5.setAttribute('contenteditable','false');
        }

          //ticketsArr[idx].ticketArea=ticketTaskArea.innerText;
        ticketsArr[idx].n1=na1.innerText;
        ticketsArr[idx].n2=na2.innerText;
        ticketsArr[idx].n3=na3.innerText;
        ticketsArr[idx].n4=na4.innerText;
        ticketsArr[idx].n5=na5.innerText;
        localStorage.setItem('tickets',JSON.stringify(ticketsArr));
    })
    
}

let removeTaskFlag=false;

let removeBtn=document.querySelector('.remove-btn');

removeBtn.addEventListener('click',function(){
    removeTaskFlag=!removeTaskFlag;
    if(removeTaskFlag===true){
        alert('Delete Button Activated');
        removeBtn.style.color='red';
    }else{
        alert('Delete Button Dectivated');
        removeBtn.style.color='white';
    }
});

function handleRemoval(ticket,id){
    ticket.addEventListener('click',function(){
        if(!removeTaskFlag){
            return;
        }
        let idx=getIdx(id);
        ticket.remove();
        ticketsArr.splice(idx , 1)

       localStorage.setItem('tickets' , JSON.stringify(ticketsArr));
    })
}

function getIdx(id){
    let ticketIdx=ticketsArr.findIndex(function(ticketObj){
        return ticketObj.ticketID===id;
    });
    return ticketIdx;
}

nicknameSubmit.addEventListener('click',function(){
    // createNameTicket();
    console.log('name ticket created.')
});