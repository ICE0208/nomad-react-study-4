export default function Footer() {
  return (
    <div className="flex h-24 w-full items-center bg-[#1A1C2A] px-8 text-lg text-[#ffffffd4]">
      <span>&copy; {`${new Date().getFullYear()}`}</span>
    </div>
  );
}
