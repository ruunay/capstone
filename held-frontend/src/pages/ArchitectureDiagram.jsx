import React from "react";

const KEYFRAMES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
  @keyframes dashFlow  { to { stroke-dashoffset: -22; } }
  @keyframes float     { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
  @keyframes cardGlow  { 0%,100%{box-shadow:0 8px 32px rgba(0,0,0,.45),0 0 0 1px rgba(255,182,211,.07)} 50%{box-shadow:0 12px 42px rgba(0,0,0,.55),0 0 20px rgba(255,182,211,.14)} }
  @keyframes supportGlow { 0%,100%{opacity:.85} 50%{opacity:1} }
`;

const glass = (border = "rgba(255,182,211,0.22)") => ({
  background: "rgba(255,255,255,0.025)",
  border: `1px solid ${border}`,
  borderRadius: "16px",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
});

// ── Icons ────────────────────────────────────────────────────────────────────
function BrowserIcon({ c }) {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <rect x="3" y="7" width="38" height="30" rx="4" stroke={c} strokeWidth="1.6"/>
      <line x1="3" y1="17" x2="41" y2="17" stroke={c} strokeWidth="1.6"/>
      <circle cx="9"  cy="12" r="2" fill={c} opacity=".75"/>
      <circle cx="16" cy="12" r="2" fill={c} opacity=".75"/>
      <circle cx="23" cy="12" r="2" fill={c} opacity=".75"/>
      <rect x="8" y="22" width="28" height="11" rx="2" stroke={c} strokeWidth="1" opacity=".3"/>
      <line x1="8" y1="27" x2="36" y2="27" stroke={c} strokeWidth="1" opacity=".3"/>
    </svg>
  );
}
function S3Icon({ c }) {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <path d="M10 24C10 29 15.5 33 22 33C28.5 33 34 29 34 24L34 21C34 16 28.5 12 22 12C15.5 12 10 16 10 21Z" stroke={c} strokeWidth="1.6" fill={c+"18"}/>
      <ellipse cx="22" cy="12" rx="12" ry="4.5" stroke={c} strokeWidth="1.6" fill={c+"10"}/>
      <ellipse cx="22" cy="21" rx="12" ry="4.5" stroke={c} strokeWidth="1" strokeDasharray="4 2" fill="none" opacity=".5"/>
      <path d="M16 7C16 4.5 18.7 3 22 3C25.3 3 28 4.5 28 7L28 12" stroke={c} strokeWidth="1.5" strokeLinecap="round"/>
      <polyline points="18,5.5 22,3 26,5.5" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function EC2Icon({ c }) {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <rect x="5"  y="7"  width="34" height="13" rx="3" stroke={c} strokeWidth="1.6" fill={c+"10"}/>
      <rect x="5"  y="24" width="34" height="13" rx="3" stroke={c} strokeWidth="1.6" fill={c+"10"}/>
      <circle cx="12" cy="13.5" r="2.2" fill={c} opacity=".65"/>
      <rect x="18" y="10"  width="17" height="7"  rx="1.5" stroke={c} strokeWidth="1" opacity=".3"/>
      <circle cx="12" cy="30.5" r="2.2" fill={c} opacity=".65"/>
      <rect x="18" y="27" width="17" height="7"  rx="1.5" stroke={c} strokeWidth="1" opacity=".3"/>
    </svg>
  );
}
function RDSIcon({ c }) {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <ellipse cx="22" cy="12" rx="15" ry="5.5" stroke={c} strokeWidth="1.6" fill={c+"16"}/>
      <path d="M7 12L7 32C7 35.3 14 38 22 38C30 38 37 35.3 37 32L37 12" stroke={c} strokeWidth="1.6" fill="none"/>
      <ellipse cx="22" cy="22" rx="15" ry="5.5" stroke={c} strokeWidth="1" strokeDasharray="4 2" fill="none" opacity=".5"/>
    </svg>
  );
}
function IAMIcon({ c }) {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
      <path d="M15 3L27 8.5L27 16C27 22.5 21.5 28 15 30C8.5 28 3 22.5 3 16L3 8.5Z" stroke={c} strokeWidth="1.5" fill={c+"14"}/>
      <circle cx="15" cy="14" r="3.8" stroke={c} strokeWidth="1.3"/>
      <path d="M8.5 25C10 21.5 12.3 19.5 15 19.5C17.7 19.5 20 21.5 21.5 25" stroke={c} strokeWidth="1.3" strokeLinecap="round" fill="none"/>
    </svg>
  );
}
function SSMIcon({ c }) {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
      <rect x="9" y="3" width="12" height="12" rx="6" stroke={c} strokeWidth="1.5" fill={c+"14"}/>
      <rect x="3" y="18" width="24" height="9" rx="3" stroke={c} strokeWidth="1.5" fill={c+"10"}/>
      <circle cx="15" cy="22.5" r="2" fill={c} opacity=".7"/>
      <line x1="15" y1="24.5" x2="15" y2="26" stroke={c} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}
function CloudWatchIcon({ c }) {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
      <rect x="2" y="3" width="26" height="24" rx="3" stroke={c} strokeWidth="1.5" fill={c+"08"}/>
      <polyline points="5,22 10,13 14,18 18,8 22,16 26,11" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function PipelineIcon({ c }) {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
      <circle cx="5"  cy="15" r="3.2" stroke={c} strokeWidth="1.4" fill={c+"14"}/>
      <circle cx="15" cy="7"  r="3.2" stroke={c} strokeWidth="1.4" fill={c+"14"}/>
      <circle cx="15" cy="23" r="3.2" stroke={c} strokeWidth="1.4" fill={c+"14"}/>
      <circle cx="25" cy="15" r="3.2" stroke={c} strokeWidth="1.4" fill={c+"14"}/>
      <line x1="8.2"  y1="15"   x2="11.8" y2="15"   stroke={c} strokeWidth="1.3"/>
      <line x1="17.8" y1="9.3"  x2="22.5" y2="13"   stroke={c} strokeWidth="1.3"/>
      <line x1="17.8" y1="20.7" x2="22.5" y2="17"   stroke={c} strokeWidth="1.3"/>
    </svg>
  );
}

// ── Arrow ────────────────────────────────────────────────────────────────────
function Arrow({ label, uid }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", minWidth:"76px", padding:"0 2px", flexShrink:0 }}>
      <span style={{ fontSize:"0.58rem", color:"rgba(255,182,211,0.4)", letterSpacing:"0.12em", marginBottom:"5px", textTransform:"uppercase", fontFamily:"'DM Sans',sans-serif" }}>
        {label}
      </span>
      <svg width="76" height="26" viewBox="0 0 76 26" style={{ overflow:"visible" }}>
        <defs>
          <marker id={uid} markerWidth="7" markerHeight="6" refX="5" refY="3" orient="auto">
            <polygon points="0 0,7 3,0 6" fill="#ffb6d3" opacity=".6"/>
          </marker>
        </defs>
        <line x1="4" y1="13" x2="62" y2="13"
          stroke="#ffb6d3" strokeOpacity=".35" strokeWidth="1.5"
          strokeDasharray="6 4" markerEnd={`url(#${uid})`}
          style={{ animation:"dashFlow 1.7s linear infinite" }}/>
      </svg>
    </div>
  );
}

