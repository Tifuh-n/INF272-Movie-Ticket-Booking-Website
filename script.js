// Name: Tifuh Nche
// Student number: u21653268

//------------------------------Array of movie objects------------------------------------------
let movies = [
    {
        id: 0,
        title: "Spider-Man: No Way Home",
        director: "Jon Watts",
        runtime: "2h 28m",
        release_year: 2021,
        description: "With Spider-Man's identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear, forcing Peter to discover what it truly means to be Spider-Man",
        poster_url:"images/SpiderManNWH.jpg",
        cinema_number: 1,
        ticket_price: 124,
        tickets_in_cart:0
    },
    {
        id: 1,
        title: "The Great Gatsby",
        director: "Baz Luhrmann",
        runtime: "2h 23m",
        release_year: 2013,
        description: "A writer and wall street trader, Nick, finds himself drawn to the past and lifestyle of his millionaire neighbor, Jay Gatsby.",
        poster_url: "images/GreatGatsby.jpg",
        cinema_number: 2,
        ticket_price: 90,
        tickets_in_cart:0
    },
    {
        id: 2,
        title: "Midsommar",
        director: "Ari Aster",
        runtime: "2h 28m",
        release_year: 2019,
        description: "A couple travels to Northern Europe to visit a rural hometown's fabled Swedish mid-summer festival. What begins as an idyllic retreat quickly devolves into an increasingly violent and bizarre competition at the hands of a pagan cult.",
        poster_url: "images/Midsommar.jpg",
        cinema_number: 3,
        ticket_price: 100,
        tickets_in_cart:0
    },
    {
        id: 3,
        title: "The Hunger Games: Catching Fire",
        director: "Francis Lawrence",
        runtime: "2h 26m",
        release_year: 2013,
        description: "Katniss Everdeen and Peeta Mellark become targets of the Capitol after their victory in the 74th Hunger Games sparks a rebellion in the Districts of Panem.",
        poster_url: "images/HungerGamesCF.jpg",
        cinema_number: 4,
        ticket_price: 138,
        tickets_in_cart: 0
    }
];


//------------------------------Home Page functions------------------------------------------

//When the page loads
window.onload = function () {

    //Making sure that even when page is reloaded the cart number in local storage is persistent
    var cartNum = localStorage.getItem("numberInCart");
    cartNum = parseInt(cartNum);

    if(cartNum){
        document.getElementById("numItems").innerHTML = cartNum; //Will always display what is in the local storage for cart num
    }

    var textMovies = "";

    // Format and Display all available movies from the array
    for(var index = 0; index < movies.length; index++)
    {
        textMovies += '<div class="col mb-4">' +
                    '<div class="card h-100">' +
                    '<div class="card-header">Cinema <span id="cinemaNum">' + movies[index].cinema_number +
                    '</span></div>' +
                    '<img src="' + movies[index].poster_url +
                    '" class="card-img-top">' +
                    '<div class="card-body">' +
                    '<h6 class="card-title font-weight-bold" id="movieTitle">' + movies[index].title +
                    '</h6> <p class="card-text" id="movieDescription">' + movies[index].description +
                    '</p></div><h5 class="text-right m-2">R<span id="moviePrice">' + movies[index].ticket_price + 
                    ',00</span></h5>' +
                    '<div class="card-footer">';

        textMovies += `<button type="button" class="btn btn-outline-primary btn-sm detailsButton" id="details` + movies[index].id + `" data-toggle="modal" data-target="#modalCheck">Show Details</button> ` +
                    `<button type="button" class="btn btn-success btn-sm bookingButton" id="booking` + movies[index].id + `">BOOK TICKET</button>` +
                    `</div></div></div>`;
    }

    document.getElementById("movieSelection").innerHTML = textMovies;


    // Show details button
    $(".detailsButton").click(function(){
        var idDataInfo = $(this).attr("id");
        var checkIDInfo;
        for(var index = 0; index < movies.length; index++)
        {
            checkIDInfo = movies[index].id;

            //Regular expression to extract number from id
            var idInfoText = idDataInfo.match(/\d/);

            //check if number matches movie id in the array
            if(checkIDInfo == idInfoText)
            {
                //Putting the information into a modal
                document.getElementById("modalMovie").innerHTML = movies[index].title;
                document.getElementById("modalMovieTitle").innerHTML = movies[index].title;
                document.getElementById("modalDirector").innerHTML = movies[index].director;
                document.getElementById("modalYear").innerHTML = movies[index].release_year;
                document.getElementById("modalRuntime").innerHTML = movies[index].runtime;
            }
        }
    });

    // Book ticket button
    $(".bookingButton").click(function(){
        
        var idDataBooking = $(this).attr("id");
        var checkIDBooking;
        for(var index = 0; index < movies.length; index++)
        {
            checkIDBooking = movies[index].id;

            //Regular expression to extract number from id
            var idBookingText = idDataBooking.match(/\d/);

            //check if number matches movie id in the array
            if(checkIDBooking == idBookingText)
            {
                //Calling the increment cart number function
                incrementCartNum();

                // Calling the Add movie to shopping cart function
                addMovieToCart(movies[index]);

                //Calling the total price function
                totalPrice(movies[index]);

            }
        }
    });
};
//When cart page loads
if(document.getElementById("cartTable"))
{
    showCart();
}

