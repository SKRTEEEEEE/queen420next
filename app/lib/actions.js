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

export const addProduct = async (formData) => {
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

    const { title, cat, content, author, authorId } =
      Object.fromEntries(formData);
    console.log('FormData:', title, cat, content, author, authorId);

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
    });

    const savedArticle = await newArticle.save();

    const newComment = new CommentModel({
      content: 'Dime tu opinion de mi articulo!',
      authorId,
      author,
    });
    await newComment.save();

    // Asocia el comentario al artículo recién creado
    savedArticle.comments.push(newComment);

    // Guarda el artículo nuevamente para reflejar la asociación del comentario
    await savedArticle.save();
  } catch (err) {
    console.log(err);
    throw new Error('Failed to add article');
  }

  revalidatePath('/main/agora');
  redirect('/main/agora');
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

    // Guarda el artículo nuevamente para reflejar la asociación del comentario
    await article.save();

    //return savedComment;
  } catch (err) {
    console.error(err);
    throw new Error('Failed to add comment');
  }
  //revalidatePath();
};

export const deleteProduct = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDB();
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

export const updateProduct = async (formData) => {
  const { id, title, desc, price, stock, color, size } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    const updateFields = {
      title,
      desc,
      price,
      stock,
      color,
      size,
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

/*
export const authenticate = async (formData) => {
  const { username, password } = Object.fromEntries(formData);

  try {
    await signIn('credentials', {
      username,
      password,
    });

    // Return a success object
    return { success: true };
  } catch (error) {
    // Return an error object
    console.log(error);
    return { error: 'Bad cred' };
  }
};
*/
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
