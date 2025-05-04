import React, { useState } from 'react';

const TransactionForm = ({ onAdd }) => {
  const [type, setType] = useState('Credit');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !description) return;

    const newTransaction = {
      id: Date.now(),
      type,
      amount: parseFloat(amount),
      category,
      description,
    };

    onAdd(newTransaction);
    setAmount('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Transaction</h2>
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="Credit">Credit</option>
        <option value="Debit">Debit</option>
      </select>

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
      />

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="Food">Food</option>
        <option value="Travel">Travel</option>
        <option value="Billing">Billing</option>
        <option value="Others">Others</option>
      </select>

      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />

      <button type="submit">Add Transaction</button>
    </form>
  );
};

export default TransactionForm;
