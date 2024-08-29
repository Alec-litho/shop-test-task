import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Welcome to Shopverse</h1>
      <p>Discover amazing products!</p>
      <Link href="/products">
        <div className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer mt-4">
          View Products
        </div>
      </Link>
    </main>
  )
}
