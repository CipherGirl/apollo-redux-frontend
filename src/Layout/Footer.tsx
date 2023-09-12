import logo from '/images/logo.png';
export default function Footer() {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <div className="bg-[#242630] text-secondary py-4 px-6 flex items-center w-full gap-5">
      <img className="h-10" src={logo} alt="Logo" />
      <p>Privacy Policy</p>
      <p>Terms & Condition</p>

      <p className="font-lilita ml-auto"> &#169; Book Club {year}</p>
    </div>
  );
}
