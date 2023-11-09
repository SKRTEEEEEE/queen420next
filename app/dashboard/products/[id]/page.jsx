import styles from '@/app/ui/dashboard/products/singleProduct/singleProduct.module.css';
import Image from 'next/image';

const SingleProductPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src={'/noavatar.png'} alt="" fill />
        </div>
        Jhon Dee
      </div>
      <div className={styles.formContainer}>
        <form action="{updateUser}" className={styles.form}>
          <label>Title</label>
          <input type="text" name="title" placeholder="{user.username}" />
          <label>Price</label>
          <input type="number" name="price" placeholder="{user.email}" />
          <label>Stock</label>
          <input type="number" name="stock" placeholder="{user.phone}" />
          <label>Size</label>
          <textarea type="text" name="size" placeholder="{user.address}" />
          <label>Category</label>
          <select name="category" id="category">
            <option value="merch">Merch</option>
            <option value="tech">Tech</option>
            <option value="service">Service</option>
          </select>
          <label>Description</label>
          <textarea
            type="text"
            rows="8"
            name="description"
            placeholder="{user.address}"
          />
          <button>Update</button>
        </form>
      </div>
    </div>
  );
};

export default SingleProductPage;
