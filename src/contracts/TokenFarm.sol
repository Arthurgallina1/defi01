pragma solidity >=0.5.0;

import './DaiToken.sol';
import './DappToken.sol';


contract TokenFarm {

    address public owner;
    string public name = 'Dapp Token Farm';
    DappToken public dappToken; //smart contract as type
    DaiToken public daiToken;

    //keeps track of all addres that staked
    address[] public stakers;

    mapping(address => uint) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    //recebe os endereços dos outros contratos
    constructor(DappToken _dappToken, DaiToken _daiToken) public {
        dappToken = _dappToken;
        daiToken = _daiToken;
        owner = msg.sender;
    }

    // 1 Stakes Tokens (Deposit) - From investor to this smart contract
    function stakeTokens(uint _amount) public {
        require(_amount > 0, 'amount can be 0');

        //transfer mock dai tokens to this contract
        daiToken.transferFrom(msg.sender, address(this), _amount);

        //update staking balance
        stakingBalance[msg.sender] = stakingBalance[msg.sender] +  _amount;

        if(!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }

        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;

    }

    // 2 Unstaking (Withdraw)
    function unstakeTokens() public {
        uint balance = stakingBalance[msg.sender];

        require(balance > 0, 'no amount to be withdraw');
        daiToken.transfer(msg.sender, balance);

        stakingBalance[msg.sender] = 0; //reset staking

        isStaking[msg.sender] = false;
    }

    // 3 Issuign Tokens
    function issueTokens() public {
        require(msg.sender == owner, 'caller not allowed');
        // for every person who has staked in the app gets it back
        for(uint i = 0; i < stakers.length ; i ++) {
            address recipient = stakers[i];
            uint balance = stakingBalance[recipient];
            if(balance > 0) {
                dappToken.transfer(recipient, balance);
            }
        }
    }

    
}
