// immediately invoked function exression

(function(){
    function Start()
    {
        console.log("app started..")
    }


    window.addEventListener("load",Start);
})();

// contact javascript

// function submitForm(event) {
//     event.preventDefault(); // Prevent form submission

//     // Get form data
//     var firstName = document.getElementById("first-name").value;
//     var lastName = document.getElementById("last-name").value;
//     var contactNumber = document.getElementById("contact-number").value;
//     var email = document.getElementById("email").value;
//     var message = document.getElementById("message").value;

//     // Store form data in localStorage or sessionStorage
//     var formData = {
//         firstName: firstName,
//         lastName: lastName,
//         contactNumber: contactNumber,
//         email: email,
//         message: message
//     };
//     localStorage.setItem("formData", JSON.stringify(formData));

//     // Redirect to index.html
//     window.location.href = "../content/home.ejs";
// }