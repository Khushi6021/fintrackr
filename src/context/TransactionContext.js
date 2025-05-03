import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const TransactionContext = createContext();

const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    const savedTransactions = localStorage.getItem('fintrackr-transactions');
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    }
  }, []);

  // Save to localStorage whenever transactions change
  useEffect(() => {
    localStorage.setItem('fintrackr-transactions', JSON.stringify(transactions));
  }, [transactions]);

  // Add a transaction
  const addTransaction = (transaction) => {
    setTransactions([...transactions, { ...transaction, id: Date.now() }]);
  };

  // Delete a transaction
  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((tx) => tx.id !== id));
  };

  // Update a transaction
  const updateTransaction = (updatedTx) => {
    setTransactions(
      transactions.map((tx) => (tx.id === updatedTx.id ? updatedTx : tx))
    );
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        addTransaction,
        deleteTransaction,
        updateTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export default TransactionProvider;
