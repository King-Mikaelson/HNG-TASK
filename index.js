// index.js
const http = require("http");
const url = require("url");
const axios = require("axios");

// Function to make a GET request with query parameters using axios
// async function makeApiCall(queryParams) {
//   const response = await axios.get("http://api.example.com/endpoint", {
//     // Replace with your API's URL
//     params: queryParams,
//   });
//   return response.data;
// }

// Create a server object
const server = http.createServer((req, res) => {
  if (req.url.startsWith("/api")) {
    // const queryParams = url.parse(req.url, true).query;
    // Get the client's IP address

    try {
      const queryParams = url.parse(req.url, true).query;
      const queryParams1 = queryParams.query; // Get query parameters
      const pathName = queryParams.pathname; // Get path
      const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
      console.log(queryParams, queryParams1, pathName);
      //   const apiResponse = await makeApiCall(queryParams);
      //   res.writeHead(200, { "Content-Type": "application/json" });
      //   res.end(JSON.stringify(apiResponse));
      // Set the response header
      res.writeHead(200, { "Content-Type": "text/plain" });
      // Write some text to the response
      res.end(`Welcome to ${ip},`);
    } catch (error) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Error calling API");
    }
  } else {
    // Set the response header
    // Write some text to the response
    const queryParams = url.parse(req.url, true).query;
    const queryParams1 = queryParams.query; // Get query parameters
    const pathName = queryParams.pathname; // Get path
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    console.log(queryParams, queryParams1, pathName);
    res.writeHead(200, { "Content-Type": "text/plain" });
    // Write some text to the response
    res.end(`Welcome to ${ip},`);
  }
});

// Define the port to listen on
const port = 3000;

// Start the server
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
