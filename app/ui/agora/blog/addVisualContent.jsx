'use client';

import { GrAddCircle } from 'react-icons/gr';
import {
  AiOutlinePaperClip,
  AiOutlinePicture,
  AiOutlinePlayCircle,
} from 'react-icons/ai';
import { useState } from 'react';

const AddVisualContent = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <GrAddCircle size={60} color="black" onClick={() => setOpen(!open)} />

      {open && (
        <>
          <input type="value" id="image" style={{ display: 'none' }} />
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
    </>
  );
};

export default AddVisualContent;
