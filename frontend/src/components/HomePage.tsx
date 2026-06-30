import { useNavigate } from "react-router-dom";
import Nav from "./Nav";
import PageHeading from "./PageHeading";
import AnimatedCardGrid from "./AnimatedCardGrid";
import { home } from "../data/site";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <AnimatedCardGrid className="dashboard-grid">
      <article className="hero-stage panel-full">
        <Nav />
        <PageHeading title={home.heroTitle} subtitle={home.heroSubtitle} />
      </article>

      <article className="panel panel-full featured-work-panel card">
        <p className="section-kicker">{home.featuredWork.kicker}</p>
        <p className="featured-title">{home.featuredWork.title}</p>
        <p className="featured-copy">{home.featuredWork.copy}</p>
        <a
          className="featured-link"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigate("/text-lab");
          }}
        >
          <span className="featured-link-label">{home.featuredWork.linkLabel}</span>
          <span className="arrow">›</span>
        </a>
      </article>

      <article className="panel panel-full identity-panel card">
        <div className="identity-item">
          <p className="section-kicker">座右铭</p>
          <p className="identity-value identity-quote">{home.identity.motto}</p>
        </div>
        <div className="identity-item">
          <p className="section-kicker">正在学习</p>
          <p className="identity-value">{home.identity.learning}</p>
        </div>
      </article>
    </AnimatedCardGrid>
  );
}
