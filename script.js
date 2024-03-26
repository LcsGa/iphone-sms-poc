const phoneInput = document.querySelector("input[type=tel]");
const addPhoneButton = document.querySelector(".phone-field button");

const phonesEl = document.querySelector(".phones");

const message = document.querySelector("textarea");
const sendButton = document.querySelector(".message button");

let phones = [];

onload = () => {
  phoneInput.focus();
};

phoneInput.addEventListener("keydown", ({ key }) => {
  if (key === "Enter") {
    addPhoneButton.click();
  }
});

addPhoneButton.addEventListener("click", () => {
  const phone = phoneInput.value.trim();
  if (/^\+?\d{4,}$/.test(phone)) {
    phones.push(phoneInput.value);
    renderPhones();
  }
  phoneInput.value = "";
});

sendButton.addEventListener("click", () => {
  const msg = message.value.trim();

  if (phones.length && msg) {
    const newTab = open();

    newTab.location.replace(`sms:/open?addresses=${phones.join(",")}&body=${msg}`);
    newTab.close();
  }
});

function renderPhones() {
  phonesEl.innerHTML = "";

  phones.forEach((phone, i) => {
    const phoneEl = document.createElement("div");
    phoneEl.classList.add("chip", "phone");

    const phoneDisplay = document.createElement("p");
    phoneDisplay.innerText = phone;

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "x";

    phoneEl.append(phoneDisplay, deleteButton);

    phoneEl.addEventListener("click", () => {
      phones = phones.filter((_, _i) => _i !== i);
      renderPhones();
    });

    phonesEl.appendChild(phoneEl);
  });
}
