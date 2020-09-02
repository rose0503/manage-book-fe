import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom';
import { Input, Button, Upload, message } from 'antd';
import Icon, { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import './CreateBook.css'
import bookApi from '../../../api/bookApi';
import { Label } from 'reactstrap';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const CreateBook = () => {
    const history = useHistory();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [url, setUrl] = useState("");

    const [imageUrl, setimageUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const { TextArea } = Input;

    useEffect(() => {
        if(url){
        setLoading(true)
        bookApi.createbook(title, description, url )
        .then(response =>{
            setLoading(false)
            message.success(response.data.message)
            history.push('/')
        }).catch(error =>{
            message.error(error.response.data.error  || "Loading fail")
        })
        }
    },[url])

    const postDetails =  async () => {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "rent-book");
        data.append("cloud_name", "no");

        await fetch("https://api.cloudinary.com/v1_1/quocviet0503/image/upload",{
            method:"post",
            mode:"cors",
            body:data
        })
         .then(res => res.json())
         .then(data => {
             console.log("pass clo")
            setUrl(data.url)
         })
         .catch(err => {
             console.log(err)
         })     
    }

    function getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
      }
      
    function beforeUpload(file) {
        if(file){
            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
            if (!isJpgOrPng) {
                message.error('Chỉ có thể upload JPG/PNG file!');
            }
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                message.error('Hình phải nhỏ hơn 2MB!');
            }
            return isJpgOrPng && isLt2M;
        }
    }
    
    const uploadButton = (
        <div>
          {loading ? <LoadingOutlined /> : <PlusOutlined />}
          <div className="ant-upload-text">Hình ảnh</div>
        </div>
    );
    
    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
          setLoading(true);
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          getBase64(info.file.originFileObj, imageUrl =>
            {
                console.log(`image: ${image}`)
                //localStorage.setItem("test", JSON.stringify(image))
                setLoading(false)
                setimageUrl(imageUrl)
            }
          );
        }
      };
      const handleChange2 = (info) => {
        setImage(info.fileList[0])
      }
    return(
        
        <div className="card input-field" style={{
            margin:"30px auto",
            maxWidth: "670px",
            padding:"20px", 
            textAlign:"center",
            display: "flex",
            alignItems: "center"
        }}>
            <h4 style={{fontFamily:"Arial", fontSize: "1.8rem"}}>Tạo sách mới</h4>
            <div style={{display:"grid", gridTemplateColumns:"auto"}}>
                <div>
                    <Input type="text"
                        placeholder="Tên sách" 
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        className="input-book"
                    />
                    <CKEditor
                        placeholder="Mô tả"
                        style={{marginLeft:"10px !important"}}
                        editor={ ClassicEditor }
                        onChange={ ( event, editor ) => {
                            const data = editor.getData();
                            setDescription(data)
                        } }
                    />
                    <div style={{margin: "5px 0"}}>
                        <Label for="exampleFile">Chọn ảnh</Label>
                        <Input type="file" name="file" id="exampleFile" style={{width: "auto", marginLeft: "5px"}}
                        onChange={e => {
                                    beforeUpload(e.target ? e.target.files[0] : null)
                                    setImage(e.target.files[0])}}/>
                    </div>
                </div>
            </div>
            <Button loading= {loading} style={{width: "135px", marginTop:"10px"}} onClick={postDetails}>
                    Tạo sách 
            </Button>
        </div>
    )
}

export default CreateBook;