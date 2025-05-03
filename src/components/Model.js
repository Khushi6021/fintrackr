import React, { useState, useEffect } from 'react';

const Model = ({ existingData, onClose, onSave }) => {
  const [type, setType] = useState(existingData.type);
  const [amount, setAmount] = useState(existingData.amount);
  const [category, setCategory] = useState(existingData.category);
  const [description, setDescription] = useState(existingData.description);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTransaction = {
      ...existingData,
      type,
      amount,
      category,
      description,
    };
    onSave(updatedTransaction);
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <h2>Edit Transaction</h2>
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

        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default Model ;
