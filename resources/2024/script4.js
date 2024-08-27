const tls = require("tls");
const dns = require("dns").promises;
const crypto = require("crypto");
const { performance } = require("perf_hooks");

// Function to generate a random subdomain
function generateRandomSubdomain() {
  return `google.com`;
  //   return "fb5c-109-243-130-182.ngrok-free.app";
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

// Function to measure the time taken to send a GET request over TLS
async function measureTLSRequestTime(ipAddress, subdomain) {
  return new Promise(resolve => {
    const request = `GET /1 HTTP/1.1\nHost: ${subdomain}\nUser-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36\nAccept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7\nAccept-Encoding: gzip, deflate, br, zstd\nAccept-Language: en-US,en;q=0.9,en-GB;q=0.8\nDnt: 1\nPriority: u=0, i\nSec-Ch-Ua: "Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"\nSec-Ch-Ua-Mobile: ?0\nSec-Ch-Ua-Platform: "macOS"\nSec-Fetch-Dest: document\nSec-Fetch-Mode: navigate\nSec-Fetch-Site: none\nSec-Fetch-User: ?1\nUpgrade-Insecure-Requests: 1\r\n\r\n`;
    const socket = tls.connect(
      {
        host: ipAddress,
        port: 443,
        servername: subdomain,
      },
      () => {
        const startTime = performance.now();

        socket.write(request, () => {
          const endTime = performance.now();
          const timeTaken = endTime - startTime; // time in milliseconds
          socket.end();
          resolve(timeTaken);
        });

        // socket.on("data", data => {
        //   console.log(data.toString());
        // });

        socket.on("error", error => {
          console.error(`Error connecting to ${ipAddress}:`, error);
          resolve(null);
        });
      }
    );
  });
}

// Main function to generate subdomains, resolve IP addresses, measure TLS request times, and log the results
(async function main() {
  const subdomains = Array.from({ length: 50 }, generateRandomSubdomain);
  const results = [];

  for (const subdomain of subdomains) {
    const ipAddress = await resolveDNS(subdomain);
    if (ipAddress) {
      const timeTaken = await measureTLSRequestTime(ipAddress, subdomain);
      if (timeTaken !== null) {
        results.push(timeTaken);
      }
    }
  }

  const totalTime = results.reduce((acc, time) => acc + time, 0);
  const averageTime = totalTime / results.length;

  console.log("TLS Request Times:");
  results.forEach((time, index) => {
    console.log(`${subdomains[index]}: ${time.toFixed(2)} ms`);
  });

  console.log(`\nAverage TLS Request Time: ${averageTime.toFixed(2)} ms`);
})();
