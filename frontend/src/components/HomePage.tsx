import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";
import PageHeading from "./PageHeading";
import AnimatedCardGrid from "./AnimatedCardGrid";
import { fetchIdentity } from "../services/api";

export default function HomePage() {
  const [motto, setMotto] = useState("-");
  const navigate = useNavigate();

  // 组件挂载时从后端获取 motto
  useEffect(() => {
    fetchIdentity()
      .then((r) => {setMotto(r.motto)})
      .catch((err) => setMotto(String(err)));
  }, []);

  return (
    <AnimatedCardGrid className="dashboard-grid">
      <article className="hero-stage panel-full">
        <Nav />
        <PageHeading title="关于我" subtitle="项目，创意，灵感，心得，我的作品" />
      </article>

      <article className="panel panel-full featured-work-panel card">
        <p className="section-kicker">作品</p>
        <p className="featured-title">文字实验室</p>
        <p className="featured-copy">拼音和情绪，挖掘中文里的细节</p>
        <a
          className="featured-link"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigate("/text-lab");
          }}
        >
          <span className="featured-link-label">打开作品</span>
          <span className="arrow">›</span>
        </a>
      </article>

      <article className="panel panel-full identity-panel card">
        <div className="identity-item">
          <p className="section-kicker">座右铭</p>
          <p className="identity-value identity-quote">{motto}</p>
        </div>
        <div className="identity-item">
          <p className="section-kicker">正在学习</p>
          <p className="identity-value">零到全栈</p>
        </div>
      </article>
    </AnimatedCardGrid>
  );
}
