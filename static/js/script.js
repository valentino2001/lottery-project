// BSC RPC Provider (Binance Smart Chain Mainnet)
const provider = new ethers.providers.JsonRpcProvider("https://bsc-dataseed.binance.org/");
let signer;
let contract;

// ABI des Smart Contracts
const contractABI = [
    {"inputs":[],"stateMutability":"nonpayable","type":"constructor"},
    {"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_id","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_value","type":"uint256"}],"name":"logshh","type":"event"},
    {"inputs":[],"name":"UsdtInterface","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},
    {"inputs":[],"name":"allWinner","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},
    {"inputs":[],"name":"joinLottery","outputs":[],"stateMutability":"nonpayable","type":"function","inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}]},
    {"inputs":[],"name":"lotteryBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}
];

// Verbindung zu MetaMask herstellen
async function connectWallet() {
    if (window.ethereum) {
        try {
            const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
            await window.ethereum.request({ method: "eth_requestAccounts" });
            signer = web3Provider.getSigner();
            contract = new ethers.Contract(
                "0x22F75DFc8c03a2F8823E8c48ABFFDDb6A06bCfE0", // Contract-Adresse
                contractABI,
                signer
            );
            alert("Wallet connected successfully!");
        } catch (error) {
            console.error("Wallet connection failed:", error);
            alert("Failed to connect wallet.");
        }
    } else {
        alert("Please install MetaMask!");
    }
}

// Funktion zum Kauf eines Tickets
async function buyTicket(ticketPrice) {
    try {
        if (!contract) {
            alert("Please connect your wallet first!");
            return;
        }
        const tx = await contract.joinLottery(ethers.utils.parseEther(ticketPrice));
        await tx.wait();
        alert("Ticket purchased successfully!");
        loadJackpot();
    } catch (error) {
        console.error("Error purchasing ticket:", error);
        alert("Transaction failed. Please try again.");
    }
}

// Jackpot laden und anzeigen
async function loadJackpot() {
    try {
        if (!contract) {
            document.getElementById("jackpot").innerText = "Wallet not connected";
            return;
        }
        const balance = await contract.lotteryBalance();
        document.getElementById("jackpot").innerText = ethers.utils.formatEther(balance) + " BNB";
    } catch (error) {
        console.error("Failed to load jackpot:", error);
    }
}

// Gewinner laden und anzeigen
async function loadWinners() {
    try {
        if (!contract) {
            alert("Please connect your wallet.");
            return;
        }
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

// Initialisierung
async function initialize() {
    if (!window.ethereum) {
        alert("Please install MetaMask!");
        return;
    }
    try {
        await connectWallet();
        loadJackpot();
        loadWinners();
    } catch (error) {
        console.error("Initialization failed:", error);
    }
}

// Seite initialisieren
initialize();
