import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <div className="container h-[calc(100vh-64px)] flex items-center justify-between gap-32">
      <div className="w-1/2">
        <img src="/images/logo.png" />
      </div>
      <div className="w-1/2 flex flex-col items-center justify-center gap-6 text-slate-600">
        <h1 className="text-5xl font-lilita">Welcome to Book Club!</h1>
        <p className="text-lg text-center">
          Browse through large collection books, read and give reviews,
          contribute by adding books to the collection. Register to become part
          of the largest book club of bookworms!
        </p>
        <Button className="bg-gradient-to-r from-sky-500 to-indigo-500 text-lg text-slate-50 button-hover">
          Register
        </Button>
      </div>
    </div>
  );
};

export default Header;
