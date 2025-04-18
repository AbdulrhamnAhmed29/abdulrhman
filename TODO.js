
let input = document.getElementById("inp");
let btn = document.getElementById("btn1");
let ul = document.getElementById("ul");
// this function is check to disabled btn
btn.classList.add('none');
function check(e) {
    e.preventDefault();
    if (input.value.length < 5 ) {
        btn.classList.add('none');
    }
    else {
        btn.classList.remove('none');
    }
}
input.addEventListener("keyup", check)
// when on click on btn take input.value to list items
btn.addEventListener("click", function () {
  

    // create Element
    let li = document.createElement("li");
    let span = document.createElement("span");
    let value1 = input.value;

    li.textContent = value1;
    input.value = "";
    ul.appendChild(li);
    li.appendChild(span);
    span.innerHTML = '&times';
    span.addEventListener("click", function () {
        ul.removeChild(li);
    })
    li.addEventListener("click", function () {
        li.classList.toggle('line')
        

    })
    btn.classList.add('none');




})


