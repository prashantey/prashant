const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(event.target);

  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(response => {
    if (response.ok) {
      Swal.fire({
        title: "Success!",
        text: "Message sent Successfully!",
        icon: "success"
      });
      form.reset();
    } else {
      response.json().then(data => {
        if (Object.hasOwnProperty(data, 'errors')) {
          showErrorMsg(data["errors"].map(error => error["message"]).join(", "));
        } else {
          Swal.fire({
            title: "Oops..!",
            text: "There was a problem sending your message",
            icon: "error"
          });
        }
      });
    }
  })
  .catch(error => {
    console.error("Error sending message:", error);
    Swal.fire({
      title: "Oops..!",
      text: "There was a problem sending your message. Please try again later.",
      icon: "error"
    });
  });
});