// Helper functions
//Add the movie object to the shopping cart in local storage when book ticket button is pressed
function addMovieToCart(movie){
    var cartItems = localStorage.getItem("moviesInCart");
    //Convert it from JSON format to Javascript format
    cartItems = JSON.parse(cartItems);

    if(cartItems != null) //There is something in local storage already
    {
        if(cartItems[movie.id] == undefined) //When this particular item is not in the cart
        {
            //JS spread operator
            cartItems = {
                ...cartItems,
                [movie.id]: movie
            }
        }
        cartItems[movie.id].tickets_in_cart += 1; //Increment tickets in cart value
    }
    else 
    {
        movie.tickets_in_cart = 1; 
        cartItems = {[movie.id]: movie};
    }

    localStorage.setItem("moviesInCart", JSON.stringify(cartItems));
}

//Increment cart number when book ticket button is pressed (tickets in the cart)
function incrementCartNum(){
    var cartNum = localStorage.getItem("numberInCart");
    cartNum = parseInt(cartNum);

    if(cartNum)
    {
        localStorage.setItem("numberInCart", cartNum + 1);
        document.getElementById("numItems").innerHTML = cartNum + 1;
    }
    else
    {
        localStorage.setItem("numberInCart", 1);
        document.getElementById("numItems").innerHTML = 1;
    }
}

//Calculate total cost and put it in local storage
function totalPrice(movie)
{
    //console.log("the product price is ", movie.ticket_price);
    var total = localStorage.getItem("totalCost");
    
    if(total != null) //There is something already in local storage
    {
        //Convert the total to an integer
        total = parseInt(total);
        localStorage.setItem("totalCost", total + movie.ticket_price);
    }
    else
    {
        localStorage.setItem("totalCost",  movie.ticket_price);
    }
}

//------------------------------Cart Page functions------------------------------------------

