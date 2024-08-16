import { useState } from 'react';
import axios from 'axios';
import { Button, Form, Input, Radio, Upload, message, Row, Col } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

function UploadForm() {
    const [fileList, setFileList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        date_of_birth: '',
        place_of_birth: '',
        age: '',
        address: '',
        gender: '',
        nationality: '',
        passport_number: '',
        date_of_issue: '',
        date_of_expiry: '',
        place_of_issue: '',
        authority: ''
    });
    const [error, setError] = useState(null);

    const handleImageChange = ({ fileList }) => {
        setFileList(fileList);
        setError(null);
    };

    const handleUpload = async () => {
        if (fileList.length === 0) {
            setError("Please select an image to upload.");
            message.error("Please select an image to upload.");
            return;
        }
        setLoading(true); // Start loader
        const formData = new FormData();
        formData.append('image', fileList[0].originFileObj);

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/upload-image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setFormData(prevData => ({
                ...prevData,
                ...response.data
            }));
            setError(null);
            message.success("Image uploaded successfully!");
        } catch (error) {
            setError("Failed to upload image. " + (error.response?.data?.error || error.message));
            message.error("Failed to upload image.");
        } finally {
            setLoading(false); // Stop loader
        }
    };

    const handleSubmit = async () => {
        setSubmitLoading(true); // Start loader
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/submit-form', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            message.success("Form submitted successfully!");
        } catch (error) {
            setError("Failed to submit form. " + (error.response?.data?.error || error.message));
            message.error("Failed to submit form.");
        } finally {
            setSubmitLoading(false); // Stop loader
        }
    };

    return (
        <div className='bg-white w-full h-full border shadow-lg border-gray-200 rounded-lg p-6'>
            <h2 className='font-semibold'>Upload Passport Image</h2>
            <Form>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <Form.Item>
                    <Upload
                        beforeUpload={() => false}
                        onChange={handleImageChange}
                        fileList={fileList}
                        listType="picture-card"
                    >
                        <Button icon={<UploadOutlined />}></Button>
                    </Upload>
                </Form.Item>

                <Form.Item>
                    <Button
                        className='bg-[#7752FE] text-white'
                        onClick={handleUpload}
                        loading={loading} // Show loading spinner
                        disabled={loading} // Disable button while loading
                    >
                        {loading ? "Uploading..." : "Upload Image"}
                    </Button>
                </Form.Item>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="Name">
                            <Input size='large' type="text" value={formData.name} readOnly />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Date of Birth">
                            <Input size='large' type="text" value={formData.date_of_birth} readOnly />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="Place of Birth">
                            <Input size='large' type="text" value={formData.place_of_birth} readOnly />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Age">
                            <Input size='large' type="text" value={formData.age} readOnly />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="Passport Number">
                            <Input size='large' type="text" value={formData.passport_number} readOnly />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Date of Issue">
                            <Input size='large' type="text" value={formData.date_of_issue} readOnly />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="Gender">
                            <Radio.Group size='large' value={formData.gender} readOnly>
                                <Radio value="male"> Male </Radio>
                                <Radio value="female"> Female </Radio>
                                <Radio value="other"> Other </Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Nationality">
                            <Input size='large' type="text" value={formData.nationality} readOnly />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="Date of Expiry">
                            <Input size='large' type="text" value={formData.date_of_expiry} readOnly />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Place of Issue">
                            <Input size='large' type="text" value={formData.place_of_issue} readOnly />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="Authority">
                            <Input size='large' type="text" value={formData.authority} readOnly />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Address">
                            <Input size='large' type="text" value={formData.address} readOnly />
                        </Form.Item>
                    </Col>
                </Row>

                <div className='bg-[#7752FE] w-full py-2 rounded-md'>
                    <Button
                        onClick={handleSubmit}
                        type='submit'
                        className='text-white font-semibold'
                        loading={submitLoading}  // Show loading spinner
                        disabled={submitLoading} // Disable button while loading
                    >
                        {submitLoading ? "Submitting..." : "Submit"}
                    </Button>
                </div>
            </Form>
        </div>
    );
}

export default UploadForm;
