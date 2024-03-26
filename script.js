const phoneInput = document.querySelector("input[type=tel]");
const addPhoneButton = document.querySelector(".phone-field button");

const phonesEl = document.querySelector(".phones");

const message = document.querySelector("textarea");
const sendLink = document.querySelector(".message a");

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
    phones.push(phone);
    renderPhones();
  }
  phoneInput.value = "";
});

message.addEventListener("keydown", () => updateSmsLink());

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
      updateSmsLink();
    });

    phonesEl.appendChild(phoneEl);
    updateSmsLink();
  });
}

function updateSmsLink() {
  const msg = encodeURI(message.value.trim());
  if (phones.length && msg) sendLink.href = `sms:/open?addresses=${phones.join(",")}&body=${msg}`;
  else sendLink.removeAttribute("href");
}
