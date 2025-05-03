import React, { useState } from 'react';
import Model from './Model';

const TransactionList = ({ transactions, onEdit, onDelete }) => {
  const [editData, setEditData] = useState(null);
  const [filter, setFilter] = useState('All');

  const filteredTransactions = transactions.filter((t) => 
    filter === 'All' ? true : t.category === filter
  );

  const openEditModal = (transaction) => {
    setEditData(transaction);
  };

  const totalCredits = filteredTransactions
    .filter((t) => t.type === 'Credit')
    .reduce((total, t) => total + t.amount, 0);

  const totalDebits = filteredTransactions
    .filter((t) => t.type === 'Debit')
    .reduce((total, t) => total + t.amount, 0);

  const netBalance = totalCredits - totalDebits;

  return (
    <>
      <div className="insights">
        <div>Total Credits: ₹{totalCredits}</div>
        <div>Total Debits: ₹{totalDebits}</div>
        <div>Net Balance: ₹{netBalance}</div>
      </div>

      <div className="filter">
        <label htmlFor="category"><b>Filter by Category:</b></label>
        <select
          id="category"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Billing">Billing</option>
          <option value="Others">Others</option>
        </select>
      </div>

      <div className="transaction-section">
        <h3>Credits</h3>
        {filteredTransactions
          .filter((t) => t.type === 'Credit')
          .map((transaction) => (
            <div key={transaction.id} className="transaction-card">
              <span>₹{transaction.amount}</span>
              <span>{transaction.category}</span>
              <span>{transaction.description}</span>
              <button onClick={() => openEditModal(transaction)}>Edit</button>
              <button onClick={() => onDelete(transaction.id)}>Delete</button>
            </div>
          ))}
      </div>

      <div className="transaction-section">
        <h3>Debits</h3>
        {filteredTransactions
          .filter((t) => t.type === 'Debit')
          .map((transaction) => (
            <div key={transaction.id} className="transaction-card">
              <span>₹{transaction.amount}</span>
              <span>{transaction.category}</span>
              <span>{transaction.description}</span>
              <button onClick={() => openEditModal(transaction)}>Edit</button>
              <button onClick={() => onDelete(transaction.id)}>Delete</button>
            </div>
          ))}
      </div>

      {editData && (
        <Model
          existingData={editData}
          onClose={() => setEditData(null)}
          onSave={(updated) => {
            onEdit(updated);
            setEditData(null);
          }}
        />
      )}
    </>
  );
};

export default TransactionList;
