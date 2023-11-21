import Navbar from '@/app/ui/main/navbar';

export default function AgoraLayout({ children }) {
  return (
    <>
      <div className="">
        <div className="max-h-screen fixed">
          <div className="">
            <Navbar />
          </div>
          {children}
        </div>
      </div>
    </>
  );
}
