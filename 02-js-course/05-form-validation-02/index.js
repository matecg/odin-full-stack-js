(function () {
    const form = document.querySelector("form");
    const email = document.querySelector("#email");
    const country = document.querySelector("#country");
    const postal = document.querySelector("#postal");
    const pass = document.querySelector("#password");
    const confPass = document.querySelector("pass-confirm");

    
})()

function addErrorMessage(msgData) {
    const {id, msg} = msgData;
    const errorsList = document.querySelector(".errors");
    const errorItem = document.createElement('li');
    errorItem.textContent = msg;
    errorItem.dataset.id = id;
    errorItem.classList.add('error');
    errorsList.appendChild(errorItem);
}

function removeErrorMessage(id) {
    const errorsList = document.querySelector(".errors");
    let children = [...errorsList.childNodes];
    const toRemove = children.find(child => {
        if (child.dataset)
            return child.dataset.id === `${id}`;
        return false;
    });
    errorsList.removeChild(toRemove);
}