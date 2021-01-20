import React from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
function UploadImg (props) {
  const [list,setlist] =React.useState([]);
  const handleBeforeUpload = file => {
    //限制图片 格式、size、分辨率
    const isJPG = file.type === 'image/jpg';
    const isJPEG = file.type === 'image/jpeg';
    const isGIF = file.type === 'image/gif';
    const isPNG = file.type === 'image/png';
    if (!(isJPG || isJPEG || isGIF || isPNG)) {
      message.error('只能上传JPG 、JPEG 、GIF、 PNG格式的图片~~');
      return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 3;
    if (!isLt2M) {
      message.error('超过2M限制，不允许上传~');
      return false;
    }
    return (isJPG || isJPEG || isGIF || isPNG) && isLt2M && checkImageWH(file);
  };
  const showimg = () => {
    if(props.imgList.length === 0){
      return 
    }
    let imgarr = [];
    for (let index = 0; index <  props.imgList.length; index++) {
      imgarr.push({uid:index+1,name:index+1,url:props.imgList[index]})
    }
    return imgarr;
  }
  const checkImageWH = file => {
    return new Promise(function (resolve, reject) {
      let filereader = new FileReader();
      filereader.onload = e => {
        let src = e.target.result;
        const image = new Image();
        image.onload = function () {
          // 获取图片的宽高，并存放到file对象中
          file.width = this.width;
          file.height = this.height;
          resolve();
        };
        image.onerror = reject;
        image.src = src;
      };
      filereader.readAsDataURL(file);
    });
  }
  return (
    <>
      <Upload
      fileList={showimg()}
        listType="picture"
        action="http://127.0.0.1:7001/api/uploads"
        beforeUpload={handleBeforeUpload}
        onSuccess={(res)=> {
         let list =  props.imgList;
         list.push(res.data.avatar)
          props.setImgList(list)
          setlist(list)
        }}
      >
        <Button icon={<UploadOutlined />}>Upload</Button>
      </Upload>
    </>
  )
}
export default UploadImg
