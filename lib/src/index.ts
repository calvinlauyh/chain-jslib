import Big from 'big.js';
import { Coin } from './coin/coin';
import { KeyPair } from './keypair/keypair';
import utils from './utils';

// The maximum number of decimal places of the results of operations involving division
// By default it is 20. Here we explicitly set it to 20 for correctness.
Big.DP = 20;

export default {
    utils,

    Coin,
    KeyPair,
};
