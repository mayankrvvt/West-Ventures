import { Facebook, Twitter, Youtube, Linkedin, MapPin, Phone, Mail, ArrowUp } from "lucide-react";
import { siteConfig } from "../constants/siteConfig";
import { services } from "../constants/services";
import "./Footer.css";

const socialIcons = [
  { Icon: Facebook, href: siteConfig.social.facebook, label: "Facebook" },
  { Icon: Twitter, href: siteConfig.social.twitter, label: "Twitter" },
  { Icon: Youtube, href: siteConfig.social.youtube, label: "YouTube" },
  { Icon: Linkedin, href: siteConfig.social.linkedin, label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <h3 className="footer-heading">Follow us</h3>
          <div className="footer-social">
            {socialIcons.map(({ Icon, href, label }) => (
              <a key={label} href={href} aria-label={label} target="_blank" rel="noreferrer">
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="footer-heading">Find us</h3>
          <ul className="footer-list">
            <li>
              <MapPin size={16} /> {siteConfig.location}
            </li>
            <li>
              <Phone size={16} /> {siteConfig.phone}
            </li>
            <li>
              <Mail size={16} /> {siteConfig.email}
            </li>
          </ul>
        </div>

        <div>
          <h3 className="footer-heading">Our services</h3>
          <ul className="footer-list footer-list--plain">
            {services.map((service) => (
              <li key={service.id}>
                <a href="#services">{service.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>Copyright {new Date().getFullYear()} &copy; {siteConfig.fullName}. All rights reserved.</p>
          <a href="#home" className="footer-top-link" aria-label="Back to top">
            <ArrowUp size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
