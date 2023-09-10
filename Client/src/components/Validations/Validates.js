
export function validname(text) {
    const regex = RegExp(/^[a-zA-Z ]{2,30}$/);
    return !regex.test(text);
}

export function validregno(text) {
    const regex = RegExp(/^[A-Z0-9 ]{5,10}$/);
    return !regex.test(text);
}

export function validEmail(text) {
    const regex = RegExp(
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    );

    return !regex.test(text);
}

export function validpassword(text) {
    const regex = RegExp(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,15}$/);

    return !regex.test(text);
}

export function validphone(num){
    const regex = RegExp(/^[0-9]{10}$/);

    return !regex.test(num);
}

export function validcpassword(
    password,
    confirmpassword,
    Errors
) {
    Errors = Errors || {};
    if (password !== confirmpassword) {
        Errors.cpassword =
            'Confirmed password is not matching with password';
        return true;
    } else {
        delete Errors.cpassword;
        return false;
    }
}

export function validValidUpto(issueDate, validUpto, Errors) {
    Errors = Errors || {};
    if (issueDate >= validUpto) {
        Errors.validUpto =
            'Invalid Date.';
        return true;
    } else {
        delete Errors.validUpto;
        return false;
    }
}

export function validdob(birth) {
    const birthyear = new Date(birth).getFullYear();
    const currentyear = new Date().getFullYear();
    const age = currentyear - birthyear + 1;
    return !(age >= 18);
}

export function validisssueDate(date){
    const datenow = new Date();
    const issueDate = new Date(date);
    return !(issueDate < datenow);
}



