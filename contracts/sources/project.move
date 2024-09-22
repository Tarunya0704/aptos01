module MyModule::DecentralizedMarketplace {
    use std::signer;
    use aptos_framework::coin;
    use aptos_framework::aptos_coin::AptosCoin;
    use aptos_framework::table::{Self, Table};

    struct Marketplace has key {
        items: Table<u64, Item>,
        item_counter: u64,
    }

    struct Item has store, drop {
        seller: address,
        price: u64,
        available: bool,
    }

    const E_MARKETPLACE_EXISTS: u64 = 1;
    const E_MARKETPLACE_NOT_FOUND: u64 = 2;
    const E_ITEM_NOT_FOUND: u64 = 3;
    const E_ITEM_NOT_AVAILABLE: u64 = 4;
    const E_INSUFFICIENT_FUNDS: u64 = 5;

    public fun create_marketplace(account: &signer) {
        let addr = signer::address_of(account);
        assert!(!exists<Marketplace>(addr), E_MARKETPLACE_EXISTS);

        let marketplace = Marketplace {
            items: table::new(),
            item_counter: 0,
        };
        move_to(account, marketplace);
    }

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
}