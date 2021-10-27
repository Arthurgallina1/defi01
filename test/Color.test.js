const { assert } = require('chai');

const Color = artifacts.require('Color.sol')

require('chai').use(require('chai-as-promised'))
.should()

contract('Color', (accounts) => {
    describe('Deployment', () => {
        let contract
        before(async () => {
            contract = await Color.deployed()

        })
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
})