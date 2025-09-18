export const validateAlphaNumericInput = (input) => {
    return /^([A-Za-zñÑáÁéÉíÍóÓúÚ0-9]+[ ]?)+$/.test(input);
};

export const validateAlphabeticInput = (input) => {
    return /^([A-Za-zñÑáÁéÉíÍóÓúÚ]+[ ]?)+$/.test(input);
};

export const validateNumericInput = (input) => {
    return /^[0-9]+$/.test(input);
};

export const validateEmailInput = (input) => {
    return /^([A-Za-z0-9\-_]+\.?)+@[A-Za-z0-9]+\.([A-Za-z]+\.?)+$/.test(input);
};

export const validatePhoneInput = (input) => {
    const intInput = parseInt(input);
    return /^[0-9]+$/.test(input) && intInput >= 3000000000 && intInput < 3519999999;
};

export const validateBirthday = (input) => {
    const valueEntered = new Date(input).getTime();
    const currentDate = new Date().getTime();
    return currentDate - valueEntered >= 568025140000;
};

export const validateMoneyInput = (input) => {
    return /^[1-9]+[0-9]+$/.test(input);
};

export const validatePasswordInput = (input) => {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(input);
};

export const validateNonEmptyInput = (input) => {
    return /^.+$/gm.test(input);
};

export const validateUrlInput = (input) => {
    return /^http[s]?:\/\/[(www.)?a-zA-Z0-9@:%._+~#=-]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/gm.test(
        input
    );
};

export const validateUrlListInput = (input) => {
    return /^(http[s]?:\/\/[(www.)?a-zA-Z0-9@:%._+~#=-]{2,256}\.[a-z]{2,6};?)*$/gm.test(input);
};