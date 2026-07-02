require('dotenv').config();
const express = require('express');
const os = require('os');
const app = express();
const port = process.env.PORT || 3001;
const host = '0.0.0.0';

function getLocalNetworkIp() {
  const interfaces = os.networkInterfaces();

  for (const addresses of Object.values(interfaces)) {
    for (const address of addresses || []) {
      if (address.family === 'IPv4' && !address.internal) {
        return address.address;
      }
    }
  }

  return null;
}

console.log ("--------- Env Vars ---------");
console.log (process.env);
console.log ("---------/Env Vars ---------");

app.listen(port, host, () => {
  const networkIp = getLocalNetworkIp();

  console.log(`Server is listening on port ${port}`);
  console.log(`Local URL: http://localhost:${port}`);
  if (networkIp) {
    console.log(`Network URL: http://${networkIp}:${port}`);
  } else {
    console.log('Network URL: unavailable - no local network IP found');
  }
});
