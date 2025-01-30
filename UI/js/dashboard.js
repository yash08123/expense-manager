// Check if user is logged in
if (!localStorage.getItem('token')) {
    window.location.href = 'index.html';
}

const token = localStorage.getItem('token');
let expenseChart;

// Logout functionality
document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'index.html';
});

// Add transaction
document.getElementById('transactionForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const amount = document.getElementById('amount').value;
    const category = document.getElementById('category').value;
    const date = document.getElementById('date').value;

    try {
        const response = await fetch('http://localhost:5001/api/transactions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ amount, category, date })
        });

        if (response.ok) {
            document.getElementById('transactionForm').reset();
            loadTransactions();
            updateExpenseChart();
        } else {
            const data = await response.json();
            alert(data.error || 'Failed to add transaction');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while adding the transaction');
    }
});

// Load transactions
async function loadTransactions() {
    try {
        const response = await fetch('http://localhost:5001/api/transactions', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const transactions = await response.json();
        const tbody = document.getElementById('transactionsList');
        tbody.innerHTML = '';

        transactions.forEach(transaction => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${new Date(transaction.date).toLocaleDateString()}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${transaction.category}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    $${parseFloat(transaction.amount).toFixed(2)}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button onclick="deleteTransaction(${transaction.id})" 
                            class="text-red-500 hover:text-red-700">
                        Delete
                    </button>
                </td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to load transactions');
    }
}

// Delete transaction
async function deleteTransaction(id) {
    if (!confirm('Are you sure you want to delete this transaction?')) {
        return;
    }

    try {
        const response = await fetch(`http://localhost:5001/api/transactions/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            loadTransactions();
            updateExpenseChart();
        } else {
            const data = await response.json();
            alert(data.error || 'Failed to delete transaction');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while deleting the transaction');
    }
}

// Update expense chart
async function updateExpenseChart() {
    try {
        const response = await fetch('http://localhost:5001/api/transactions/summary', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();
        
        const categories = data.map(item => item.category);
        const amounts = data.map(item => parseFloat(item.total));

        if (expenseChart) {
            expenseChart.destroy();
        }

        const ctx = document.getElementById('expenseChart').getContext('2d');
        expenseChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: categories,
                datasets: [{
                    data: amounts,
                    backgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56',
                        '#4BC0C0',
                        '#9966FF'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to load expense summary');
    }
}

// Initial load
loadTransactions();
updateExpenseChart(); 