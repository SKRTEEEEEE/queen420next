'use client';

import { useState } from 'react';
import { addArticle } from '@/app/lib/actions';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.bubble.css';
import AddVisualContent from './addVisualContent';
// import { auth } from '@/app/auth';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const AddArticleContent = ({ username, authorId }) => {
  const [title, setTitle] = useState('');
  const [cat, setCat] = useState('');
  const [content, setContent] = useState('');

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('cat', cat);
    formData.append('content', content);
    formData.append('author', username);
    formData.append('authorId', authorId);

    try {
      await addArticle(formData);
      // Resto del código de redirección o manejo de éxito
    } catch (error) {
      console.error('Error while adding article:', error);
      // Manejar el error según sea necesario
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

          <AddVisualContent />
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
