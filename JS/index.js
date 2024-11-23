const passengerSelectedSeats = []

const totalBusSeats = 40;
// update total available seats
document.getElementById('left-seats').innerText = totalBusSeats;
function updateSeats() {
    let availableSeats = 40 - passengerSelectedSeats.length;
    document.getElementById('left-seats').innerText = availableSeats;
    document.getElementById('total-selected-seat').innerText = passengerSelectedSeats.length;
}

const allButton = document.getElementsByClassName("btn-seat");

for (const btn of allButton) {
    btn.addEventListener('click', function (event) {

        const selectedSeat = event.target.innerText;
        // push pop/ splice item in temporary array and set reset seat button background
        if (passengerSelectedSeats.length === 0) {
            passengerSelectedSeats.push(selectedSeat);
            totalPrice();
            updateSeats();
            setBookingList(selectedSeat);
            setBackgroundById(selectedSeat);
            applyCouponBtn(passengerSelectedSeats.length);
        }
        else if (passengerSelectedSeats.includes(selectedSeat)) {
            const index = passengerSelectedSeats.indexOf(selectedSeat);
            passengerSelectedSeats.splice(index, 1);
            totalPrice();
            updateSeats();
            removeBackgroundById(selectedSeat);
            removeItemFromBooking(selectedSeat);
            applyCouponBtn(passengerSelectedSeats.length);
        }
        else if (passengerSelectedSeats.length < 4) {
            passengerSelectedSeats.push(selectedSeat);
            totalPrice();
            updateSeats();
            setBookingList(selectedSeat);
            setBackgroundById(selectedSeat);
            applyCouponBtn(passengerSelectedSeats.length);
        }
        else {
            alert("Sorry! You cant select more than 4 seats.");
        }

    });
}


// set info in booking / checkout section
function setBookingList(seat) {

    const elementContainer = document.getElementById('seat-booking-list-container');
    const ul = document.createElement('ul');
    const li1 = document.createElement('li');
    const li2 = document.createElement('li');
    const li3 = document.createElement('li');

    li1.innerText = seat;
    li2.innerText = 'Economy';
    li3.innerText = '550';

    ul.className = "flex justify-between font-normal text-[#03071299] text-base";
    ul.classList.add(seat);
    li1.className = "flex-1";
    li2.className = "flex-1";
    li3.className = "text-right flex-1";

    ul.appendChild(li1);
    ul.appendChild(li2);
    ul.appendChild(li3);
    elementContainer.appendChild(ul);
}

// remove item from booking/ checkout section after clicking on seat button 
function removeItemFromBooking(selectedSeat) {
    const selectedItems = document.getElementsByClassName(selectedSeat);
    selectedItems[0].parentNode.removeChild(selectedItems[0]);
}

// Total price
function totalPrice() {
    const perSeatPrice = 550;
    const discount = 0;
    // Total Price
    const totalPriceElement = document.getElementById('total-price');
    const totalPrice = passengerSelectedSeats.length * perSeatPrice;
    totalPriceElement.innerText = totalPrice;
    grandTotalPrice(discount, totalPrice);
}
// apply coupon button
function applyCouponBtn(arrLength) {
    const btn = document.getElementById('btn-apply-coupon');
    // Discount element hidden disable
    const discountElement = document.getElementById('discount-element');
    if (arrLength === 4) {
        btn.removeAttribute("disabled");
    } else {
        btn.setAttribute("disabled", true);
        // Discount element hidden
        discountElement.classList.add('hidden');
    }
}

// Apply coupon/ discount price
function applyCoupon(e) {
    const applyBtn = document.getElementById('coupon-input-container');
    if (e) {
        applyBtn.classList.add('hidden');
    }

    const perSeatPrice = 550;
    let discountAmount = 0;

    const totalPrice = passengerSelectedSeats.length * perSeatPrice;
    const couponInputField = document.getElementById('coupon-input');
    const couponInputFieldText = couponInputField.value.trim();
    // Discount element
    const discountElement = document.getElementById('discount-element');
    discountElement.classList.remove('hidden')
    // invalid coupon element
    const invalidCoupon = document.getElementById('invalid-coupon');

    const coupon15 = 'NEW15';
    const coupon20 = "Couple 20";
    if (couponInputFieldText === coupon15) {
        discountAmount = 0.15 * totalPrice;
        invalidCoupon.classList.add('hidden');
    }
    else if (couponInputFieldText === coupon20) {
        discountAmount = 0.20 * totalPrice;
        invalidCoupon.classList.add('hidden');
    }
    else {
        invalidCoupon.classList.remove('hidden');
        discountElement.classList.add('hidden');
        applyBtn.classList.remove('hidden');
    }
    const discountAmountElement = document.getElementById('discount-amount');
    discountAmountElement.innerText = discountAmount;
    grandTotalPrice(discountAmount, totalPrice)
}

// Grand total price
function grandTotalPrice(discount, total) {
    // grand total price
    const grandTotalPriceElement = document.getElementById('grand-total');
    const grandTotalPrice = total - discount;
    grandTotalPriceElement.innerText = grandTotalPrice;
}
// Next Button enable disable

document.getElementById('phone').addEventListener('keyup', function () {

    let phone = document.getElementById('phone').value;
    if (phone != "") {
        document.getElementById('next-btn').removeAttribute("disabled");
    } else {
        document.getElementById('next-btn').setAttribute("disabled", true);
    }
});


document.getElementById('booking-form').addEventListener('submit', function (event) {
    event.preventDefault();
    console.log('clicked')
    // have to create new common function and hove to data pass and collect all data to submit 

});
