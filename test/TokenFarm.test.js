const { assert } = require('chai');

const DappToken = artifacts.require("DappToken");
const DaiToken = artifacts.require("DaiToken");
const TokenFarm = artifacts.require("TokenFarm");

require('chai').use(require('chai-as-promised'))
.should()

function tokens(n) {
    return web3.utils.toWei(n, 'ether')
}

contract('TokenFarm', ([owner, investor]) => {
    let daiToken, dappToken, tokenFarm

    before(async () => {
        //will mock the deployment behaviour
        daiToken = await DaiToken.new()
        dappToken = await DappToken.new()
        tokenFarm = await TokenFarm.new(dappToken.address, daiToken.address)

        await dappToken.transfer(tokenFarm.address, tokens('1000000'))
        
        await daiToken.transfer(investor, tokens('1000000'), { from: owner })

    })

    describe('MockDAI deployment', async () => {
        it('has a name', async () => {
            const name = await daiToken.name()
            assert.equal(name, 'Mock DAI Token')
        })
    })

    describe('Dapp Token deployment', async () => {
        it('has a name', async () => {
            const name = await dappToken.name()
            assert.equal(name, 'DApp Token')
        })
    })

    describe('Tolen Farm deployment', async () => {
        it('has a name', async () => {
            const name = await tokenFarm.name()
            assert.equal(name, 'Dapp Token Farm')
        })

        it('contract has tokens', async () => {
            let balance = await dappToken.balanceOf(tokenFarm.address)
            assert.equal(balance.toString(), tokens('1000000'))
        })
    })

    describe('Farming Tokens', async () => {
        it('rewards investors for staking mDai tokens', async () => {
            let result
            //check balance before staking
            result = await daiToken.balanceOf(investor)
            assert.equal(result.toString(), tokens('1000000'), 'Investor mock dai balance not correct')

            //Stake Mock DAI Tokens
            await daiToken.approve(tokenFarm.address, tokens('1000000'), { from: investor })
            await tokenFarm.stakeTokens(tokens('1000000'), { from: investor })

            //Check staking result
            result = await daiToken.balanceOf(investor)
            assert.equal(result.toString(), tokens('0'), 'investor mock dai balance is correct after staking')

            result = await daiToken.balanceOf(tokenFarm.address)
            assert.equal(result.toString(), tokens('1000000'), 'Token farm mock dai balance is correct after staking')
            

            // check is saking status
            result = await tokenFarm.isStaking(investor)
            assert.equal(result.toString(), 'true', 'investor staking status is correct after staking')

            //isues token
            await tokenFarm.issueTokens({ from: owner })

            //ensure balance is correct
            result = await dappToken.balanceOf(investor)
            assert.equal(result.toString(), tokens('1000000'), 'investor DApp Token wallet balance')


            //ensure only owner can issue tokens
            await tokenFarm.issueTokens({ from: investor }).should.be.rejected;

            await tokenFarm.unstakeTokens({ from: investor })
            //results after unstake
            result = await daiToken.balanceOf(investor)
            assert.equal(result.toString(), tokens('1000000'), 'investor mock dai wallet balance is correct')

            result = await daiToken.balanceOf(tokenFarm.address)
            assert.equal(result.toString(), tokens('0'), 'investor mock dai wallet balance is correct')

            result = await tokenFarm.stakingBalance(investor)
            assert.equal(result.toString(), tokens('0'), 'investor mock dai wallet balance is correct')

            result = await tokenFarm.isStaking(investor)
            assert.equal(result.toString(), 'false', 'investor staking status is correct')




        })
    })
})