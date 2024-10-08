"use client"

import React, { useEffect, useState } from 'react';
import { AptosWalletAdapterProvider, useWallet } from '@aptos-labs/wallet-adapter-react';
import { WalletSelector } from '@aptos-labs/wallet-adapter-ant-design';

import '@aptos-labs/wallet-adapter-ant-design/dist/index.css';


const ConnectWallet = () => {
  const { account, connected, disconnect, error } = useWallet();
  useEffect(() => {
    if (error) {
      console.error('Wallet connection error:', error);
    }
  }, [error]);

  return (
    <div className="insert-x-0 top-8 w-full">
      <div className="mx-auto w-full max-w-screen-xl px-2.5 lg:px-20 relative">
        <div className="flex item-center justify-center">
          <nav>
            <ul className="flex flex-row space-x-6 p-4">
              <li>
                <div>
                  {!connected ? (
                    <WalletSelector />
                  ) : (
                    <div>
                      <p>Connected account: {account?.address}</p>
                      <button onClick={disconnect} className="text-red-500">
                        Disconnect
                      </button>
                    </div>
                  )}
                </div>
              </li>
              {error && (
                <li>
                  <p className="text-red-500">{error.message}</p>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};


const App = () => {
  return (
    <AptosWalletAdapterProvider>
      <ConnectWallet />
    </AptosWalletAdapterProvider>
  );
};

export default App;