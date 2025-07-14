
console.log("jjs running");

async function signup() {
       // Get the username and password values from the input fields
        const username = document.getElementById("signup-username").value;
        const password = document.getElementById("signup-password").value;
        const mobileno = document.getElementById("signup-number").value;

        try {
            // Send a POST request to the signup endpoint with the username and password
            const response = await axios.post("http://localhost:3000/signup", {
            username,
            mobileno,
            password
            
            });
                    
            // Alert the user with the response message from the server
            alert(response.data.message);
             } catch (error) {
                 // Log any errors that occur during the signup process
                    console.error("Error while signing up:", error);
                }
            }
  
  async function signin() {
    const username = document.getElementById("signin-username").value;
    const password = document.getElementById("signin-password").value;
    const mobileno = document.getElementById("signin-number").value;
    


    try {
      const response = await axios.post("http://localhost:3000/signin", {
        username,
        mobileno,
        password
      });
      
      if(response.data.token){
      const token = response.data.token;
      await axios.get("http://localhost:3000/me", {
                        headers: {
                            // Include the token in the request headers for authentication
                            token : localStorage.getItem("token"),
                        },
                    });
     

      // Navigate to protected dashboard
      window.location.href = "/dashboard/index.html";
      }else{
        alert(response.data.message);
      }
    } catch (err) {
      alert("Login failed!");
      console.error(err);
    }
  }
  

