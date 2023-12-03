import { auth } from '@/app/auth';
import AddArticleContent from '@/app/ui/agora/blog/addArticle';

//import Image from 'next/image';

const AddArticlePage = async () => {
  const user = await auth();
  console.log(user);
  return (
    <>
      <AddArticleContent username={user.username} authorId={user.id} />
    </>
  );
};

export default AddArticlePage;