// Displaying items in cart 
function showCart()
{
    var cartItems = localStorage.getItem("moviesInCart");
    //Convert it from JSON format to Javascript object format
    cartItems = JSON.parse(cartItems);

    //Get number in cart
    var cartNum = localStorage.getItem("numberInCart");
    cartNum = parseInt(cartNum);

    var textCart = "";

    if(cartItems)
    {
        // Making sure the products in local storage are displayed in the table
        Object.values(cartItems).map(ticket => {
            textCart += `<tr>
                            <td>
                                <span id="delete" onclick="deleteItem(${ticket.id})"><i class="fa fa-times-circle text-danger fa-lg"></i></span>
                                <span>${ticket.title}</span>
                            </td>
                            <td>
                                <span>${ticket.ticket_price}</span>
                            </td>
                            <td>
                                <span id="decrement" onclick="decrementQuantity(${ticket.id})"><i class="fa fa-arrow-circle-left text-info fa-lg"></i></span>
                                <span id="itemQuantity">${ticket.tickets_in_cart}</span>
                                <span id="increment" onclick="incrementQuantity(${ticket.id})"><i class="fa fa-arrow-circle-right text-info fa-lg"></i></span>
                            </td>
                            <td>
                                R<span id="totalItemCost">${ticket.tickets_in_cart * ticket.ticket_price}</span>,00
                            </td>
                        </tr>`;
        });
        document.getElementById("cartTable").innerHTML = textCart;
        var textTotal = `<tr>
                        <td></td><td></td>
                        <td><b>Total:</b></td>
                        <td class="text-danger">R<span id="totalPrice">0</span>,00</td>
                        </tr>`;
        document.getElementById("cartFooter").innerHTML = textTotal;
        document.getElementById("totalPrice").innerHTML = localStorage.getItem("totalCost");
    } 

    //Displaying message when there are no movies in your cart
    if(cartItems === null || Object.keys(cartItems).length === 0)
    {
        var textTotal = `<tr>
                        <td><h3>No Movies In your Cart</h3></td>
                        </tr>`;
        document.getElementById("cartFooter").innerHTML = textTotal;
    }
}


//Delete item function
function deleteItem(movId)
{
    var cartItems = localStorage.getItem("moviesInCart");
    //Convert it from JSON format to Javascript object format
    cartItems = JSON.parse(cartItems);

    var cartNum = localStorage.getItem("numberInCart");
    cartNum = parseInt(cartNum);
    //Minus the amount of that specific item from cart
    localStorage.setItem("numberInCart", cartNum - cartItems[movId].tickets_in_cart);

    //Display amount in the nav bar
    document.getElementById("numItems").innerHTML = cartNum - cartItems[movId].tickets_in_cart;

    //setting new total cost
    var cartTotalPrice = localStorage.getItem("totalCost");
    cartTotalPrice = parseInt(cartTotalPrice);
    localStorage.setItem("totalCost", cartTotalPrice - (cartItems[movId].ticket_price * cartItems[movId].tickets_in_cart));

    delete cartItems[movId]; //delete the item from local storage
    localStorage.setItem("moviesInCart", JSON.stringify(cartItems));
    showCart();
}

//Increment quantity function
function incrementQuantity(movId)
{
    var cartItems = localStorage.getItem("moviesInCart");
    //Convert it from JSON format to Javascript object format
    cartItems = JSON.parse(cartItems);

    var cartNum = localStorage.getItem("numberInCart");
    cartNum = parseInt(cartNum);
    //Add one
    localStorage.setItem("numberInCart", cartNum + 1);

    //Display amount in the nav bar
    document.getElementById("numItems").innerHTML = cartNum + 1;

    //setting new total cost
    var cartTotalPrice = localStorage.getItem("totalCost");
    cartTotalPrice = parseInt(cartTotalPrice);
    localStorage.setItem("totalCost", cartTotalPrice + cartItems[movId].ticket_price);

    cartItems[movId].tickets_in_cart += 1;
    localStorage.setItem("moviesInCart", JSON.stringify(cartItems));
    showCart();
}

//Decrement quantity function
function decrementQuantity(movId)
{
    var cartItems = localStorage.getItem("moviesInCart");
    //Convert it from JSON format to Javascript object format
    cartItems = JSON.parse(cartItems);

    if(cartItems[movId].tickets_in_cart == 0) //Delete when there are no tickets in the cart
    {
        deleteItem(movId);
    }
    else
    {
        var cartNum = localStorage.getItem("numberInCart");
        cartNum = parseInt(cartNum);
        //Minus one item from cart
        localStorage.setItem("numberInCart", cartNum - 1);

        //Display amount in the nav bar
        document.getElementById("numItems").innerHTML = cartNum - 1;

        //setting new total cost
        var cartTotalPrice = localStorage.getItem("totalCost");
        cartTotalPrice = parseInt(cartTotalPrice);
        localStorage.setItem("totalCost", cartTotalPrice - cartItems[movId].ticket_price);

        cartItems[movId].tickets_in_cart -= 1;

        localStorage.setItem("moviesInCart", JSON.stringify(cartItems));
        showCart();
    }
    
}

