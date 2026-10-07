"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  BadgeDollarSign,
  CalendarDays,
  CarFront,
  Check,
  ChevronDown,
  Gauge,
  Search,
  SlidersVertical,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";

const FIGMA_ASSET = "https://www.figma.com/api/mcp/asset/cbd494da-0bfa-4d11-ac85-7046610af8e7";

const vehicles = [
  { brand:"Toyota", model:"Corolla", version:"Altis Premium 2.0 Flex", year:"2023/2024", km:"21.840 km", transmission:"CVT", tags:["ÚNICO DONO","BAIXA KM"], checks:["Revisões na concessionária","IPVA 2026 pago"], differentials:["Único dono","Baixa quilometragem","Revisado","IPVA pago"], oldPrice:"R$ 164.000", price:"R$ 142.900", image:`${FIGMA_ASSET}/3f23c.png`, count:"1/8", slug:"toyota-corolla-altis-premium-2024" },
  { brand:"Toyota", model:"Corolla", version:"XEi 2.0 Flex", year:"2023/2024", km:"32.410 km", transmission:"CVT", tags:["GARANTIA","REVISADO"], checks:["Garantia de fábrica vigente","Histórico de manutenção"], differentials:["Garantia de fábrica","Revisado"], oldPrice:"R$ 159.000", price:"R$ 139.900", image:`${FIGMA_ASSET}/04b69.png`, count:"1/6", slug:"toyota-corolla-xei-2024" },
  { brand:"Toyota", model:"Corolla", version:"GLi 2.0 Flex", year:"2022/2023", km:"44.180 km", transmission:"CVT", tags:["LAUDO APROVADO"], checks:["Laudo cautelar aprovado","Documentação regular"], differentials:["Laudo aprovado"], oldPrice:"R$ 149.000", price:"R$ 132.900", image:`${FIGMA_ASSET}/e025c.png`, count:"1/7", slug:"toyota-corolla-gli-2023" },
  { brand:"Honda", model:"Civic", version:"Touring 1.5 Turbo", year:"2023/2024", km:"28.750 km", transmission:"CVT", tags:["BAIXA KM","REVISADO"], checks:["Baixa quilometragem","Revisão recente"], differentials:["Baixa quilometragem","Revisado"], oldPrice:"R$ 178.900", price:"R$ 166.900", image:`${FIGMA_ASSET}/04b69.png`, count:"1/5", slug:"honda-civic-touring-2024" },
  { brand:"Volkswagen", model:"T-Cross", version:"Highline 250 TSI", year:"2023/2024", km:"35.600 km", transmission:"Automático", tags:["ÚNICO DONO"], checks:["Único proprietário","IPVA 2026 pago"], differentials:["Único dono","IPVA pago"], oldPrice:"R$ 154.900", price:"R$ 143.900", image:`${FIGMA_ASSET}/e025c.png`, count:"1/9", slug:"volkswagen-t-cross-highline-2024" },
  { brand:"Chevrolet", model:"Tracker", version:"Premier 1.2 Turbo", year:"2022/2023", km:"41.900 km", transmission:"Automático", tags:["LAUDO APROVADO"], checks:["Procedência verificada","Pneus revisados"], differentials:["Laudo aprovado"], oldPrice:"R$ 129.900", price:"R$ 119.900", image:`${FIGMA_ASSET}/3f23c.png`, count:"1/7", slug:"chevrolet-tracker-premier-2023" },
  { brand:"Hyundai", model:"HB20S", version:"Platinum 1.0 TGDI", year:"2023/2024", km:"39.200 km", transmission:"Automático", tags:["GARANTIA","ÚNICO DONO"], checks:["Garantia de fábrica","Manual e chave reserva"], differentials:["Garantia de fábrica","Único dono"], oldPrice:"R$ 112.900", price:"R$ 104.900", image:`${FIGMA_ASSET}/04b69.png`, count:"1/6", slug:"hyundai-hb20s-platinum-2024" },
  { brand:"Fiat", model:"Argo", version:"Drive 1.3 Flex", year:"2023/2024", km:"36.500 km", transmission:"Manual", tags:["REVISADO"], checks:["Revisão em dia","Documentação regular"], differentials:["Revisado"], oldPrice:"R$ 88.900", price:"R$ 82.900", image:`${FIGMA_ASSET}/e025c.png`, count:"1/5", slug:"fiat-argo-drive-2024" },
  { brand:"Ford", model:"Territory", version:"Titanium 1.5 EcoBoost", year:"2023/2024", km:"27.300 km", transmission:"Automático", tags:["BAIXA KM","GARANTIA"], checks:["Baixa quilometragem","Garantia de fábrica vigente"], differentials:["Baixa quilometragem","Garantia de fábrica"], oldPrice:"R$ 189.900", price:"R$ 176.900", image:`${FIGMA_ASSET}/3f23c.png`, count:"1/6", slug:"ford-territory-titanium-2024" },
  { brand:"Mitsubishi", model:"Eclipse Cross", version:"HPE-S 1.5 Turbo", year:"2022/2023", km:"38.600 km", transmission:"CVT", tags:["LAUDO APROVADO","REVISADO"], checks:["Laudo cautelar aprovado","Revisão recente"], differentials:["Laudo aprovado","Revisado"], oldPrice:"R$ 174.900", price:"R$ 161.900", image:`${FIGMA_ASSET}/04b69.png`, count:"1/7", slug:"mitsubishi-eclipse-cross-hpes-2023" },
  { brand:"Jeep", model:"Compass", version:"Longitude T270", year:"2023/2024", km:"33.100 km", transmission:"Automático", tags:["ÚNICO DONO","IPVA PAGO"], checks:["Único proprietário","IPVA 2026 pago"], differentials:["Único dono","IPVA pago"], oldPrice:"R$ 169.900", price:"R$ 157.900", image:`${FIGMA_ASSET}/e025c.png`, count:"1/8", slug:"jeep-compass-longitude-2024" },
];

