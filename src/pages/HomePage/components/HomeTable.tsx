import React, { useState } from "react";
import { Table, Input, Button, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";

export default function Hometable(props: any) {
  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      dob: "1997-08-20",
      email: "mike@gmail.com",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      dob: "1972-02-13",
      email: "john@gmail.com",
    },
    {
      key: "3",
      name: "Alex",
      age: 42,
      dob: "1985-05-07",
      email: "alex@gmail.com",
    },
    {
      key: "4",
      name: "Kate",
      age: 42,
      dob: "1992-12-26",
      email: "kate@gmail.com",
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Birth Date",
      dataIndex: "dob",
      key: "dob",
    },
    {
      title: "Email Address",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Space size="middle">
          <Button style={{ borderColor: "#f0ad4e", color: "#f0ad4e" }}>
            Edit
          </Button>
          <Button danger>Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table
        dataSource={props.students}
        columns={columns}
        bordered
        style={{ marginLeft: "24px", marginRight: "24px", marginTop: "22px" }}
      />
    </>
  );
}
