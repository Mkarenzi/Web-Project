
const login = (e) => {

    if (e.username == '') {
        console.log("Error")
        document.getElementsByClassName('email_lbl')[0].innerHTML = "Email is Required"
    } else {
        document.getElementsByClassName('email_lbl')[0].innerHTML = ""
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:9092/api/auth/login", true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({
            username: e.username,
            password: e.password
        }));
        xhr.onload = function () {
            var data = JSON.parse(this.responseText);
            if (!data.error) {
                alert(data.message);
                window.localStorage.setItem('user', JSON.stringify(data));
                window.location.href = "/Dash.html"
            } else {
                alert(data.error)
            }
        }
    }


}
const signup = (e) => {
    if (e.password !== e.cpassword) {
        alert("Password don't match");
        return;
    }
    delete e.cpassword;

    if (e.username == '') {
        console.log("Error")
    } else {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:9092/api/auth/register", true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(e));
        xhr.onload = function () {
            var data = JSON.parse(this.responseText);
            if (!data.error) {
                alert(data.message);
                window.location.href = "/index.html"
            } else {
                alert(data.error);
            }
        }
    }


}
