// Lets try to connect to the blockchain
if (typeof window.ethereum !== 'undefined') {
    console.log('Metamask is installed');
}

let web3;
let contract;
let contractAddress = 'YOUR_CONTRACT_ADDRESS_HERE'; // Smart Contract Address will go here!
let account;

/* The Smart Contract ABI will be needed - declare it as an array */
const abi = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "color",
                "type": "string"
            }
        ],
        "name": "logColorChange",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

async function init() {
    // Ensure the user has MetaMask installed and is logged in
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    web3 = new Web3(window.ethereum); // Corrected the capitalization of 'Web3'
    account = await web3.eth.getAccounts();

    contract = new web3.eth.Contract(abi, contractAddress); // Corrected 'Contracts' to 'Contract'
}

async function changeColor() {
    const colors = ['red', 'green', 'yellow', 'orange', 'purple', 'blue'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    document.body.style.backgroundColor = randomColor;

    document.getElementById('colorName').textContent = `Current Color: ${randomColor}`;

    // Ensure the contract is properly defined before calling its methods
    if (contract) {
        await contract.methods.logColorChange(randomColor).send({ from: account[0] });
    } else {
        console.error("Contract is not defined. Ensure you have initialized it correctly.");
    }
}

document.getElementById('colorChangeButton').addEventListener('click', changeColor);

// Initialize the application
init().catch(console.error);