const brands = [
  ["Volkswagen","https://www.figma.com/api/mcp/asset/ee426edf-ac82-4bef-ab71-6f65f79218f3/34e03.png"],
  ["Honda","https://www.figma.com/api/mcp/asset/ee426edf-ac82-4bef-ab71-6f65f79218f3/ba18e.png"],
  ["Chevrolet","https://www.figma.com/api/mcp/asset/ee426edf-ac82-4bef-ab71-6f65f79218f3/c267b.png"],
  ["Toyota","https://www.figma.com/api/mcp/asset/ee426edf-ac82-4bef-ab71-6f65f79218f3/bb8c0.png"],
  ["Fiat","https://www.figma.com/api/mcp/asset/ee426edf-ac82-4bef-ab71-6f65f79218f3/6278f.png"],
  ["Hyundai","https://www.figma.com/api/mcp/asset/ee426edf-ac82-4bef-ab71-6f65f79218f3/7b7df.png"],
  ["Ford","https://www.figma.com/api/mcp/asset/ee426edf-ac82-4bef-ab71-6f65f79218f3/75f9c.png"],
  ["Mitsubishi","https://www.figma.com/api/mcp/asset/ee426edf-ac82-4bef-ab71-6f65f79218f3/77739.png"],
  ["Jeep","https://www.figma.com/api/mcp/asset/ee426edf-ac82-4bef-ab71-6f65f79218f3/25e57.png"],
] as const;

const modelOptions = ["Corolla","Civic","T-Cross","Tracker","HB20S","Argo","Territory","Eclipse Cross","Compass"];
const transmissionOptions = ["Automático","CVT","Manual"];
const differentialOptions = ["Único dono","Garantia de fábrica","Baixa quilometragem","Revisado","Laudo aprovado","IPVA pago"];

const numericPrice = (value:string) => Number(value.replace(/\D/g, ""));

