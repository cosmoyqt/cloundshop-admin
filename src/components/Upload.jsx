import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
function upload (props) {
  return (
    <Upload
      listType="picture"
      onChange={(file)=> {
        // console.log(file);
        props.setImgList(file.fileList)
      }}
    >
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
  )
}
export default upload