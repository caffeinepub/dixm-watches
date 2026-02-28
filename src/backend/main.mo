import Map "mo:core/Map";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";

actor {
  type WatchProduct = {
    id : Nat;
    name : Text;
    collection : Text;
    price : Float;
    description : Text;
    material : Text;
    available : Bool;
  };

  type ContactMessage = {
    id : Nat;
    name : Text;
    email : Text;
    message : Text;
    timestamp : Time.Time;
  };

  module Product {
    public func compare(product1 : WatchProduct, product2 : WatchProduct) : Order.Order {
      Nat.compare(product1.id, product2.id);
    };
  };

  let watchProducts = Map.empty<Nat, WatchProduct>();
  var nextProductId = 1;
  let contactMessages = Map.empty<Nat, ContactMessage>();
  var nextMessageId = 1;

  public shared ({ caller }) func addSeedDataHeritage() : async () {
    await addProduct("DIXM Heritage Classic", "Heritage", 12999.99, "A timeless piece inspired by classic designs.", "18k Gold", true);
    await addProduct("DIXM Heritage Rose", "Heritage", 13999.99, "Elegant watch with rose gold accents.", "Rose Gold", true);
    await addProduct("DIXM Heritage Marine", "Heritage", 14999.99, "Marine-inspired luxury watch.", "Stainless Steel", true);
    await addProduct("DIXM Heritage Midnight", "Heritage", 15499.99, "Classic design with a midnight blue dial.", "Platinum", true);
  };

  public shared ({ caller }) func addSeedDataPrecision() : async () {
    await addProduct("DIXM Precision Chrono", "Precision", 16999.99, "High-precision chronograph.", "Titanium", true);
    await addProduct("DIXM Precision Sapphire", "Precision", 17999.99, "Luxury watch with sapphire crystal.", "Sapphire Crystal", true);
    await addProduct("DIXM Precision Diver", "Precision", 18999.99, "Diver's watch with superior precision.", "Ceramic Bezel", true);
  };

  public shared ({ caller }) func addSeedDataAvantGarde() : async () {
    await addProduct("DIXM Avant-Garde Fusion", "Avant-Garde", 19999.99, "Innovative design with fused materials.", "Titanium/Carbon Fiber", true);
    await addProduct("DIXM Avant-Garde Skeleton", "Avant-Garde", 20999.99, "Skeleton watch with avant-garde design.", "Transparent Sapphire", true);
    await addProduct("DIXM Avant-Garde Vision", "Avant-Garde", 21999.99, "Futuristic watch with advanced features.", "Hybrid Materials", true);
  };

  public shared ({ caller }) func addProduct(name : Text, collection : Text, price : Float, description : Text, material : Text, available : Bool) : async () {
    let product : WatchProduct = {
      id = nextProductId;
      name;
      collection;
      price;
      description;
      material;
      available;
    };
    watchProducts.add(nextProductId, product);
    nextProductId += 1;
  };

  public shared ({ caller }) func submitContactMessage(name : Text, email : Text, message : Text) : async () {
    let contact : ContactMessage = {
      id = nextMessageId;
      name;
      email;
      message;
      timestamp = Time.now();
    };
    contactMessages.add(nextMessageId, contact);
    nextMessageId += 1;
  };

  public query ({ caller }) func getAllProducts() : async [WatchProduct] {
    watchProducts.values().toArray();
  };

  public query ({ caller }) func getProductsByCollection(collection : Text) : async [WatchProduct] {
    watchProducts.values().toArray().filter(func(product) { product.collection == collection });
  };

  public query ({ caller }) func getProductById(id : Nat) : async WatchProduct {
    switch (watchProducts.get(id)) {
      case (null) { Runtime.trap("Product not found") };
      case (?product) { product };
    };
  };

  public query ({ caller }) func getAllContactMessages() : async [ContactMessage] {
    contactMessages.values().toArray();
  };
};
