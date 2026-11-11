
import { useEffect, useState } from "react";
import {
  ArrowLeftRight,
  Cctv,
  Check,
  FileText,
  HelpCircle,
  Home,
  Image as ImageIcon,
  Menu,
  MessageSquare,
  PackageOpen,
  Play,
  ScanBarcode,
  ShieldCheck,
  Shirt,
  Smartphone,
  Sparkles,
  Store,
  Truck,
  Video,
  Watch,
  X,
} from "lucide-react";

const teamMembers = [
  { name: "Nguyễn Thị Vân Anh", number: "01", role: "Trưởng nhóm đội thi", color: "peach", image: "/anh.PNG" },
  { name: "Phạm Huỳnh Nguyên Thảo", number: "02", role: "Thành viên đội thi", color: "purple", image: "/thao.jpg" },
  { name: "Đỗ Ngọc Hoàn Mỹ", number: "03", role: "Thành viên đội thi", color: "blue", image: "/my.PNG" },
  { name: "Nguyễn Hồ Hoàng Quốc", number: "04", role: "Thành viên đội thi", color: "orange", image: "/quoc.PNG" },
  { name: "Vũ Hoàng Pháp", number: "05", role: "Thành viên đội thi", color: "pink", image: "/phap.PNG" },
];

const workflow = [
  {
    number: "01",
    icon: <ScanBarcode size={24} strokeWidth={2.2} />,
    title: "Quét mã đơn hàng",
    description:
      "Xác định chính xác đơn hàng để mọi bằng chứng được lưu đúng hồ sơ.",
  },
  {
    number: "02",
    icon: <Cctv size={24} strokeWidth={2.2} />,
    title: "Ghi nhận lúc đóng gói",
    description:
      "Lưu video, hình ảnh đóng gói cùng mã và thông tin đơn hàng.",
  },
  {
    number: "03",
    icon: <PackageOpen size={24} strokeWidth={2.2} />,
    title: "Ghi nhận hàng hoàn",
    description:
      "Quét mã kiện hàng hoàn và bổ sung video mở kiện vào cùng hồ sơ.",
  },
  {
    number: "04",
    icon: <Sparkles size={24} strokeWidth={2.2} />,
    title: "AI hỗ trợ đối chiếu",
    description:
      "Đánh dấu những điểm khác biệt đáng chú ý giữa hàng gửi và hàng nhận lại.",
  },
  {
    number: "05",
    icon: <FileText size={24} strokeWidth={2.2} />,
    title: "Tạo hồ sơ khiếu nại",
    description:
      "Tổng hợp bằng chứng, dòng thời gian, vấn đề và số tiền liên quan.",
  },
  {
    number: "06",
    icon: <ShieldCheck size={24} strokeWidth={2.2} />,
    title: "Theo dõi kết quả",
    description:
      "Theo dõi trạng thái khiếu nại, khoản bồi hoàn và các khoản phí bị trừ.",
  },
];

const aiFeatures = [
  "Trích khung hình từ video đóng gói và mở kiện",
  "So sánh màu sắc, mẫu, số lượng, phụ kiện",
  "Đánh dấu điểm khác biệt giữa hàng gửi và hàng hoàn",
  "Tóm tắt dòng thời gian của đơn hàng",
  "Soạn hồ sơ khiếu nại theo nội dung được xác nhận",
  "Ưu tiên các trường hợp cần được xem xét trước",
];

const evidenceItems = [
  { icon: <Cctv size={17} strokeWidth={2.2} />, title: "Video đóng gói", detail: "Lúc gửi hàng", status: "Đã ghi nhận" },
  { icon: <ImageIcon size={17} strokeWidth={2.2} />, title: "Ảnh sản phẩm", detail: "Áo thun đen", status: "Đã lưu" },
  { icon: <PackageOpen size={17} strokeWidth={2.2} />, title: "Video mở kiện", detail: "Lúc nhận hàng hoàn", status: "Đã ghi nhận" },
  { icon: <Sparkles size={17} strokeWidth={2.2} />, title: "AI đối chiếu", detail: "Phát hiện khác biệt", status: "Cần xem xét" },
];

