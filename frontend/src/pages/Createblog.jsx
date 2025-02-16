import React,{useState} from 'react'
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { uploadFile, createBlog } from '../api/Api';



export default function Createblog() {
    const [value, setValue] = useState('')

    const blankBlog = {
        "title": "",
        "image": "",
        "post": "<p><br></p>",
        "category":""
    }

    const [newblog,setNewblog] = useState(blankBlog);

    const handleUpload = async (event) => {
        const file = event.target.files[0];
    
        if (!file) {
            console.error("No file selected");
            return;
        }
    
        let uploadedFile = await uploadFile(file);
    
        if (uploadedFile && uploadedFile.path) {
            setNewblog((prev) => ({ ...prev, image: uploadedFile.path }));
            console.log("Image set in state:", uploadedFile.path);
        } else {
            console.error("File upload failed or returned an invalid response");
        }
    };

    const handleSubmit = async () => {
        console.log("Submitting Blog:", newblog); // Debugging
    
        let createdBlog = await createBlog(newblog);
        console.log("API Response:", createdBlog); // Debugging API response
    
        setNewblog(blankBlog); 
        alert("Blog added successfully!");
        
    };
    

    const menu = [
        { text: 'Nature', path: '/' },
        { text: 'Travel', path: '/' },
        { text: 'Technology', path: '/' },
        { text: 'Politics', path: '/' },
    ]
    return (
        <div className='flex w-full items-center justify-center'>
            <div className="bg-slate-200 w-[60%] p-5 rounded-xl max-w-4xl min-w-[300px]">
                <h1 className='text-2xl mb-5'>Create Blog Post</h1>
                <div className="flex flex-col">
                    <label htmlFor="" className='ml-1 text-gray-500'>Title</label>
                    <input value={newblog.title} onChange={(e) => setNewblog({...newblog,title:e.target.value})} className='bg-white h-10 border border-gray-300 rounded my-2 p-2' type="text" />
                    <label htmlFor="" className='ml-1 text-gray-500'>Category</label>
                    <select value={newblog.category} onChange={(e) => setNewblog({...newblog,category:e.target.value})}  name="" className='bg-white h-10 border border-gray-300 rounded my-2 p-2' id="">
                        <option value="" default disabled>Select Category</option>
                        {menu.map(x => {
                            return <option value={x.text}>{x.text}</option>
                        })}
                    </select>
                    <label htmlFor="" className='ml-1 text-gray-500 mb-2'>Image</label>
                    <input onChange={(e)=> handleUpload(e)} type="file" className='bg-white h-10 border border-gray-300 rounded my-2 p-2'/>
            <label htmlFor="" className='ml-1 mt-2 text-gray-500'>Post</label>
            <ReactQuill className='bg-white rounded  mt-2 editingarea' theme="snow" value={newblog.post} onChange={(e)=>setNewblog({...newblog,post:e})} />

            <hr />
            <button onClick={()=>handleSubmit()} className='bg-slate-500 text-white h-8 w-[100px] mt-2 rounded'>Submit</button>
                </div>
            </div>
        </div>
    )
}
