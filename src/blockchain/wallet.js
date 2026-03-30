export async function connectWallet()
{
    if (!window.ethereum)
    {
        alert("MetaMask not installed")
        return null
    }

    try
    {
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts"
        })

        return accounts[0]
    }
    catch (e)
    {
        console.error(e)
        return null
    }
}

export async function getCurrentAccount()
{
    if (!window.ethereum) return null

    try
    {
        const accounts = await window.ethereum.request({
            method: "eth_accounts"
        })

        return accounts[0] || null
    }
    catch (e)
    {
        console.error(e)
        return null
    }
}

export function shortenAddress(address)
{
    if (!address) return ""
    return address.slice(0, 6) + "..." + address.slice(-4)
}

export async function sendPayment(totalEth, account)
{
    if (!window.ethereum)
    {
        alert("MetaMask not installed")
        return null
    }

    try
    {
        const value = (totalEth * 1e18).toString(16)

        const tx = await window.ethereum.request({
            method: "eth_sendTransaction",
            params: [
                {
                    from: account,
                    to: "0x60CA11079d24066CB81732c7De2b022E4e32b273",
                    value: "0x" + value
                }
            ]
        })

        return tx
    }
    catch (e)
    {
        console.error(e)
        return null
    }
}