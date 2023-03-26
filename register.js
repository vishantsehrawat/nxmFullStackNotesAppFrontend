const url = "https://dark-puce-dalmatian-sock.cyclic.app/user/register";
// const url = "https://localhost:8080/user/register";

//catching form 
const form = document.getElementById("form");


form.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    let obj = {
        email, password, name, age
    }
    // now using the constructor function we will create a new user
    const newUser = new User(obj);
    console.log("TCL: obj", obj)

    fetch(url, {
        method: "POST", // or 'PUT'
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
    }).then((response) => response.json())
        .then((data) => {
            console.log("Success:", data);
            document.getElementById("redirecting").innerText = " Registration successfull, redirecting to login page"; 
            setTimeout(() => {
                window.location.href = "login.html";
            }, 3000);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
})

function User(obj) {
    this.email = obj.email;
    this.pass = obj.password;
    this.name = obj.name;
    this.age = obj.age;
}
