const http = require("https");
const dns = require("dns").promises;
const crypto = require("crypto");
const { performance } = require("perf_hooks");

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

// Function to measure the full request time
async function measureFullRequestTime(subdomain) {
  return new Promise(resolve => {
    const options = {
      hostname: subdomain,
      port: 443,
      path: "/",
      method: "GET",
    };

    const startTime = performance.now();

    const req = http.request(options, res => {
      res.on("data", () => {
        // Consume data
      });

      res.on("end", () => {
        const endTime = performance.now();
        const timeTaken = endTime - startTime; // time in milliseconds
        resolve(timeTaken);
      });
    });

    req.on("error", error => {
      console.error(`Error making request to ${ipAddress}:`, error);
      resolve(null);
    });

    req.end();
  });
}

// Main function to generate subdomains, resolve IP addresses, measure request times, and log the results
(async function main() {
  const subdomains = Array.from({ length: 50 }, generateRandomSubdomain);
  const results = [];

  for (const subdomain of subdomains) {
    const timeTaken = await measureFullRequestTime(subdomain);
    if (timeTaken !== null) {
      results.push(timeTaken);
    }
  }

  const totalTime = results.reduce((acc, time) => acc + time, 0);
  const averageTime = totalTime / results.length;

  console.log("Full Request Times:");
  results.forEach((time, index) => {
    console.log(`${subdomains[index]}: ${time.toFixed(2)} ms`);
  });

  console.log(`\nAverage Full Request Time: ${averageTime.toFixed(2)} ms`);
})();
