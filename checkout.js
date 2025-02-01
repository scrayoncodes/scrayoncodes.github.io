// Retrieve order from localStorage
let currentOrder = JSON.parse(localStorage.getItem('currentOrder')) || [];

function displayCheckoutSummary() {
    const orderList = document.getElementById('checkoutOrderList');
    const subtotalElement = document.getElementById('checkoutSubtotal');
    const taxElement = document.getElementById('checkoutTax');
    const totalElement = document.getElementById('checkoutTotal');

    orderList.innerHTML = '';
    let subtotal = 0;

    currentOrder.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        const div = document.createElement('div');
        div.className = 'checkout-item';
        div.innerHTML = `
            <div class="checkout-item-details">
                <span>${item.quantity}x ${item.name}</span>
                <span>$${itemTotal.toFixed(2)}</span>
            </div>
        `;
        orderList.appendChild(div);
    });

    const tax = subtotal * 0.08;
    const total = subtotal + tax;

    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    taxElement.textContent = `$${tax.toFixed(2)}`;
    totalElement.textContent = `$${total.toFixed(2)}`;
}

function handleCheckoutSubmit(event) {
    event.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const pickupTime = document.getElementById('pickupTime').value;
    const notes = document.getElementById('notes').value;

    // Create order confirmation object
    const orderConfirmation = {
        customerInfo: {
            name,
            email,
            phone,
            pickupTime,
            notes
        },
        order: currentOrder,
        orderTime: new Date().toISOString()
    };

    // In a real application, you would send this to a server
    console.log('Order placed:', orderConfirmation);

    // Clear the current order from localStorage
    localStorage.removeItem('currentOrder');

    // Redirect to a confirmation page
    alert('Order placed successfully! Thank you for your order.');
    window.location.href = 'index.html';
}

// Initialize the checkout page
document.addEventListener('DOMContentLoaded', () => {
    displayCheckoutSummary();
});
