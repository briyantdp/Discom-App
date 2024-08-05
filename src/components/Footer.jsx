export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full p-4 lg:container lg:mx-auto">
      <p className="text-md text-center text-white font-semibold">
        {year}
        {' '}
        - Bryant Dawson Priyantoro
      </p>
    </footer>
  );
}
