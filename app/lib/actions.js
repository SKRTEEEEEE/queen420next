'use server';
import { revalidatePath } from 'next/cache';
import { UserModel } from './models/userSchema';
import { connectToDB } from './utils';
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';
import { ProductModel } from './models/productSchema';
import { signIn } from '../auth';
import { ArticleModel } from './models/articleSchema';
import { CommentModel } from './models/commentSchema';
import { useFileDelete } from './utils/deleteFileFirebase';
// import mongoose from 'mongoose';
// import { useRouter } from 'next/navigation';
// const router = useRouter();

export const addUser = async (formData) => {
  const { username, email, password, phone, address, isAdmin, isActive } =
    Object.fromEntries(formData);

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    connectToDB();
    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
      phone,
      address,
      isAdmin,
      isActive,
    });
    await newUser.save();
  } catch (err) {
    if (err.code === 11000 && err.keyPattern && err.keyPattern.email === 1) {
      // Manejar el error de duplicación de correo electrónico
      console.error('Error: El correo electrónico ya está en uso.');
    } else {
      // Otros errores
      console.error(err);
      throw new Error('Failed to add user');
    }
  }
  revalidatePath('/main/dashboard/users');
  redirect('/main/dashboard/users');
};

export const addProduct = async (img, formData) => {
  const { title, desc, price, stock, color, size, cathegory } =
    Object.fromEntries(formData);

  try {
    connectToDB();
    const newProduct = new ProductModel({
      title,
      desc,
      price,
      stock,
      color,
      size,
      cathegory,
      img,
    });
    await newProduct.save();
  } catch (err) {
    console.log(err);
    throw new Error('Failed to add product');
  }
  revalidatePath('/main/dashboard/products');
  redirect('/main/dashboard/products');
};
export const addArticle = async (formData) => {
  try {
    connectToDB();

    const { title, cat, content, author, authorId, img, gif } =
      Object.fromEntries(formData);
    // console.log(
    //   'FormData Article:',
    //   'Title:',
    //   title,
    //   'Category:',
    //   cat,
    //   'Content:',
    //   content,
    //   'Author:',
    //   author,
    //   'Author ID:',
    //   authorId,
    //   'Image URL:',
    //   img,
    //   'GIF URL:',
    //   gif
    // );

    // Busca un artículo existente con el mismo título y autorId
    const existingArticle = await ArticleModel.findOne({ title, authorId });

    if (existingArticle) {
      // Si ya existe un artículo con el mismo título y autorId, no lo vuelvas a crear
      console.log('Article with the same title and authorId already exists');
      // Puedes lanzar una excepción, redirigir o manejar esto según tus necesidades
      return;
    }

    // Si no hay un artículo existente, crea uno nuevo
    const newArticle = new ArticleModel({
      title,
      cat,
      content,
      author,
      authorId,
      img,
      gif,
    });

    const savedArticle = await newArticle.save();

    //Añadir comentario predeterminado
    // const newComment = new CommentModel({
    //   content: 'Dime tu opinion de mi articulo!',
    //   authorId,
    //   author,
    // });
    // await newComment.save();

    // // Asocia el comentario al artículo recién creado
    // savedArticle.comments.push(newComment);

    // // Guarda el artículo nuevamente para reflejar la asociación del comentario
    // await savedArticle.save();
    console.log('Saved Article: ', savedArticle);
  } catch (err) {
    console.log(err);
    throw new Error('Failed to add article');
  }

  revalidatePath('/main/agora');
  redirect('/main/agora');
};

export const repostArticle = async (articleId, userId, username) => {
  try {
    connectToDB();

    const article = await ArticleModel.findById(articleId);
    // Verifica si el usuario ya ha dado repost al artículo
    const isUserAlreadyReposted = article.reposts.some(
      (repost) => String(repost.userId) === String(userId)
    );

    if (isUserAlreadyReposted) {
      throw new Error('User has already reposted this article');
    }

    // Agrega el nuevo repost al array de reposts del artículo
    article.reposts.push({
      userId: userId,
      username: username,
    });

    // Actualiza el artículo en la base de datos
    await ArticleModel.updateOne(
      { _id: articleId },
      { reposts: article.reposts }
    );

    console.log('Like added successfully');
  } catch (error) {
    console.error('Error adding repost to article: ', error.message);
    throw new Error('Failed to add repost to article');
  }
  revalidatePath('/main/agora/[author]/[id]', 'page');
};

