import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { money } from '../../utils/money';
import { CheckoutHeader } from './CheckoutHeader';
import './CheckoutPage.css';
import axios from 'axios';

export function CheckoutPage({ cartItems }) {
    const [deliveryOptions, setDeliveryOptions] = useState([]);
    const [paymentSummary, setPaymentSummary] = useState(null);

    useEffect(() => {
        axios.get('api/delivery-options?expand=estimatedDeliveryTime').then((response) => {
            setDeliveryOptions(response.data);
        });

        axios.get('api/payment-summary').then((response) => {
            setPaymentSummary(response.data);
        });
    }, [])

    return (
        <>
            <link rel="icon" type="png" href="/cart-favicon.png" />
            <title>Ecommerce - Checkout</title>
            <CheckoutHeader />
            <div className="checkout-page">
                <div className="page-title">Review your order</div>

                <div className="checkout-grid">
                    <div className="order-summary">

                        {deliveryOptions.length > 0 && cartItems.map((cart) => {
                            const delivaryTime = deliveryOptions.find((d) => {
                                return d.id == cart.deliveryOptionId
                            });
                            return (
                                <div key={cart.id} className="cart-item-container">
                                    <div className="delivery-date">
                                        Delivary Date: {dayjs(delivaryTime.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                                    </div>

                                    <div className="cart-item-details-grid">
                                        <img className="product-image"
                                            src={cart.product.image} />

                                        <div className="cart-item-details">
                                            <div className="product-name">
                                                {cart.product.name}
                                            </div>
                                            <div className="product-price">
                                                {money(cart.product.priceCents)}
                                            </div>
                                            <div className="product-quantity">
                                                <span>
                                                    Quantity: <span className="quantity-label">{cart.quantity}</span>
                                                </span>
                                                <span className="update-quantity-link link-primary">
                                                    Update
                                                </span>
                                                <span className="delete-quantity-link link-primary">
                                                    Delete
                                                </span>
                                            </div>
                                        </div>

                                        <div className="delivery-options">
                                            <div className="delivery-options-title">
                                                Choose a delivery option:
                                            </div>
                                            {deliveryOptions.map((option) => {
                                                return (
                                                    <div key={option.id
                                                    } className="delivery-option">
                                                        <input type="radio"
                                                            checked={option.id == cart.deliveryOptionId}
                                                            className="delivery-option-input"
                                                            name={`delivery-option-${cart.productId}`} />
                                                        <div>
                                                            <div className="delivery-option-date">
                                                                {dayjs(option.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                                                            </div>
                                                            <div className="delivery-option-price">
                                                                {option.priceCents > 0 ? `${money(option.priceCents)}` : 'Free Shipping'}
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {paymentSummary && (
                        <div className="payment-summary">
                            <div className="payment-summary-title">
                                Payment Summary
                            </div>

                            <div className="payment-summary-row">
                                <div>Items ({paymentSummary.totalItems}):</div>
                                <div className="payment-summary-money">{money(paymentSummary.productCostCents)}</div>
                            </div>

                            <div className="payment-summary-row">
                                <div>Shipping &amp; handling:</div>
                                <div className="payment-summary-money">{money(paymentSummary.shippingCostCents)}</div>
                            </div>

                            <div className="payment-summary-row subtotal-row">
                                <div>Total before tax:</div>
                                <div className="payment-summary-money">{money(paymentSummary.totalCostBeforeTaxCents)}</div>
                            </div>

                            <div className="payment-summary-row">
                                <div>Estimated tax (10%):</div>
                                <div className="payment-summary-money">{money(paymentSummary.taxCents)}</div>
                            </div>

                            <div className="payment-summary-row total-row">
                                <div>Order total:</div>
                                <div className="payment-summary-money">{money(paymentSummary.totalCostCents)}</div>
                            </div>

                            <button className="place-order-button button-primary">
                                Place your order
                            </button>
                        </div>
                    )}

                </div>
            </div>
        </>
    );
}