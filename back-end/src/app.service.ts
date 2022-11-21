import { Injectable } from '@nestjs/common';
import { BigNumber, ethers } from 'ethers';
import * as tokenJson from './assets/MyToken2.json';

export class RequestTokensDto {
  address: string;
  amount: number;
}

@Injectable()
export class AppService {
  provider: ethers.providers.BaseProvider;
  erc20Contract: ethers.Contract;
  signer: any;

  constructor() {
    this.provider = new ethers.providers.AlchemyProvider('goerli', process.env.ALCHEMY_API_KEY);
    const wallet = ethers.Wallet.fromMnemonic(process.env.MNEMONIC);
    this.signer = wallet.connect(this.provider);
    const erc20ContractFactory = new ethers.ContractFactory(
      tokenJson.abi, 
      tokenJson.bytecode,
      this.signer
    )
    this.erc20Contract = erc20ContractFactory.attach(process.env.ERC20_VOTES_ADDRESS);
  }

  async requestTokens(address: string, amount: number) {
    // Mints tokens for { address } in the { amount } requested
    const mintAmount = ethers.utils.parseEther(amount.toString());
    const mintTx = await this.erc20Contract['mint'](address, mintAmount, {gasLimit: 5000000});
    // returns the transaction result <Promise>
    return mintTx.wait(); 
  }

  getTokenAddress() {
    return process.env.ERC20_VOTES_ADDRESS;
  }
}
