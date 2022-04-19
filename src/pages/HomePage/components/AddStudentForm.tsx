import { Button, Checkbox, DatePicker, Form, Input, Modal } from "antd";
import React, { useState } from "react";

export function AddStudentForm() {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Form
        id="addStudentForm"
        name="basic"
        labelCol={{ span: 4 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item label="Name:" name="name">
          <Input />
        </Form.Item>

        <Form.Item label="Email:" name="email">
          <Input />
        </Form.Item>

        <Form.Item label="Birth Date" name="dob">
          <DatePicker />
        </Form.Item>
      </Form>
    </>
  );
}
