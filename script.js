var localStorageKeyName = "employeeTable";

function ValidateForm() {
    let errorMessage = "";
    let form = document.getElementById("employeeForm");
    let name = form["name"];
    let email = form["email"];
    let mobile = form["mobile"];
    let nameRegex = RegExp(/^[a-zA-Z ]*$/);
    let emailRegex = RegExp(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    );
    let mobileNoRegex = RegExp(/^[0-9]{10}$/);
    if (name.value == "") {
        errorMessage += "Name can not be empty\r\n";
    } else if (!nameRegex.test(name.value)) {
        errorMessage += "Name can be characters only\r\n";
    }
    if (email.value == "") {
        errorMessage += "Email can not be empty\r\n";
    } else if (!emailRegex.test(email.value)) {
        errorMessage += "Please input valid Email\r\n";
    }
    if (mobile.value != "" && !mobileNoRegex.test(mobile.value)) {
        errorMessage += "Mobile Number should be of 10 digits";
    }
    if (errorMessage.length > 0) {
        alert(errorMessage);
        return false;
    }
    SaveDataToLocalStorage(name.value, email.value, mobile.value);
    return true;
}

function SaveDataToLocalStorage(name, email, mobile) {
    if (localStorage.getItem(localStorageKeyName)) {
        let data = JSON.parse(localStorage.getItem(localStorageKeyName));
        data.push({ name: name, email: email, mobile: mobile });
        localStorage.setItem(localStorageKeyName, JSON.stringify(data));
    } else {
        let data = [{ name: name, email: email, mobile: mobile }];
        localStorage.setItem(localStorageKeyName, JSON.stringify(data));
    }
}

function GetFromLocalStorage() {
    return JSON.parse(localStorage.getItem(localStorageKeyName));
}

(function () {
    setTimeout(() => {
        $("#bootstrapTable").bootstrapTable({
            data: GetFromLocalStorage()
        });
    }, 500);

})();
