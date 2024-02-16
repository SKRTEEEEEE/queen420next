import Link from 'next/link';

const Homepage = () => {
  return (
    <div>
      <h1>Homepage</h1>
      <Link href="/main">
        <p>Discover our world!</p>
      </Link>
    </div>
  );
};

export default Homepage;
