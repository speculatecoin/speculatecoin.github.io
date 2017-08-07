$(function() {
        try {
            var Web3 = require('web3');
            var web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/gnLE5gGcjg6g6ForUm0D"));
            var version = web3.version.api;
            var count;

            $.getJSON('https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0x2a749bAc8B1D129038A739fa7cf52d476E9f7845&address=0x2a749bAc8B1D129038A739fa7cf52d476E9f7845&tag=latest&apikey=VZEIQ7N8AJDXPKNWP21HB1BG5WNXEU535R', function (jsonData) {
                count = jsonData.result;
                $('#weresold').html((2100000000000000-count)/100000000);
                
            }.bind(this));

            $.getJSON('https://api.etherscan.io/api?module=contract&action=getabi&address=0x2a749bAc8B1D129038A739fa7cf52d476E9f7845', function (data) {
                var contractABI = "";
                contractABI = JSON.parse(data.result);
                if (contractABI != '') {
                    var MyContract = web3.eth.contract(contractABI);
                    var myContractInstance = MyContract.at('0x2a749bAc8B1D129038A739fa7cf52d476E9f7845');
                    $('#currentprice').html(((myContractInstance.transactions()*100+100)/10000000000).toFixed(8));
                } 
                else {
                    console.log("Error" );
                }            
            }.bind(this));

        } catch (err) { }
});
