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
          gap: 16px;
        }
        @media (min-width: 640px) {
          .facilities-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (min-width: 1024px) {
          .facilities-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
        .facility-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          padding: 20px 16px;
          border-radius: 16px;
          border: 1px solid rgba(0,0,0,0.07);
          background: #fff;
          text-align: center;
          transition: box-shadow 0.2s, transform 0.2s;
        }
        .facility-card:hover {
          box-shadow: 0 8px 24px rgba(255, 140, 0, 0.12);
          transform: translateY(-2px);
        }
        .facility-icon-wrap {
          width: 56px;
          height: 56px;
          border-radius: 14px;
          background: #fff8f0;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          overflow: hidden;
        }
        .facility-name {
          font-size: 13px;
          font-weight: 600;
          color: #1a1a1a;
          line-height: 1.3;
        }
        .facility-desc {
          font-size: 11px;
          color: #888;
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
