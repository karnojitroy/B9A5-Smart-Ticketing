const totalBusSeats = 40;
// Store the information of clicked seats
const passengerSelectedSeats = [];

// Default available seats
getAnyElementById('left-seats').innerText = totalBusSeats;
// update available seats and total selected seats after clicking
function updateAvailableSelectedSeats() {
    getAnyElementById('left-seats').innerText = 40 - passengerSelectedSeats.length;
    getAnyElementById('total-selected-seat').innerText = passengerSelectedSeats.length;
}

const allSeatBtns = document.getElementsByClassName('btn-seat');
for (const btn of allSeatBtns) {
    btn.addEventListener('click', function (event) {
        const selectedSeat = event.target.innerText;
        // if array length 0/ null then push the item to array/ booking list and it will be show as selected
        if (passengerSelectedSeats.length === 0) {
            passengerSelectedSeats.push(selectedSeat);
            setBackgroundById(selectedSeat);
            updateAvailableSelectedSeats();
            setBookingList(selectedSeat);
            totalPrice();
            applyCouponBtn(passengerSelectedSeats.length);
        }
        // if the item already pushed/selected and try to push it again then it will be pop/ remove from the booking list and it will be deselected
        else if (passengerSelectedSeats.includes(selectedSeat)) {
            const index = passengerSelectedSeats.indexOf(selectedSeat);
            passengerSelectedSeats.splice(index, 1);
            removeBackgroundById(selectedSeat);
            updateAvailableSelectedSeats();
            removeItemFromBooking(selectedSeat);
            totalPrice()
            applyCouponBtn(passengerSelectedSeats.length);
        }
        // The passenger can not select more than 4 seats
        else if (passengerSelectedSeats.length < 4) {
            passengerSelectedSeats.push(selectedSeat);
            setBackgroundById(selectedSeat);
            updateAvailableSelectedSeats();
            setBookingList(selectedSeat);
            totalPrice();
            applyCouponBtn(passengerSelectedSeats.length);
        }
        else {
            alert('Sorry! You can not book more than 4 seats.')
        }

    });
}

// set info in booking / checkout section
function setBookingList(seat) {

    const elementContainer = getAnyElementById('seat-booking-list-container');
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
    const totalPrice = passengerSelectedSeats.length * perSeatPrice;
    getAnyElementById('total-price').innerText = totalPrice;
    grandTotalPrice(discount, totalPrice);
}

// Grand total price
function grandTotalPrice(discount, total) {
    const grandTotalPrice = total - discount;
    getAnyElementById('grand-total').innerText = grandTotalPrice;
}
// apply coupon button enable disable
function applyCouponBtn(arrayLength) {
    const btn = getAnyElementById('btn-apply-coupon');
    if (arrayLength === 4) {
        btn.removeAttribute('disabled');
    }
    else {
        btn.setAttribute('disabled', true);
    }
}
// Apply coupon/ discount price
function applyCoupon(e) {
    // hide the input field and apply button when valid coupon will be applied
    const applyBtn = getAnyElementById('coupon-input-container');
    if (e) {
        applyBtn.classList.add('hidden');
    }
    else {
        applyBtn.classList.remove('hidden');
    }

    const perSeatPrice = 550;
    let discountAmount = 0;

    const totalPrice = passengerSelectedSeats.length * perSeatPrice;
    const couponInputField = getAnyElementById('coupon-input');
    const couponInputFieldText = couponInputField.value.trim();
    // Discount element
    const discountElement = getAnyElementById('discount-element');
    discountElement.classList.remove('hidden')
    // invalid coupon element
    const invalidCouponElement = getAnyElementById('invalid-coupon');

    const coupon15 = 'NEW15';
    const coupon20 = "Couple 20";
    if (couponInputFieldText === coupon15) {
        discountAmount = 0.15 * totalPrice;
        invalidCouponElement.classList.add('hidden');
    }
    else if (couponInputFieldText === coupon20) {
        discountAmount = 0.20 * totalPrice;
        invalidCouponElement.classList.add('hidden');
    }
    else {
        invalidCouponElement.classList.remove('hidden');
        discountElement.classList.add('hidden');
        applyBtn.classList.remove('hidden');
    }

    const discountAmountElement = getAnyElementById('discount-amount');
    discountAmountElement.innerText = discountAmount;
    grandTotalPrice(discountAmount, totalPrice)
}
// Next Button enable disable
getAnyElementById('phone').addEventListener('keyup', function () {
    const name = getAnyElementById('fname').value;
    let phone = getAnyElementById('phone').value;
    let email = getAnyElementById('email').value;
    if (phone != "") {
        bookingInfo(name, phone, email)
        getAnyElementById('next-btn').removeAttribute("disabled");
    } else {
        getAnyElementById('next-btn').setAttribute("disabled", true);
    }
});

function bookingInfo(name, phone, email) {
    // submit the info/ click on next button to book the seats
    getAnyElementById('booking-form').addEventListener('submit', function (event) {
        event.preventDefault();
        if (passengerSelectedSeats.length === 0) {
            alert('You have not selected any seats!!')
        }
        else if (event && phone && name) {
            console.log(event)
            console.log(phone)
            console.log(email)
            console.log('clicked')

            getAnyElementById('success_modal').showModal();
            getAnyElementById('next-btn').setAttribute("disabled", true);
        }
        else {
            alert('Submit failed');

        }
    });
}

