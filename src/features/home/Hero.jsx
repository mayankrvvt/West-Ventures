import { useCountUp } from "../../hooks/useCountUp";
import { useOnScreen } from "../../hooks/useOnScreen";
import { stats } from "../../constants/stats";
import ImageSlideshow from "../../components/ImageSlideshow";
import heroImg0 from "../../assets/images/hero/img.jpg";
import heroImg1 from "../../assets/images/hero/img1.jpg";
import heroImg2 from "../../assets/images/hero/img2.jpg";
import heroImg3 from "../../assets/images/hero/img3.jpg";
import heroImg4 from "../../assets/images/hero/img4.jpg";
import "./Hero.css";

const heroImages = [
  { src: heroImg0, alt: "West Ventures — Canadian business district" },
  { src: heroImg1, alt: "West Ventures team collaborating" },
  { src: heroImg2, alt: "West Ventures client workspace" },
  { src: heroImg3, alt: "West Ventures staffing and recruiting session" },
  { src: heroImg4, alt: "West Ventures marketing planning session" },
];

export default function Hero() {
  const [statsRef, statsVisible] = useOnScreen({ threshold: 0.4 });

  return (
    <section id="home" className="hero">
      <ImageSlideshow images={heroImages} />
      <div className="hero-overlay" aria-hidden="true" />

      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Staffing, talent & growth marketing</p>
          <h1 className="hero-title">
            We connect ambitious Canadian businesses with the people and reach it takes to grow.
          </h1>
          <p className="hero-subtitle">
            West Ventures pairs your team with vetted staffing, campus talent pipelines, and
            marketing programs built around your goals — not a template.
          </p>
          <div className="hero-actions">
            <a href="#contact" className="btn btn-primary">Start a project</a>
            <a href="#services" className="btn btn-ghost-light">See our services</a>
          </div>

          <div className="hero-stats" ref={statsRef}>
            {stats.map((stat) => (
              <StatItem key={stat.id} stat={stat} start={statsVisible} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StatItem({ stat, start }) {
  const value = useCountUp(stat.value, start);
  return (
    <div className="hero-stat">
      <span className="hero-stat-value">
        {value.toLocaleString()}
        {stat.suffix}
      </span>
      <span className="hero-stat-label">{stat.label}</span>
    </div>
  );
}