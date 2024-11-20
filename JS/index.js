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
            updateSeats();
            setBookingList(selectedSeat);
            setBackgroundById(selectedSeat);
        }
        else if (passengerSelectedSeats.includes(selectedSeat)) {
            const index = passengerSelectedSeats.indexOf(selectedSeat);
            passengerSelectedSeats.splice(index, 1);
            updateSeats();
            // setBookingList(selectedSeat);
            removeBackgroundById(selectedSeat);
            removeListFromBooking(selectedSeat);
        }
        else {
            passengerSelectedSeats.push(selectedSeat);
            updateSeats();
            setBookingList(selectedSeat);
            setBackgroundById(selectedSeat);
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

// remove item from booking/ checkout section after clicking seat button 
function removeListFromBooking(selectedSeat) {
    const selectedItems = document.getElementsByClassName(selectedSeat);
    selectedItems[0].parentNode.removeChild(selectedItems[0]);
}