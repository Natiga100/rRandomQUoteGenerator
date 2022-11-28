//DOM elements
var resultEl=document.getElementById('result')
var lengthEl=document.getElementById('length')
var upperCaseEl=document.getElementById('upperCase')
var lowerCaseEl=document.getElementById('lowerCase')
var numberEl=document.getElementById('numerals')
var symbolEl=document.getElementById('symbols')
var generateEl=document.querySelector('.btn')
var copyEl=document.querySelector('.imp')
const randomFunc={
    lower:getRandomLower,
    upper:getRandomUpper,
    number:getRandomNumber,
    symbol:getRandomSymbol
}
//generate listen event
generateEl.addEventListener('click',(e)=>{
    e.preventDefault()
    var length=JSON.parse(lengthEl.value)
    console.log(typeof length)
   var hasLower=lowerCaseEl.checked;
    var hasUpper=upperCaseEl.checked;
    var hasNumber=numberEl.checked;
    var hasSymbol=symbolEl.checked;
    resultEl.value=generatePassWord(hasLower,hasUpper,hasNumber,hasSymbol,length)    
})
//copy password to clipboard
copyEl.addEventListener('click',(e)=>{
    const textArea=document.createElement('textarea')
    const passWord=resultEl.value
    if(!passWord){
        return
    }else{
        textArea.value=passWord
        document.body.appendChild(textArea)
        textArea.select();
        document.execCommand('copy')
        textArea.remove()
        alert('Password copied to clipboard')
    }

})
//generate password
 function generatePassWord(lower,upper,number,symbol,length){
    //1.Initialize a password variable
    let generatedPassword=''
    const typeCount=lower + upper + number + symbol
    console.log(`typesCount:${typeCount}`)

    const typesArr=[{lower},{upper},{number},{symbol}].filter(item=>Object.values(item)[0])
 
    console.log('typesCount:',typesArr)
    if(typeCount===0){
        return''
    }
    for(let i=0;i<length;i+=typeCount){
        typesArr.forEach(type=>{
            const funcName=Object.keys(type)[0]
            console.log('funcName:', funcName)
            generatedPassword += randomFunc[funcName]()
        })

    }
    const finalPassWord= generatedPassword.slice(0,length)
    return finalPassWord
    //2.filter out unchecked types
    //3.loop over and call a generator function for each type
    //4.Add final pw to the pw var and return it


 }


//Generator functions
function getRandomLower(){
    return String.fromCharCode(Math.floor(Math.random()*26)+97)

}
function getRandomUpper(){
    return String.fromCharCode(Math.floor(Math.random()*26)+65)

}
function getRandomNumber(){
    return String.fromCharCode(Math.floor(Math.random()*10)+48)

}
function getRandomSymbol(){
    const symbols='!@#$%^&*()+_)?><":'
    return symbols[Math.floor(Math.random()*symbols.length)]

}
//console.log(getRandomSymbol())