export const disrepostArticle = async (articleId, userId) => {
  try {
    connectToDB();

    const article = await ArticleModel.findById(articleId);
    if (!article) {
      throw new Error('Article not found');
    }

    // Busca el índice del usuario en el array de "reposts"
    const userRepostIndex = article.reposts.findIndex(
      (repost) => String(repost.userId) === String(userId)
    );

    if (userRepostIndex === -1) {
      throw new Error('User has not given repost to this article');
    }

    // Elimina el "repost" del array de "reposts"
    article.reposts.splice(userRepostIndex, 1);

    // Guarda los cambios en la base de datos
    await article.save();

    console.log('Repost removed successfully');
  } catch (error) {
    console.error('Error removing repost:', error.message);
  } finally {
    // Cierra la conexión a la base de datos
  }
  revalidatePath('/main/agora/[author]/[id]', 'page');
};

export const addLikeArticle = async (articleId, userId) => {
  try {
    connectToDB();
    const article = await ArticleModel.findById(articleId);
    if (!article) {
      throw new Error('Article not found');
    }

    // Verifica si el usuario ya ha dado like al comentario
    if (article.likes.includes(userId)) {
      throw new Error('User has already liked this article');
    }

    // Agrega el ID del usuario al array de likes del comentario
    article.likes.push(userId);

    // Actualiza el comentario en la base de datos
    await ArticleModel.updateOne({ _id: articleId }, { likes: article.likes });

    console.log('Like added successfully');
  } catch (error) {
    console.error('Error adding like to article: ', error.message);
    throw new Error('Failed to add like to article');
  }
  revalidatePath('/main/agora/[author]/[id]', 'page');
};

export const dislikeArticle = async (articleId, userId) => {
  try {
    connectToDB();

    const article = await ArticleModel.findById(articleId);
    if (!article) {
      throw new Error('Article not found');
    }

    // Verifica si el usuario ya ha dado like al articulo
    if (!article.likes.includes(userId)) {
      throw new Error('User has not given like to this article');
    }

    // Elimina el userId del array de likes
    article.likes = article.likes.filter(
      (id) => id.toString() !== userId.toString()
    );

    await article.save();
    console.log('Like added successfully');
  } catch (error) {
    console.error('Error adding like to article: ', error.message);
    throw new Error('Failed to add like to article');
  }
  revalidatePath('/main/agora/[author]/[id]', 'page');
};

export const addLikeComment = async (commentId, userId) => {
  try {
    connectToDB();

    // Verifica si el comentario existe
    console.log('comment _id: ', commentId);
    console.log('user id: ', userId);
    // Ejemplo de cómo podrías verificar y convertir el ID si es necesario

    const comment = await CommentModel.findById(commentId);
    if (!comment) {
      throw new Error('Comment not found');
    }

    // Verifica si el usuario ya ha dado like al comentario
    if (comment.likes.includes(userId)) {
      throw new Error('User has already liked this comment');
    }

    // Agrega el ID del usuario al array de likes del comentario
    comment.likes.push(userId);

    // Actualiza el comentario en la base de datos
    await CommentModel.updateOne({ _id: commentId }, { likes: comment.likes });

    console.log('Like added successfully');
  } catch (error) {
    console.error('Error adding like to comment: ', error.message);
    throw new Error('Failed to add like to comment');
  }
  revalidatePath('/main/agora/[author]/[id]', 'page');
};

