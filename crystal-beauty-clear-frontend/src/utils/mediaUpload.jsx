import { createClient } from "@supabase/supabase-js";


// Create a supabase client- it connects to the supabase instance using the url and the key
    const supabase= createClient("https://xiqxtbrqrsyumttuunbu.supabase.co",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhpcXh0YnJxcnN5dW10dHV1bmJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQxNzM4NjUsImV4cCI6MjA1OTc0OTg2NX0.74xmWIg5ibNV1CuODgcJipsritkZcksfq5XH43JHUFI")


export default function uploadMedia(file) {
    const promise = new Promise(
        (resolve, reject) => {
            if(file==null){
                reject("No file selected")
            }
            const timeStamp = new Date().getTime()
            const newFileName = timeStamp + file.name

            supabase.storage.from("images").upload(newFileName,file,{
                cacheControl: "3600",
                upsert: false,
            }).then(()=>{
                const url = supabase.storage.from("images").getPublicUrl(newFileName).data.publicUrl
                resolve(url)
            }).catch(
                (error)=>{
                    reject("Error uploading file")
                }
            )

        }
    )
    return promise
}
