

#### TO CREATE PERSONLE SIGNE MESSAGE USE  JsonRpcProvider or call send directly on provider
const jsonRpcProvider = new ethers.providers.JsonRpcProvider();
const mySign = await jsonRpcProvider.send('personal_sign', [hash, owner.address]);
console.log('mySign: ', mySign);

#### TO SEND TOKENS FROM A CONTRACT YOU NEED TO APPROVE FROM THE CONTRACT ITSELF
  function sendToken(uint256 amt) public {
    address from = msg.sender;
    console.log("from amt: ", amt / 10**18);
    uint256 balance = _token.balanceOf(address(this));
    console.log("balance: ", balance / 10**18);
    console.log("address(this): ", address(this));

    _token.approve(address(this), amt);
    _token.transferFrom(address(this), from, amt);
  }

##### TOKEN APPROVE AND ALLOWANCE EXAMPLE
  it('should send  a token from owner to addr1', async () => {
    //   SEND FROM OWNER TO ADDR1
    const amt = parseEther('10');
    //     approve
    /**
     * with approve you can add allowance to an adddress
     */
    let approveTx = await monyo.connect(owner).approve(addr1.address, amt);
    let approveRcpt = await approveTx.wait();

    let allowance = await monyo.allowance(owner.address, addr1.address);
    console.log('owner allowance: ', formatEther(allowance));

    /** REMEMBER FOR TRANSFER METHOD
     * but to use added allowance check the caller which is calling this transfer methods
     * in this case if a caller is owner and you added allownance for addr1.address
     * then it will reduce the allowance from callers added allowance for this addr1.address
     */

    /** Here For allowance caller is important
     * allowance get deducted from callers allowance
     */
    let transferFromTx = await monyo.connect(owner).transfer(addr1.address, amt);
    let transferFromRcpt = await transferFromTx.wait();

    let addr1Balance = await monyo.balanceOf(addr1.address);
    let ownerBalance = await monyo.balanceOf(owner.address);
    console.log('ownerBalance: ', formatEther(ownerBalance));
    console.log('addr1Balance: ', formatEther(addr1Balance));

    //   SEND FROM OWNER TO ADDR1
    //     const amt = parseEther('10');
    //     //     approve
    approveTx = await monyo.connect(addr1).approve(owner.address, amt);
    approveRcpt = await approveTx.wait();

    allowance = await monyo.allowance(addr1.address, owner.address);
    console.log('addr1 allowance: ', formatEther(allowance));

    /** REMEMBER FOR TRANSFER_FROM METHOD
     * you added approve for owner here .
     * then you should call from owner
     * this transferFrom method will transfer addr1.address to owner.address
     * if the addr1 approved the for owner
     */

    transferFromTx = await monyo.connect(owner).transferFrom(addr1.address, owner.address, amt);
    transferFromRcpt = await transferFromTx.wait();

    addr1Balance = await monyo.balanceOf(addr1.address);
    ownerBalance = await monyo.balanceOf(owner.address);
    console.log('ownerBalance: ', formatEther(ownerBalance));
    console.log('addr1Balance: ', formatEther(addr1Balance));
  });
