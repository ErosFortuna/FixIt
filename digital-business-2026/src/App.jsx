
import { useEffect, useState } from "react";

const teamMembers = [
  { name: "Nguyễn Thị Vân Anh", number: "01", role: "Thành viên đội thi", color: "peach", image: "/anh.PNG" },
  { name: "Phạm Huỳnh Nguyên Thảo", number: "02", role: "Thành viên đội thi", color: "purple", image: "/thao.jpg" },
  { name: "Đỗ Ngọc Hoàn Mỹ", number: "03", role: "Thành viên đội thi", color: "blue", image: "/my.PNG" },
  { name: "Nguyễn Hồ Hoàng Quốc", number: "04", role: "Thành viên đội thi", color: "orange", image: "/quoc.PNG" },
  { name: "Vũ Hoàng Pháp", number: "05", role: "Thành viên đội thi", color: "pink", image: "/phap.PNG" },
];

const workflow = [
  {
    number: "01",
    icon: "⌕",
    title: "Quét mã đơn hàng",
    description:
      "Xác định chính xác đơn hàng để mọi bằng chứng được lưu đúng hồ sơ.",
  },
  {
    number: "02",
    icon: "▣",
    title: "Ghi nhận lúc đóng gói",
    description:
      "Lưu video, hình ảnh đóng gói cùng mã vận đơn và thông tin đơn hàng.",
  },
  {
    number: "03",
    icon: "↩",
    title: "Ghi nhận hàng hoàn",
    description:
      "Quét mã kiện hàng hoàn và bổ sung video mở kiện vào cùng hồ sơ.",
  },
  {
    number: "04",
    icon: "✳",
    title: "AI hỗ trợ đối chiếu",
    description:
      "Đánh dấu những điểm khác biệt đáng chú ý giữa hàng gửi và hàng nhận lại.",
  },
  {
    number: "05",
    icon: "▤",
    title: "Tạo hồ sơ khiếu nại",
    description:
      "Tổng hợp bằng chứng, dòng thời gian, vấn đề và số tiền liên quan.",
  },
  {
    number: "06",
    icon: "↗",
    title: "Theo dõi kết quả",
    description:
      "Theo dõi trạng thái khiếu nại, khoản bồi hoàn và các khoản phí bị trừ.",
  },
];

const aiFeatures = [
  "Nhận diện mã vận đơn từ hình ảnh",
  "Hỗ trợ ghép bằng chứng với đơn hàng",
  "Đánh dấu điểm khác biệt giữa hàng gửi và hàng hoàn",
  "Tóm tắt dòng thời gian của đơn hàng",
  "Tạo bản nháp nội dung khiếu nại",
  "Ưu tiên các trường hợp cần được xem xét",
];

const evidenceItems = [
  { icon: "▣", title: "Video đóng gói", detail: "Lúc gửi hàng", status: "Đã ghi nhận" },
  { icon: "▧", title: "Ảnh sản phẩm", detail: "Tai nghe màu đen", status: "Đã lưu" },
  { icon: "↩", title: "Video mở kiện", detail: "Lúc nhận hàng hoàn", status: "Đã ghi nhận" },
  { icon: "✳", title: "AI đối chiếu", detail: "Phát hiện khác biệt", status: "Cần xem xét" },
];

function ArrowIcon({ diagonal = false }) {
  return <span aria-hidden="true">{diagonal ? "↗" : "→"}</span>;
}

function Logo() {
  return (
    <a className="logo" href="#home" aria-label="FIXIT - Trang chủ">
      <span className="logo-mark">
        <span />
        <span />
        <span />
        <span />
      </span>
      <span>FIXIT<span className="logo-dot">.</span></span>
    </a>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`site-header ${scrolled ? "header-scrolled" : ""}`}>
      <div className="nav-container">
        <Logo />

        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Đóng menu" : "Mở menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        <nav className={`nav-links ${menuOpen ? "nav-open" : ""}`}>
          <a href="#problem" onClick={closeMenu}>Vấn đề</a>
          <a href="#solution" onClick={closeMenu}>Giải pháp</a>
          <a href="#ai" onClick={closeMenu}>Công nghệ AI</a>
          <a href="#team" onClick={closeMenu}>Đội ngũ</a>
          <a className="nav-cta" href="#contact" onClick={closeMenu}>
            Khám phá dự án <ArrowIcon diagonal />
          </a>
        </nav>
      </div>
    </header>
  );
}

