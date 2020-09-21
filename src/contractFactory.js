const Web3 = require('web3');

function getWeb3() {
    if (window.ethereum) {
        return new Web3(window.ethereum);
    }
}

const contractAbi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "key",
				"type": "address"
			},
			{
				"name": "val",
				"type": "uint256"
			}
		],
		"name": "set",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "key",
				"type": "address"
			}
		],
		"name": "get",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]
const contractAddress = '0x3d236d156e32aa4d83b7df4b060e4e2281f75337'
function getContractInstance(contractAbi, contractAddress) {
	const web3 = getWeb3()
    return new web3.eth.Contract(contractAbi, contractAddress)
}

const testContractInstance = getContractInstance(contractAbi, contractAddress)

export async function get(key) {
	console.log('get val')
	return await testContractInstance.methods.get(key).call();
}

export async function set(key, val) {
	const accounts = await getAccounts();
	return await testContractInstance.methods.set(key, val).send({
		from: accounts[0]
	}).on('transactionHash', function(hash){
		console.log(hash)
		return hash
	})
	.on('confirmation', function(confirmationNumber, receipt){
		console.log(confirmationNumber)
		console.log('receipt', receipt)
	})
	.on('receipt', function(receipt){
		console.log('receipt', receipt)
	})
}


async function getAccounts() {
	const web3 = getWeb3()
	const accounts = await web3.eth.requestAccounts();
	console.log(accounts)
	return accounts
	// console.log(await web3.eth.getAccounts()) this only works if already approved
}

