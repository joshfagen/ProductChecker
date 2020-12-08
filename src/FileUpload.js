import React, { useState } from 'react';
import axios from 'axios';

function submitForm(contentType, data, setResponse) {
    axios({
    url: '/fileupload',
    method: 'POST',
    data: data,
    headers: {
    'Content-Type': contentType
    }
    }).then((response) => {
    setResponse(response.data);
    }).catch((error) => {
    setResponse("error");
    })
   }



const FileUpload = () => {

    const [file, setFile] = useState(null);

    const convertToJson =()=>{
        console.log('addToQue')
        axios({
            url: '/fileupload/addToQue',
            }).then((response) => {
console.log(response)
            }).catch((error) => {
                console.log(error)
            })
           }   
    

    function uploadWithFormData(){
        const formData = new FormData();

        formData.append("file", file);

       
        submitForm("multipart/form-data", formData, (msg) => console.log(msg));
        }
   
// const downloadApproved = ()=>{
//     axios({
//         url: '/fileDownload',
//         }).then((response) => {
// console.log(response)
//         }).catch((error) => {
//             console.log(error)
//         })
//        } 



      return(
          <>
          <div style={{textAlign:"center",marginTop:"4rem",height:"60rem"}}>
              <h2>Asins To Be Checked Upload</h2>
        <form>
         <input  style={{height:"2rem",width:"20rem"}} type="file" name="file" onChange={(e) => setFile(e.target.files[0])} />
         <input style={{height:"2rem",width:"20rem"}} type="button" value="Upload" onClick={uploadWithFormData} />
 <input style={{height:"2rem",width:"20rem"}} type="button" value="Send To Que" onClick={convertToJson}/>
 </form>
 <hr></hr>
 <h2>Approved Asins Download</h2>
        <form>
        <a href="https://ca-restriction-check.herokuapp.com/filedownload">
         <input style={{height:"2rem",width:"20rem"}} type="button" value="Download" />
         </a>
 </form>
 </div>
 </>
        )
    
    }

export default FileUpload;