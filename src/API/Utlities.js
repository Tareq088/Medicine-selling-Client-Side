import axios from "axios";

export const imagUploadURl = async(imageData) =>{
    const formData = new FormData();
    formData.append('image', imageData);
    const imagUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`
    const res = await axios.post(imagUploadUrl, formData);
    return res.data.data.url;
}