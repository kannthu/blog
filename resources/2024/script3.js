const net = require("net");
const dns = require("dns").promises;
const crypto = require("crypto");

// Function to generate a random subdomain
function generateRandomSubdomain() {
  return `${crypto.randomBytes(3).toString("hex")}.wordpress.com`;
}

// Function to resolve DNS to get the IP address
async function resolveDNS(subdomain) {
  try {
    const addresses = await dns.resolve(subdomain);
    return addresses[0];
  } catch (error) {
    console.error(`Error resolving DNS for ${subdomain}:`, error);
    return null;
  }
}

// Function to measure the time taken to establish a TCP connection
async function measureTCPConnectionTime(ipAddress) {
  return new Promise(resolve => {
    const startTime = process.hrtime();
    const socket = net.connect(80, ipAddress, () => {
      const endTime = process.hrtime(startTime);
      const timeTaken = endTime[0] * 1000 + endTime[1] / 1000000; // convert to milliseconds
      socket.end();
      resolve(timeTaken);
    });

    socket.on("error", error => {
      console.error(`Error connecting to ${ipAddress}:`, error);
      resolve(null);
    });
  });
}

// Main function to generate subdomains, resolve IP addresses, measure TCP connection times, and log the results
(async function main() {
  const subdomains = Array.from({ length: 50 }, generateRandomSubdomain);
  const results = [];

  for (const subdomain of subdomains) {
    const ipAddress = await resolveDNS(subdomain);
    if (ipAddress) {
      const timeTaken = await measureTCPConnectionTime(ipAddress);
      if (timeTaken !== null) {
        results.push(timeTaken);
      }
    }
  }

  const totalTime = results.reduce((acc, time) => acc + time, 0);
  const averageTime = totalTime / results.length;

  console.log("TCP Connection Times:");
  results.forEach((time, index) => {
    console.log(`${subdomains[index]}: ${time.toFixed(2)} ms`);
  });

  console.log(`\nAverage TCP Connection Time: ${averageTime.toFixed(2)} ms`);
})();