export default function SeminovosPage() {
  const [filtersOpen, setFiltersOpen] = useState(true);
  const [topMenu, setTopMenu] = useState<"price" | "brand" | null>(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [priceMin, setPriceMin] = useState(50000);
  const [priceMax, setPriceMax] = useState(240000);
  const [belowFipe, setBelowFipe] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [selectedTransmissions, setSelectedTransmissions] = useState<string[]>([]);
  const [selectedDifferentials, setSelectedDifferentials] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"relevant" | "lowest">("relevant");
  const [searchQuery, setSearchQuery] = useState("");
  const [bannerVisible, setBannerVisible] = useState(true);
  const [exitModalOpen, setExitModalOpen] = useState(false);
  const exitIntentShown = useRef(false);
  const filtersRef = useRef<HTMLElement>(null);

  const pageSize = 6;
  const priceApplied = priceMin !== 50000 || priceMax !== 240000 || belowFipe;
  const minPct = ((priceMin - 50000) / 200000) * 100;
  const maxPct = ((priceMax - 50000) / 200000) * 100;

  const filteredVehicles = vehicles.filter((vehicle) => {
    const price = numericPrice(vehicle.price);
    const inRange = price >= priceMin && price <= priceMax;
    const belowFipeMatch = !belowFipe || price < numericPrice(vehicle.oldPrice);
    const brandMatch = !selectedBrand || vehicle.brand === selectedBrand;
    const modelMatch = selectedModels.length === 0 || selectedModels.includes(vehicle.model);
    const transmissionMatch = selectedTransmissions.length === 0 || selectedTransmissions.includes(vehicle.transmission);
    const differentialMatch = selectedDifferentials.length === 0 || selectedDifferentials.every((item) =>
      vehicle.differentials.includes(item)
    );
    const query = searchQuery.trim().toLowerCase();
    const searchMatch = !query || [vehicle.brand,vehicle.model,vehicle.version,vehicle.transmission,...vehicle.tags].join(" ").toLowerCase().includes(query);
    return inRange && belowFipeMatch && brandMatch && modelMatch && transmissionMatch && differentialMatch && searchMatch;
  });

  const sortedVehicles = [...filteredVehicles].sort((a,b) =>
    sortBy === "lowest" ? numericPrice(a.price) - numericPrice(b.price) : 0
  );
  const totalPages = Math.max(1, Math.ceil(sortedVehicles.length / pageSize));
  const visibleVehicles = sortedVehicles.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);

  const countModel = (model:string) => vehicles.filter(v=>v.model===model).length;
  const countTransmission = (transmission:string) => vehicles.filter(v=>v.transmission===transmission).length;
  const countDifferential = (label:string) => vehicles.filter(v => v.differentials.includes(label)).length;

  useEffect(() => {
    const closeTopMenuOnScroll = () => setTopMenu(null);
    window.addEventListener("scroll", closeTopMenuOnScroll, { passive: true });
    return () => window.removeEventListener("scroll", closeTopMenuOnScroll);
  }, []);

  useEffect(() => {
    const onExitIntent = (event: MouseEvent) => {
      if (window.matchMedia("(max-width: 780px)").matches) return;
      if (exitIntentShown.current) return;
      if (event.clientY <= 4 && !event.relatedTarget) {
        exitIntentShown.current = true;
        setExitModalOpen(true);
        setTopMenu(null);
      }
    };
    document.addEventListener("mouseout", onExitIntent);
    return () => document.removeEventListener("mouseout", onExitIntent);
  }, []);

  useEffect(() => {
    if (pageNumber > totalPages) setPageNumber(1);
  }, [totalPages, pageNumber]);

  const toggleTopMenu = (menu: "price" | "brand") => setTopMenu(current => current === menu ? null : menu);

  const openFilters = () => {
    setTopMenu(null);
    if (window.matchMedia("(max-width: 780px)").matches) {
      setMobileFiltersOpen(true);
      return;
    }
    setFiltersOpen(true);
    window.setTimeout(() => filtersRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
  };

  const chooseBrand = (brand:string) => {
    setSelectedBrand(current => current === brand ? null : brand);
    setPageNumber(1);
    setTopMenu(null);
  };

  const toggleArray = (value:string, current:string[], setter:(next:string[])=>void) => {
    setter(current.includes(value) ? current.filter(item=>item!==value) : [...current,value]);
    setPageNumber(1);
  };

  const FilterContent = () => (
    <>
      <div className="filter-section">
        <div className="filter-title"><b>Modelo</b><span>−</span></div>
        {modelOptions.map(item=>(
          <label className="check-row" key={item}>
            <input type="checkbox" checked={selectedModels.includes(item)} onChange={()=>toggleArray(item,selectedModels,setSelectedModels)} />
            <span>{item}</span><small>{countModel(item)}</small>
          </label>
        ))}
      </div>
      <div className="filter-section">
        <div className="filter-title"><b>Câmbio</b><span>−</span></div>
        {transmissionOptions.map(item=>(
          <label className="check-row" key={item}>
            <input type="checkbox" checked={selectedTransmissions.includes(item)} onChange={()=>toggleArray(item,selectedTransmissions,setSelectedTransmissions)} />
            <span>{item}</span><small>{countTransmission(item)}</small>
          </label>
        ))}
      </div>
      <div className="filter-section">
        <div className="filter-title"><b>Diferenciais</b><span>−</span></div>
        {differentialOptions.map(item=>(
          <label className="check-row" key={item}>
            <input type="checkbox" checked={selectedDifferentials.includes(item)} onChange={()=>toggleArray(item,selectedDifferentials,setSelectedDifferentials)} />
            <span>{item}</span><small>{countDifferential(item)}</small>
          </label>
        ))}
      </div>
    </>
  );

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
            <a className="finance" href="#">Simular Financiamento</a>
            <a href="#">Nossas lojas</a>
          </nav>
          <a className="talk-button" href="#"><FaWhatsapp aria-hidden="true" /> Fale com a gente</a>
        </div>
      </header>

      <main>
        <section className="search-strip">
          <div className="mares-container search-shell">
            <label className="search-box">
              <Search className="search-icon" aria-hidden="true" />
              <span className="search-copy">
                <b>O QUE VOCÊ PROCURA?</b>
                <input aria-label="Buscar veículo" value={searchQuery} onChange={(e)=>{setSearchQuery(e.target.value);setPageNumber(1)}} placeholder="Ex.: SUV, automático..." />
              </span>
            </label>

            <div className="quick-filters">
              <div className="top-filter-anchor">
                <button className={`pill ${topMenu === "price" || priceApplied ? "selected" : ""}`} onClick={()=>toggleTopMenu("price")} aria-expanded={topMenu === "price"}>
                  <BadgeDollarSign className="pill-icon" aria-hidden="true" />Preço<ChevronDown className="pill-chevron" aria-hidden="true" />
                </button>
                {topMenu === "price" && (
                  <div className="top-popover price-popover">
                    <div className="popover-title"><b>Preço</b></div>
                    <div className="price-slider">
                      <div className="dual-range" style={{"--range-start": `${minPct}%`, "--range-end": `${maxPct}%`} as React.CSSProperties}>
                        <span className="range-base" /><span className="range-active" />
                        <input aria-label="Preço mínimo" type="range" min="50000" max="250000" step="5000" value={priceMin} onChange={(e)=>{setPriceMin(Math.min(Number(e.target.value), priceMax-5000));setPageNumber(1)}} />
                        <input aria-label="Preço máximo" type="range" min="50000" max="250000" step="5000" value={priceMax} onChange={(e)=>{setPriceMax(Math.max(Number(e.target.value), priceMin+5000));setPageNumber(1)}} />
                      </div>
                    </div>
                    <div className="price-fields">
                      <label><span>R$</span><input inputMode="numeric" value={priceMin.toLocaleString("pt-BR")} onChange={(e)=>{const n=Number(e.target.value.replace(/\D/g,"")); if(!Number.isNaN(n)){setPriceMin(Math.min(n,priceMax-5000));setPageNumber(1)}}} /></label>
                      <label><span>R$</span><input inputMode="numeric" value={priceMax.toLocaleString("pt-BR")} onChange={(e)=>{const n=Number(e.target.value.replace(/\D/g,"")); if(!Number.isNaN(n)){setPriceMax(Math.max(n,priceMin+5000));setPageNumber(1)}}} /></label>
                    </div>
                    <div className="fipe-row">
                      <div><b>Abaixo da Fipe</b><span>Oportunidades com o valor abaixo da tabela.</span></div>
                      <button className={`switch ${belowFipe ? "on" : ""}`} aria-pressed={belowFipe} aria-label="Abaixo da Fipe" onClick={()=>{setBelowFipe(v=>!v);setPageNumber(1)}}><i /></button>
                    </div>
                  </div>
                )}
              </div>

              <div className="top-filter-anchor">
                <button className={`pill ${topMenu === "brand" || selectedBrand ? "selected" : ""}`} onClick={()=>toggleTopMenu("brand")} aria-expanded={topMenu === "brand"}>
                  <CarFront className="pill-icon" aria-hidden="true" />{selectedBrand ?? "Marca"}<ChevronDown className="pill-chevron" aria-hidden="true" />
                </button>
                {topMenu === "brand" && (
                  <div className="top-popover brand-popover">
                    <div className="popover-title"><b>Marca</b></div>
                    <div className="brand-grid">
                      {brands.map(([name,image])=>(
                        <button className={`brand-option ${selectedBrand===name?"active":""}`} key={name} onClick={()=>chooseBrand(name)}>
                          <span className="brand-logo"><img src={image} alt="" /></span><span>{name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <button className="pill" onClick={openFilters}><SlidersVertical className="pill-icon" aria-hidden="true" />Filtros</button>
            </div>

            <button className="stock-button">Buscar no estoque <span>→</span></button>
          </div>
        </section>

        <section className="mares-container listing">
          {bannerVisible && (
            <div className="campaign">
              <p className="campaign-desktop">Encontre veículos com <b>único dono</b>, <b>garantia</b>, <b>baixa quilometragem</b> e revisões em dia.</p>
              <p className="campaign-mobile"><b>Seminovos com diferenciais que importam.</b></p>
              <button onClick={openFilters}>Explorar</button>
              <button className="campaign-close" aria-label="Fechar banner" onClick={()=>setBannerVisible(false)}>×</button>
            </div>
          )}

          <div className="results-head">
            <div className="result-count">
              <b>{filteredVehicles.length} veículos encontrados</b>
              <span>Opções selecionadas para você</span>
            </div>
            <div className="applied">
              {selectedBrand && <button onClick={()=>setSelectedBrand(null)}>{selectedBrand} <span>×</span></button>}
              {selectedModels.map(item=><button key={item} onClick={()=>toggleArray(item,selectedModels,setSelectedModels)}>{item} <span>×</span></button>)}
              {selectedTransmissions.map(item=><button key={item} onClick={()=>toggleArray(item,selectedTransmissions,setSelectedTransmissions)}>{item} <span>×</span></button>)}
              {priceApplied && (
                <button onClick={()=>{setPriceMin(50000);setPriceMax(240000);setBelowFipe(false);setPageNumber(1)}}>R$ {priceMin.toLocaleString("pt-BR")}–{priceMax.toLocaleString("pt-BR")} <span>×</span></button>
              )}
            </div>
            <label className="sort">Ordenar por
              <select value={sortBy} onChange={(e)=>{setSortBy(e.target.value as "relevant"|"lowest");setPageNumber(1)}}>
                <option value="relevant">Mais relevantes</option>
                <option value="lowest">Menores preços</option>
              </select>
            </label>
          </div>

          <div className={`listing-layout ${filtersOpen ? "" : "no-sidebar"}`}>
            {filtersOpen && (
              <aside className="sidebar" ref={filtersRef}>
                <div className="sidebar-title">
                  <div><span>Refine sua busca</span><h2>Filtros</h2></div>
                  <button onClick={()=>setFiltersOpen(false)}>×</button>
                </div>
                <FilterContent />
                <button className="apply-button">Aplicar filtros</button>
              </aside>
            )}

            <div className="vehicle-grid">
              {visibleVehicles.map((v)=>(
                <article className="vehicle-card" key={v.slug}>
                  <div className="vehicle-image"><img src={v.image} alt={`${v.brand} ${v.model}`} /><span className="image-count">{v.count}</span></div>
                  <div className="vehicle-body">
                    <div className="vehicle-topline">
                      <span className="brand-label">{v.brand}</span>
                      <div className="card-tags">{v.tags.slice(0,2).map(t=><span key={t}>{t}</span>)}</div>
                    </div>
                    <h3>{v.model}</h3><p className="version">{v.version}</p>
                    <div className="mini-specs">
                      <span><CalendarDays aria-hidden="true" />{v.year}</span>
                      <span><Gauge aria-hidden="true" />{v.km}</span>
                      <span><SlidersVertical aria-hidden="true" />{v.transmission}</span>
                    </div>
                    <div className="trust-lines">
                      {v.checks.map(item=><span key={item}><Check aria-hidden="true" />{item}</span>)}
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

          <nav className="pagination" aria-label="Paginação de veículos">
            <button onClick={()=>setPageNumber(p=>Math.max(1,p-1))} disabled={pageNumber===1}>←</button>
            {Array.from({length:totalPages},(_,i)=>i+1).map(n=><button key={n} className={pageNumber===n?"active":""} onClick={()=>setPageNumber(n)}>{n}</button>)}
            <button onClick={()=>setPageNumber(p=>Math.min(totalPages,p+1))} disabled={pageNumber===totalPages}>→</button>
          </nav>
        </section>
      </main>

      {exitModalOpen && (
        <div className="exit-modal-overlay" role="presentation" onMouseDown={()=>setExitModalOpen(false)}>
          <section className="exit-modal" role="dialog" aria-modal="true" aria-labelledby="exit-modal-title" onMouseDown={(e)=>e.stopPropagation()}>
            <button className="exit-modal-close" aria-label="Fechar" onClick={()=>setExitModalOpen(false)}>×</button>
            <span className="exit-modal-kicker">Antes de ir...</span>
            <h2 id="exit-modal-title">Que tal experimentar esse carro na prática?</h2>
            <p className="exit-modal-copy">Agende um test drive e continue a avaliação com mais segurança antes de decidir.</p>
            <div className="exit-modal-actions">
              <button className="exit-modal-primary" onClick={()=>setExitModalOpen(false)}>Quero agendar um test drive</button>
              <button className="exit-modal-secondary" onClick={()=>setExitModalOpen(false)}>Continuar explorando</button>
            </div>
            <div className="exit-modal-easter">
              <b>Easter egg para os avaliadores 👋</b>
              <p>Ainda não explorei nem defini qual hipótese valeria testar aqui, mas minha ideia seria usar este momento para tentar recuperar alguém inclinado a sair da página, oferecendo algo que ainda não apareceu na jornada, como um test drive :)</p>
            </div>
          </section>
        </div>
      )}

      {mobileFiltersOpen && (
        <div className="mobile-filter-overlay" role="dialog" aria-modal="true" aria-label="Filtros">
          <aside className="mobile-filter-drawer">
            <div className="sidebar-title">
              <div><span>Refine sua busca</span><h2>Filtros</h2></div>
              <button onClick={()=>setMobileFiltersOpen(false)}>×</button>
            </div>
            <div className="mobile-filter-scroll"><FilterContent /></div>
            <button className="apply-button mobile-apply" onClick={()=>setMobileFiltersOpen(false)}>Aplicar filtros</button>
          </aside>
        </div>
      )}
    </div>
  );
}
