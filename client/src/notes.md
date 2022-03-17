# BASIC WEB3.js METHODS TO INTERACT
	    await ethereum.request({ method: "eth_requestAccounts" });
            // WEB 3 WORKFLOW
            const web3 = new Web3(ethereum);
            // to get the accounts
            let accounts = await web3.eth.getAccounts();
            web3.eth.defaultAccount = accounts[0];

            // to get the balance
            const balance = await web3.eth.getBalance(accounts[0]);
            // console.log("balance: ", balance);

            // to get gas price
            // web3.eth.getGasPrice((err, gas) => {
            //     console.log("gas  price: ", gas);
            // });

            // to get the block
            let block = await web3.eth.getBlock(555);
            // console.log("block: ", block);

            // to get the block trans count
            let blockTransCount = await web3.eth.getBlockTransactionCount(555);
            // console.log("blockTransCount: ", blockTransCount);

            // to get the minor work
            // let minerWork = await web3.eth.getWork();
            // console.log("minerWork: ", minerWork);

            // to get the chain id
            // let chainId = await web3.eth.getChainId();
            // console.log("chainId: ", chainId);

            // set new  contract

            // const myContract = new web3.eth.Contract({ name: SimpleStorage.contractName, inputs: SimpleStorage.abi });

            const networkId = await web3.eth.net.getId();
            // console.log("networkId: ", networkId);
            const deployedNetwork = SimpleStorage.networks[networkId];
            // console.log("deployedNetwork: ", deployedNetwork);

            const myContract = new web3.eth.Contract(SimpleStorage.abi as AbiItem[], deployedNetwork.address);
            console.log("deployedNetwork.address: ", deployedNetwork.address);
            // to  deploy a new contract
            // let newContract = myContract.deploy({ data: SimpleStorage.bytecode, arguments: [] });
            // let deployedContract = await newContract
            //     .send({
            //         from: accounts[0],
            //         gas: 1500000,
            //         gasPrice: "30000000000000",
            //     })
            //     .on("error", (err) => {
            //         console.log("err: ", err);
            //     })
            //     .on("transactionHash", (hash) => {
            //         console.log("hash: ", hash);
            //     });
            // console.log("deployedContract: ", deployedContract);
            // console.log("myContract: ", myContract.options);

            // CALLING METHODS
            // call the method to get state
            // let data = await myContract.methods.get().call({ from: accounts[0] });
            // console.log("data: ", data);

            if (false) {
                // // SEND THE METHOD TO CHANGE STATE
                // let result = myContract.methods
                //     .set(100)
                //     .send({ from: accounts[0] })
                //     .on("sent", function (payload) {
                //         console.log("payload: ", payload);
                //     })
                //     .on("confirmation", function (confirmationNumber, receipt) {
                //         console.log("confirmation receipt: ", receipt);
                //     });
                // // console.log("result: ", result);
                // // let updatedData = await myContract.methods.get().call({ from: accounts[0] });
                // // console.log("updatedData: ", updatedData);
                // // A SINGLE EVENT
                // myContract.once("Log", { filter: { data: ["80", "90"] } }, (err, event) => {
                //     // console.log("event: Log ", event["returnValues"]);
                // });
                // //  ALL EVENT
                // myContract.events.allEvents((err, event) => {
                //     // console.log("all event: Log ", event["returnValues"]);
                // });
                // //  ALL PAST EVENT
                // let allPastEvents = await myContract.getPastEvents("allEvents");
                // console.log("allPastEvents: ", allPastEvents);
            }

            // ESITIMATE GASS

            // let gasEstimate = await myContract.methods.get().estimateGas({ from: accounts[0] });
            // console.log("gasEstimate: ", gasEstimate);

            // to create account
            // let createdAccount = web3.eth.accounts.create();
            // console.log("createdAccount: ", createdAccount);





# ETHERS.js WORKFLOW ------------------------------------------------------------
            const etherProvider = new ethers.providers.Web3Provider(ethereum);
            // console.log("etherProvider: ", etherProvider);
            let accounts = await etherProvider.send("eth_requestAccounts", []);
            console.log("accounts: ", accounts);

            const contractAddress = SimpleStorage.networks["5777"].address;
            console.log("contractAddress: ", contractAddress);

            // signed is required to interact with contract for writing
            const signer = etherProvider.getSigner();

            // CONNECT TO CONTRACT with signer
            const myContract = new ethers.Contract(contractAddress, SimpleStorage.abi, signer);
            console.log("myContract: ", myContract);
            // const signedContract = myContract.connect(signer);

            // get logs of block from range
            // const logs = await etherProvider.getLogs({ fromBlock: 500, toBlock: 600 });
            // console.log("logs: ", logs);

            if (false) {
                // TO READ A VALUE FROM METHOD
                let data = await myContract.get();
                console.log("data: ", data.toNumber());
                // logger
                // let logger = new ethers.utils.Logger("1.0");
                // logger.info("cool man");

                // TO CALL WRITE METHOD
                // let writeData = await myContract.set(111);
                // console.log("writeData: ", writeData);
                // TO WAIT TILL TRANS COMPLETE
                // let waitTranscaction = await etherProvider.waitForTransaction(writeData.hash);
                // console.log("waitTranscaction: ", waitTranscaction);

                // EMITE AFTER TRANS COMPLETE
                // etherProvider.once(writeData.hash, async (transaction) => {
                //     console.log("transaction: ", transaction);
                //     data = await myContract.get();
                //     console.log(" updated data: ", data.toNumber());
                // });

                // INDIVIDUAL LOG EVENT
                // myContract.on("Log", async (from, to, amount, event) => {
                //     // console.log("from, to, amount, event: ");
                //     let data = {
                //         from,
                //         to,
                //         amount,
                //         event,
                //     };

                // console.log("data: ", data);
                // data = await myContract.get();
                // console.log(" updated data: ", data.toNumber());
                // });
            }

            // // GET BALANCE
            // const balance = await etherProvider.getBalance(accounts[0]);
            // console.log("balance: ", balance);
            // // FORMATE BALANCE IN READABLE
            // let formated = ethers.utils.formatEther(balance);
            // console.log("formated: ", formated);

            // GET BLOCK NUMBER
            // const blockNumber = await etherProvider.getBlockNumber();
            // console.log("blockNumber: ", blockNumber);

            // GET SIGNER
            // const signer = etherProvider.getSigner();
            // console.log("signer: ", signer);
