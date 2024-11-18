import React, { useEffect, useRef, useState } from 'react';
import { uploadFile } from '../services/api';

const Home = () => {
  const [file, setFile] = useState("");
  const [result, setResult] = useState('');

  const FileInputRef = useRef();

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        try {
          let response = await uploadFile(data);
          console.log('File upload response:', response); // Log the response
          setResult(response.path);
        } catch (error) {
          console.error('Error during file upload:', error.message);
        }
      }
    }
    getImage();
  }, [file]);

  const onUploadClick = () => {
    FileInputRef.current.click();
  }

  return (
    <div className='flex flex-col lg:flex-row items-center justify-center lg:justify-start min-h-screen w-full bg-black'>
      <div className='hidden lg:block h-screen'>
        <img src='./banner.jpeg' alt='Banner' className='h-full rounded-lg ml-0 overflow-hidden' />
      </div>
      <div className='bg-slate-900 shadow-lg shadow-slate-800 h-[32vh] w-[80vw] md:w-[60vw] lg:w-[64vh] border-spacing-2 rounded-lg flex flex-col items-center justify-center p-6 lg:ml-[350px]'>
        <h1 className='text-white font-bold text-2xl mt-4 lg:mt-9'>FileShare</h1>
        <p className='text-white text-[18px] mt-2'>Upload file to share!!</p>
        <button onClick={onUploadClick} className='p-2 font-semibold bg-purple-500 text-white rounded-lg hover:bg-white hover:text-purple-500 border-white border-2 shadow-lg mt-4 lg:mt-12'>Upload</button>
        <input 
          type='file' 
          ref={FileInputRef}
          className='hidden'
          onChange={(e) => setFile(e.target.files[0])}
        />
        {result && <a href={result} className='text-white mt-4 hover:text-slate-600' target='_blank' rel='noopener noreferrer'>{result}</a>}
      </div>
    </div>
  );
}

export default Home;
