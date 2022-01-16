/////////////////////////Bank part

let loanSum = document.getElementById("loanT")
let loanText = document.getElementById("loanText")
loanText.style.display ='none'

//let balance = document.getElementById("balance")
let balanceSum = Number(document.getElementById("balance").innerText)

let MaxLoan = balanceSum*2

let buttonLoan = document.getElementById('loan')

buttonLoan.onclick = () => {
	
    MaxLoan = (Number(document.getElementById("balance").innerText))*2

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
        buttonRepay.style.display='block'
        balanceSum = balanceSum + loanRequest
        balance.innerText = balanceSum
    }
}
}

//////////////////////////Work part 

///Work button
let buttonWork = document.getElementById('WorkButton')
let PaySum = document.getElementById("pay")


buttonWork.onclick = () => {
    let PaySumNumber = Number(document.getElementById("pay").innerText)
    PaySumNumber = PaySumNumber + 100
    PaySum.innerText = PaySumNumber
    
} 

///Bank button
let buttonBank = document.getElementById('BankButton')

let loanSum2 = document.getElementById("loanT")

let balanceSum2 = document.getElementById("balance")
let balanceSum2Number = Number(document.getElementById("balance").innerText)

buttonBank.onclick = () => {
    let loanSum2Number = Number(document.getElementById("loanT").innerText)
    if (loanSum2Number!=0){
        let PaySumNumber = Number(document.getElementById("pay").innerText)
        let ToBank = PaySumNumber*0.9
        let ToLoan = PaySumNumber*0.1

        balanceSum2Number = balanceSum2Number + ToBank
        balanceSum2.innerText = balanceSum2Number

        loanSum2Number = loanSum2Number - ToLoan
        loanSum2.innerText = loanSum2Number

        PaySumNumber = 0
        PaySum.innerText = 0
        
        
        if (loanSum2Number<0){
            loanSum2Number = 0
            loanSum2.innerText = loanSum2Number
        }
    }else if (loanSum2Number==0){
        let PaySumNumber = Number(document.getElementById("pay").innerText)
        balanceSum2Number = balanceSum2Number + PaySumNumber
        balanceSum2.innerText = balanceSum2Number
        PaySumNumber = 0
        PaySum.innerText = PaySumNumber
    }
    
}


///Repay button
let buttonRepay = document.getElementById('RepayButton')
buttonRepay.style.display ='none'

buttonRepay.onclick = () => {
    let loanSum3 = document.getElementById("loanT")
    let loanSum3Number = Number(document.getElementById("loanT").innerText)

    let PaySumNumber = Number(document.getElementById("pay").innerText)
    
    let balance3 = document.getElementById("balance")
    let balance3Number = Number(document.getElementById("balance").innerText)
   
    if (loanSum3Number>PaySumNumber){
        Result = loanSum3Number - PaySumNumber
        loanSum.innerText = Result
        PaySumNumber = 0
        PaySum.innerText = PaySumNumber

    }else if(PaySumNumber>loanSum3Number){
        Result = PaySumNumber - loanSum3Number
        balance3Number = balance3Number + Result
        balance3.innerText =  balance3Number
        
        loanSum3Number = 0
        loanSum3.innerText = loanSum3Number
        PaySumNumber = 0
        PaySum.innerText = PaySumNumber

    }else{
        PaySumNumber = 0
        PaySum.innerText = PaySumNumber
        loanSum3Number = 0
        loanSum3.innerText = loanSum3Number
    }
}

//////////////////////////////////////////Laptop part

//////Laptop selection
const laptopList = document.getElementById("laptopList")
const laptopTitle = [];
const laptopSpecs = [];
const laptopDescrip = [];
const laptopPrice = [];
const laptopImage = [];

fetch("https://noroff-komputer-store-api.herokuapp.com/computers")

.then(function(response){
    return response.json();
})

.then(function(laptopObj){
    for(laptop of laptopObj){
        laptopTitle.push(laptop.title)
        laptopSpecs.push(laptop.specs)
        laptopDescrip.push(laptop.description)
        laptopPrice.push(laptop.price)
        laptopImage.push(laptop.image)
    }
    //////////populationg dropdown list
    for(let i=0; i<laptopTitle.length; i++){
        const newItem = document.createElement("option")
        newItem.value = laptopTitle[i]
        newItem.innerText = laptopTitle[i]
        laptopList.appendChild(newItem)
    }
})
.catch(function(error){
    console.log(error)
})

const ImagePlace = document.getElementById("image")
ImagePlace.style.display ='none'
let ChoiceLargerScope = ""
let PriceNumberLargerScope = ""

function getValueAndDisplay(){
    const Choice = document.getElementById("laptopList").value
    ChoiceLargerScope = Choice
    const features = document.getElementById("info")
    
    specList = []
    let index = laptopTitle.indexOf(Choice)
    let specText = laptopSpecs[index]
    for (let spec of specText){
        specList.push("\n"+spec)

    }
    features.innerText = specList
    ///////////////laptop info

    const Header = document.getElementById("LaptopHeader")
    const Description = document.getElementById("LaptopDescription")
    const Price = document.getElementById("LaptopPrice")

    Header.innerText = Choice

    DescriptionText = laptopDescrip[index]
    Description.innerText = DescriptionText

    PriceText = laptopPrice[index]
    Price.innerText = PriceText+" "
    PriceNumber = Number(PriceText)
    PriceNumberLargerScope = PriceNumber
    //////////////////Laptop images
    ImagePlace.style.display ='block'
    ImagePlace.style.height = '150px'
    ImagePlace.style.width = '150px'
    
    let image = laptopImage[index]

    let imageURL = "https://noroff-komputer-store-api.herokuapp.com/"+image

    ImagePlace.src = imageURL
}

//////////////////The buy button
let buttonBuy = document.getElementById("BuyButton")
let balanceSum3 = document.getElementById("balance")

buttonBuy.onclick = () => { 
        let balanceSum3Number = Number(document.getElementById("balance").innerText)
        if (PriceNumberLargerScope>balanceSum3Number){
            alert("You do not have sufficient funds to buy this Laptop")
        }else if (balanceSum3Number>=PriceNumberLargerScope){
            alert("You are now the proud owner of the "+ChoiceLargerScope)
            balanceSum3Number = balanceSum3Number - PriceNumberLargerScope
            balanceSum3.innerText = balanceSum3Number
        }

}
