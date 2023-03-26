const url = "https://dark-puce-dalmatian-sock.cyclic.app/user/login";
// const url = "https://localhost:8080/user/login";
//catching form 
const form = document.getElementById("form");


form.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    let obj = {
        email, password
    }
    // now using the constructor function we will create a new user
    const loginUser = new User(obj);
	console.log("TCL: loginUser", loginUser)

    fetch(url, {
        method: "POST", // or 'PUT'
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(loginUser),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log("Success:", data);
            sessionStorage.setItem("token", data.token);
            if(data.msg != "User not found"){
                document.getElementById("redirecting").innerText = " Login successfull, redirecting to notes page"; 
                setTimeout(() => {
                    window.location.href = "notes.html";
                }, 2000);
            }
            else{
                document.getElementById("redirecting").innerText = " Login Error"; 

            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    console.log(obj);
})

function User(obj) {
    this.email = obj.email;
    this.pass = obj.password;
}
