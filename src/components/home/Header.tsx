import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <div className="container h-auto flex items-center justify-center gap-32">
      <img className="w-auto h-[500px]" src="/images/logo.png" />
      <div className="w-1/3 flex flex-col items-center justify-center gap-6 text-slate-600 text-center">
        <h1 className="text-4xl font-lilita">Welcome to Book Club!</h1>
        <p className="text-lg">
          Browse through large collection books, read and give reviews,
          contribute by adding books to the collection. Register to become part
          of the largest book club of bookworms!
        </p>
        <Button
          size={'sm'}
          className="bg-gradient-to-r from-sky-500 to-indigo-500 text-sm text-slate-50 button-hover"
        >
          Register
        </Button>
      </div>
    </div>
  );
};

export default Header;
