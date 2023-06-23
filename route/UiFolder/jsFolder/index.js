const passInput = document.querySelector(".password")

const pattern = "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}"

passInput.addEventListener("click",(e)=>{
    console.log(e);
})