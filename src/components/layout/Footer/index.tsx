import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import { PaymentBadge, SocialNetworks } from "./footer.types";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import LayoutSpacing from "./LayoutSpacing";

const socialsData: SocialNetworks[] = [
  {
    id: 1,
    icon: <FaTwitter />,
    url: "https://twitter.com",
  },
  {
    id: 2,
    icon: <FaFacebookF />,
    url: "https://www.facebook.com/share/1KqBBfzWnG/?mibextid=wwXIfr",
  },
  {
    id: 3,
    icon: <FaInstagram />,
    url: "https://www.instagram.com/nadav.resorts?igsh=MTV2cnVrNWYxcGt5NQ%3D%3D&utm_source=qr",
  },
  {
    id: 4,
    icon: <FaYoutube />,
    url: "https://youtube.com/@hafizfaizhafizfaiz-fz8rs?si=r-Srr8blF_wr3zjL",
  },
];

const paymentBadgesData: PaymentBadge[] = [
  {
    id: 1,
    srcUrl: "/icons/Visa.svg",
  },
  {
    id: 2,
    srcUrl: "/icons/mastercard.svg",
  },
  {
    id: 3,
    srcUrl: "/icons/paypal.svg",
  },
  {
    id: 4,
    srcUrl: "/icons/applePay.svg",
  },
  {
    id: 5,
    srcUrl: "/icons/googlePay.svg",
  },
];

const Footer = () => {
  return (
    <footer className="mt-10">
      <div className="relative">
        <div className="absolute bottom-0 w-full h-1/2 bg-gray-100"></div>
      </div>
      <div className="pt-8 md:pt-[50px] bg-gray-100 text-foreground px-4 pb-4">
        <div className="max-w-frame mx-auto">
          <nav className="lg:grid lg:grid-cols-12 mb-8">
            <div className="flex flex-col lg:col-span-3 lg:max-w-[248px]">
              <Link href="/">
                <Image
                  src="/images/logo.jpg"
                  alt="Nadav Resorts & Events Logo"
                  width={80}
                  height={80}
                  className="rounded-lg object-contain mb-4 bg-white"
                  priority
                />
              </Link>
              <h1
                className={cn([
                  integralCF.className,
                  "text-xl lg:text-2xl mb-4 text-primary",
                ])}
              >
                Nadav Resorts & Events
              </h1>
              <p className="text-black/60 text-sm mb-9">
                Premium destination for event management, weddings, corporate events, and exceptional hospitality services.
              </p>
              <div className="flex items-center">
                {socialsData.map((social) => (
                  <Link
                    href={social.url}
                    key={social.id}
                    className="bg-background text-foreground hover:bg-primary hover:text-primary-foreground transition-all mr-3 w-7 h-7 rounded-full border border-border flex items-center justify-center p-1.5"
                  >
                    {social.icon}
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          <hr className="h-[1px] border-t-border mb-6" />
          <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center mb-2">
          </div>
        </div>
        <LayoutSpacing />
      </div>
    </footer>
  );
};

export default Footer;
