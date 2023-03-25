const modal = document.querySelector('.dialog')
const btn = document.querySelector(".openBtn");
const btnClose = document.querySelector(".btnClose");

btn.addEventListener('click', ()=>{
    console.log(modal.open)
    if(modal.open === true) modal.close()
    else modal.showModal()
})

btnClose.addEventListener('click', ()=>{
    modal.close()
})