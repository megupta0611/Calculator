// URL of your API Gateway endpoint
const apiUrl = "https://kkzkv08n79.execute-api.us-east-1.amazonaws.com/prod/factorial";

// Select form and result elements
const form = document.getElementById("factorialForm");
const resultDiv = document.getElementById("result");

// Add event listener to handle form submission
form.addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevent the page from reloading

  // Get the input value
  const numberInput = document.getElementById("numberInput").value;

  // Clear any previous result
  resultDiv.innerHTML = "";

  // Validate input
  if (numberInput === "" || isNaN(numberInput) || numberInput < 0) {
    resultDiv.innerHTML = `<span style="color: red;">Please enter a valid non-negative number!</span>`;
    return;
  }

  // Send the number to the API
  try {
    // Make the POST request
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ number: parseInt(numberInput) }), // API expects JSON payload
    });

    // Check if the response is okay
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    // Parse the JSON response
    const data = await response.json();

    // Display the factorial result
    if (data.result !== undefined) {
      resultDiv.innerHTML = `<span>Factorial of ${numberInput} is: <strong>${data.result}</strong></span>`;
    } else {
      resultDiv.innerHTML = `<span style="color: red;">Error: ${data.error || "Unknown error occurred."}</span>`;
    }
  } catch (error) {
    // Handle any errors
    resultDiv.innerHTML = `<span style="color: red;">Error: ${error.message}</span>`;
  }
});
