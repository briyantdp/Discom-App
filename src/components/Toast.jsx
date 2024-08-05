import { Toaster } from 'react-hot-toast';

export default function Toast() {
  return (
    <Toaster
      position="top-center"
      containerClassName="mb-16 md:mb-8 lg:mb-4"
      toastOptions={{
        className: 'app-toast bg-neutral text-neutral-content',
      }}
    />
  );
}
