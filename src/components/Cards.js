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
  // Gaya dasar untuk card
  const baseCardStyle = {
    height: "100%",
    marginBottom: "16px",
    textAlign: "center", // Agar kontennya sejajar tengah
    ...cardStyle,
  };

  return (
    <div style={{ width: "100%", padding: "0 16px", overflowX: "hidden" }}>
      <Row gutter={[16, 16]} justify="center">
        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
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
    </div>
  );
}

export default Cards;