function Reveal({ children, className = "", delay = 0 }) {
  return (
    <div
      className={`reveal ${className}`}
      style={{ "--reveal-delay": `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function SectionLabel({ children, light = false }) {
  return (
    <div className={`section-label ${light ? "label-light" : ""}`}>
      <span className="label-dot" />
      {children}
    </div>
  );
}

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-grid" />
      <div className="hero-glow hero-glow-one" />
      <div className="hero-glow hero-glow-two" />

      <div className="hero-layout page-container">
        <div className="hero-copy">
          <Reveal>
            <div className="competition-tag">
              <span className="tag-spark">✳</span>
              CUỘC THI SINH VIÊN KINH DOANH SỐ 2026
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h1>
              Mỗi đơn hoàn.
              <br />
              Một hồ sơ <span className="gradient-text">rõ ràng.</span>
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="hero-description">
              Khi bằng chứng không còn nằm rải rác, người bán có thể chủ động
              hơn trong từng khiếu nại. Giới thiệu FIXIT — ý tưởng giúp quản lý
              bằng chứng và hàng hoàn thông minh hơn.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="hero-actions">
              <a className="button button-primary" href="#solution">
                Khám phá FIXIT <ArrowIcon diagonal />
              </a>
              <a className="button button-ghost" href="#team">
                Gặp gỡ đội ngũ <ArrowIcon />
              </a>
            </div>
          </Reveal>

          <Reveal delay={400}>
            <div className="hero-note">
              <span className="note-line" />
              <span>Đề án đang trong giai đoạn phát triển ý tưởng</span>
            </div>
          </Reveal>
        </div>

        <Reveal className="hero-visual-wrap" delay={250}>
          <div className="hero-visual">
            <div className="visual-orbit orbit-one" />
            <div className="visual-orbit orbit-two" />

            <div className="visual-center">
              <div className="center-icon">F<span>.</span></div>
              <span>FIXIT</span>
              <small>ORDER EVIDENCE HUB</small>
            </div>

            <div className="floating-card card-video">
              <div className="mini-icon orange-icon">▶</div>
              <div>
                <strong>Video đóng gói</strong>
                <small>Đã liên kết đơn hàng</small>
              </div>
              <span className="status-check">✓</span>
            </div>

            <div className="floating-card card-ai">
              <div className="mini-icon purple-icon">✳</div>
              <div>
                <strong>AI đối chiếu</strong>
                <small>Phát hiện điểm khác biệt</small>
              </div>
            </div>

            <div className="floating-card card-file">
              <div className="mini-icon blue-icon">▤</div>
              <div>
                <strong>Hồ sơ khiếu nại</strong>
                <small>Thông tin tập trung</small>
              </div>
            </div>

            <div className="visual-cross cross-one">+</div>
            <div className="visual-cross cross-two">+</div>
            <div className="visual-ring ring-one" />
          </div>
        </Reveal>
      </div>

      <a href="#problem" className="scroll-cue" aria-label="Cuộn xuống">
        <span />
        CUỘN ĐỂ KHÁM PHÁ
      </a>

      <div className="hero-bottom-line" />
    </section>
  );
}

function Marquee() {
  const items = [
    "VIDEO ĐÓNG GÓI",
    "BẰNG CHỨNG TẬP TRUNG",
    "AI HỖ TRỢ ĐỐI CHIẾU",
    "HỒ SƠ KHIẾU NẠI",
    "THEO DÕI BỒI HOÀN",
  ];

  return (
    <div className="marquee" aria-label="Các tính năng chính của FIXIT">
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <div className="marquee-group" key={copy} aria-hidden={copy === 1}>
            {items.map((item) => (
              <span className="marquee-item" key={item}>
                <span className="marquee-star">✳</span>
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function Problem() {
  const problems = [
    {
      number: "01",
      title: "Bằng chứng phân tán",
      text: "Video, hình ảnh, mã vận đơn và tin nhắn nằm ở nhiều nơi khác nhau.",
    },
    {
      number: "02",
      title: "Khó đối chiếu",
      text: "Shop phải tự tìm lại dữ liệu để so sánh hàng đã gửi và hàng nhận về.",
    },
    {
      number: "03",
      title: "Dễ bỏ lỡ khiếu nại",
      text: "Mỗi đơn có giá trị nhỏ nhưng tổn thất tích lũy có thể đáng kể.",
    },
  ];

  return (
    <section className="section problem-section" id="problem">
      <div className="page-container">
        <div className="section-heading heading-split">
          <Reveal>
            <SectionLabel>01 / VẤN ĐỀ THỰC TẾ</SectionLabel>
            <h2>
              Một đơn hàng.
              <br />
              <span className="muted-text">Quá nhiều nơi lưu bằng chứng.</span>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="heading-description">
              Khi có hàng hoàn hoặc tranh chấp, người bán phải tự tập hợp thông
              tin từ nhiều nguồn. Việc tìm kiếm và đối chiếu thủ công khiến
              quy trình xử lý trở nên phức tạp.
            </p>
          </Reveal>
        </div>

        <div className="problem-canvas">
          <div className="problem-center">
            <div className="problem-center-symbol">?</div>
            <strong>Đơn hàng hoàn</strong>
            <span>Bằng chứng ở đâu?</span>
          </div>

          <div className="source-node source-camera">
            <span className="source-symbol">▣</span>
            <span>Camera</span>
          </div>
          <div className="source-node source-phone">
            <span className="source-symbol">▯</span>
            <span>Điện thoại</span>
          </div>
          <div className="source-node source-platform">
            <span className="source-symbol">▤</span>
            <span>Sàn TMĐT</span>
          </div>
          <div className="source-node source-delivery">
            <span className="source-symbol">▰</span>
            <span>Vận chuyển</span>
          </div>
          <div className="source-node source-chat">
            <span className="source-symbol">☏</span>
            <span>Tin nhắn</span>
          </div>

          <svg className="problem-lines" viewBox="0 0 800 430" aria-hidden="true">
            <path d="M150 90 L400 215" />
            <path d="M650 90 L400 215" />
            <path d="M100 215 L400 215" />
            <path d="M700 215 L400 215" />
            <path d="M220 350 L400 215" />
            <circle cx="400" cy="215" r="5" />
          </svg>
        </div>

        <div className="problem-cards">
          {problems.map((item, index) => (
            <Reveal key={item.number} delay={index * 100}>
              <article className="problem-card">
                <span className="card-number">{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <span className="problem-card-arrow">↗</span>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Solution() {
  return (
    <section className="section solution-section" id="solution">
      <div className="page-container">
        <div className="solution-intro">
          <Reveal>
            <SectionLabel>02 / GIẢI PHÁP ĐỀ XUẤT</SectionLabel>
            <h2>
              Gặp gỡ <span className="orange-text">FIXIT.</span>
            </h2>
            <p>
              Hệ thống quản lý khiếu nại và hàng hoàn cho người bán online.
              Tập hợp bằng chứng vào đúng đơn hàng, hỗ trợ đối chiếu và chuẩn
              bị hồ sơ khiếu nại trong một quy trình thống nhất.
            </p>
          </Reveal>

          <Reveal delay={150}>
            <div className="solution-badge">
              <span className="pulse-dot" />
              <span>
                <strong>Đang phát triển ý tưởng</strong>
                <small>Định hướng sản phẩm ban đầu</small>
              </span>
            </div>
          </Reveal>
        </div>

        <div className="workflow-grid">
          {workflow.map((item, index) => (
            <Reveal key={item.number} delay={(index % 3) * 100}>
              <article className="workflow-card">
                <div className="workflow-card-top">
                  <span className="workflow-icon">{item.icon}</span>
                  <span className="workflow-number">{item.number}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className="workflow-card-bottom">
                  <span>FIXIT WORKFLOW</span>
                  <span>↗</span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function AiSection() {
  return (
    <section className="section ai-section" id="ai">
      <div className="ai-decoration ai-decoration-one" />
      <div className="ai-decoration ai-decoration-two" />

      <div className="page-container ai-layout">
        <div className="ai-copy">
          <Reveal>
            <SectionLabel light>03 / AI HỖ TRỢ CON NGƯỜI</SectionLabel>
            <h2>
              Phát hiện
              <br />
              <span className="gradient-text">khác biệt.</span>
              <br />
              Không vội kết luận.
            </h2>
            <p>
              AI hỗ trợ người bán xem xét bằng chứng, tìm điểm khác biệt và
              chuẩn bị thông tin liên quan. Quyết định cuối cùng vẫn cần con
              người kiểm tra.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="ai-principle">
              <span className="principle-icon">✳</span>
              <div>
                <strong>AI là công cụ hỗ trợ, không phải người phán xét.</strong>
                <p>Không tự động kết luận khách hàng gian lận hoặc bên nào có lỗi.</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={180}>
            <a className="button button-primary" href="#demo">
              Xem tình huống minh họa <ArrowIcon diagonal />
            </a>
          </Reveal>
        </div>

        <Reveal className="ai-panel-wrap" delay={180}>
          <div className="ai-panel">
            <div className="ai-panel-header">
              <div className="ai-panel-title">
                <span className="ai-logo">✳</span>
                <div>
                  <strong>FIXIT AI ASSISTANT</strong>
                  <small>Minh họa định hướng tính năng</small>
                </div>
              </div>
              <span className="demo-chip">DEMO</span>
            </div>

            <div className="ai-panel-body">
              <div className="ai-order">
                <div className="ai-order-icon">▤</div>
                <div>
                  <small>ĐANG XEM XÉT</small>
                  <strong>Đơn hàng #123</strong>
                  <span>Tai nghe không dây</span>
                </div>
              </div>

              <div className="comparison-row">
                <div className="comparison-item">
                  <div className="product-visual product-black">
                    <span className="earbud earbud-one" />
                    <span className="earbud earbud-two" />
                    <span className="product-case" />
                  </div>
                  <span className="comparison-label">HÀNG ĐÃ GỬI</span>
                  <strong>Tai nghe màu đen</strong>
                </div>
                <div className="comparison-arrow">⇄</div>
                <div className="comparison-item">
                  <div className="product-visual product-white">
                    <span className="earbud earbud-one" />
                    <span className="earbud earbud-two" />
                    <span className="product-case" />
                  </div>
                  <span className="comparison-label">HÀNG HOÀN</span>
                  <strong>Tai nghe màu trắng</strong>
                </div>
              </div>

              <div className="ai-alert">
                <span className="alert-icon">!</span>
                <div>
                  <strong>Phát hiện điểm khác biệt</strong>
                  <p>
                    Hình ảnh cho thấy sự khác biệt về màu sắc. Cần người dùng
                    kiểm tra lại bằng chứng gốc.
                  </p>
                </div>
              </div>

              <div className="ai-panel-footer">
                <span><span className="tiny-dot" /> Kết quả minh họa</span>
                <span>Chưa phải kết luận cuối cùng</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="page-container ai-features-container">
        <Reveal>
          <h3 className="ai-features-title">AI có thể hỗ trợ những gì?</h3>
        </Reveal>
        <div className="ai-features-grid">
          {aiFeatures.map((feature, index) => (
            <Reveal key={feature} delay={(index % 3) * 70}>
              <div className="ai-feature">
                <span>✓</span>
                {feature}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function DemoSection() {
  return (
    <section className="section demo-section" id="demo">
      <div className="page-container">
        <div className="section-heading heading-split">
          <Reveal>
            <SectionLabel>04 / TÌNH HUỐNG MINH HỌA</SectionLabel>
            <h2>
              Một chiếc tai nghe.
              <br />
              <span className="muted-text">Một hồ sơ xuyên suốt.</span>
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="heading-description">
              Ví dụ giả định giúp minh họa cách FIXIT có thể liên kết bằng
              chứng trước và sau khi hoàn hàng vào cùng một hồ sơ.
            </p>
          </Reveal>
        </div>

        <Reveal>
          <div className="demo-board">
            <div className="demo-board-header">
              <div>
                <span className="demo-overline">HỒ SƠ MINH HỌA</span>
                <h3>Đơn hàng #123</h3>
              </div>
              <span className="case-status"><span /> Cần xem xét</span>
            </div>

            <div className="demo-timeline">
              <div className="timeline-line" />
              <div className="timeline-event">
                <div className="timeline-marker">01</div>
                <div className="timeline-content">
                  <span className="timeline-date">GIAI ĐOẠN 01</span>
                  <h4>Đóng gói và gửi hàng</h4>
                  <p>Nhân viên quét mã đơn, quay video và lưu hình ảnh sản phẩm.</p>
                  <div className="evidence-card">
                    <span className="evidence-icon">▶</span>
                    <div>
                      <strong>Video đóng gói</strong>
                      <small>Tai nghe màu đen · Hộp nguyên vẹn</small>
                    </div>
                    <span className="evidence-check">✓</span>
                  </div>
                </div>
              </div>

              <div className="timeline-event">
                <div className="timeline-marker">02</div>
                <div className="timeline-content">
                  <span className="timeline-date">GIAI ĐOẠN 02</span>
                  <h4>Nhận hàng hoàn</h4>
                  <p>Nhân viên quét mã vận đơn và quay video mở kiện hàng hoàn.</p>
                  <div className="evidence-card">
                    <span className="evidence-icon evidence-purple">↩</span>
                    <div>
                      <strong>Video mở kiện hoàn</strong>
                      <small>Tai nghe màu trắng · Hộp khác</small>
                    </div>
                    <span className="evidence-check">✓</span>
                  </div>
                </div>
              </div>

              <div className="timeline-event">
                <div className="timeline-marker timeline-marker-highlight">03</div>
                <div className="timeline-content">
                  <span className="timeline-date">GIAI ĐOẠN 03</span>
                  <h4>Đối chiếu và chuẩn bị hồ sơ</h4>
                  <p>
                    Hệ thống tổng hợp dữ liệu để người bán kiểm tra và chuẩn
                    bị bản nháp khiếu nại.
                  </p>
                  <div className="case-result">
                    <span className="result-icon">✳</span>
                    <div>
                      <strong>Điểm khác biệt cần kiểm tra</strong>
                      <p>
                        Màu sắc sản phẩm và tình trạng hộp có dấu hiệu khác
                        nhau giữa hai lần ghi nhận.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="demo-board-footer">
              <span>▤ Hồ sơ minh họa gồm bằng chứng, timeline và vấn đề phát hiện</span>
              <span>Ý TƯỞNG SẢN PHẨM</span>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="evidence-strip">
            {evidenceItems.map((item) => (
              <div className="evidence-strip-item" key={item.title}>
                <span className="strip-icon">{item.icon}</span>
                <div>
                  <strong>{item.title}</strong>
                  <small>{item.detail}</small>
                </div>
                <span className={`strip-status ${item.status === "Cần xem xét" ? "strip-warning" : ""}`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function MarketSection() {
  const industries = [
    { symbol: "✦", name: "Thời trang", className: "industry-peach" },
    { symbol: "✳", name: "Mỹ phẩm", className: "industry-purple" },
    { symbol: "⌁", name: "Phụ kiện điện tử", className: "industry-blue" },
    { symbol: "⌂", name: "Đồ gia dụng", className: "industry-green" },
  ];

  return (
    <section className="section market-section" id="market">
      <div className="page-container market-layout">
        <Reveal>
          <SectionLabel>05 / KHÁCH HÀNG MỤC TIÊU</SectionLabel>
          <h2>
            Dành cho người bán
            <br />
            <span className="muted-text">cần kiểm soát tốt hơn.</span>
          </h2>
          <p className="market-description">
            FIXIT hướng đến các shop online xử lý số lượng đơn lớn, thường
            xuyên gặp tình huống hàng hoàn và cần quản lý bằng chứng có hệ thống.
          </p>
          <div className="market-highlight">
            <span className="highlight-icon">↗</span>
            <div>
              <strong>Ưu tiên nhà bán hàng có hàng trăm đơn mỗi tháng</strong>
              <p>Đặc biệt là những shop cần theo dõi hàng hoàn và tranh chấp thường xuyên.</p>
            </div>
          </div>
        </Reveal>

        <div className="industry-grid">
          {industries.map((item, index) => (
            <Reveal key={item.name} delay={index * 90}>
              <div className={`industry-card ${item.className}`}>
                <span className="industry-symbol">{item.symbol}</span>
                <strong>{item.name}</strong>
                <span className="industry-arrow">↗</span>
              </div>
            </Reveal>
          ))}
          <Reveal delay={350}>
            <div className="industry-note">
              <span>+</span>
              <div>
                <strong>Và nhiều ngành hàng khác</strong>
                <p>Mọi shop online cần lưu bằng chứng đơn hàng.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Team() {
  return (
    <section className="section team-section" id="team">
      <div className="page-container">
        <div className="section-heading team-heading">
          <Reveal>
            <SectionLabel>06 / ĐỘI NGŨ THỰC HIỆN</SectionLabel>
            <h2>
              Năm thành viên.
              <br />
              <span className="muted-text">Chung một định hướng.</span>
            </h2>
            <p>
              Cùng xây dựng ý tưởng FIXIT — hướng đến quy trình quản lý hàng
              hoàn và khiếu nại rõ ràng hơn cho người bán online.
            </p>
          </Reveal>
          <Reveal delay={150}>
            <div className="team-count">
              <strong>05</strong>
              <span>THÀNH VIÊN ĐỘI THI</span>
            </div>
          </Reveal>
        </div>

        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <Reveal key={member.number} delay={(index % 3) * 90}>
              <article className="team-card">
                <div className={`member-art member-art-${member.color}`}>
                  <img
                    className="member-photo"
                    src={member.image}
                    alt={`Ảnh ${member.name}`}
                    loading="lazy"
                  />
                  <span className="member-number">{member.number}</span>
                </div>
                <div className="member-info">
                  <span className="member-role">{member.role}</span>
                  <h3>{member.name}</h3>
                  <div className="member-info-bottom">
                    <span>FIXIT TEAM</span>
                    <span>↗</span>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact-section" id="contact">
      <div className="contact-grid" />
      <div className="contact-glow" />

      <div className="page-container contact-content">
        <Reveal>
          <span className="contact-overline">
            <span className="label-dot" />
            FIXIT · DIGITAL BUSINESS 2026
          </span>
          <h2>
            Đừng để bằng chứng
            <br />
            <span className="gradient-text">biến mất giữa những đơn hàng.</span>
          </h2>
          <p>
            Một ý tưởng hướng đến việc giúp người bán online chủ động hơn khi
            xử lý hàng hoàn và tranh chấp.
          </p>
          <a className="button button-primary contact-button" href="#home">
            Trở về đầu trang <ArrowIcon diagonal />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-container footer-inner">
        <Logo />
        <p>Ý tưởng quản lý bằng chứng và khiếu nại cho người bán online.</p>
        <a href="#home">Về đầu trang ↑</a>
        <span className="footer-copyright">© 2026 FIXIT TEAM</span>
      </div>
    </footer>
  );
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      const nextProgress =
        maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;

      setProgress(Math.min(100, Math.max(0, nextProgress)));
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    updateProgress();

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <div
      className="scroll-progress"
      style={{ width: `${progress}%` }}
      aria-hidden="true"
    />
  );
}

export default function App() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(".reveal").forEach((element) => {
        element.classList.add("is-visible");
      });
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -35px 0px" }
    );

    document.querySelectorAll(".reveal").forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Problem />
        <Solution />
        <AiSection />
        <DemoSection />
        <MarketSection />
        <Team />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
