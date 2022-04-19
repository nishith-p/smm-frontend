import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  PageHeader,
  Row,
  Space,
  Table,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Search from "antd/lib/input/Search";
import { useEffect, useState } from "react";
import StudentService from "../../api/StudentService";
import moment from "moment";
import axios from "axios";

export function HomePageContainer() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditVisible, setIsEditVisible] = useState(false);
  const [editStudent, setEditStudent] = useState();
  const [students, setStudents] = useState();
  const [total, setTotal] = useState();
  const [page, setPage] = useState();
  const [form] = Form.useForm();

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
      render: (date: string) => {
        return moment(date, "YYYY/MM/DD").format("YYYY-MM-DD");
      },
    },
    {
      title: "Email Address",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Action",
      key: "action",
      render: (record: any) => (
        <Space size="middle">
          <Button
            style={{ borderColor: "#f0ad4e", color: "#f0ad4e" }}
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Button danger onClick={() => handleDelete(record)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    fetchData("", 1);
  }, []);

  /**
   * Main CRUD operations
   */
  const fetchData = async (search: any, page: any) => {
    const data = await StudentService.getPaginatedData(search, page);

    console.log("Fetch Data Success: " + data.success);

    setStudents(data.data.data);
    setTotal(data.data.total);
    setPage(data.data.page);
  };

  const handlePageChange = (page: any, pageSize: any) => {
    fetchData("", page);
  };

  const handleEdit = (record: any) => {
    console.log(record);
    setEditStudent(record);
    setIsEditVisible(true);
  };

  const handleDelete = async (record: any) => {
    Modal.confirm({
      title: "Are you sure you want to delete this record?",
      onOk: async () => {
        const data = await StudentService.removeStudentData(record.id);

        console.log("Dete Data Success: " + data.success);

        fetchData("", 1);
      },
    });
  };

  /**
   * Form functions (Add Student)
   */
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleAddCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = async (values: any) => {
    setIsModalVisible(false);
    const data = await StudentService.postStudentData(
      values.name,
      values.email,
      values.dob
    );
    console.log("Submit Data Success:" + data.success);
    form.resetFields();
    fetchData("", 1);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    form.resetFields();
  };

  /**
   * Form functions (Edit Student)
   */
  const handleEditCancel = () => {
    setIsEditVisible(false);
  };

  const onFinishEdit = async (values: any) => {
    setIsEditVisible(false);
    console.log(values);
    const data = await StudentService.editStudentData(
      //@ts-ignore
      editStudent?.id,
      values.name,
      values.email,
      values.dob
    );
    console.log("Edit Data Success: " + data.success);
    fetchData("", 1);
  };

  const onFinishEditFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    form.resetFields();
  };

  /**
   * Upload Handler
   */
  const handleUploadChange = (info: any) => {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const uploadImage = (options: {
    onSuccess: any;
    onError: any;
    file: any;
    onProgress: any;
  }) => {
    const { onSuccess, onError, file } = options;

    const fmData = new FormData();
    fmData.append("file", file);
    axios
      .post("http://localhost:3000/students/upload", fmData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        onSuccess(file);
        fetchData("", 1);
      })
      .catch((err) => {
        const error = new Error("Some error");
        onError({ event: error });
      });
  };

  return (
    <>
      <PageHeader
        title="Student Management"
        className="site-page-header-ghost-wrapper"
        extra={[
          <Button key="2" onClick={showModal}>
            Create
          </Button>,
          //@ts-ignore
          <Upload customRequest={uploadImage} onChange={handleUploadChange}>
            <Button>
              <UploadOutlined /> Import
            </Button>
          </Upload>,
        ]}
        avatar={{
          src: "https://avatars1.githubusercontent.com/u/8186664?s=460&v=4",
        }}
      ></PageHeader>

      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" span={24}>
          <Search
            placeholder="Search.."
            allowClear
            size="large"
            style={{
              width: 300,
              float: "right",
              marginRight: "24px",
              marginTop: "26px",
            }}
            onSearch={fetchData}
          />
        </Col>
      </Row>

      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" span={24}>
          {/* <Hometable data={students} /> */}
          <Table
            dataSource={students}
            columns={columns}
            bordered
            style={{
              marginLeft: "24px",
              marginRight: "24px",
              marginTop: "22px",
            }}
            pagination={{
              defaultPageSize: 25,
              showSizeChanger: false,
              total: total,
              onChange: handlePageChange,
            }}
          />
        </Col>
      </Row>

      {/* Add Student Modal */}
      {/*@ts-ignore */}
      <Modal
        title="Add Student"
        visible={isModalVisible}
        onCancel={handleAddCancel}
        footer={[
          <Button key="back" onClick={handleAddCancel}>
            Cancel
          </Button>,
          <Button
            form="addStudentForm"
            key="submit"
            htmlType="submit"
            type="primary"
          >
            Submit
          </Button>,
        ]}
      >
        {/* <AddStudentForm /> */}
        <>
          <Form
            form={form}
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
              <DatePicker format="YYYY-MM-DD" />
            </Form.Item>
          </Form>
        </>
      </Modal>

      {/* Edit Student Modal */}
      {/*@ts-ignore */}
      <Modal
        title="Edit Student"
        visible={isEditVisible}
        onCancel={handleEditCancel}
        footer={[
          <Button key="back" onClick={handleEditCancel}>
            Cancel
          </Button>,
          <Button
            form="editStudentForm"
            key="submit"
            htmlType="submit"
            type="primary"
          >
            Submit
          </Button>,
        ]}
      >
        {/* <AddStudentForm /> */}
        <>
          <Form
            form={form}
            id="editStudentForm"
            name="basic"
            labelCol={{ span: 4 }}
            fields={[
              {
                name: ["name"],
                //@ts-ignore *
                value: editStudent?.name,
              },
              {
                name: ["email"],
                //@ts-ignore *
                value: editStudent?.email,
              },
              {
                name: ["dob"],
                //@ts-ignore *
                value: moment(editStudent?.dob),
              },
            ]}
            onFinish={onFinishEdit}
            onFinishFailed={onFinishEditFailed}
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
      </Modal>
    </>
  );
}
