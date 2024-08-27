const tls = require("tls");
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

// Function to measure the time taken to download the entire response
async function measureDownloadTime(ipAddress, subdomain) {
  return new Promise(resolve => {
    const request = `GET / HTTP/1.1\r\nHost: ${subdomain}\r\nUser-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36\r\nAccept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7\r\nAccept-Encoding: gzip, deflate, br, zstd\r\nAccept-Language: en-US,en;q=0.9,en-GB;q=0.8\r\nDnt: 1\r\nPriority: u=0, i\r\nSec-Ch-Ua: "Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"\r\nSec-Ch-Ua-Mobile: ?0\r\nSec-Ch-Ua-Platform: "macOS"\r\nSec-Fetch-Dest: document\r\nSec-Fetch-Mode: navigate\r\nSec-Fetch-Site: none\r\nSec-Fetch-User: ?1\r\nUpgrade-Insecure-Requests: 1\r\n\r\n`;
    const socket = tls.connect(
      {
        host: ipAddress,
        port: 443,
        servername: subdomain,
      },
      () => {
        socket.write(request);

        let startTime = 0;
        let endTime = 0;

        socket.on("data", data => {
          if (startTime === 0) {
            startTime = performance.now();
          }

          // if chunk ends with 0\r\n\r\n, it's the end of the response
          if (data.toString().endsWith("0\r\n\r\n")) {
            endTime = performance.now();
            const timeTaken = endTime - startTime; // time in milliseconds

            socket.end();
            resolve(timeTaken);
          }
        });

        socket.on("end", () => {
          endTime = performance.now();
          const timeTaken = endTime - startTime; // time in milliseconds
          resolve(timeTaken);
        });

        socket.on("error", error => {
          console.error(`Error connecting to ${ipAddress}:`, error);
          resolve(null);
        });
      }
    );
  });
}

// Main function to generate subdomains, resolve IP addresses, measure download times, and log the results
(async function main() {
  const subdomains = Array.from({ length: 50 }, generateRandomSubdomain);
  const results = [];

  for (const subdomain of subdomains) {
    const ipAddress = await resolveDNS(subdomain);
    if (ipAddress) {
      const timeTaken = await measureDownloadTime(ipAddress, subdomain);
      if (timeTaken !== null) {
        results.push(timeTaken);
      }
    }
  }

  // remove biggest and lowest number
  results.sort((a, b) => a - b).pop();
  results.shift();

  const totalTime = results.reduce((acc, time) => acc + time, 0);
  const averageTime = totalTime / results.length;

  console.log("Download Times:");
  results.forEach((time, index) => {
    console.log(`${subdomains[index]}: ${time.toFixed(2)} ms`);
  });

  console.log(`\nAverage Download Time: ${averageTime.toFixed(2)} ms`);
})();
