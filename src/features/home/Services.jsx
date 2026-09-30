import { useState } from "react";
import { Users, GraduationCap, TrendingUp, Globe, ArrowRight } from "lucide-react";
import { services } from "../../constants/services";
import { classNames } from "../../utils/classNames";
import Reveal from "../../components/Reveal";
import "./Services.css";

const icons = {
  staffing: Users,
  campus: GraduationCap,
  "lead-gen": TrendingUp,
  "web-branding": Globe,
};

export default function Services() {
  const [activeId, setActiveId] = useState(services[0].id);
  const activeService = services.find((service) => service.id === activeId);
  const ActiveIcon = icons[activeService.id];

  return (
    <section id="services" className="section services">
      <div className="container services-grid">
        <Reveal className="services-intro">
          <p className="eyebrow">What we do</p>
          <h2 className="services-heading">Four service lines, coordinated as one engagement.</h2>
          <p className="services-copy">
            Pick the ones you need now — or just hover to preview each one. Every service is built
            to hand off cleanly to the next as your business grows.
          </p>
        </Reveal>

        <Reveal className="services-interactive" delay={100}>
          <ul className="services-list">
            {services.map((service) => (
              <li key={service.id}>
                <button
                  className={classNames("services-list-item", service.id === activeId && "is-active")}
                  onClick={() => setActiveId(service.id)}
                  onMouseEnter={() => setActiveId(service.id)}
                >
                  <span>
                    <span className="services-list-title">{service.label}</span>
                    <span className="services-list-summary">{service.summary}</span>
                  </span>
                  <ArrowRight size={18} className="services-list-arrow" />
                </button>
              </li>
            ))}
          </ul>

          <div className="services-detail" key={activeService.id}>
            <div className="services-detail-icon">
              <ActiveIcon size={28} />
            </div>
            <h3 className="services-detail-title">{activeService.label}</h3>
            <p className="services-detail-copy">{activeService.description}</p>
            <a href="#contact" className="services-detail-link">
              Talk about {activeService.label.toLowerCase()} <ArrowRight size={16} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
