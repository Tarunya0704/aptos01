# Decentralized Marketplace Module - README

## Vision

The **Decentralized Marketplace** module is designed to create a blockchain-powered, peer-to-peer marketplace that is secure, trustless, and transparent. Users can list, sell, and manage items directly on the Aptos blockchain without the need for intermediaries, giving full control to buyers and sellers. The vision of this project is to foster an environment where decentralized e-commerce can thrive, offering users a safe, transparent, and autonomous trading platform.

## Features

### 1. **Marketplace Creation**
   - Users can create a decentralized marketplace tied to their blockchain account.
   - Each marketplace is independent, allowing users to manage their items.

### 2. **Item Listing**
   - Sellers can list items for sale, set a price, and make them available or unavailable.
   - Items are stored using Aptos' efficient data structures to handle marketplace operations.

### 3. **Decentralized and Trustless Transactions**
   - All marketplace functions are performed on-chain, ensuring transparency and security.
   - No central authority controls the marketplace; all transactions are trustless.

### 4. **Error Handling**
   - Detailed error codes and checks ensure the marketplace runs smoothly and avoids common pitfalls such as duplicate listings or non-existent items.

## Smart Contract Information

The core logic of this decentralized marketplace is implemented in Move, using Aptos blockchain's framework for storage, coin transfers, and signer verification.

### Structs

#### **Marketplace Struct**
- **items**: A `Table` storing the items listed in the marketplace, identified by a unique `u64` ID.
- **item_counter**: A counter to assign unique IDs to newly listed items.

```move
struct Marketplace has key {
    items: Table<u64, Item>,
    item_counter: u64,
}
```

#### **Item Struct**
- **seller**: The address of the user who is selling the item.
- **price**: The price set by the seller for the item.
- **available**: A boolean value to indicate whether the item is available for sale.

```move
struct Item has store, drop {
    seller: address,
    price: u64,
    available: bool,
}
```

### Error Codes
- **`E_MARKETPLACE_EXISTS (1)`**: Raised when trying to create a marketplace that already exists for the user.
- **`E_MARKETPLACE_NOT_FOUND (2)`**: Raised when trying to list items for a marketplace that doesn't exist.
- **`E_ITEM_NOT_FOUND (3)`**: Raised when trying to interact with an item that is not listed.
- **`E_ITEM_NOT_AVAILABLE (4)`**: Raised when an unavailable item is accessed for purchase.
- **`E_INSUFFICIENT_FUNDS (5)`**: Raised when the buyer doesn't have enough funds to purchase an item.

### Public Functions

#### `create_marketplace(account: &signer)`
- **Description**: Allows a user to create a new marketplace under their account.
- **Behavior**: Checks if a marketplace already exists for the account. If not, creates a new marketplace with no items.
- **Errors**: Raises `E_MARKETPLACE_EXISTS` if a marketplace already exists.

```move
public fun create_marketplace(account: &signer) {
    let addr = signer::address_of(account);
    assert!(!exists<Marketplace>(addr), E_MARKETPLACE_EXISTS);

    let marketplace = Marketplace {
        items: table::new(),
        item_counter: 0,
    };
    move_to(account, marketplace);
}
```

#### `list_item(seller: &signer, price: u64) acquires Marketplace`
- **Description**: Allows a seller to list an item for sale in their marketplace by setting its price.
- **Behavior**: Checks if the marketplace exists for the seller. If found, the item is added, and a unique ID is assigned.
- **Errors**: Raises `E_MARKETPLACE_NOT_FOUND` if the marketplace does not exist for the seller.

```move
public fun list_item(seller: &signer, price: u64) acquires Marketplace {
    let seller_addr = signer::address_of(seller);
    assert!(exists<Marketplace>(seller_addr), E_MARKETPLACE_NOT_FOUND);

    let marketplace = borrow_global_mut<Marketplace>(seller_addr);
    let item_id = marketplace.item_counter + 1;
    let new_item = Item {
        seller: seller_addr,
        price,
        available: true,
    };

    table::add(&mut marketplace.items, item_id, new_item);
    marketplace.item_counter = item_id;
}
```

## Installation

To install and deploy this module, you need to:

1. **Clone the repository**:  
   ```bash
   git clone <repository_url>
   cd decentralized-marketplace
   ```

2. **Install the Aptos framework and CLI**:  
   Follow the official [Aptos documentation](https://aptos.dev) to install and configure Aptos on your system.

3. **Deploy the module**:  
   Once you've set up Aptos, you can deploy the module on your Aptos account using the following command:  
   ```bash
   aptos move publish --profile default
   ```

4. **Interact with the marketplace**:  
   Use the Aptos CLI or wallet to interact with your marketplace smart contract.

## Usage

### Creating a Marketplace
To create a marketplace, call the `create_marketplace(account)` function. This will initialize a new marketplace under your blockchain account.

### Listing Items
To list items in your marketplace, use the `list_item(seller, price)` function to specify the price and add the item.

### Future Enhancements
- **Purchase Mechanism**: Add functionality to enable buyers to purchase items listed in the marketplace.
- **Item Management**: Allow sellers to modify or remove items from the marketplace.
- **Multi-Currency Support**: Enable payments using multiple cryptocurrencies, not just AptosCoin.
- **Reputation System**: Implement a buyer and seller rating system to improve trust between parties.

## License

This project is licensed under the MIT License. You are free to use, modify, and distribute this project, provided that proper attribution is given.

