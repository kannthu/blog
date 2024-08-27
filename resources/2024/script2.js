const tls = require("tls");
const dns = require("dns").promises;
const crypto = require("crypto");

// Function to generate a random subdomain
function generateRandomSubdomain() {
  return `${crypto.randomBytes(5).toString("hex")}.wildcard.moczadlo.com`; // freshworks.com
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
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

// Function to measure the time taken for a TLS handshake
async function measureTLSHandshakeTime(ipAddress, subdomain) {
  return new Promise(resolve => {
    const startTime = process.hrtime();
    const socket = tls.connect(
      {
        host: ipAddress,
        port: 443,
        servername: subdomain,
      },
      () => {
        const endTime = process.hrtime(startTime);
        const timeTaken = endTime[0] * 1000 + endTime[1] / 1000000; // convert to milliseconds
        socket.end();
        resolve(timeTaken);
      }
    );

    socket.on("error", error => {
      console.error(`Error connecting to ${subdomain}:`, error);
      resolve(null);
    });
  });
}

// Main function to generate subdomains, measure TLS handshake times, and log the results
(async function main() {
  const subdomains = Array.from({ length: 50 }, generateRandomSubdomain);
  const results = [];

  for (const subdomain of subdomains) {
    const ipAddress = await resolveDNS(subdomain);
    if (ipAddress) {
      const timeTaken = await measureTLSHandshakeTime(ipAddress, subdomain);
      if (timeTaken !== null) {
        results.push(timeTaken);
      }
    }
  }

  const totalTime = results.reduce((acc, time) => acc + time, 0);
  const averageTime = totalTime / results.length;

  console.log("TLS Handshake Times:");
  results.forEach((time, index) => {
    console.log(`${subdomains[index]}: ${time.toFixed(2)} ms`);
  });

  console.log(`\nAverage TLS Handshake Time: ${averageTime.toFixed(2)} ms`);
})();