// ── Main pipeline nodes ──────────────────────────────────────────────────────
const NODES = [
  { id:"browser", label:"User Browser",   sublabel:"React SPA",         tech:"Chrome · Safari · Firefox", accent:"#ffb6d3", border:"rgba(255,182,211,0.28)", delay:"0s",    Icon: BrowserIcon },
  { id:"s3",      label:"AWS S3",         sublabel:"Static Hosting",    tech:"Vite Build · CDN Assets",   accent:"#ffb6d3", border:"rgba(255,182,211,0.28)", delay:"0.25s", Icon: S3Icon      },
  { id:"ec2",     label:"AWS EC2",        sublabel:"Spring Boot API",   tech:"Java 17 · JWT · Port 8080", accent:"#cce9d6", border:"rgba(204,233,214,0.28)", delay:"0.5s",  Icon: EC2Icon     },
  { id:"rds",     label:"AWS RDS",        sublabel:"MySQL Database",    tech:"MySQL 8.0 · JPA/Hibernate", accent:"#c9a96e", border:"rgba(201,169,110,0.28)", delay:"0.75s", Icon: RDSIcon     },
];
const ARROWS = ["HTTPS/CDN", "REST API", "JDBC/JPA"];

const SUPPORT = [
  { id:"iam",          label:"AWS IAM",          detail:"Roles & Access Control",  color:"#ffb6d3", Icon: IAMIcon        },
  { id:"ssm",          label:"AWS SSM",          detail:"Parameter Store · Secrets",color:"#ffb6d3", Icon: SSMIcon        },
  { id:"cloudwatch",   label:"AWS CloudWatch",   detail:"Logs · Metrics · Alarms", color:"#cce9d6", Icon: CloudWatchIcon },
  { id:"codepipeline", label:"AWS CodePipeline", detail:"CI/CD · Auto Deploy",     color:"#c9a96e", Icon: PipelineIcon   },
];

