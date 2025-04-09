import { useState } from "react"
import toast from "react-hot-toast"
import uploadMedia from "../utils/mediaUpload"


export default function Testing() {
    const[file,setFile]=useState(null)


    function handleUpload() {
        uploadMedia(file).then(
            (url) => {
                console.log(url)
                toast.success("File uploaded successfully")
            }
        ).catch(
            (error) => {
                console.log(error)
                toast.error("File upload failed")
            }
        )


    }

  return (
    <div className="w-full h-screen bg-gray-200 flex flex-col justify-center items-center ">
        <input 
            type="file"  
            onChange={(e)=>{
                setFile(e.target.files[0]);
                
            }}
        />
        <button onClick={handleUpload} className="bg-gray-300 p-2 rounded-lg hover:bg-gray-400 cursor-pointer ">Upload</button>
    </div>
  )
}