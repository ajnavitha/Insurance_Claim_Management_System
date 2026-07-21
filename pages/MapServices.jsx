import React, { useState } from 'react';
import { FaMapMarkerAlt, FaHospital, FaBuilding, FaWrench, FaRoute, FaPhoneAlt, FaStar, FaCompass, FaFilter } from 'react-icons/fa';
import PageHeader from '../components/common/PageHeader';
import { useLanguage } from '../context/LanguageContext';

const MAP_LOCATIONS = [
  {
    id: 1,
    name: "InsurePro Regional HQ & Claims Hub",
    category: "branch",
    address: "Financial District, Tech Park, Chennai, TN",
    distance: "2.4 km",
    rating: 4.9,
    phone: "+91 44 2839 0000",
    coords: "13.0827, 80.2707",
    mapQuery: "Financial+District+Chennai"
  },
  {
    id: 2,
    name: "Apollo Multispecialty Cashless Hospital Network",
    category: "hospital",
    address: "Greams Road, Thousand Lights, Chennai, TN",
    distance: "3.8 km",
    rating: 4.8,
    phone: "+91 44 2829 3333",
    coords: "13.0604, 80.2496",
    mapQuery: "Apollo+Hospital+Greams+Road+Chennai"
  },
  {
    id: 3,
    name: "Enterprise Vehicle Damage Survey & Inspection Center",
    category: "surveyor",
    address: "Guindy Industrial Estate, Chennai, TN",
    distance: "5.1 km",
    rating: 4.7,
    phone: "+91 44 2250 1122",
    coords: "13.0067, 80.2020",
    mapQuery: "Guindy+Industrial+Estate+Chennai"
  },
  {
    id: 4,
    name: "Fortis Malar Super-Specialty Cashless Hospital",
    category: "hospital",
    address: "Adyar Main Road, Gandhi Nagar, Chennai, TN",
    distance: "6.5 km",
    rating: 4.8,
    phone: "+91 44 4289 2222",
    coords: "13.0033, 80.2550",
    mapQuery: "Fortis+Malar+Hospital+Adyar"
  },
  {
    id: 5,
    name: "Automotive Repair & Cashless Service Center",
    category: "service",
    address: "Mount Road, Anna Salai, Chennai, TN",
    distance: "4.2 km",
    rating: 4.6,
    phone: "+91 44 2852 4455",
    coords: "13.0600, 80.2600",
    mapQuery: "Anna+Salai+Chennai"
  }
];

export default function MapServices() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeLocation, setActiveLocation] = useState(MAP_LOCATIONS[0]);

  const { t } = useLanguage();

  const filteredLocations = MAP_LOCATIONS.filter(
    loc => selectedCategory === "all" || loc.category === selectedCategory
  );

  return (
    <div className="container" style={{ paddingBottom: '40px' }}>
      <PageHeader
        title={t('navMap')}
        subtitle="Locate nearest cashless hospitals, insurance branch hubs, vehicle survey centers, and cashless garages."
      />

      {/* Filter Tabs */}
      <div className="glass-panel" style={{ padding: '16px 24px', marginBottom: '24px', display: 'flex', gap: '12px', overflowX: 'auto' }}>
        <button
          onClick={() => setSelectedCategory("all")}
          className={`btn btn-sm ${selectedCategory === "all" ? "btn-primary" : "btn-secondary"}`}
        >
          <FaFilter /> All Facilities
        </button>
        <button
          onClick={() => setSelectedCategory("branch")}
          className={`btn btn-sm ${selectedCategory === "branch" ? "btn-primary" : "btn-secondary"}`}
        >
          <FaBuilding /> Branch Offices
        </button>
        <button
          onClick={() => setSelectedCategory("hospital")}
          className={`btn btn-sm ${selectedCategory === "hospital" ? "btn-primary" : "btn-secondary"}`}
        >
          <FaHospital /> Cashless Hospitals
        </button>
        <button
          onClick={() => setSelectedCategory("surveyor")}
          className={`btn btn-sm ${selectedCategory === "surveyor" ? "btn-primary" : "btn-secondary"}`}
        >
          <FaCompass /> Claim Survey Centers
        </button>
        <button
          onClick={() => setSelectedCategory("service")}
          className={`btn btn-sm ${selectedCategory === "service" ? "btn-primary" : "btn-secondary"}`}
        >
          <FaWrench /> Auto Service Garages
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '28px' }}>
        {/* Interactive Location Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '600px', overflowY: 'auto', paddingRight: '6px' }}>
          {filteredLocations.map((loc) => (
            <div
              key={loc.id}
              onClick={() => setActiveLocation(loc)}
              className="glass-card"
              style={{
                cursor: 'pointer',
                border: activeLocation.id === loc.id ? '1px solid var(--accent-cyan)' : '1px solid var(--glass-card-border)',
                background: activeLocation.id === loc.id ? 'rgba(0, 242, 254, 0.1)' : 'rgba(255, 255, 255, 0.04)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <span className="badge badge-cyan" style={{ textTransform: 'capitalize' }}>
                  {loc.category}
                </span>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--accent-gold)' }}>
                  <FaStar style={{ marginBottom: '-2px' }} /> {loc.rating} ({loc.distance})
                </span>
              </div>

              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '6px' }}>{loc.name}</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                <FaMapMarkerAlt style={{ color: 'var(--accent-rose)', marginRight: '4px' }} />
                {loc.address}
              </p>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                <span><FaPhoneAlt /> {loc.phone}</span>
                <span style={{ color: 'var(--accent-cyan)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <FaRoute /> Navigate
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Live Map Box */}
        <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{activeLocation.name}</h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{activeLocation.address}</p>
            </div>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${activeLocation.mapQuery}`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary btn-sm"
            >
              <FaRoute /> Open GPS Navigation
            </a>
          </div>

          <div style={{ flex: 1, minHeight: '400px', borderRadius: '14px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
            <iframe
              title="Interactive Map"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '400px' }}
              loading="lazy"
              allowFullScreen
              src={`https://maps.google.com/maps?q=${activeLocation.mapQuery}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
