import CorpMob from "../imports/CorpMob/CorpMob";
import { useState, useRef } from "react";

/* ─── FAQ data (exact questions from Figma) ─────────────────────────── */
const FAQ_DATA = [
  {
    question: "Why you should choose Footprints Play School?",
    answer:
      "Footprints play school prepare children with a strong foundation for life. Footprints deliver the HighScope Curriculum that empowers and enables children to develop comprehensively, including Physical, Emotional, Intellectual and Social Development. The curriculum is designed to sharpen their language skills in writing, reading, speaking as well as thinking in a safe, secure and fun environment.",
    tall: false,
  },
  { question: "What is HighScope Curriculum?", answer: null, tall: false },
  { question: "What facilities do Footprints Play School provide?", answer: null, tall: false },
  {
    question:
      "Does Footprints Play School Centres in Faridabad have a structured routine?",
    answer: null,
    tall: true, // Frame11 — 55 px header (2-line question)
  },
];

/*
  Exact pixel positions of every "Enquire Now" button (transparent overlays).
  Calculated from Figma:  left = (393/2 + offsetX) − buttonWidth/2
  ─────────────────────────────────────────────────────────────────────────
  Frame2  top 2290    center 202.46  left 123.72  w 157.479
  Frame1  top 4257.58 center 201.98  left 123.00  w 157.953
  Frame5  top 5788    center 196.98  left 118.00  w 157.953
  Frame3  top 8826.79 center 201.98  left 123.00  w 157.953
*/
const ENQUIRE_BTNS: [number, number, number, number][] = [
  [2290, 123.72, 157.479, 34.814],
  [4257.58, 123.0, 157.953, 34.814],
  [5788, 118.0, 157.953, 34.814],
  [8826.79, 123.0, 157.953, 34.814],
];

/* ─── shared input CSS (applied via inline style) ───────────────────── */
const BASE_INPUT: React.CSSProperties = {
  position: "absolute",
  left: "73px",
  width: "247px",
  height: "30.777px",
  background: "white",
  border: "none",
  borderRadius: "5px",
  padding: "0 10px 0 17px",
  fontSize: "10px",
  letterSpacing: "-0.4px",
  color: "#6b6783",
  fontFamily: '"Nunito Sans", sans-serif',
  pointerEvents: "auto",
  zIndex: 20,
  boxSizing: "border-box",
  outline: "none",
};

