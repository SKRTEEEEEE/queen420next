'use client';

//import Image from 'next/image';
import { useState } from 'react';
import { GrAddCircle } from 'react-icons/gr';
import {
  AiOutlinePaperClip,
  AiOutlinePicture,
  AiOutlinePlayCircle,
} from 'react-icons/ai';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';

const AddArticle = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  return (
    <div className="w-screen sm:p-8 bg-white h-screen">
      <div className="text-black">
        <div className="flex sm:gap-8 flex-wrap items-center ">
          <input
            type="text"
            placeholder="Title"
            className="sm:p-4 w-1/3 outline-none  border-2 rounded-md border-fuchsia-900"
            onChange="{(e) => setTitle(e.target.value)}"
          />
          <select
            className="text-black border-2 rounded-md border-fuchsia-900"
            onChange="{(e) => setCatSlug(e.target.value)}"
          >
            <option value="">Put your category</option>
            <option value="policy">policy</option>
            <option value="web3">web3</option>
            <option value="techs">techs</option>
            <option value="programming">programming</option>
            {/*<option value="travel">travel</option>
          <option value="coding">coding</option>*/}
          </select>

          <button className="{styles.button}" onClick={() => setOpen(!open)}>
            <GrAddCircle size={60} color="black" />
          </button>
          {open && (
            <>
              <input
                type="value"
                id="image"
                onChange="{(e) => setvalue(e.target.values[0])}"
                style={{ display: 'none' }}
              />
              <button className="">
                <label htmlFor="image">
                  <AiOutlinePicture color="black" size={40} />
                </label>
              </button>
              <button className="">
                <AiOutlinePaperClip color="black" size={40} />
              </button>
              <button className="">
                <AiOutlinePlayCircle color="black" size={40} />
              </button>
            </>
          )}
        </div>
        <div className="flex sm:h-screen">
          <ReactQuill
            className="w-4/5 text-lg sm:p-12 "
            theme="bubble"
            value={value}
            onChange={setValue}
            placeholder="Tell your story..."
          />
          <button
            className="border-4 h-14 w-20 rounded-md border-fuchsia-900  text-lg hover:bg-fuchsia-200/10"
            onClick="{handleSubmit}"
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};
export default AddArticle;