export const dislikeComment = async (commentId, userId) => {
  try {
    connectToDB(); // Assuming connectToDB is a function that connects to your database

    const comment = await CommentModel.findById(commentId);

    if (!comment) {
      throw new Error('Comment not found');
    }

    if (!comment.likes.includes(userId)) {
      throw new Error('User has not given like to this comment');
    }

    // Remove the userId from the likes array
    comment.likes = comment.likes.filter(
      (id) => id.toString() !== userId.toString()
    );

    // Save the updated comment
    await comment.save();

    console.log(`Comment disliked by user ${userId}`);
  } catch (error) {
    console.error('Error giving dislike to comment: ', error.message);
    throw new Error('Failed to dislike comment');
  }
  revalidatePath('/main/agora/[author]/[id]', 'page');
};

export const addComment = async ({
  content,
  author,
  authorId,
  articleId,
  likes,
}) => {
  try {
    connectToDB();

    // Verifica si el artículo existe
    const article = await ArticleModel.findById(articleId);
    if (!article) {
      throw new Error('Article not found');
    }

    // console.log(content, author, authorId, articleId);

    // Crea el nuevo comentario
    const newComment = new CommentModel({
      content,
      author,
      authorId,
      likes,
    });

    // Guarda el comentario en la base de datos
    const savedComment = await newComment.save();
    // Asocia el comentario al artículo
    article.comments.push(savedComment._id);
    await article.save();
  } catch (err) {
    console.error(err);
    throw new Error('Failed to add comment');
  }
  revalidatePath('/main/agora/[author]/[id]', 'page');
};

export const deleteProduct = async (formData) => {
  const { id, img } = Object.fromEntries(formData);

  try {
    connectToDB();
    if (img) {
      useFileDelete('products', img);
    }
    await ProductModel.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error('Failed to delete product!');
  }

  revalidatePath('/main/dashboard/products');
};

export const deleteUser = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDB();
    await UserModel.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error('Failed to delete user!');
  }

  revalidatePath('/main/dashboard/products');
};
export const deleteArticle = async (id, imgName, gifName) => {
  // const { id } = Object.fromEntries(formData);

  try {
    connectToDB();
    if (imgName) {
      await useFileDelete('images', imgName);
    }
    if (gifName) {
      await useFileDelete('images', gifName);
    }
    await ArticleModel.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error('Failed to delete article!');
  }

  revalidatePath('/main/agora');
  redirect('/main/agora');
};

export const updateUser = async (formData) => {
  const { id, username, email, password, phone, address, isAdmin, isActive } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    const updateFields = {
      username,
      email,
      phone,
      address,
      isAdmin,
      isActive,
    };

    // Verificar si se proporciona una nueva contraseña
    if (password) {
      // Generar el hash de la nueva contraseña utilizando bcrypt
      const saltRounds = 10; // Puedes ajustar el número de rondas según tus necesidades
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Almacenar el hash en lugar de la contraseña sin cifrar
      updateFields.password = hashedPassword;
    }

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === '' || updateFields[key] === undefined) &&
        delete updateFields[key]
    );

    await UserModel.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error('Failed to update user!');
  }

  revalidatePath('/main/dashboard/users');
  redirect('/main/dashboard/users');
};

export const updateProduct = async (img, formData) => {
  const { id, title, desc, price, stock, color, size } =
    Object.fromEntries(formData);
  console.log('formData: ', formData, 'img: ', img);

  try {
    connectToDB();

    const updateFields = {
      title,
      desc,
      price,
      stock,
      color,
      size,
      img,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === '' || undefined) && delete updateFields[key]
    );

    await ProductModel.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error('Failed to update product!');
  }

  revalidatePath('/main/dashboard/products');
  redirect('/main/dashboard/products');
};

export const authenticate = async (formData) => {
  const { username, password } = Object.fromEntries(formData);

  try {
    const result = await signIn('credentials', {
      username,
      password,
      redirect: false,
    });

    if (result.error) {
      console.error('Error during signIn:', result.error);
      return { error: result.error };
    }

    console.log('Authentication successful');
    return { success: true };
  } catch (error) {
    console.error('Error during authentication:', error);
    return { error: 'Bad cred' };
  }
};
