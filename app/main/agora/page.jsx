import Blog from '@/app/ui/agora/blog';

const Agora = ({ searchParams }) => {
  return (
    <div className="bg-purple-900 text-white flex flex-col items-center h-screen overflow-hidden">
      <div className="w-full text-init ms-8">
        <p>This is the </p>
        <h1 className="text-red-900">Agora</h1>
      </div>
      <Blog searchParams={searchParams} />
    </div>
  );
};

export default Agora;
