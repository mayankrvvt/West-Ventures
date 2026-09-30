import { approachSteps } from "../../constants/approach";
import Reveal from "../../components/Reveal";
import "./Approach.css";

export default function Approach() {
  return (
    <section id="approach" className="section approach">
      <div className="container">
        <Reveal className="approach-header">
          <p className="eyebrow">How an engagement runs</p>
          <h2 className="approach-heading">Research, then measure, then run it.</h2>
        </Reveal>

        <ol className="approach-steps">
          {approachSteps.map((step, index) => (
            <Reveal as="li" key={step.index} className="approach-step" delay={index * 120}>
              <span className="approach-step-index">{step.index}</span>
              <h3 className="approach-step-title">{step.title}</h3>
              <p className="approach-step-copy">{step.description}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
