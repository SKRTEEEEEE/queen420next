// 'use client';

import { updateProduct } from '@/app/lib/actions';
import { fetchProduct } from '@/app/lib/data';
// import useFileUpdate from '@/app/lib/utils/updateFileFirebase';

import styles from '@/app/ui/dashboard/products/singleProduct/singleProduct.module.css';
import Image from 'next/image';
// import { useState } from 'react';

const SingleProductPage = async ({ params }) => {
  const { id } = params;
  const product = await fetchProduct(id);
  // const [fileImg, setFileImg] = useState(null);
  // const [img, setImg] = useState(product.img);

  // const onSuccessImg = (downloadURL) => {
  //   setImg(downloadURL);
  // };

  // const onErrorImg = (error) => {
  //   console.error('Error during img upload:', error);
  // };

  // // useFileUpdate(fileImg, product.img, onSuccessImg, onErrorImg);

  // const updateProductAction = updateProduct.bind(null, img);

  // const handleFileChange = (e) => {
  //   setFileImg(e.target.files[0]);
  // };

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image
            src={product.img ? product.img : '/noavatar.png'}
            alt=""
            fill
          />
        </div>
        {product.title}
        {/* <input type="file" onChange={handleFileChange} id="image" />
        <button
          onClick={useFileUpdate(
            fileImg,
            product.img,
            onSuccessImg,
            onErrorImg
          )}
        >
          Uplaod Photo
        </button> */}
      </div>
      <div className={styles.formContainer}>
        <form action={updateProduct} className={styles.form}>
          <input type="hidden" name="id" value={product.id} />
          <label>Title</label>
          <input type="text" name="title" placeholder={product.title} />
          <label>Price</label>
          <input type="number" name="price" placeholder={product.price} />
          <label>Stock</label>
          <input type="number" name="stock" placeholder={product.stock} />
          <label>Color</label>
          <input
            type="text"
            name="color"
            placeholder={product.color || 'color'}
          />
          <label>Size</label>
          <textarea
            type="text"
            name="size"
            placeholder={product.size || 'size'}
          />
          <label>Cat</label>
          <select name="cat" id="cat">
            <option value="kitchen">Kitchen</option>
            <option value="computers">Computers</option>
          </select>
          <label>Description</label>
          <textarea
            name="desc"
            id="desc"
            rows="10"
            placeholder={product.desc}
          ></textarea>
          <button>Update</button>
        </form>
      </div>
    </div>
  );
};

export default SingleProductPage;
