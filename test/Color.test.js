const { assert } = require('chai');

const Color = artifacts.require('Color.sol')

require('chai').use(require('chai-as-promised'))
.should()

contract('Color', (accounts) => {
    let contract
    before(async () => {
        contract = await Color.deployed()

    })

    describe('Deployment', () => {
        
        it('It deploys succesfully', async () => {
            const address = contract.address
            assert.notEqual(address, '')
            assert.notEqual(address, 0x0)
            assert.notEqual(address, undefined)
            assert.notEqual(address, null)
        })

        it('has a name', async () => {
            const name = await contract.name()
            const symbol = await contract.symbol()
            assert.equal(name, 'Color')
            assert.equal(symbol, 'COLOR')
        })
    })

    describe('minting', async () => {

        it('creates a new token', async () => {
            const result = await contract.mint('#EC058E')
            const totalSupply = await contract.totalSupply();

            assert.equal(totalSupply, 1)
            // console.log(result)
            const event = result.logs[0].args
            assert.equal(event.tokenId.toNumber(), 1, 'id is correct')
            assert.equal(event.from, '0x0000000000000000000000000000000000000000', 'from is correct')
            assert.equal(event.to, accounts[0], 'to is correct')

        })
    })
    
})