function mainApp() {
  const arrows = document.querySelectorAll(".fa-arrow-right");
  const resultDiv = document.querySelector(".label-text .result");
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

        if (nextForm.classList.contains("field-name6")) {
          convertToJSON(inputsUser, nextForm);
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

function convertToJSON(inputsUser, nextForm) {
  json = JSON.stringify(
    `{"radius":${inputsUser[0]}, "texture":${inputsUser[1]}, "perimeter":${inputsUser[2]}, "area":${inputsUser[3]}, "concave":${inputsUser[4]}}`
  );
  console.log(json);
  fetch("/hello", {
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST",
    body: json
  })
    .then(function(response) {
      return response.text();
    })
    .then(function(text) {
      console.log("POST response : ");
      console.log(text);
      if (text == 1.0) {
        console.log("abcd");
        nextForm.innerHTML += `<h3 class="label-text result" style="left: 15%" ;>
        Malignant Cancer
        <span class="tooltip" style="top: -120px" ;>Malignant tumor, also known as cancerous cells, on the other hand, have the property of metastasis i.e. they spread rapidly to other parts of the body. They can occur anywhere in the body and can even be carried by the blood or lymphatic system. They often require intense treatment such as surgery, radiation, chemotherapy and immunotherapy. 
They may recur after removal, sometimes in areas other the original site</span>
      </h3>`;
      } else if (text == 0.0) {
        nextForm.innerHTML = `<h3 class="label-text result" style="left: 15%" ;>
        Benign Cancer
        <span class="tooltip" style="top: -120px" ;>Benign tumor also known as non cancerous cells don't spread to other areas of the body, a property known as metastasis. Thus, these tumors are less worrisome unless they pressing on nearby tissues, nerves, blood vessels or on the vital organs blocking channels. They can be removed by surgery and are unlikely to reoccur after removal.
</span>
      </h3>`;
      }
    });
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
