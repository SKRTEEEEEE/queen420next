//Fetch our data using this file

import { ProductModel } from './models/productSchema';
import { UserModel } from '../lib/models/userSchema';
import { connectToDB } from './utils';
import { ArticleModel } from './models/articleSchema';

export const fetchArticle = async (id) => {
  connectToDB();
  const article = await ArticleModel.findById(id).populate('comments');
  //console.log(article);
  return article;
};

export const fetchArticlesbyAuthor = async (author, cat, q, page) => {
  //En caso de llegar "q" un querry, la funcion find solo buscara el usuario "regex" que sera lo que se busque en el querry
  const regex = new RegExp(q, 'i');
  const catRegex = new RegExp(cat, 'i');
  const ITEMS_PAGE = 3;
  try {
    connectToDB();
    const count = await ArticleModel.find({
      title: { $regex: regex },
      cat: { $regex: catRegex },
      author: author,
    }).count();
    const articles = await ArticleModel.find({
      title: { $regex: regex },
      cat: { $regex: catRegex },
      author: author,
    })
      .limit(ITEMS_PAGE)
      .skip(ITEMS_PAGE * (page - 1));
    return { count, articles };
  } catch (err) {
    console.log(err);
    throw new Error('Failed to fetch Users');
  }
};

export const fetchArticles = async (cat, q, page) => {
  //En caso de llegar "q" un querry, la funcion find solo buscara el usuario "regex" que sera lo que se busque en el querry
  const regex = new RegExp(q, 'i');
  const catRegex = new RegExp(cat, 'i');
  console.log(cat);

  const ITEMS_PAGE = 3;
  try {
    connectToDB();
    const count = await ArticleModel.find({
      title: { $regex: regex },
      cat: { $regex: catRegex },
    }).count();
    const articles = await ArticleModel.find({
      title: { $regex: regex },
      cat: { $regex: catRegex },
    })
      .limit(ITEMS_PAGE)
      .skip(ITEMS_PAGE * (page - 1));
    return { count, articles };
  } catch (err) {
    console.log(err);
    throw new Error('Failed to fetch Users');
  }
};

export const fetchUsers = async (q, page) => {
  //En caso de llegar "q" un querry, la funcion find solo buscara el usuario "regex" que sera lo que se busque en el querry
  const regex = new RegExp(q, 'i');

  const ITEMS_PAGE = 4;
  try {
    connectToDB();
    const count = await UserModel.find({ username: { $regex: regex } }).count();
    const users = await UserModel.find({ username: { $regex: regex } })
      .limit(ITEMS_PAGE)
      .skip(ITEMS_PAGE * (page - 1));
    return { count, users };
  } catch (err) {
    console.log(err);
    throw new Error('Failed to fetch Users');
  }
};
export const fetchUser = async (id) => {
  try {
    connectToDB();
    const user = UserModel.findById(id);
    return user;
  } catch (err) {
    console.log(err);
    throw new Error(`Failed to fetch the user: ${user}`);
  }
};

export const fetchProducts = async (q, page) => {
  try {
    const regex = new RegExp(q, 'i');

    const ITEMS_PAGE = 4;
    connectToDB();
    const count = await ProductModel.find({ title: { $regex: regex } }).count();
    const products = await ProductModel.find({ title: { $regex: regex } })
      .limit(ITEMS_PAGE)
      .skip(ITEMS_PAGE * (page - 1));
    return { count, products };
  } catch (err) {
    console.error(err);
    throw new Error('Failed to fetch Products');
  }
};
export const fetchProduct = async (id) => {
  try {
    connectToDB();
    const product = ProductModel.findById(id);
    return product;
  } catch (err) {
    console.log(err);
    throw new Error(`Failed to fetch the product: ${product}`);
  }
};
