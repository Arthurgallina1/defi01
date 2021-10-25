pragma solidity >=0.5.0;

import './DaiToken.sol';
import './DappToken.sol';


contract TokenFarm {

    string public name = 'Dapp Token Farm';
    DappToken public dappToken; //smart contract as type
    DaiToken public daiToken;

    //recebe os endereços dos outros contratos
    constructor(DappToken _dappToken, DaiToken _daiToken) public {
        dappToken = _dappToken;
        daiToken = _daiToken;
    }


    
}
