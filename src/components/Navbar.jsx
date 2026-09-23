import { useState } from "react";

import { Menu, X } from "lucide-react";

import { navLinks } from "../constants/navigation";

import { siteConfig } from "../constants/siteConfig";

import { classNames } from "../utils/classNames";

import "./Navbar.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const pathname = window.location.pathname;

  const isAboutPage = pathname === "/about";
  const isServicesPage = pathname === "/services";
  const isFAQPage = pathname === "/faq";
  const isContactPage = pathname === "/contact";

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleNavigation = (href) => {
    closeMenu();

    // Separate pages
    if (
      href === "/about" ||
      href === "/services" ||
      href === "/faq" ||
      href === "/contact"
    ) {
      window.location.href = href;
      return;
    }

    // Home and section links
    window.location.href = href;
  };

  return (
    <header className="navbar navbar-solid">
      <div className="container navbar-inner">

        {/* LOGO */}
        <a
          href="/"
          className="navbar-mark"
          onClick={closeMenu}
        >
          <span className="navbar-mark-word">
            West
          </span>

          <span className="navbar-mark-word navbar-mark-word--accent">
            Ventures
          </span>
        </a>

        {/* DESKTOP NAVIGATION */}
        <nav
          className="navbar-links"
          aria-label="Primary navigation"
        >
          {navLinks.map((link) => {
            // FAQ is a separate page.
            // Contact is also a separate page.
            const href =
              link.label.toLowerCase() === "faq"
                ? "/faq"
                : link.label.toLowerCase() === "contact"
                  ? "/contact"
                  : link.href;

            const isActive =
              href === "/about"
                ? isAboutPage
                : href === "/services"
                  ? isServicesPage
                  : href === "/faq"
                    ? isFAQPage
                    : href === "/contact"
                      ? isContactPage
                      : !isAboutPage &&
                        !isServicesPage &&
                        !isFAQPage &&
                        !isContactPage &&
                        href === "/#home";

            return (
              <a
                key={link.label}
                href={href}
                className={classNames(
                  isActive && "is-active"
                )}
                onClick={(event) => {
                  if (
                    href === "/about" ||
                    href === "/services" ||
                    href === "/faq" ||
                    href === "/contact"
                  ) {
                    event.preventDefault();
                    handleNavigation(href);
                  }
                }}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* GET IN TOUCH BUTTON */}
        <a
          href="/contact"
          className="btn btn-primary navbar-cta"
        >
          Get in touch
        </a>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          className="navbar-toggle"
          aria-label={
            isOpen
              ? "Close menu"
              : "Open menu"
          }
          aria-expanded={isOpen}
          onClick={() => {
            setIsOpen((prev) => !prev);
          }}
        >
          {isOpen ? (
            <X size={22} />
          ) : (
            <Menu size={22} />
          )}
        </button>
      </div>

      {/* MOBILE NAVIGATION */}
      {isOpen && (
        <div className="navbar-drawer">
          <nav
            aria-label="Mobile navigation"
            className="navbar-drawer-links"
          >
            {navLinks.map((link) => {
              const href =
                link.label.toLowerCase() === "faq"
                  ? "/faq"
                  : link.label.toLowerCase() === "contact"
                    ? "/contact"
                    : link.href;

              const isActive =
                href === "/about"
                  ? isAboutPage
                  : href === "/services"
                    ? isServicesPage
                    : href === "/faq"
                      ? isFAQPage
                      : href === "/contact"
                        ? isContactPage
                        : false;

              return (
                <a
                  key={link.label}
                  href={href}
                  className={
                    isActive
                      ? "is-active"
                      : ""
                  }
                  onClick={(event) => {
                    if (
                      href === "/about" ||
                      href === "/services" ||
                      href === "/faq" ||
                      href === "/contact"
                    ) {
                      event.preventDefault();
                      handleNavigation(href);
                      return;
                    }

                    closeMenu();
                  }}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* MOBILE CTA */}
          <a
            href="/contact"
            className="btn btn-primary"
            onClick={(event) => {
              event.preventDefault();
              handleNavigation("/contact");
            }}
          >
            Get in touch
          </a>

          {/* CONTACT DETAILS */}
          <p className="navbar-drawer-contact">
            {siteConfig.phone}
            {" · "}
            {siteConfig.email}
          </p>
        </div>
      )}
    </header>
  );
}