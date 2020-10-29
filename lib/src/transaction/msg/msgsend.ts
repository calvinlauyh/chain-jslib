import ow from 'ow';
import { Msg } from '../../cosmos/v1beta1/types/msg';
import { Message } from './Message';
import { Coin } from '../../coin/coin';
import { Network } from '../../network/network';

export class MsgSend implements Message {
    private readonly fromAddress: string;

    private readonly toAddress: string;

    private value: Coin;

    // TODO : In the future, network will be picked from a top level configuration object
    private network: Network;

    /**
     * Constructor to create a new MsgSend
     * @param {MsgSendOptions} options
     * @returns {MsgSend}
     * @throws {Error} when options is invalid
     */
    constructor(options: MsgSendOptions) {
        ow(options.fromAddress, ow.string);
        ow(options.toAddress, ow.string);

        this.fromAddress = options.fromAddress;
        this.toAddress = options.toAddress;
        this.value = options.amount;
        this.network = options.network;
    }

    /**
     * Returns the raw Msg representation of MsgSend
     * @returns {Msg}
     */
    toRawMsg(): Msg {
        const cosmosCoin = this.value.toCosmosCoin(this.network);
        return {
            typeUrl: '/cosmos.bank.v1beta1.MsgSend',
            value: {
                fromAddress: this.fromAddress,
                toAddress: this.toAddress,
                amount: [
                    {
                        denom: cosmosCoin.denom,
                        amount: cosmosCoin.amount,
                    },
                ],
            },
        };
    }
}

export type MsgSendOptions = {
    fromAddress: string;
    toAddress: string;
    amount: Coin;
    network: Network;
};
