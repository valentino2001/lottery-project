// BSC RPC Provider (Binance Smart Chain Mainnet)
const provider = new ethers.providers.JsonRpcProvider("https://bsc-dataseed.binance.org/");
let signer;

// Verbindung zu MetaMask herstellen
if (window.ethereum) {
    const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
    await window.ethereum.request({ method: "eth_requestAccounts" });
    signer = web3Provider.getSigner();
} else {
    alert("Please install MetaMask!");
}

// Contract Details
const contractAddress = "0x22F75DFc8c03a2F8823E8c48ABFFDDb6A06bCfE0";
const contractABI = [ /* ABI einfügen */ ]; // Füge die ABI des Contracts hier ein
const contract = new ethers.Contract(contractAddress, contractABI, signer);

// Funktionen
async function buyTicket(price, ticketType) {
    try {
        const tx = await contract[`joinLottery${ticketType}`](ethers.utils.parseEther(price.toString()));
        await tx.wait();
        alert("Ticket successfully purchased!");
    } catch (error) {
        console.error(error);
        alert("Transaction failed. Please try again.");
    }
}

async function loadJackpot() {
    try {
        const balance = await contract.lotteryBalance();
        document.getElementById("jackpot").innerText = ethers.utils.formatEther(balance) + " BNB";
    } catch (error) {
        console.error("Failed to load jackpot:", error);
    }
}

async function loadWinners() {
    try {
        const winners = await contract.allWinner();
        const winnerList = document.getElementById("winner-list");
        winnerList.innerHTML = "";

        if (winners.length === 0) {
            winnerList.innerHTML = "<li>No winners yet.</li>";
        } else {
            winners.forEach((winner) => {
                const li = document.createElement("li");
                li.textContent = winner;
                winnerList.appendChild(li);
            });
        }
    } catch (error) {
        console.error("Failed to load winners:", error);
    }
}

// Daten laden
loadJackpot();
loadWinners();
