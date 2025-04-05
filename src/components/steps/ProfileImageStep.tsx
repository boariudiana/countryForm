import { Form, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const ProfileImageStep = () => {
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const beforeUpload = (file: File) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('You can only upload image files!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must be smaller than 2MB!');
    }
    return isImage && isLt2M;
  };

  return (
    <div>
      <h3>Profile Image</h3>
      <p>Please upload a profile photo</p>
      
      <Form.Item
        name="profileImage"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        rules={[{ required: true, message: 'Please upload a profile image' }]}
      >
        <Upload
          listType="picture"
          maxCount={1}
          beforeUpload={beforeUpload}
          accept="image/*"
        >
          <div>
            <UploadOutlined /> Click to upload
          </div>
        </Upload>
      </Form.Item>
    </div>
  );
};

export default ProfileImageStep; 