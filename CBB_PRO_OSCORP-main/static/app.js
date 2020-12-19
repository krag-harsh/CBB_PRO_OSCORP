function mainApp() {
  const arrows = document.querySelectorAll(".fa-arrow-right");
  var inputsUser = new Array();
  var counter = 0;
  var json;

  arrows.forEach(arrow => {
    arrow.addEventListener("click", () => {
      const input = arrow.previousElementSibling;
      const parent = arrow.parentElement;
      const nextForm = parent.nextElementSibling;

      //  Check for validation
      if (validateInput(input)) {
        console.log("Okay");
        inputsUser[counter++] = input.value;

        if (nextForm.classList.contains("result")) {
          convertToJSON(inputsUser);

        }

        next_form(parent, nextForm);
        // } else if(){
      } else {
        console.log("in");
        parent.style.animation = "shake 0.5s ease";
      }
      // to remove animation
      parent.addEventListener("animationend", () => {
        parent.style.animation = "";
      });
    });
  });
}

function convertToJSON(inputsUser) {
  json = JSON.parse(
    `{"radius":${inputsUser[0]}, "texture":${inputsUser[1]}, "perimeter":${inputsUser[2]}, "area":${inputsUser[3]}, "concave":${inputsUser[4]}}`
  );
  $.ajax({
    json,
    type:'/POST',
    url: '/process'
  })
  .done(function(data){
    if(data.error){
      console.log("1");
    }
    else{
      console.log("0");
    }
  });
  console.log(JSON.stringify(json));
}
function next_form(parent, nextForm) {
  parent.classList.add("innactive");
  parent.classList.remove("active");
  nextForm.classList.add("active");
}

function validateInput(user) {
  // console.log(user.classList);
  if (user.value == "") {
    error("rgb(189,87,87");
    return false;
  }
  if (
    user.classList.contains("field-one") &&
    (user.value < 6.981 || user.value > 28.11)
  ) {
    error("rgb(189,87,87)");
    return false;
  }
  if (
    user.classList.contains("field-two") &&
    (user.value < 9.71 || user.value > 39.28)
  ) {
    console.log("in");
    error("rgb(189,87,87");
    return false;
  }
  if (
    user.classList.contains("field-three") &&
    (user.value < 43.79 || user.value > 188.5)
  ) {
    error("rgb(189,87,87");
    return false;
  }
  if (
    user.classList.contains("field-four") &&
    (user.value < 143.5 || user.value > 2501.0)
  ) {
    error("rgb(189,87,87");
    return false;
  }
  if (
    user.classList.contains("field-five") &&
    (user.value < 0.0 || user.value > 0.201)
  ) {
    error("rgb(189,87,87");
    return false;
  }
  error("rgb(87,189,130)");
  return true;
}

function error(color) {
  document.body.style.backgroundColor = color;
}

mainApp();
