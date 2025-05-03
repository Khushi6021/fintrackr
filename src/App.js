import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Transactionform from './components/Transactionform';
import Transactionlist from './components/Transactionlist';
import bgImage from './abc.jpg'; 
import './App.css';

function App() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('transactions')) || [];
    setTransactions(data);
  }, []);

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (newTrans) => {
    setTransactions([...transactions, newTrans]);
  };

  const editTransaction = (updated) => { 
    setTransactions((prev) =>
      prev.map((t) => (t.id === updated.id ? updated : t))
    );
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div
      className="app-container"
     
    >
      <Header />
      <Transactionform onAdd={addTransaction} />
      <Transactionlist
        transactions={transactions}
        onEdit={editTransaction}
        onDelete={deleteTransaction}
      />
    </div>
  );
}

export default App;
