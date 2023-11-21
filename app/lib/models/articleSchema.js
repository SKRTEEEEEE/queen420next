import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    summary: String,
    content: String,
    cover: String,
    author: {
      type: String,
      required: true,
    },
    cat: String,
    img: String,
  },
  {
    timestamps: true,
  }
);

export const ArticleModel =
  mongoose.models.Article || mongoose.model('Article', articleSchema);

// module.exports = ArticleModel;