// ── Component ────────────────────────────────────────────────────────────────
export default function ArchitectureDiagram() {
  return (
    <>
      <style>{KEYFRAMES}</style>

      <div style={{ minHeight:"100vh", background:"#1a0a12", padding:"3rem 2rem 4rem", fontFamily:"'DM Sans',system-ui,sans-serif", color:"#f0e8f0" }}>

        {/* Header */}
        <div style={{ textAlign:"center", marginBottom:"3.5rem" }}>
          <p style={{ fontSize:"0.7rem", letterSpacing:"0.25em", color:"rgba(255,182,211,0.4)", textTransform:"uppercase", marginBottom:"0.6rem", fontFamily:"'DM Sans',sans-serif" }}>
            Capstone Project · 2026
          </p>
          <h1 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"clamp(2rem,4vw,3rem)", fontWeight:600, color:"#ffb6d3", margin:"0 0 0.5rem", letterSpacing:"-0.01em" }}>
            Held — System Architecture
          </h1>
          <p style={{ color:"rgba(240,232,240,0.4)", fontSize:"0.85rem", margin:0, fontFamily:"'DM Sans',sans-serif" }}>
            AWS Cloud Infrastructure · Spring Boot · React · MySQL
          </p>
        </div>

        {/* Pipeline section label */}
        <div style={{ textAlign:"center", marginBottom:"1.5rem" }}>
          <span style={{ fontSize:"0.62rem", letterSpacing:"0.2em", color:"rgba(255,182,211,0.35)", textTransform:"uppercase", fontFamily:"'DM Sans',sans-serif", borderBottom:"1px solid rgba(255,182,211,0.12)", paddingBottom:"4px" }}>
            Request Flow
          </span>
        </div>

        {/* Main Pipeline */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:0, flexWrap:"wrap", rowGap:"1.5rem", marginBottom:"3rem" }}>
          {NODES.map((node, i) => {
            const { Icon } = node;
            return (
              <React.Fragment key={node.id}>
                <div style={{
                  ...glass(node.border),
                  padding:"1.5rem 1.25rem",
                  textAlign:"center",
                  width:"155px",
                  flexShrink:0,
                  animation:`float 4.5s ease-in-out ${node.delay} infinite, cardGlow 5s ease-in-out ${node.delay} infinite`,
                }}>
                  <div style={{ display:"flex", justifyContent:"center", marginBottom:"0.8rem" }}>
                    <Icon c={node.accent}/>
                  </div>
                  <div style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"1.1rem", fontWeight:600, color:node.accent, marginBottom:"0.2rem" }}>
                    {node.label}
                  </div>
                  <div style={{ fontSize:"0.7rem", color:"rgba(240,232,240,0.65)", fontWeight:500, marginBottom:"0.45rem" }}>
                    {node.sublabel}
                  </div>
                  <div style={{ fontSize:"0.58rem", color:"rgba(240,232,240,0.3)", lineHeight:1.6 }}>
                    {node.tech}
                  </div>
                </div>
                {i < NODES.length - 1 && <Arrow label={ARROWS[i]} uid={`ar_${i}`}/>}
              </React.Fragment>
            );
          })}
        </div>

        {/* Divider */}
        <div style={{ display:"flex", alignItems:"center", gap:"1rem", marginBottom:"1.8rem", maxWidth:"900px", margin:"0 auto 1.8rem" }}>
          <div style={{ flex:1, height:"1px", background:"linear-gradient(90deg,transparent,rgba(255,182,211,0.15))" }}/>
          <span style={{ fontSize:"0.6rem", letterSpacing:"0.2em", color:"rgba(255,182,211,0.35)", textTransform:"uppercase", fontFamily:"'DM Sans',sans-serif", whiteSpace:"nowrap" }}>
            Supporting Infrastructure
          </span>
          <div style={{ flex:1, height:"1px", background:"linear-gradient(90deg,rgba(255,182,211,0.15),transparent)" }}/>
        </div>

        {/* Supporting services */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:"0.9rem", maxWidth:"900px", margin:"0 auto" }}>
          {SUPPORT.map((s) => {
            const { Icon } = s;
            return (
              <div key={s.id} style={{ ...glass(`${s.color}28`), padding:"1rem 1.1rem", display:"flex", alignItems:"center", gap:"0.85rem", animation:"supportGlow 4s ease-in-out infinite" }}>
                <div style={{ flexShrink:0 }}><Icon c={s.color}/></div>
                <div>
                  <div style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"0.95rem", fontWeight:600, color:s.color, marginBottom:"0.15rem" }}>
                    {s.label}
                  </div>
                  <div style={{ fontSize:"0.62rem", color:"rgba(240,232,240,0.38)", lineHeight:1.5 }}>
                    {s.detail}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div style={{ textAlign:"center", marginTop:"3rem" }}>
          <p style={{ fontSize:"0.6rem", color:"rgba(240,232,240,0.2)", letterSpacing:"0.1em", fontFamily:"'DM Sans',sans-serif" }}>
            Held · Wellness Journaling Platform · AWS Hosted · Spring Boot + React + MySQL
          </p>
        </div>
      </div>
    </>
  );
}