function SparkleStar({ size = 15, className = "" }) {
  return (
    <svg
      className={`sparkle-star ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      style={{ display: "inline-block", verticalAlign: "-2px", flexShrink: 0 }}
    >
      <path d="M12 1.5C12 7.298 7.298 12 1.5 12C7.298 12 12 16.702 12 22.5C12 16.702 16.702 12 22.5 12C16.702 12 12 7.298 12 1.5Z" />
    </svg>
  );
}

function Logo() {
  return (
    <a className="logo" href="#home" aria-label="FIXIT - Trang chủ">
      <img className="logo-image" src="/fixit-logo.png" alt="" />
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
          {menuOpen ? <X size={22} strokeWidth={2.4} /> : <Menu size={22} strokeWidth={2.4} />}
        </button>

        <nav className={`nav-links ${menuOpen ? "nav-open" : ""}`}>
          <a href="#problem" onClick={closeMenu}>Vấn đề</a>
          <a href="#solution" onClick={closeMenu}>Giải pháp</a>
          <a href="#ai" onClick={closeMenu}>Công nghệ AI</a>
          <a href="#team" onClick={closeMenu}>Đội ngũ</a>
          <a className="nav-cta" href="#contact" onClick={closeMenu}>
            Khám phá dự án
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
              <span className="tag-spark">
                <SparkleStar size={13} />
              </span>
              CUỘC THI SINH VIÊN KINH DOANH SỐ 2026
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h1>
              Xử lý đơn hoàn
              <br />
              <span className="gradient-text">nhanh hơn.</span>
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="hero-description">
              Không chỉ lưu video gắn với mỗi đơn hàng.
              Cùng AI, FixIt sẽ giúp bạn đối chiếu hàng gửi - hàng hoàn, đánh dấu điểm khác biệt
              và soạn sẵn hồ sơ khiếu nại. Việc của bạn chỉ là xác nhận!
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="hero-actions">
              <a className="button button-primary" href="#solution">
                Khám phá FIXIT
              </a>
              <a className="button button-ghost" href="#team">
                Gặp gỡ đội ngũ
              </a>
            </div>
          </Reveal>

          <Reveal delay={400}>
            <div className="hero-note">
              <span className="note-line" />
              <span>Đề án đang trong giai đoạn phát triển sản phẩm</span>
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
            </div>

            <div className="floating-card card-video">
              <img src="/boxhang.png" alt="Video đóng gói" className="floating-card-img" />
              <div className="floating-card-text">
                <strong>Video đóng gói</strong>
                <small>
                  Liên kết với đơn hàng{" "}
                  <span className="status-check">
                    <Check size={11} strokeWidth={3} />
                  </span>
                </small>
              </div>
            </div>

            <div className="floating-card card-ai">
              <img src="/robotAI.png" alt="AI đối chiếu" className="floating-card-img" />
              <div className="floating-card-text">
                <strong>AI đối chiếu</strong>
                <small>Phát hiện điểm khác biệt</small>
              </div>
            </div>

            <div className="floating-card card-file">
              <img src="/hosokhieunai.png" alt="Hồ sơ khiếu nại" className="floating-card-img" />
              <div className="floating-card-text">
                <strong>Hồ sơ khiếu nại</strong>
                <small>Tạo tự động</small>
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
                <span className="marquee-star">
                  <SparkleStar size={14} />
                </span>
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
      text: "Video, hình ảnh, mã và thông tin đơn hàng nằm ở nhiều nơi khác nhau.",
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
              Mất hàng giờ đồng hồ
              <br />
              <span className="muted-text">cho mỗi đơn hoàn.</span>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="heading-description">
              Khi có hàng hoàn hoặc tranh chấp, người bán phải tự tập hợp
              <br className="desktop-break" />
              thông tin từ nhiều nguồn, tìm kiếm và đối chiếu thủ công.
              <br className="desktop-break" />
              <span className="text-nowrap">Quy trình xử lý phức tạp, mất nhiều thời gian.</span>
            </p>
          </Reveal>
        </div>

        <div className="problem-canvas">
          <div className="problem-center">
            <img
              src="/boxhang.png"
              alt="Hộp hàng hoàn"
              className="problem-center-image"
            />
            <strong>Đơn hàng hoàn</strong>
            <span>Bằng chứng ở đâu?</span>
          </div>

          <div className="source-node source-camera">
            <span className="source-symbol">
              <Cctv size={17} strokeWidth={2.3} />
            </span>
            <span>Camera</span>
          </div>
          <div className="source-node source-phone">
            <span className="source-symbol">
              <Smartphone size={17} strokeWidth={2.3} />
            </span>
            <span>Điện thoại</span>
          </div>
          <div className="source-node source-platform">
            <span className="source-symbol">
              <Store size={17} strokeWidth={2.3} />
            </span>
            <span>Sàn TMĐT</span>
          </div>
          <div className="source-node source-delivery">
            <span className="source-symbol">
              <Truck size={17} strokeWidth={2.3} />
            </span>
            <span>Vận chuyển</span>
          </div>
          <div className="source-node source-chat">
            <span className="source-symbol">
              <MessageSquare size={17} strokeWidth={2.3} />
            </span>
            <span>Tin nhắn</span>
          </div>

          <svg className="problem-lines" viewBox="0 0 800 430" aria-hidden="true">
            <path d="M150 90 L400 215" />
            <path d="M650 90 L400 215" />
            <path d="M100 215 L400 215" />
            <path d="M700 215 L400 215" />
            <path d="M400 350 L400 215" />
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
              <span className="orange-text">FIXIT.</span>
            </h2>
            <p>
              Hệ thống HỖ TRỢ XỬ LÝ HÀNG HOÀN & TẠO HỒ SƠ KHIẾU NẠI cho các nhà bán hàng online.
              <br></br>Tập hợp bằng chứng vào đúng đơn hàng, hỗ trợ đối chiếu và chuẩn
              bị hồ sơ khiếu nại trong một quy trình thống nhất.
            </p>
          </Reveal>

          <Reveal delay={150}>
            <div className="solution-badge">
              <span className="pulse-dot" />
              <span>
                <strong>Đang phát triển sản phẩm</strong>
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
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function TshirtVisual({ variant = "black" }) {
  if (variant === "black") {
    return (
      <svg className="tshirt-visual-svg" viewBox="0 0 80 80" width="72" height="72" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="blackShirtGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#374151" />
            <stop offset="50%" stopColor="#1f2937" />
            <stop offset="100%" stopColor="#0b0f19" />
          </linearGradient>
        </defs>
        <path
          d="M 31 19 Q 40 24 49 19 L 61 24 L 71 34 L 64 41 L 57 37 L 57 62 Q 40 64 23 62 L 23 37 L 16 41 L 9 34 L 19 24 Z"
          fill="url(#blackShirtGrad)"
          stroke="#4b5563"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path d="M 31 19 Q 40 26 49 19" stroke="#6b7280" strokeWidth="1.8" fill="none" />
        <path d="M 23 37 L 20 24" stroke="#374151" strokeWidth="1.2" strokeDasharray="2 2" />
        <path d="M 57 37 L 60 24" stroke="#374151" strokeWidth="1.2" strokeDasharray="2 2" />
        <rect x="38" y="27" width="4" height="6" rx="1" fill="#9ca3af" opacity="0.6" />
      </svg>
    );
  }

  return (
    <svg className="tshirt-visual-svg" viewBox="0 0 80 80" width="72" height="72" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="stainedShirtGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f5f0e1" />
          <stop offset="45%" stopColor="#eae0c4" />
          <stop offset="100%" stopColor="#d5c7a3" />
        </linearGradient>
        <radialGradient id="stainPatch1" cx="42%" cy="40%" r="35%">
          <stop offset="0%" stopColor="#bfa15f" stopOpacity="0.5" />
          <stop offset="70%" stopColor="#bfa15f" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#eae0c4" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="stainPatch2" cx="60%" cy="52%" r="28%">
          <stop offset="0%" stopColor="#b3944d" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#eae0c4" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path
        d="M 31 19 Q 40 24 49 19 L 61 24 L 71 34 L 64 41 L 57 37 L 57 62 Q 40 64 23 62 L 23 37 L 16 41 L 9 34 L 19 24 Z"
        fill="url(#stainedShirtGrad)"
        stroke="#ad9b79"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <ellipse cx="38" cy="35" rx="15" ry="10" fill="url(#stainPatch1)" />
      <ellipse cx="44" cy="50" rx="12" ry="8" fill="url(#stainPatch2)" />
      <path d="M 31 19 Q 39 27 49 19" stroke="#927e5a" strokeWidth="1.8" fill="none" />
      <path d="M 33 22 Q 40 28 47 22" stroke="#bfa15f" strokeWidth="1.4" opacity="0.6" fill="none" />
      <circle cx="48" cy="44" r="1.6" fill="#9c7e3c" opacity="0.7" />
      <circle cx="34" cy="54" r="1.3" fill="#9c7e3c" opacity="0.6" />
      <circle cx="28" cy="42" r="1.1" fill="#9c7e3c" opacity="0.5" />
    </svg>
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
            <SectionLabel light>03 / AI ĐỐI CHIẾU</SectionLabel>
            <h2>
              Phát hiện
              <br />
              <span className="gradient-text">khác biệt.</span>
              <br />
              Không vội kết luận.
            </h2>
            <p>
              AI so sánh khung hình lúc gửi và lúc nhận, đánh dấu chỗ đáng ngờ kèm độ tin cậy.
              Người dùng xác nhận hoặc chỉnh sửa trước khi hồ sơ được tạo.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="ai-principle">
              <span className="principle-icon">
                <SparkleStar size={18} />
              </span>
              <div>
                <strong>AI chỉ công cụ hỗ trợ, quyết định ở người dùng.</strong>
                <p>Không tự động kết luận khách hàng gian lận hoặc bên nào có lỗi.</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={180}>
            <a className="button button-primary" href="#demo">
              Xem tình huống minh họa
            </a>
          </Reveal>
        </div>

        <Reveal className="ai-panel-wrap" delay={180}>
          <div className="ai-panel">
            <div className="ai-panel-header">
              <div className="ai-panel-title">
                <span className="ai-logo">
                  <SparkleStar size={18} />
                </span>
                <div>
                  <strong>FIXIT AI ASSISTANT</strong>
                  <small>Minh họa định hướng tính năng</small>
                </div>
              </div>
              <span className="demo-chip">DEMO</span>
            </div>

            <div className="ai-panel-body">
              <div className="ai-order">
                <div className="ai-order-icon">
                  <FileText size={17} strokeWidth={2.2} />
                </div>
                <div>
                  <small>ĐANG XEM XÉT</small>
                  <strong>Đơn hàng #123</strong>
                  <span>Áo thun cotton Basic</span>
                </div>
              </div>

              <div className="comparison-row">
                <div className="comparison-item">
                  <div className="product-visual product-black">
                    <TshirtVisual variant="black" />
                  </div>
                  <span className="comparison-label">HÀNG ĐÃ GỬI</span>
                  <strong>Áo thun đen</strong>
                </div>
                <div className="comparison-arrow">
                  <ArrowLeftRight size={20} strokeWidth={2.3} />
                </div>
                <div className="comparison-item">
                  <div className="product-visual product-white">
                    <TshirtVisual variant="white-stained" />
                  </div>
                  <span className="comparison-label">HÀNG HOÀN</span>
                  <strong>Áo thun trắng ngả màu</strong>
                </div>
              </div>

              <div className="ai-alert">
                <span className="alert-icon">!</span>
                <div>
                  <strong>Phát hiện điểm khác biệt</strong>
                  <p>
                    Hình ảnh cho thấy sự khác biệt về màu sắc và tình trạng sản phẩm (gửi áo thun đen, nhận lại áo thun trắng ngả màu). Cần người dùng kiểm tra lại bằng chứng gốc.
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
                <span className="ai-feature-check">
                  <Check size={14} strokeWidth={3} />
                </span>
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
              Đơn hoàn về
              <br />
              <span className="muted-text">sai mẫu, sai màu.</span>
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
                    <span className="evidence-icon">
                      <Play size={12} fill="currentColor" />
                    </span>
                    <div>
                      <strong>Video đóng gói</strong>
                      <small>Áo thun đen · Túi zip nguyên tem</small>
                    </div>
                    <span className="evidence-check">
                      <Check size={12} strokeWidth={3} />
                    </span>
                  </div>
                </div>
              </div>

              <div className="timeline-event">
                <div className="timeline-marker">02</div>
                <div className="timeline-content">
                  <span className="timeline-date">GIAI ĐOẠN 02</span>
                  <h4>Nhận hàng hoàn</h4>
                  <p>Nhân viên quét mã đơn hàng và quay video mở kiện hàng hoàn.</p>
                  <div className="evidence-card">
                    <span className="evidence-icon evidence-purple">
                      <PackageOpen size={14} strokeWidth={2.2} />
                    </span>
                    <div>
                      <strong>Video mở kiện hoàn</strong>
                      <small>Áo thun trắng ngả màu · Đã bóc mác</small>
                    </div>
                    <span className="evidence-check">
                      <Check size={12} strokeWidth={3} />
                    </span>
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
                    <span className="result-icon">
                      <SparkleStar size={16} />
                    </span>
                    <div>
                      <strong>Điểm khác biệt cần kiểm tra</strong>
                      <p>
                        Sản phẩm có dấu hiệu bị tráo: gửi đi áo thun đen mới nhưng nhận về áo thun trắng ngả màu đã qua sử dụng.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="demo-board-footer">
              <span>
                <FileText size={13} strokeWidth={2.2} style={{ display: "inline-block", verticalAlign: "-2px", marginRight: 5 }} />
                Hồ sơ minh họa gồm bằng chứng, timeline và vấn đề phát hiện
              </span>
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
    {
      icon: <Shirt size={28} strokeWidth={1.9} />,
      name: "Thời trang",
      status: "Mục tiêu ưu tiên",
      isPriority: true,
      className: "industry-peach",
    },
    {
      icon: <Sparkles size={28} strokeWidth={1.9} />,
      name: "Mỹ phẩm",
      status: "Mở rộng sau",
      className: "industry-purple",
    },
    {
      icon: <Watch size={28} strokeWidth={1.9} />,
      name: "Phụ kiện",
      status: "Mở rộng sau",
      className: "industry-blue",
    },
    {
      icon: <Home size={28} strokeWidth={1.9} />,
      name: "Đồ gia dụng",
      status: "Mở rộng sau",
      className: "industry-green",
    },
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
            FIXIT bắt đầu với shop thời trang trên TikTok Shop - nơi xử lý số lượng đơn hàng lớn, thường
            xuyên gặp tình huống hàng hoàn và cần quản lý bằng chứng có hệ thống.
          </p>
          <div className="market-highlight">
            <div>
              <strong>Phù hợp nhất với các shop có đơn hoàn thường xuyên</strong>
              <p>Đặc biệt là những shop có số lượng đơn lớn, có camera quay đóng gói, người phụ trách và có đơn hoàn hoặc tranh chấp cần xử lý mỗi tháng.</p>
            </div>
          </div>
        </Reveal>

        <div className="industry-grid">
          {industries.map((item, index) => (
            <Reveal key={item.name} delay={index * 90}>
              <div className={`industry-card ${item.className}`}>
                <span className="industry-symbol">{item.icon}</span>
                <div className="industry-meta">
                  <strong>{item.name}</strong>
                  <span className={`industry-status ${item.isPriority ? "status-priority" : ""}`}>
                    {item.isPriority && <span className="priority-dot" />}
                    {item.status}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
          <Reveal delay={350}>
            <div className="industry-note">
              <span>+</span>
              <div>
                <strong>Và nhiều ngành hàng khác</strong>
                <p>Mọi shop online có đơn hoàn thường xuyên.</p>
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
            Đau đầu vì đơn hoàn?
            <br />
            <span className="gradient-text">Để FIXIT lo.</span>
          </h2>
          <p>
            Rút ngắn thời gian xử lý hàng hoàn và tranh chấp, tối đa hóa tỷ lệ bồi hoàn thành công. Khám phá ngay sức mạnh của trợ lý AI FixIt.
          </p>
          <div className="contact-actions">
            <a
              className="button button-primary contact-button"
              href="https://fixit-zeta-five.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Sản phẩm demo
            </a>
            <a className="button button-ghost contact-button" href="#home">
              Trở về đầu trang
            </a>
          </div>
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
        <a href="#home">Về đầu trang</a>
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
