import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Layout, Table } from 'antd'

const { Content } = Layout

const App = () => {
  const [transactionsList, updateTransactionsList] = useState([]);

  const getTransactions = () => {
    console.log('hiiiii')
    axios.get('http://localhost:3000/transactions')
      .then((response) => {
        const transactions = response.data
        updateTransactionsList(transactions)
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      sorter: (a, b) => a.type - b.type
    },
    {
      title: 'Payment Method',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod'
    },
    {
      title: 'Merchant',
      dataIndex: 'merchantId',
      key: 'merchantId'
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      sorter: (a, b) => a.amount - b.amount
    },
    {
      title: 'Currency',
      dataIndex: 'currency',
      key: 'currency'
    },
    {
      title: 'Date Created',
      dataIndex: 'dateCreated',
      key: 'dateCreated',
      sorter: (a, b) => a.dateCreated - b.dateCreated

    },
  ]

  useEffect(() => {
    getTransactions()
  }, []);

  return (
    <div className="App">
      <Content>
        <Table
          dataSource={transactionsList}
          columns={columns}
          rowKey={obj => obj.id}
        />;
      </Content>
    </div>
  );
}

export default App;
