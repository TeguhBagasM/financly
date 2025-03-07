import React from "react";
import { Card, Row, Col } from "antd";

function Cards({
  currentBalance,
  income,
  expenses,
  showExpenseModal,
  showIncomeModal,
  cardStyle,
  reset,
}) {
  // Gaya dasar yang akan digabungkan dengan cardStyle
  const baseCardStyle = {
    height: "100%",
    marginBottom: "16px",
    ...cardStyle,
  };

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={24} md={8} lg={8} xl={8}>
        <Card bordered={true} style={baseCardStyle}>
          <h2>Current Balance</h2>
          <p className="balance-amount">Rp. {currentBalance.toLocaleString("id-ID")}</p>
          <div className="btn btn-blue" style={{ margin: 0 }} onClick={reset}>
            Reset Balance
          </div>
        </Card>
      </Col>

      <Col xs={24} sm={12} md={8} lg={8} xl={8}>
        <Card bordered={true} style={baseCardStyle}>
          <h2>Total Income</h2>
          <p className="balance-amount">Rp. {income.toLocaleString("id-ID")}</p>
          <div className="btn btn-blue" style={{ margin: 0 }} onClick={showIncomeModal}>
            Add Income
          </div>
        </Card>
      </Col>

      <Col xs={24} sm={12} md={8} lg={8} xl={8}>
        <Card bordered={true} style={baseCardStyle}>
          <h2>Total Expenses</h2>
          <p className="balance-amount">Rp. {expenses.toLocaleString("id-ID")}</p>
          <div className="btn btn-blue" onClick={showExpenseModal}>
            Add Expense
          </div>
        </Card>
      </Col>
    </Row>
  );
}

export default Cards;
