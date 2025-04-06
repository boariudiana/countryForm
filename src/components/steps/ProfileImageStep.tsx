import { Form, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadFile, RcFile } from 'antd/es/upload/interface';

const ProfileImageStep = () => {
  const normFile = (e: { fileList: UploadFile[] }) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const beforeUpload = (file: RcFile) => {
    // Check file type
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('You can only upload image files!');
      return Upload.LIST_IGNORE;
    }

    // Check file size (1MB)
    const isLt1M = file.size / 1024 / 1024 < 1;
    if (!isLt1M) {
      message.error('Image must be smaller than 1MB!');
      return Upload.LIST_IGNORE;
    }

    // Check image dimensions
    return new Promise<boolean>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target?.result as string;
        img.onload = () => {
          const width = img.width;
          const height = img.height;
          if (width > 600 || height > 600) {
            message.error('Image dimensions must be 600x600 pixels or smaller!');
            reject(new Error('Image dimensions must be 600x600 pixels or smaller!'));
          } else {
            resolve(true);
          }
        };
      };
    }).catch(() => {
      return Upload.LIST_IGNORE;
    });
  };

  return (
    <div>
      <h3>Profile Image</h3>
      <p>Please upload a profile photo (max 600x600 pixels, max 1MB)</p>
      
      <Form.Item
        name="profileImage"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        rules={[
          { required: true, message: 'Please upload a profile image' },

        ]}
      >
        <Upload
          listType="picture"
          maxCount={1}
          beforeUpload={beforeUpload}
          accept="image/*"
          multiple={false}
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