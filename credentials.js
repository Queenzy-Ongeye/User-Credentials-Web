// connecting web3
const Web3 = require('web3');
const { ethers } = require('ethers')
const web3 = new Web3('https://mainnet.infura.io/v3/4e507a8cdac3475888fe702503fba880');

web3.eth.sendTransaction({ from: '0x6663184b3521bF1896Ba6e1E776AB94c317204B6', value: 5000 });

const itx = new ethers.providers.InfuraProvider(
    'mainnet', // or 'ropsten', 'rinkeby', 'kovan', 'goerli'
    '4e507a8cdac3475888fe702503fba880'
)
const signer = new ethers.Wallet('4e507a8cdac3475888fe702503fba880', itx)
async function getBalance() {
    response = await itx.send('relay_getBalance', [signer.address])
    console.log(`Your current ITX balance is ${response.balance}`)
}
async function callContract() {
    const iface = new ethers.utils.Interface(['function echo(string message)'])
    const data = iface.encodeFunctionData('echo', ['Hello world!'])
    const tx = {
        to: '0x6663184b3521bF1896Ba6e1E776AB94c317204B6',
        data: data,
        gas: '100000',
        schedule: 'fast'
    }
    const signature = await signRequest(tx)
    const relayTransactionHash = await itx.send('relay_sendTransaction', [tx, signature])
    console.log(`ITX relay hash: ${relayTransactionHash}`)
    return relayTransactionHash
}
const wait = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

async function waitTransaction(relayTransactionHash) {
    let mined = false

    while (!mined) {
        const statusResponse = await itx.send('relay_getTransactionStatus', [relayTransactionHash])

        if (statusResponse.broadcasts) {
            for (let i = 0; i < statusResponse.broadcasts.length; i++) {
                const bc = statusResponse.broadcasts[i]
                const receipt = await itx.getTransactionReceipt(bc.ethTxHash)
                if (receipt && receipt.confirmations && receipt.confirmations > 1) {
                    mined = true
                    return receipt
                }
            }
        }
        await wait(1000)
    }
}