export default function App() {
  const formAnchor = useRef<HTMLDivElement>(null);
  const [fields, setFields] = useState({
    name: "",
    mobile: "",
    email: "",
    company: "",
  });
  const [solution, setSolution] = useState("");
  const [dropOpen, setDropOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0); // 0 = first item open

  /* helpers */
  const patch =
    (k: keyof typeof fields) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setFields((p) => ({ ...p, [k]: e.target.value }));

  const scrollToForm = (e: React.MouseEvent) => {
    e.preventDefault();
    formAnchor.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      "Thank you for your enquiry!\nOur team will contact you very soon."
    );
  };

  return (
    <>
      {/* ── Global overrides for interactive overlays ─────────────── */}
      <style>{`
        /* placeholder colour for form inputs */
        .fp-in::placeholder {
          color: rgba(107,103,131,.5);
          font-family: "Nunito Sans", sans-serif;
          font-size: 10px;
          letter-spacing: -0.4px;
        }
        .fp-in:focus {
          outline: 1.5px solid #4754c8;
          outline-offset: 0;
        }
        /* FAQ header hover */
        .fp-faq-hdr {
          transition: filter .15s;
        }
        .fp-faq-hdr:hover { filter: brightness(.96); }
        /* dropdown option hover */
        .fp-opt:hover { background: rgba(47,190,238,.09) !important; }
        /* transparent button overlays */
        .fp-enq-overlay { transition: opacity .15s; cursor: pointer; }
        .fp-enq-overlay:hover { opacity: .85; }

        /* Reset default browser button font so the inputs look right */
        .fp-drop-trigger { font-size: 10.75px; letter-spacing: -0.43px; }
      `}</style>

      {/* ── Page wrapper ─────────────────────────────────────────── */}
      <div
        style={{
          minHeight: "100vh",
          background: "#e8e8e8",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {/* ── Fixed-width canvas that matches the Figma 393 px frame ── */}
        <div
          style={{
            position: "relative",
            width: "393px",
            height: "9300px",
            flexShrink: 0,
          }}
        >
          {/* ══════════════════════════════════════════════════════════
              LAYER 1 – Figma visual (all images, SVGs, colours, text)
              ══════════════════════════════════════════════════════════ */}
          <CorpMob />

          {/* invisible anchor so "Enquire Now" buttons scroll here */}
          <div
            ref={formAnchor}
            style={{ position: "absolute", top: "408px", pointerEvents: "none" }}
          />

          {/* ══════════════════════════════════════════════════════════
              LAYER 2 – Interactive FORM (inputs + dropdown + submit)
              Positioned exactly over the visual white boxes in CorpMob.
              ══════════════════════════════════════════════════════════ */}
          <form
            onSubmit={handleSubmit}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "393px",
              /* tall enough to contain submit button at 732 px */
              height: "810px",
              pointerEvents: "none", // let non-input clicks fall through
            }}
          >
            {/* ── Name ──────────────────────────────────────────── */}
            <input
              className="fp-in"
              type="text"
              placeholder="Name"
              value={fields.name}
              onChange={patch("name")}
              style={{ ...BASE_INPUT, top: "508px" }}
            />

            {/* ── Mobile Number ─────────────────────────────────── */}
            <input
              className="fp-in"
              type="tel"
              placeholder="Mobile Number"
              value={fields.mobile}
              onChange={patch("mobile")}
              style={{ ...BASE_INPUT, top: "546.78px" }}
            />

            {/* ── Email ID ──────────────────────────────────────── */}
            <input
              className="fp-in"
              type="email"
              placeholder="Email ID"
              value={fields.email}
              onChange={patch("email")}
              style={{ ...BASE_INPUT, top: "585.55px" }}
            />

            {/* ── Company Name ──────────────────────────────────── */}
            <input
              className="fp-in"
              type="text"
              placeholder="Company Name"
              value={fields.company}
              onChange={patch("company")}
              style={{ ...BASE_INPUT, top: "624.33px" }}
            />

            {/* ── Solution dropdown ─────────────────────────────── */}
            {/* Sits exactly over Group39 (the rounded pill select box) */}
            <div
              style={{
                position: "absolute",
                top: "684.54px",
                left: "73px",
                width: "247px",
                zIndex: 30,
                pointerEvents: "auto",
              }}
            >
              {/* trigger */}
              <button
                type="button"
                className="fp-drop-trigger"
                onClick={() => setDropOpen((o) => !o)}
                style={{
                  width: "100%",
                  height: "33.243px",
                  background: "white",
                  border: "none",
                  borderRadius: "35.117px",
                  padding: "0 14px 0 17px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  color: solution ? "#6b6783" : "rgba(107,103,131,.5)",
                  fontFamily: '"Nunito Sans", sans-serif',
                  boxSizing: "border-box",
                }}
              >
                <span>{solution || "Select Option"}</span>
                {/* chevron – matches Figma svgPaths.p319a9a10 */}
                <svg
                  width="13"
                  height="7"
                  viewBox="0 0 16.99 9.49"
                  fill="none"
                  style={{
                    transform: dropOpen ? "rotate(180deg)" : "none",
                    transition: "transform .2s",
                    flexShrink: 0,
                  }}
                >
                  <path
                    d="M0.7 0.7 8.495 8.79 16.29 0.7"
                    stroke="#6B6783"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {/* dropdown menu */}
              {dropOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "calc(100% + 4px)",
                    left: 0,
                    width: "100%",
                    background: "white",
                    borderRadius: "8px",
                    boxShadow: "0 4px 16px rgba(0,0,0,.12)",
                    zIndex: 100,
                    overflow: "hidden",
                  }}
                >
                  {["On-Site Centers", "Off-Site Centers", "Both"].map(
                    (opt) => (
                      <button
                        key={opt}
                        type="button"
                        className="fp-opt"
                        onClick={() => {
                          setSolution(opt);
                          setDropOpen(false);
                        }}
                        style={{
                          display: "block",
                          width: "100%",
                          padding: "9px 17px",
                          background: "transparent",
                          border: "none",
                          borderBottom: "1px solid rgba(107,103,131,.08)",
                          textAlign: "left",
                          fontSize: "10.75px",
                          letterSpacing: "-0.43px",
                          color: "#6b6783",
                          fontFamily: '"Nunito Sans", sans-serif',
                          cursor: "pointer",
                        }}
                      >
                        {opt}
                      </button>
                    )
                  )}
                </div>
              )}
            </div>

            {/* ── Transparent submit overlay on the yellow button ── */}
            {/*
              Frame4: -translate-x-1/2  left calc(50%+0.4px)  top 732px  w 157.953px
              left-edge = (196.5 + 0.4) − (157.953/2) = 196.9 − 78.977 = 117.92 px
            */}
            <button
              type="submit"
              className="fp-enq-overlay"
              aria-label="Submit Enquiry"
              style={{
                position: "absolute",
                top: "732px",
                left: "117.92px",
                width: "157.953px",
                height: "34.814px",
                background: "transparent",
                border: "none",
                borderRadius: "32.235px",
                pointerEvents: "auto",
                zIndex: 20,
              }}
            />
          </form>

          {/* ══════════════════════════════════════════════════════════
              LAYER 3 – Transparent "Enquire Now" button overlays
              Each sits exactly over its visual counterpart in CorpMob
              and scrolls smoothly to the form.
              ══════════════════════════════════════════════════════════ */}
          {ENQUIRE_BTNS.map(([top, left, w, h], i) => (
            <button
              key={i}
              className="fp-enq-overlay"
              onClick={scrollToForm}
              aria-label="Enquire Now – scroll to contact form"
              style={{
                position: "absolute",
                top: `${top}px`,
                left: `${left}px`,
                width: `${w}px`,
                height: `${h}px`,
                background: "transparent",
                border: "none",
                borderRadius: "32px",
                zIndex: 20,
              }}
            />
          ))}

          {/* ══════════════════════════════════════════════════════════
              LAYER 4 – FAQ ACCORDION OVERLAY
              Covers the static Figma FAQ and replaces it with a fully
              interactive accordion that matches the design exactly.

              Figma layout reference:
                Heading centre : top 8249.8 px  (h 80px, -translate-y-1/2)
                  → visual top : 8249.8 − 40 = 8209.8 px
                Frame13 start  : top 8305.8 px
              ══════════════════════════════════════════════════════════ */}
          <div
            style={{
              position: "absolute",
              top: "8190px",
              left: 0,
              width: "393px",
              background: "#fffdf5",
              zIndex: 20,
              /* let height grow with accordion content */
            }}
          >
            {/* Section heading — matches Figma exactly */}
            <div
              style={{
                height: "80px",
                marginTop: "20px", /* 8190 + 20 = 8210 ≈ 8209.8 px top */
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0 30px",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontFamily: '"Plus Jakarta Sans", sans-serif',
                  fontWeight: 800,
                  fontSize: "24px",
                  color: "#4754c8",
                  letterSpacing: "-0.96px",
                  lineHeight: "28px",
                  textAlign: "center",
                }}
              >
                Common Questions From Corporate Leaders
              </p>
            </div>

            {/* FAQ list — Frame9: flex-col gap 9.012 px, width 333 px */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "9.012px",
                width: "333px",
                margin: "16px auto 44px",
              }}
            >
              {FAQ_DATA.map((item, idx) => {
                const isOpen = openFaq === idx;
                const hasAnswer = !!item.answer;

                return (
                  <div
                    key={idx}
                    style={{
                      borderRadius: "9.012px",
                      overflow: "hidden",
                    }}
                  >
                    {/* ── Header button ──────────────────────────── */}
                    <button
                      type="button"
                      className="fp-faq-hdr"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      style={{
                        width: "100%",
                        minHeight: item.tall ? "55px" : "33.795px",
                        background: isOpen
                          ? "rgba(243,234,209,.5)"
                          : "#ceeff5",
                        border: "none",
                        /* square bottom corners only when answer is visible */
                        borderRadius:
                          isOpen && hasAnswer
                            ? "9.012px 9.012px 0 0"
                            : "9.012px",
                        padding: "6px 12px 6px 17.41px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "8px",
                        cursor: "pointer",
                        textAlign: "left",
                        boxSizing: "border-box",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: '"Nunito Sans", sans-serif',
                          fontWeight: 700,
                          fontSize: "12px",
                          color: "#4754c8",
                          letterSpacing: "-0.48px",
                          lineHeight: "normal",
                          flex: 1,
                        }}
                      >
                        {item.question}
                      </span>

                      {/* Icon: X when open, chevron-right when closed */}
                      {isOpen ? (
                        /* X close icon – matches Figma Frame6 close button */
                        <svg
                          width="14.42"
                          height="14.42"
                          viewBox="0 0 14.42 14.42"
                          fill="none"
                          style={{ flexShrink: 0 }}
                        >
                          <path
                            d="M1.351 1.351 13.069 13.069"
                            stroke="#4754C8"
                            strokeWidth="1.352"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M13.069 1.351 1.351 13.069"
                            stroke="#4754C8"
                            strokeWidth="1.352"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : (
                        /* Chevron-right – matches Figma Frame7/8/11 arrow */
                        <svg
                          width="7"
                          height="12"
                          viewBox="0 0 5.41 9.23"
                          fill="none"
                          style={{ flexShrink: 0 }}
                        >
                          <path
                            d="M0.62 0.62 4.79 4.615 0.62 8.61"
                            fill="#4754C8"
                            stroke="#4754C8"
                            strokeWidth="1.242"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </button>

                    {/* ── Answer panel (only item 0 has content) ─── */}
                    {isOpen && hasAnswer && (
                      <div
                        style={{
                          background: "rgba(243,234,209,.5)",
                          borderRadius: "0 0 9.012px 9.012px",
                          padding: "10px 18px 14px",
                        }}
                      >
                        <p
                          style={{
                            margin: 0,
                            fontFamily: '"Nunito Sans", sans-serif',
                            fontWeight: 400,
                            fontSize: "10px",
                            color: "#6b6783",
                            letterSpacing: "-0.4px",
                            lineHeight: "12px",
                          }}
                        >
                          {item.answer}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          {/* ── end FAQ overlay ──────────────────────────────────── */}
        </div>
        {/* ── end 393 px canvas ───────────────────────────────────── */}
      </div>
    </>
  );
}
