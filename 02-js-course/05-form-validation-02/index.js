(function () {
    const form = document.querySelector("form");
    const email = document.querySelector("#email");
    const country = document.querySelector("#country");
    const postal = document.querySelector("#postal");
    const pass = document.querySelector("#password");
    const confPass = document.querySelector("pass-confirm");
    const emailValidations = [
        {
            name: "typeMismatch",
            msg: "Entered values must be an email address."
        },
        {
            name: "valueMissing",
            msg: "Please provide an email to continue."
        },
        {
            name: "tooShort",
            msg: "The email provided is too short."
        }];

    email.addEventListener('input', () => {
        const source = "email";
        emailValidations.forEach((validation) => {
            const { name, msg } = validation;
            if (email.validity[name]) {
                if (getErrorMessage(source, name) !== null) return;
                const errMsg = new ErrorMessage(msg,
                    source, name
                );
                addErrorMessage(errMsg);
            } else {
                removeErrorMessage(source, name);
            }
        })
    })
})()

class ErrorMessage {
    constructor(msg, source, type) {
        this.msg = msg;
        this.source = source;
        this.type = type;
    }
}

function addErrorMessage(msgData) {
    const { msg, source, type } = msgData;
    const errorsList = document.querySelector(".errors");
    const errorItem = document.createElement('li');
    errorItem.textContent = msg;
    errorItem.dataset.source = source;
    errorItem.dataset.type = type;
    errorItem.classList.add('error');
    errorsList.appendChild(errorItem);
}

function removeErrorMessage(source, type) {
    const errorsList = document.querySelector(".errors");
    const toRemove = getErrorMessage(source, type);
    if (!toRemove) return;
    errorsList.removeChild(toRemove);
}

function getErrorMessage(source, type) {
    const errorList = document.querySelector(".errors");
    let children = [...errorList.children];
    let child = children.find((child) => {
        if (child.dataset)
            return child.dataset.source === source && child.dataset.type === type;
        return false;
    });
    child = child === undefined ? null : child;
    return child;
}