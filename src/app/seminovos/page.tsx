"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { BadgeDollarSign, CalendarDays, CarFront, Check, Gauge, Search, SlidersVertical } from "lucide-react";

const FIGMA_ASSET = "https://www.figma.com/api/mcp/asset/cbd494da-0bfa-4d11-ac85-7046610af8e7";

const vehicles = [
  { brand:"Toyota", model:"Corolla", version:"Altis Premium 2.0 Flex", year:"2023/2024", km:"21.840 km", transmission:"Automático", tags:["ÚNICO DONO","BAIXA KM"], oldPrice:"R$ 164.000", price:"R$ 142.900", image:`${FIGMA_ASSET}/6b691.png`, count:"1/8", slug:"toyota-corolla-altis-premium-2024" },
  { brand:"Toyota", model:"Corolla", version:"XEi 2.0 Flex", year:"2023/2024", km:"32.410 km", transmission:"Automático", tags:["GARANTIA","REVISADO"], oldPrice:"R$ 159.000", price:"R$ 139.900", image:`${FIGMA_ASSET}/04b69.png`, count:"1/6", slug:"toyota-corolla-xei-2024" },
  { brand:"Toyota", model:"Corolla", version:"GLi 2.0 Flex", year:"2022/2023", km:"44.180 km", transmission:"Automático", tags:["LAUDO APROVADO"], oldPrice:"R$ 149.000", price:"R$ 132.900", image:`${FIGMA_ASSET}/e025c.png`, count:"1/7", slug:"toyota-corolla-gli-2023" },
];

const filterSections = [
  ["Marca", ["Toyota"]],
  ["Modelo", []],
  ["Preço", ["Até R$ 150 mil"]],
  ["Câmbio", ["Automático"]],
  ["Diferenciais", ["Único dono","Garantia de fábrica","Baixa quilometragem","Revisado na concessionária","Laudo cautelar aprovado","IPVA pago"]],
] as const;

export default function SeminovosPage() {
  const [filtersOpen, setFiltersOpen] = useState(true);
  const filtersRef = useRef<HTMLElement>(null);

  const openFilters = () => {
    setFiltersOpen(true);
    window.setTimeout(() => {
      filtersRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  };
  return (
    <div className="mares-page">
      <header className="mares-header">
        <div className="mares-container header-content">
          <Link className="brand" href="/seminovos" aria-label="Marés Automóveis">
            <span className="brand-mark"><i/><i/><i/></span>
            <span className="brand-copy"><b>marés</b><small>automóveis</small></span>
          </Link>
          <nav className="main-nav">
            <Link className="active" href="/seminovos">Comprar</Link>
            <a href="#">Vende</a>
            <a className="finance" href="#">Simular Financiamento <span>⌄</span></a>
            <a href="#">Nossas lojas</a>
          </nav>
          <a className="talk-button" href="#"><span className="wa">◉</span> Fale com a gente</a>
        </div>
      </header>

      <main>
        <section className="search-strip">
          <div className="mares-container search-shell">
            <label className="search-box">
              <Search className="search-icon" aria-hidden="true" />
              <span className="search-copy">
                <b>O QUE VOCÊ PROCURA?</b>
                <input aria-label="Buscar veículo" placeholder="Ex.: Corolla, SUV, automático..." />
              </span>
            </label>

            <div className="quick-filters">
              <button className="pill"><BadgeDollarSign className="pill-icon" aria-hidden="true" />Preço <span>⌄</span></button>
              <button className="pill selected"><CarFront className="pill-icon" aria-hidden="true" />Marca <span>⌄</span></button>
              <button className="pill" onClick={openFilters}><SlidersVertical className="pill-icon" aria-hidden="true" />Mais filtros</button>
            </div>

            <button className="stock-button">Buscar no estoque <span>→</span></button>
          </div>
        </section>

        <section className="mares-container listing">
          <div className="campaign">
            <p>Encontre veículos com <b>único dono</b>, <b>garantia</b>, <b>baixa quilometragem</b> e revisões em dia.</p>
            <button onClick={openFilters}>Explorar diferenciais</button>
            <span className="campaign-close">×</span>
          </div>

          <div className="results-head">
            <div className="result-count">
              <b>7 veículos encontrados</b>
              <span>Opções selecionadas para você</span>
            </div>
            <div className="applied">
              <button>Toyota <span>×</span></button>
              <button>Corolla <span>×</span></button>
            </div>
            <label className="sort">Ordenar por <select defaultValue="relevantes"><option value="relevantes">Mais relevantes</option></select></label>
          </div>

          <div className={`listing-layout ${filtersOpen ? "" : "no-sidebar"}`}>
            {filtersOpen && (
              <aside className="sidebar" ref={filtersRef}>
                <div className="sidebar-title">
                  <div><span>Refine sua busca</span><h2>Filtros</h2></div>
                  <button onClick={()=>setFiltersOpen(false)}>×</button>
                </div>
                {filterSections.map(([title,items])=>(
                  <div className="filter-section" key={title}>
                    <div className="filter-title"><b>{title}</b><span>{items.length ? "−" : "+"}</span></div>
                    {items.map((item,i)=>(
                      <label className="check-row" key={item}>
                        <input type="checkbox" defaultChecked={(title==="Marca"||title==="Preço") && i===0}/>
                        <span>{item}</span><small>180</small>
                      </label>
                    ))}
                  </div>
                ))}
                <button className="apply-button">Aplicar filtros</button>
              </aside>
            )}

            <div className="vehicle-grid">
              {vehicles.map((v)=>(
                <article className="vehicle-card" key={v.slug}>
                  <div className="vehicle-image">
                    <img src={v.image} alt={`${v.brand} ${v.model}`} />
                    <span className="image-count">{v.count}</span>
                  </div>
                  <div className="vehicle-body">
                    <div className="vehicle-topline">
                      <span className="brand-label">{v.brand}</span>
                      <div className="card-tags">{v.tags.slice(0,2).map(t=><span key={t}>{t}</span>)}</div>
                    </div>
                    <h3>{v.model}</h3>
                    <p className="version">{v.version}</p>
                    <div className="mini-specs">
                      <span><CalendarDays aria-hidden="true" />{v.year}</span>
                      <span><Gauge aria-hidden="true" />{v.km}</span>
                      <span><SlidersVertical aria-hidden="true" />{v.transmission}</span>
                    </div>
                    <div className="trust-lines">
                      <span><Check aria-hidden="true" />Revisões na concessionária</span>
                      <span><Check aria-hidden="true" />Laudo de procedência</span>
                    </div>
                    <div className="price-row">
                      <div><small>De <s>{v.oldPrice}</s></small><strong>{v.price}</strong></div>
                      <Link href={`/seminovos/${v.slug}`}>Ver detalhes →</Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
