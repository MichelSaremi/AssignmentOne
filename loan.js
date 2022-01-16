let loanSum = document.getElementById("loanT")
let loanText = document.getElementById("loanText")
loanText.style.display ='none'

let balanceSum = Number(document.getElementById("balance").innerText)
let MaxLoan = balanceSum*2

let buttonLoan = document.getElementById('loan')

buttonLoan.onclick = () => {
	const loanRequest = Number(window.prompt("How much would you like to loan?\n You can loan maximum: "+MaxLoan));
    loanText.style.display='block'

    if (Number(loanSum.innerText) != 0){
        alert("You cannot have more than one active loan at a time")
    }else{
    
    if (/^\d+$/.test(loanRequest) == false){
        alert("Must be a number")
    }
    else if (loanRequest>MaxLoan){
    	alert("You cannot loan more than twice your balance")
    }else{
        loanSum.innerText = loanRequest
    }
}
}
