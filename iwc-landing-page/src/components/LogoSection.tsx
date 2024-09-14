import Image from 'next/image';
import Link from 'next/link';

const companyLogos = [
  { src: "/logo/84e68a35-6097-4994-8cfb-e22cac306f4a (1).png", alt: "Dominguez Properties", href: "https://dominguezprop.vercel.app/" },
  { src: "/logo/INTEGRITY_LOGO_WHITE.svg", alt: "Integrity Wall and Ceiling", href: "https://www.iwctoledo.com/", needsBackground: true },
  { src: "/logo/1.svg", alt: "Next Generation Properties", href: "https://nextgenprop.vercel.app/" },
];

const LogoSection = () => {
  return (
    <div className="bg-amber-700 bg-opacity-90 py-8">
      <div className="flex justify-center items-center space-x-12">
        {companyLogos.map((logo, index) => (
          <Link key={index} href={logo.href} target="_blank" rel="noopener noreferrer">
            <div className={logo.needsBackground ? "p-2 rounded" : ""}>
              <Image src={logo.src} alt={logo.alt} width={150} height={50} className="hover:opacity-80 transition-opacity" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LogoSection;