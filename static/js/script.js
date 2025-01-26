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
const contractABI = [ [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_id","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_value","type":"uint256"}],"name":"logshh","type":"event"},{"inputs":[],"name":"UsdtInterface","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"allWinner","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"allWinner1","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"allWinner2","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"announceLottery","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"announceLottery1","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"announceLottery2","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getLottery1Length","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getLottery2Length","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getLotteryLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"ad","type":"address"}],"name":"howMany","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"initization","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"joinLottery","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"joinLottery1","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"joinLottery2","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"lotteryBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_maxNumbers","type":"uint256"}],"name":"setMaximmNumbers","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_maxNumbers","type":"uint256"}],"name":"setMaximmNumbers1","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_maxNumbers","type":"uint256"}],"name":"setMaximmNumbers2","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_valueInEther","type":"uint256"}],"name":"setTicketPrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_valueInEther","type":"uint256"}],"name":"setTicketPrice1","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_valueInEther","type":"uint256"}],"name":"setTicketPrice2","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startLottery","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"tokenAdress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"viewTicket","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"viewTicket1","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"viewTicket2","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"viewTicketPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"viewTicketPrice1","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"viewTicketPrice2","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"winnerLottery","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"winnerLottery1","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"winnerLottery2","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}] ]; // Füge die ABI des Contracts hier ein
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
