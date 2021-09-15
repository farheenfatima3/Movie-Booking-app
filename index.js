
const selectMovie=document.querySelector(".movieDrop");
const count=document.querySelector("#count")
const total=document.querySelector("#total")
const selectSeats=document.querySelectorAll(".container-main .seat:not(.occupied");
const container=document.querySelector(".container-main")



var ticketPrice=+selectMovie.value;
// toggle over with class named selected when user clicks on seat as selected and color
// its adds class name selected on click seats
container.addEventListener("click",function fun(e){
   if(e.target.classList.contains("seat") && !e.target.classList.contains("occupied")){
       e.target.classList.toggle("selected")
       updateCount()
   }
})

// set data in local storage index of movie selected and price
function setMovieData(movieInd,moviePrice){
    localStorage.setItem("movieInd",movieInd);
    localStorage.setItem("price",moviePrice)
}



// for reading price of movie from dropdown selected by user and give that price to updateCount function
selectMovie.addEventListener("change",(e)=>{
    ticketPrice=e.target.value
    // function call pass the parameters as index and value/price of movie
    setMovieData(e.target.selectedIndex,e.target.value)
    // function call so on change of movie from dropdown it will be given to update function 
    updateCount()
})

// all seats that are having selected class are stored in variable selectedSeatsbyUser 
function updateCount(){
    let selectedSeatsbyUser=document.querySelectorAll('.container .seat.selected')
    // to store in local storage check the index of the seat selected
    const seatIndex=[...selectedSeatsbyUser].map((seat)=>[...selectSeats].indexOf(seat))   
    localStorage.setItem("selectedSeat",JSON.stringify(seatIndex));
    
    // number of seats selected will be total length of selected seats
    let counting=selectedSeatsbyUser.length;
    count.innerText=counting;
    // price will be selected seats multiplied with price of movie
    total.innerText=counting*ticketPrice;
}

// to store in dropdown on page after refresh you get same movie selected before
// getting selected movie index from local storage
const selectedMovieIndex=localStorage.getItem('movieInd')
if(selectedMovieIndex!==null){
    // .selectedIndex is method which says what was selected 
    selectMovie.selectedIndex=selectedMovieIndex;
    
}
function populate(){
    // get array stored in localstorage by using key 
    const selectedSeats=JSON.parse(localStorage.getItem("selectedSeat"))
    // if array is having items 
    if(selectedSeats!==null && selectedSeats.length>0){
        // take forEach function on selectSeats that is all div with class seat not occupied
        // forEach has three parameters (item,index,array) all index 0,1,2..with pass at parameter index and a is item div's
        selectSeats.forEach((a,index)=>{
            // if array from localStorage that have index of seat selected, matches index of all div with class seat and not occpied
            // -1 means index not found so >d-1 means present at particular index
            if(selectedSeats.indexOf(index)>-1){
                // then to the classlist of item add class named selected
                a.classList.add('selected')
            }
        })
    }
}
// function call -> on page refresh from localstorage selected seats can remain on screen
populate()



// function call so that on refresh whatever price and total seats were present can be loaded
//  as we did localStorage.getItem("movieInd")
updateCount()


