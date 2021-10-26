pragma solidity >=0.5.0;

import './DaiToken.sol';
import './DappToken.sol';


contract TokenFarm {

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
    }

    // 1 Stakes Tokens (Deposit) - From investor to this smart contract
    function stakeTokens(uint _amount) public {
        //transfer mock dai tokens to this contract
        daiToken.transferFrom(msg.sender, address(this), _amount);

        //update staking balance
        stakingBalance[msg.sender] = stakingBalance[msg.sender] +  _amount;

        //add users to stake array
        if(!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }

        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;

    }

    // 2 Unstaking (Withdraw)

    // 3 Issuign Tokens


    
}
