// Menu data
const menuData = {
    starters: [
        { id: 's1', name: 'Veggie Skewers', price: 9.00, image: 'images/freepik-export-202410172023354ngf.png', calories: 150 },
        { id: 's2', name: 'Sweet Potato Fries', price: 6.00, image: 'images/freepik-export-20241017202535q94v.png', calories: 200 },
        // Add other starters
        { id: 's3', name: 'Hummus & Pita', price: 7.50, image: 'images/freepik-export-20241017202903mLIW.png', calories: 350 },
        { id: 's4', name: 'Garlic Bread', price: 6.00, image: 'images/Herbed_Garlic_Bread_with_Herbed_Butter_Recipe-1.jpg', calories: 200},
        { id: 's5', name: 'Tomato Soup', price: 8.00, image: 'images/winter-tomato-soup-FEAT.jpg', calories: 150},
    ],
    salads: [
        { id: 'sa1', name: 'Garden Salad', price: 8.00, image: 'images/gardensalad.jpeg', calories: 240 },
        { id: 'sa2', name: 'Chickpea Salad', price: 7.00, image: 'images/freepik-export-20241017205213L0a2.png', calories: 215 },
        // Add other salads
        { id: 'sa3', name: 'Spinach & Avocado Salad', price: 8.00, image: 'images/freepik-export-20241017205538dVP8.png', calories: 200},
    ],
    mains:[
        { id: 'm1', name: 'Grilled Veggie Burger', price: 15.00, image: 'images/freepik-export-20241018165438IW1s.png', calories: 600},
        { id: 'm2', name: 'Stuffed Bell Peppers', price: 12.00, image: 'images/freepik-export-20241018170000UJz8.png', calories: 300},
        { id: 'm3', name: 'Vegetarian BBQ Ribs', price: 15.00, image: 'images/barbecue-ribs-with-coleslaw-and-cornbread-png.webp', calories: 660},
        { id: 'm4', name: 'Roasted Butternut Squash Pizza', price: 14.00, image: 'images/Rosemary-Roasted-Butternut-Squash-Pizza-1.jpg', calories: 584},
        { id: 'm5', name: 'Cauliflower Curry', price: 13.00, image: 'images/Indian-Creamy-Cauliflower-Coconut-Curry.webp', calories: 385},
        { id: 'm6', name: 'Creamy Zucchini Pasta', price: 14.00, image: 'images/Creamy-Zucchini-Pasta-Sauce-10.webp', calories: 555},
    ],
    desserts:[
        { id: 'd1', name: 'Fruit Salad', price: 5.00, image: 'images/fruitsaladimg.jpeg', calories: 80},
        { id: 'd2', name: 'Vegan Chocolate Cake', price: 7.00, image: 'images/freepik-export-20241018182738YmQA.png', calories: 360},
        { id: 'd3', name: 'Apple Crisp', price: 6.00, image: 'images/freepik-export-20241018183042hVeQ.png', calories: 200},
    ],
    beverages:[
        { id: 'b1', name: 'Fresh Juices', price: 2.50, image: 'images/freepik-export-20241020020426UYnV.png', calories: 100-120},
        { id: 'b2', name: 'Herbal Teas', price: 3.00, image:'images/freepik-export-202410200212040dqF.png', calories: 2},
        { id: 'b3', name: ' Smoothies', price: 5.00, image: 'images/images.jpeg', calories: 140},
        { id: 'b4', name: 'Coffee', price: 4.00, image: 'images/freepik-export-20241020022244GI5G.png', calories: 2},
    ],
    // Add other categories
};

let currentOrder = [];

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Show starters by default
    showCategory('starters');
    
    // Add category button listeners
    document.querySelectorAll('.category-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            showCategory(e.target.dataset.category);
        });
    });
});

function showCategory(category) {
    const menuItems = document.getElementById('menuItems');
    menuItems.innerHTML = '';
    
    menuData[category].forEach(item => {
        const itemElement = createMenuItem(item);
        menuItems.appendChild(itemElement);
    });
}

function createMenuItem(item) {
    const div = document.createElement('div');
    div.className = 'menu-item';
    div.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="menu-item-details">
            <h4>${item.name}</h4>
            <p>$${item.price.toFixed(2)} | ${item.calories} cal.</p>
        </div>
        <button class="add-to-order" onclick="addToOrder('${item.id}')">Add to Order</button>
    `;
    return div;
}

function addToOrder(itemId) {
    // Find item in menuData
    let item;
    for (const category in menuData) {
        item = menuData[category].find(i => i.id === itemId);
        if (item) break;
    }
    
    if (item) {
        const orderItem = currentOrder.find(i => i.id === itemId);
        if (orderItem) {
            orderItem.quantity++;
        } else {
            currentOrder.push({ ...item, quantity: 1 });
        }
        updateOrderSummary();
    }
}

function updateOrderSummary() {
    const orderList = document.getElementById('orderList');
    orderList.innerHTML = '';
    
    let subtotal = 0;
    
    currentOrder.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        const div = document.createElement('div');
        div.className = 'order-item';
        div.innerHTML = `
            <span>${item.quantity}x ${item.name}</span>
            <span>$${itemTotal.toFixed(2)}</span>
        `;
        orderList.appendChild(div);
    });
    
    const tax = subtotal * 0.08;
    const total = subtotal + tax;
    
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}

document.getElementById('checkoutBtn').addEventListener('click', () => {
    if (currentOrder.length === 0) {
        alert('Please add items to your order first.');
        return;
    }
    // Add checkout functionality here
    alert('Proceeding to checkout...');
}); 