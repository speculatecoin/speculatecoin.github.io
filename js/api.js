$(function() {
        try {
            var Web3 = require('web3');
            var web3 = new Web3(new Web3.providers.HttpProvider("https://pub-node1.etherscan.io:8545"));
            var version = web3.version.api;
            var count;

            $.getJSON('https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0x2c39f92294f436c956f12dcd801a3181e77f8851&address=0x2c39f92294f436c956f12dcd801a3181e77f8851&tag=latest&apikey=VZEIQ7N8AJDXPKNWP21HB1BG5WNXEU535R', function (jsonData) {
                count = jsonData.result;
                $('#weresold').html((2100000000000000-count).toFixed(8));
                
            }.bind(this));

            $.getJSON('https://api.etherscan.io/api?module=contract&action=getabi&address=0x2c39F92294F436c956F12dCd801a3181e77F8851', function (data) {
                var contractABI = "";
                contractABI = JSON.parse(data.result);
                if (contractABI != '') {
                    var MyContract = web3.eth.contract(contractABI);
                    var myContractInstance = MyContract.at('0x2c39F92294F436c956F12dCd801a3181e77F8851');
                    $('#currentprice').html(((myContractInstance.transactions()*100+100)/10000000000).toFixed(8));
                } 
                else {
                    console.log("Error" );
                }            
            }.bind(this));

        } catch (err) { }
});
