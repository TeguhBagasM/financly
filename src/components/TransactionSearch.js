import React, { useRef, useState } from "react";
import { Input, Table, Select, Radio, Row, Col, Space, Typography } from "antd";
import search from "../assets/search.svg";
import { parse } from "papaparse";
import { toast } from "react-toastify";
const { Option } = Select;
const { Title } = Typography;

const TransactionSearch = ({ transactions, exportToCsv, addTransaction, fetchTransactions }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sortKey, setSortKey] = useState("");
  const fileInput = useRef();

  function importFromCsv(event) {
    event.preventDefault();
    try {
      parse(event.target.files[0], {
        header: true,
        complete: async function (results) {
          // Now results.data is an array of objects representing your CSV rows
          for (const transaction of results.data) {
            // Write each transaction to Firebase, you can use the addTransaction function here
            console.log("Transactions", transaction);
            const newTransaction = {
              ...transaction,
              amount: parseInt(transaction.amount),
            };
            await addTransaction(newTransaction, true);
          }
        },
      });
      toast.success("All Transactions Added");
      fetchTransactions();
      event.target.files = null;
    } catch (e) {
      toast.error(e.message);
    }
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ellipsis: true,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      responsive: ["md"],
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Tag",
      dataIndex: "tag",
      key: "tag",
      responsive: ["lg"],
    },
  ];

  const filteredTransactions = transactions.filter((transaction) => {
    const searchMatch = searchTerm
      ? transaction.name.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    const tagMatch = selectedTag ? transaction.tag === selectedTag : true;
    const typeMatch = typeFilter ? transaction.type === typeFilter : true;

    return searchMatch && tagMatch && typeMatch;
  });

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortKey === "date") {
      return new Date(a.date) - new Date(b.date);
    } else if (sortKey === "amount") {
      return a.amount - b.amount;
    } else {
      return 0;
    }
  });

  const dataSource = sortedTransactions.map((transaction, index) => ({
    key: index,
    ...transaction,
    amount: `Rp. ${transaction.amount.toLocaleString("id-ID")}`,
  }));

  return (
    <div className="transaction-container">
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={16} lg={16}>
          <div className="search-container">
            <div className="input-flex">
              <img src={search} width="16" alt="Search icon" />
              <input placeholder="Search by Name" onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
          </div>
        </Col>
        <Col xs={24} sm={24} md={8} lg={8}>
          <Select
            className="select-input"
            onChange={(value) => setTypeFilter(value)}
            value={typeFilter}
            placeholder="Filter"
            allowClear
            style={{ width: "100%" }}
          >
            <Option value="">All</Option>
            <Option value="income">Income</Option>
            <Option value="expense">Expense</Option>
          </Select>
        </Col>
      </Row>

      <div className="my-table">
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={24} md={8} lg={8}>
            <Title level={4} style={{ margin: 0 }}>
              My Transactions
            </Title>
          </Col>

          <Col xs={24} sm={24} md={8} lg={8}>
            <Radio.Group
              className="input-radio"
              onChange={(e) => setSortKey(e.target.value)}
              value={sortKey}
              style={{ width: "100%", display: "flex", justifyContent: "center" }}
            >
              <Radio.Button value="">No Sort</Radio.Button>
              <Radio.Button value="date">Sort by Date</Radio.Button>
              <Radio.Button value="amount">Sort by Amount</Radio.Button>
            </Radio.Group>
          </Col>

          <Col xs={24} sm={24} md={8} lg={8}>
            <Space wrap style={{ width: "100%", justifyContent: "flex-end" }} size={8}>
              <button className="btn" onClick={exportToCsv}>
                Export to CSV
              </button>
              <label htmlFor="file-csv" className="btn btn-blue">
                Import from CSV
              </label>
              <input
                onChange={importFromCsv}
                id="file-csv"
                type="file"
                accept=".csv"
                required
                style={{ display: "none" }}
              />
            </Space>
          </Col>
        </Row>

        <div className="table-responsive">
          <Table
            columns={columns}
            dataSource={dataSource}
            scroll={{ x: "max-content" }}
            pagination={{
              responsive: true,
              position: ["bottomCenter"],
              showSizeChanger: true,
              pageSizeOptions: ["10", "20", "50"],
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TransactionSearch;
