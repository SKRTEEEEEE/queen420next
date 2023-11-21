import Blog from '@/app/ui/agora/blog/blog';

const AgoraUser = ({ searchParams }) => {
  return (
    <div className="bg-purple-900 text-white flex flex-col items-center h-screen">
      <Blog searchParams={searchParams} />
    </div>
  );
};

export default AgoraUser;
