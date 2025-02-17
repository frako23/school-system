import Image from "next/image";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex">
      <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] bg-red-200 p-4">
        <Link
          href="/"
          className="flex items-center justify-center lg:justify-start gap-2"
        >
          <Image src="/logo.png" width={32} height={32} alt="logo" />
          <span className="hidden lg:block">SchooLama</span>
        </Link>
      </div>
      <div className="w-[86%] md:-[92%] lg:w-[84%] xl:w-[86%] bg-blue-200">
        r
      </div>
    </div>
  );
}
