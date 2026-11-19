import { useState } from "react";

const products = [
  { id: "hte_96g", name: "96-Well Glass-Lined Plate", price: 45.5 },
  { id: "hte_384p", name: "384-Well Polypropylene Plate", price: 22.0 },
  { id: "hte_24d", name: "24-Well Deep Well Plate", price: 18.75 },
  { id: "hte_1536c", name: "1536-Well COC Plate", price: 85.0 },
];

export default function ShoppingCart() {
  // Store quantities by product ID; product details remain in the catalog.
  const [cart, setCart] = useState({});

  function addToCart(productId) {
    setCart((currentCart) => ({
      ...currentCart,
      [productId]: (currentCart[productId] ?? 0) + 1,
    }));
  }

  const cartItems = products
    .filter((product) => (cart[product.id] ?? 0) > 0)
    .map((product) => ({
      ...product,
      quantity: cart[product.id],
      subtotal: product.price * cart[product.id],
    }));

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );
  const totalPrice = cartItems.reduce((total, item) => total + item.subtotal, 0);
  const formatPrice = (price) => `$${price.toFixed(2)}`;

  return (
    <main className="store-shell">
      <header className="store-header">
        <a className="brand" href="#top" aria-label="HTE Supply home"><span className="brand-mark">H</span><span>HTE <b>SUPPLY</b></span></a>
        <p className="header-note">Laboratory essentials, delivered.</p>
        <a className="cart-link" href="#cart" aria-label={`Shopping cart, ${totalQuantity} items`}>
          <span className="cart-icon" aria-hidden="true">▢</span> Cart <span className="cart-count">{totalQuantity}</span>
        </a>
      </header>

      <section className="catalog-section" id="top" aria-labelledby="catalog-heading">
        <div className="intro">
          <p className="eyebrow">PRECISION LABWARE</p>
          <h1 id="catalog-heading">The right plate<br />for every experiment.</h1>
          <p className="intro-copy">Reliable, high-performance plates designed for your most important work.</p>
        </div>
        <div className="section-heading"><div><p className="eyebrow">SHOP THE COLLECTION</p><h2>Microplates</h2></div><span className="item-count">04 PRODUCTS</span></div>
        <ul className="product-grid">
          {products.map((product) => (
            <li className="product-card" key={product.id}>
              <div className={`product-art art-${product.id}`} aria-hidden="true"><span className="plate"><i /><i /><i /><i /><i /><i /><i /><i /><i /></span><span className="art-label">HTE / LABWARE</span></div>
              <div className="product-info"><span className="product-type">{product.id === "hte_96g" ? "GLASS-LINED" : product.id === "hte_384p" ? "POLYPROPYLENE" : product.id === "hte_24d" ? "DEEP WELL" : "COC POLYMER"}</span>
                <h3>{product.name}</h3><div className="product-buy"><span className="price">{formatPrice(product.price)}<small> / unit</small></span>
                <button type="button" onClick={() => addToCart(product.id)} aria-label={`Add ${product.name} to cart`}><span>Add to cart</span><b aria-hidden="true">+</b></button></div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="cart-section" id="cart" aria-labelledby="cart-heading">
        <div className="cart-title"><div><p className="eyebrow">YOUR SELECTION</p><h2 id="cart-heading">Shopping cart <span>({totalQuantity})</span></h2></div><span className="secure-note">Secure checkout</span></div>
        {cartItems.length === 0 ? (
          <p className="empty-cart">Your cart is empty. Add a plate to get started.</p>
        ) : (
          <ul className="cart-list">
            {cartItems.map((item) => (
              <li className="cart-row" key={item.id}>
                <span className="cart-product-name">{item.name}</span><span className="cart-quantity">Qty {item.quantity}</span><strong>{formatPrice(item.subtotal)}</strong>
              </li>
            ))}
          </ul>
        )}
        <div className="cart-summary"><span>Subtotal · {totalQuantity} {totalQuantity === 1 ? "item" : "items"}</span><strong>{formatPrice(totalPrice)}</strong></div>
        <p className="shipping-note">Shipping and taxes calculated at checkout.</p>
        <button className="checkout-button" type="button" disabled={totalQuantity === 0}>Continue to checkout <span aria-hidden="true">→</span></button>
      </section>
      <footer className="store-footer"><span>HTE SUPPLY</span><span>Thoughtfully made for science.</span><span>© 2026</span></footer>
    </main>
  );
}
