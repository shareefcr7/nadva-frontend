import React from "react";
import Image from "next/image";

type Facility = {
  _id: string;
  name: string;
  icon: string;
  description: string;
  displayOrder: number;
  status: "active" | "inactive";
};

type Props = {
  facilities: Facility[];
};

export default function FacilitiesSection({ facilities }: Props) {
  const active = facilities.filter((f) => f.status === "active");
  if (active.length === 0) return null;

  return (
    <section className="max-w-frame mx-auto px-4 xl:px-0 my-10 sm:my-16">
      <style>{`
        .facilities-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: clamp(12px, 2vw, 16px);
          padding: 0 4px;
        }
        @media (min-width: 480px) {
          .facilities-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 14px;
            padding: 0;
          }
        }
        @media (min-width: 640px) {
          .facilities-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
          }
        }
        @media (min-width: 1024px) {
          .facilities-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
          }
        }
        .facility-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: clamp(8px, 1.5vw, 12px);
          padding: clamp(16px, 4vw, 24px) clamp(14px, 3vw, 20px);
          border-radius: clamp(16px, 2.5vw, 24px);
          border: 1px solid rgba(0, 0, 0, 0.04);
          background: linear-gradient(145deg, #ffffff, #faf9f6);
          text-align: center;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .facility-card:hover {
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.01);
          transform: translateY(-6px);
          border-color: rgba(212, 175, 55, 0.2);
        }
        .facility-icon-wrap {
          width: clamp(48px, 9vw, 64px);
          height: clamp(48px, 9vw, 64px);
          border-radius: clamp(12px, 2.2vw, 18px);
          background: #fffdf9;
          border: 1.5px solid rgba(212, 175, 55, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          overflow: hidden;
          transition: transform 0.4s ease;
        }
        .facility-card:hover .facility-icon-wrap {
          transform: scale(1.1) rotate(3deg);
          background: #fffaf0;
          border-color: rgba(212, 175, 55, 0.4);
        }
        .facility-name {
          font-size: clamp(13px, 2.2vw, 15px);
          font-weight: 600;
          color: #1a1a1a;
          line-height: 1.3;
          margin-top: 4px;
        }
        .facility-desc {
          font-size: clamp(11px, 1.8vw, 12px);
          color: #666;
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

      <h2
        style={{
          fontSize: "clamp(1.5rem, 4vw, 2rem)",
          fontWeight: 700,
          textAlign: "center",
          marginBottom: "1.5rem",
          color: "#1a1a1a",
        }}
      >
        Our Facilities
      </h2>

      <div className="facilities-grid">
        {active.map((f) => (
          <div key={f._id} className="facility-card">
            <div className="facility-icon-wrap">
              {f.icon ? (
                <Image
                  src={f.icon}
                  alt={f.name || "Facility"}
                  width={40}
                  height={40}
                  style={{ objectFit: "contain" }}
                  unoptimized={f.icon.startsWith("http")}
                />
              ) : (
                <span style={{ fontSize: 28 }}>🏨</span>
              )}
            </div>
            <p className="facility-name">{f.name}</p>
            {f.description && (
              <p className="facility-desc">{f.description}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
