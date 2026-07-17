import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import { PaymentBadge, SocialNetworks } from "./footer.types";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
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

const Footer = () => {
  return (
    <footer className="mt-16 border-t border-black/5">
      <div className="pt-12 pb-6 bg-[#FAF9F6] text-[#1a1a1a] px-4 md:px-6">
        <div className="max-w-frame mx-auto">
          <nav className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
            
            {/* Column 1: Brand & Socials */}
            <div className="flex flex-col lg:col-span-4">
              <Link href="/" className="mb-4 inline-block w-fit">
                <Image
                  src="/images/logo.jpg"
                  alt="Nadav Resorts & Events Logo"
                  width={220}
                  height={70}
                  className="rounded-xl object-contain bg-white shadow-sm h-18 w-auto px-3 py-1.5"
                  priority
                />
              </Link>
              <h3 className={cn([integralCF.className, "text-lg lg:text-xl mb-3 text-gray-900 font-bold"])}>
                Palace's <span className="text-[#FF8C00]">NADAV</span>
              </h3>
              <p className="text-gray-600 text-sm mb-6 max-w-sm leading-relaxed">
                Premium destination for event management, luxury resort stays, destination weddings, and exceptional hospitality services in Wandoor, Kerala.
              </p>
              <div className="flex items-center space-x-3">
                {socialsData.map((social) => (
                  <Link
                    href={social.url}
                    key={social.id}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-gray-700 hover:bg-[#FF8C00] hover:text-white transition-all w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center p-1.5 shadow-sm"
                  >
                    {social.icon}
                  </Link>
                ))}
              </div>
            </div>

            {/* Column 2: Contact Information */}
            <div id="contact" className="flex flex-col lg:col-span-4 scroll-mt-24">
              <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-5 border-b border-black/5 pb-2">
                Contact Details
              </h4>
              <ul className="space-y-4 text-sm text-gray-600">
                <li className="flex items-start gap-3">
                  <FaMapMarkerAlt className="text-[#FF8C00] mt-1 flex-shrink-0" />
                  <div>
                    <strong className="text-gray-900 block font-semibold">Address:</strong>
                    <span>Ambalappadi, Wandoor, PIN: 679328</span>
                    <span className="block text-xs text-gray-500 mt-0.5">(അമ്പലപ്പടി, വണ്ടൂർ)</span>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <FaPhoneAlt className="text-[#FF8C00] flex-shrink-0" />
                  <div>
                    <strong className="text-gray-900 block font-semibold">Phone:</strong>
                    <a href="tel:+919447105944" className="hover:text-[#FF8C00] transition-colors">
                      +91 94471 05944
                    </a>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <FaEnvelope className="text-[#FF8C00] flex-shrink-0" />
                  <div>
                    <strong className="text-gray-900 block font-semibold">Email:</strong>
                    <a href="mailto:info@nadavresorts.com" className="hover:text-[#FF8C00] transition-colors">
                      info@nadavresorts.com
                    </a>
                  </div>
                </li>
              </ul>
            </div>

            {/* Column 3: Location Map */}
            <div id="location" className="flex flex-col lg:col-span-4 scroll-mt-24">
              <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-5 border-b border-black/5 pb-2">
                Our Location
              </h4>
              <p className="text-sm text-gray-600 mb-3">
                Find us at Ambalappadi, Wandoor. Click below to navigate or view on Google Maps.
              </p>
              
              {/* Premium Google Map Iframe Embed */}
              <div className="w-full h-[160px] rounded-xl overflow-hidden shadow-sm border border-gray-200 mb-3 relative group">
                <iframe
                  src="https://maps.google.com/maps?q=11.207972,76.233894&z=15&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Nadav Resorts Location Map"
                ></iframe>
              </div>
              <a
                href="https://maps.google.com/?q=11.207972,76.233894"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#1B5E20] hover:text-[#FF8C00] transition-colors w-fit"
              >
                <FaMapMarkerAlt /> Open in Google Maps
              </a>
            </div>

          </nav>

          <hr className="h-[1px] border-t border-black/5 my-6" />
          
          <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 gap-3">
            <p>© {new Date().getFullYear()} Palace's NADAV Resorts & Events. All rights reserved.</p>
            <p>Ambalappadi, Wandoor, Kerala</p>
          </div>
        </div>
        <LayoutSpacing />
      </div>
    </footer>
  );
};

export default Footer;
