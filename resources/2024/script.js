const dns = require("dns").promises;
const crypto = require("crypto");

// Function to generate a random subdomain
function generateRandomSubdomain() {
  return `${crypto.randomBytes(3).toString("hex")}.freshworks.com`;
}

// Function to resolve DNS records and measure time taken
async function resolveDNS(subdomain) {
  const startTime = process.hrtime();
  try {
    await dns.resolveAny(subdomain);
    const endTime = process.hrtime(startTime);
    const timeTaken = endTime[0] * 1000 + endTime[1] / 1000000; // convert to milliseconds
    return timeTaken;
  } catch (error) {
    console.error(`Error resolving ${subdomain}:`, error);
    return null;
  }
}

// Main function to generate subdomains, resolve DNS, and log the times
(async function main() {
  const subdomains = Array.from({ length: 100 }, generateRandomSubdomain);
  const results = [];

  for (const subdomain of subdomains) {
    const timeTaken = await resolveDNS(subdomain);
    if (timeTaken !== null) {
      results.push(timeTaken);
    }
  }

  const totalTime = results.reduce((acc, time) => acc + time, 0);
  const averageTime = totalTime / results.length;

  console.log("DNS Resolution Times:");
  results.forEach((time, index) => {
    console.log(`${subdomains[index]}: ${time.toFixed(2)} ms`);
  });

  console.log(`\nAverage DNS Resolution Time: ${averageTime.toFixed(2)} ms`);
})();
