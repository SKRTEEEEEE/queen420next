'use client';

// import {
//   getStorage,
//   ref,
//   uploadBytesResumable,
//   getDownloadURL,
// } from 'firebase/storage';

import { useState } from 'react';
import { addArticle } from '@/app/lib/actions';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.bubble.css';
import { GrAddCircle } from 'react-icons/gr';
import { AiOutlinePicture } from 'react-icons/ai';
// import { app } from '@/app/lib/utils/firebaseConfig';
import { MdOutlineGifBox, MdOutlineMusicVideo } from 'react-icons/md';
import useFileUpload from '@/app/lib/utils/upFileFirebase';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const AddArticleContent = ({ username, authorId }) => {
  const [open, setOpen] = useState(false);
  const [fileImg, setFileImg] = useState(null);
  const [img, setImg] = useState('');
  const [fileGif, setFileGif] = useState(null);
  const [gif, setGif] = useState('');
  const [title, setTitle] = useState('');
  const [cat, setCat] = useState('');
  const [content, setContent] = useState('');

  // useEffect(() => {
  //   const storage = getStorage(app);

  //   const uploadFile = async () => {
  //     try {
  //       if (file) {
  //         const timestamp = new Date().getTime();
  //         const fileName = `${timestamp}_${file.name}`;
  //         const storageRef = ref(storage, `images/${fileName}`);
  //         const uploadTask = uploadBytesResumable(storageRef, file);

  //         uploadTask.on(
  //           'state_changed',
  //           (snapshot) => {
  //             const progress =
  //               (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //             console.log(`Upload is ${progress}% done`);
  //           },
  //           (error) => {
  //             console.error('Error during upload:', error);
  //           },
  //           async () => {
  //             try {
  //               const downloadURL = await getDownloadURL(
  //                 uploadTask.snapshot.ref
  //               );
  //               setImg(downloadURL);
  //             } catch (error) {
  //               console.error('Error getting download URL:', error);
  //             }
  //           }
  //         );
  //       }
  //     } catch (error) {
  //       console.error('Error uploading image:', error);
  //     }
  //   };

  //   uploadFile();
  // }, [file]);

  const onSuccessImg = (downloadURL) => {
    setImg(downloadURL);
  };
  const onErrorImg = (error) => {
    console.error('Error during img upload:', error);
  };
  useFileUpload('images', fileImg, onSuccessImg, onErrorImg);

  const onSuccessGif = (downloadURL) => {
    setGif(downloadURL);
  };
  const onErrorGif = (error) => {
    console.error('Error during gif upload:', error);
  };
  useFileUpload('images', fileGif, onSuccessGif, onErrorGif);

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('cat', cat);
      formData.append('content', content);
      formData.append('author', username);
      formData.append('authorId', authorId);
      formData.append('img', img);
      formData.append('gif', gif);

      await addArticle(formData);

      console.log(formData);
    } catch (error) {
      console.error('Error while adding article:', error);
    }
  };

  return (
    <div className="w-screen sm:p-8 bg-white h-screen">
      <form onSubmit={handleSubmit} className="text-black">
        <div className="flex sm:gap-8 flex-wrap items-center ">
          <input
            type="text"
            placeholder="Title"
            className="sm:p-4 w-1/3 outline-none border-2 rounded-md border-fuchsia-900"
            name="title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <select
            className="text-black border-2 rounded-md border-fuchsia-900"
            name="cat"
            id="cat"
            value={cat}
            onChange={(e) => setCat(e.target.value)}
          >
            <option value="">Put your category</option>
            <option value="policy">policy</option>
            <option value="web3">web3</option>
            <option value="techs">techs</option>
            <option value="programming">programming</option>
          </select>

          <GrAddCircle size={60} color="black" onClick={() => setOpen(!open)} />

          {open && (
            <>
              <input
                type="file"
                onChange={(e) => setFileImg(e.target.files[0])}
                id="image"
                style={{ display: 'none' }}
              />

              <label htmlFor="image">
                <AiOutlinePicture color="black" size={40} />
              </label>
              <input
                type="file"
                onChange={(e) => setFileGif(e.target.files[0])}
                id="gif"
                style={{ display: 'none' }}
              />
              <label htmlFor="gif">
                <MdOutlineGifBox color="black" size={40} />
              </label>
              <label htmlFor="">
                <MdOutlineMusicVideo color="black" size={40} />
              </label>
            </>
          )}
        </div>
        <div className="flex sm:h-screen">
          <ReactQuill
            className="w-4/5 text-lg sm:p-12 "
            theme="bubble"
            value={content}
            onChange={handleContentChange}
            placeholder="Tell your story..."
          />
          <button
            className="border-4 h-14 w-20 rounded-md border-fuchsia-900 text-lg hover:bg-fuchsia-200/10"
            type="submit"
          >
            Publish
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddArticleContent;
