"use client"


import React, { useState } from 'react';
import { Search, ShoppingCart, User } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const Header = () => (
  <header className="bg-gray-800 text-white p-4">
    <div className="container mx-auto flex justify-between items-center">
      <h1 className="text-2xl font-bold">Web3 Marketplace</h1>
      <div className="flex items-center space-x-4">
        <Search className="cursor-pointer" />
        <ShoppingCart className="cursor-pointer" />
        <User className="cursor-pointer" />
      </div>
    </div>
  </header>
);

const NFTCard = ({ id, title, price, image, onBuy }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <img src={image} alt={title} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-600">{price} ETH</p>
      <button 
        onClick={() => onBuy(id)}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Buy Now
      </button>
    </div>
  </div>
);

const Footer = () => (
  <footer className="bg-gray-800 text-white p-4 mt-8">
    <div className="container mx-auto text-center">
      <p>&copy; 2024 Web3 Marketplace. All rights reserved.</p>
    </div>
  </footer>
);

const App = () => {
  const [nfts, setNfts] = useState([
    { id: 1, title: "Cool NFT #1", price: 0.5, image: "/api/placeholder/300/200", sold: false },
    { id: 2, title: "Awesome NFT #2", price: 0.7, image: "/api/placeholder/300/200", sold: false },
    { id: 3, title: "Unique NFT #3", price: 1.2, image: "/api/placeholder/300/200", sold: false },
    { id: 4, title: "Rare NFT #4", price: 2.0, image: "/api/placeholder/300/200", sold: false },
  ]);

  const [showAlert, setShowAlert] = useState(false);
  const [lastPurchase, setLastPurchase] = useState(null);

  const handleBuy = (id) => {
    setNfts(nfts.map(nft => 
      nft.id === id ? { ...nft, sold: true } : nft
    ));
    const purchasedNFT = nfts.find(nft => nft.id === id);
    setLastPurchase(purchasedNFT);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto py-8">
        {showAlert && lastPurchase && (
          <Alert className="mb-4">
            <AlertDescription>
              You've successfully purchased {lastPurchase.title} for {lastPurchase.price} ETH!
            </AlertDescription>
          </Alert>
        )}
        <h2 className="text-2xl font-bold mb-4">Featured NFTs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {nfts.map((nft) => (
            <NFTCard 
              key={nft.id} 
              {...nft} 
              onBuy={handleBuy}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;