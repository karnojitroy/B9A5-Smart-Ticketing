// get element byb id
function getAnyElementById(id){
    const element = document.getElementById(id);
    // return element;
    return element
}

// set Green background when select a seat
function setBackgroundById(elementId){
    const element = document.getElementById(elementId);
    element.classList.remove('bg-[#F7F8F8]');
    element.classList.add('bg-[#1DD100]');
    // console.log(element);
}
// remove/ reset seat background if passenger click double
function removeBackgroundById(elementId){
    const element = document.getElementById(elementId);
    element.classList.remove('bg-[#1DD100]]');
    element.classList.add('bg-[#F7F8F8]');
    // console.log(element);
}