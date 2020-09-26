//正则校验规则
let userReg = /^[-_a-zA-Z0-9]{4,16}$/;
let emailReg = /^[a-zA-Z0-9]{1,10}@[a-zA-Z0-9]{1,5}\.[a-zA-Z0-9]{1,5}$/;
let idcardReg = /^\d{17}(\d|x|X)$/;
module.exports ={
    userReg,
    emailReg,
    idcardReg
}