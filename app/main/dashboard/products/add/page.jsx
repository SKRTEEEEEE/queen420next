'use client';

import { addProduct } from '@/app/lib/actions';
import useFileUpload from '@/app/lib/utils/upFileFirebase';
import styles from '@/app/ui/dashboard/products/addProduct/addProduct.module.css';
import { useState } from 'react';

const AddProductPage = () => {
  const [fileImg, setFileImg] = useState(null);
  const [img, setImg] = useState('');

  const onSuccessImg = (downloadURL) => {
    setImg(downloadURL);
  };
  const onErrorImg = (error) => {
    console.error('Error during img upload:', error);
  };
  useFileUpload('products', fileImg, onSuccessImg, onErrorImg);
  const addProductAction = addProduct.bind(null, img);
  return (
    <div className={styles.container}>
      <form action={addProductAction} className={styles.form}>
        <input
          type="file"
          onChange={(e) => setFileImg(e.target.files[0])}
          id="image"
        />
        <input type="text" placeholder="title" name="title" required />
        <select name="cat" id="cat">
          <option value="general">Choose a Category</option>
          <option value="kitchen">Kitchen</option>
          <option value="phone">Phone</option>
          <option value="computer">Computer</option>
        </select>
        <input type="number" placeholder="price" name="price" required />
        <input type="number" placeholder="stock" name="stock" required />
        <input type="text" placeholder="color" name="color" />
        <input type="text" placeholder="size" name="size" />
        <textarea
          required
          name="desc"
          id="desc"
          rows="16"
          placeholder="Description"
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddProductPage;
