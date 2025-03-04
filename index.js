// index.js
const http = require("http");
const url = require("url");
const axios = require("axios");

// Function to make a GET request with query parameters using axios
async function makeApiCall(queryParams) {
  const url = `http://api.weatherapi.com/v1/forecast.json?key=ccfebbb910404ae5bc5101334240107&q=${queryParams}&days=1&aqi=no&alerts=no`;
  const response = await axios.get(url);
  return response.data;
}

// Create a server object
const server = http.createServer(async (req, res) => {
  if (req.url.startsWith("/api/hello")) {
    try {
      const queryParams = url.parse(req.url, true).query;
      const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
      const apiResponse = await makeApiCall(ip);
      res.writeHead(200, { "Content-Type": "application/json" });
      const data = {
        client_ip: ip, // The IP address of the requester
        location: apiResponse.location.region, // The city of the requester
        greeting: `Hello, ${
          queryParams.visitor_name
            ? queryParams.visitor_name
            : "Enter your name with params ?visitor_name=your_name"
        }!, the temperature is ${
          apiResponse.current.temp_c
        } degrees Celcius in ${apiResponse.location.region}`,
      };

      res.end(JSON.stringify(data));
    } catch (error) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Error calling API");
    }
  } else {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Welcome to my simple Node.js app!");
  }
});

// Define the port to listen on
const port = 3000;

// Start the server
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
