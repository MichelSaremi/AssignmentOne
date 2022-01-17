/////////////////////////Bank part

//refering to the html elements
let loanSum = document.getElementById("loanT")
let loanSumNumber = Number(document.getElementById("loanT").innerText)

let loanText = document.getElementById("loanText")
loanText.style.display ='none'

let balance = document.getElementById("balance")
let balanceNumber = Number(document.getElementById("balance").innerText)

let buttonLoan = document.getElementById('loan')

//To happen when loan button is clicked
buttonLoan.onclick = () => {
	
    MaxLoan = (Number(document.getElementById("balance").innerText))*2

    //window with input request
    const loanRequest = Number(window.prompt("How much would you like to loan?\n You can loan maximum: "+MaxLoan));
    loanText.style.display='block'

    //input processing
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
        balanceNumber = balanceNumber + loanRequest
        balance.innerText = balanceNumber
    }
}
}

//////////////////////////Work part 

///Work button
let buttonWork = document.getElementById('WorkButton')
let PaySum = document.getElementById("pay")


//When work button is clicked
buttonWork.onclick = () => {
    let PaySumNumber = Number(document.getElementById("pay").innerText)
    PaySumNumber = PaySumNumber + 100
    PaySum.innerText = PaySumNumber
    
} 

///Bank button

// relevant references to the html elements
let buttonBank = document.getElementById('BankButton')

//When bank button is clicked
buttonBank.onclick = () => {
    
    //what happens when there is an active loan
    let loanSumNumber = Number(document.getElementById("loanT").innerText)
    let PaySumNumber = Number(document.getElementById("pay").innerText)

    if (loanSumNumber!=0){
        
        let ToBank = PaySumNumber*0.9
        let ToLoan = PaySumNumber*0.1
        let ExtraToBankLargerScope = ""
        
        if (ToLoan>loanSumNumber){
            let ExtraToBank = ToLoan-loanSumNumber
            ExtraToBankLargerScope = ExtraToBank
        }

        balanceNumber = balanceNumber + ToBank + ExtraToBankLargerScope
        balance.innerText = balanceNumber

        loanSumNumber = loanSumNumber - ToLoan
        loanSum.innerText = loanSumNumber

        PaySumNumber = 0
        PaySum.innerText = 0
        
        //what happens when loan is negative
        if (loanSumNumber<0){
            loanSumNumber = 0
            loanSum.innerText = loanSumNumber
        }
    //What happens when there is no loan   
    }else if (loanSumNumber==0){
        balanceNumber = balanceNumber + PaySumNumber
        balance.innerText = balanceNumber
        PaySumNumber = 0
        PaySum.innerText = PaySumNumber
    }
    
}


///Repay button
let buttonRepay = document.getElementById('RepayButton')
buttonRepay.style.display ='none'

//When repay loan button is clicked
buttonRepay.onclick = () => {
    
    //Make html references
    let loanSum = document.getElementById("loanT")
    let loanSumNumber = Number(document.getElementById("loanT").innerText)
    let PaySumNumber = Number(document.getElementById("pay").innerText)
   
    //code if loan is higher than pay
    if (loanSumNumber>PaySumNumber){
        Result = loanSumNumber - PaySumNumber
        loanSum.innerText = Result
        PaySumNumber = 0
        PaySum.innerText = PaySumNumber
    
    //code if loan is lower than pay
    }else if(PaySumNumber>loanSumNumber){
        Result = PaySumNumber - loanSumNumber
        balanceNumber = balanceNumber + Result
        balance.innerText =  balanceNumber
        
        loanSumNumber = 0
        loanSum.innerText = loanSumNumber
        PaySumNumber = 0
        PaySum.innerText = PaySumNumber

    //code if loan and pay are equal
    }else{
        PaySumNumber = 0
        PaySum.innerText = PaySumNumber
        loanSumNumber = 0
        loanSum.innerText = loanSumNumber
    }
}

//////////////////////////////////////////Laptop part

////////Laptop selection section

//Arrays to store data
const laptopList = document.getElementById("laptopList")
const laptopTitle = [];
const laptopSpecs = [];
const laptopDescrip = [];
const laptopPrice = [];
const laptopImage = [];

//Fetching the date to populate above arrays
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
    //populationg the html dropdown list
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

////Adding the laptop specs when choice from the dropdown list is made 

//These to lines of code belong to the laptopinfo sections image display 
const ImagePlace = document.getElementById("image")
ImagePlace.style.display ='none'

let ChoiceLargerScope = ""
let PriceNumberLargerScope = ""

//Function to run when choice is made
function getValueAndDisplay(){
    const Choice = document.getElementById("laptopList").value
    ChoiceLargerScope = Choice
    const features = document.getElementById("info")
    
    //Displaying the features text
    specList = []
    let index = laptopTitle.indexOf(Choice)
    let specText = laptopSpecs[index]
    for (let spec of specText){
        specList.push("\n"+spec)

    }
    features.innerText = specList
    
    ///////////////laptop info section

    //references to html elements
    const Header = document.getElementById("LaptopHeader")
    const Description = document.getElementById("LaptopDescription")
    const Price = document.getElementById("LaptopPrice")

    //Adding info based on choice
    Header.innerText = Choice

    DescriptionText = laptopDescrip[index]
    Description.innerText = DescriptionText

    PriceText = laptopPrice[index]
    Price.innerText = PriceText+" "
    PriceNumber = Number(PriceText)
    PriceNumberLargerScope = PriceNumber

    //Laptop images configuration
    ImagePlace.style.display ='block'
    ImagePlace.style.height = '150px'
    ImagePlace.style.width = '150px'
    
    //Display image of laptop based on choice
    if (ChoiceLargerScope == "The Visor"){
        let imageURL = "https://noroff-komputer-store-api.herokuapp.com/assets/images/5.png"
        ImagePlace.src = imageURL
    }else{
        let image = laptopImage[index]
        let imageURL = "https://noroff-komputer-store-api.herokuapp.com/"+image
        ImagePlace.src = imageURL
    }
}

///The buy button

//referencing to html elements
let buttonBuy = document.getElementById("BuyButton")

//code when buy button is clicked
buttonBuy.onclick = () => {
        
        //Code if funds are insufficient 
        if (PriceNumberLargerScope>balanceNumber){
            alert("You do not have sufficient funds to buy this Laptop")
        
            //Code if funds are sufficient 
        }else if (balanceNumber>=PriceNumberLargerScope){
            alert("You are now the proud owner of the "+ChoiceLargerScope)
            balanceNumber = balanceNumber - PriceNumberLargerScope
            balance.innerText = balanceNumber
        }

}
