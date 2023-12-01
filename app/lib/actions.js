'use server';
import { revalidatePath } from 'next/cache';
import { UserModel } from './models/userSchema';
import { connectToDB } from './utils';
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';
import { ProductModel } from './models/productSchema';
import { signIn } from '../auth';
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
    });
    await newProduct.save();
  } catch (err) {
    console.log(err);
    throw new Error('Failed to add product');
  }
  revalidatePath('/main/dashboard/products');
  redirect('/main/dashboard/products');
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
      password,
      phone,
      address,
      isAdmin,
      isActive,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === '' || undefined) && delete updateFields[key]
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
    await signIn('credentials', {
      username,
      password,
      redirectTo: '/main',
    });

    console.log('Authentication successful');

    return { success: true };
  } catch (error) {
    // Log detallado del error
    console.error('Error during authentication:', error);

    return { error: 'Bad cred' };
  }
};
