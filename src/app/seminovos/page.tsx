const vehicles = [
  {
    brand: "TOYOTA",
    model: "Corolla Altis Premium",
    version: "2.0 Flex Automático",
    year: "2024/2025",
    km: "56.434 km",
    transmission: "Automático",
    tags: ["Único dono", "Garantia de fábrica"],
    trust: ["Laudo cautelar aprovado", "Revisões em dia"],
    price: "R$ 142.900",
    slug: "toyota-corolla-altis-premium-2025",
  },
  {
    brand: "HONDA",
    model: "Civic Touring",
    version: "1.5 Turbo CVT",
    year: "2023/2024",
    km: "31.200 km",
    transmission: "Automático",
    tags: ["Baixa km", "Revisado"],
    trust: ["Laudo cautelar aprovado", "Procedência verificada"],
    price: "R$ 168.900",
    slug: "honda-civic-touring-2024",
  },
  {
    brand: "VOLKSWAGEN",
    model: "T-Cross Highline",
    version: "250 TSI Automático",
    year: "2024/2024",
    km: "22.800 km",
    transmission: "Automático",
    tags: ["Baixa km", "IPVA pago"],
    trust: ["Laudo cautelar aprovado", "Revisões em dia"],
    price: "R$ 136.900",
    slug: "volkswagen-t-cross-highline-2024",
  },
];

export default function SeminovosPage() {
  return (
    <>
      <header className="header">
        <div className="container header-inner">
          <div className="logo">Marés Automóveis</div>
          <nav className="nav" aria-label="Navegação principal">
            <a href="/seminovos">Comprar</a>
            <a href="#">Vender</a>
            <a href="#">Simular financiamento</a>
            <a href="#">Nossas lojas</a>
          </nav>
          <a className="whatsapp" href="#">Fale com a gente</a>
        </div>
      </header>

      <main className="container">
        <section className="hero">
          <h1>Encontre o seminovo certo para você</h1>
          <p>Explore o estoque da Marés Automóveis com informações claras para comparar, confiar e avançar na compra.</p>

          <div className="search-row" aria-label="Filtros de veículos">
            <input className="control search-main" placeholder="Ex.: Corolla, SUV, automático..." />
            <select className="control" defaultValue=""><option value="" disabled>Marca</option><option>Toyota</option><option>Honda</option><option>Volkswagen</option></select>
            <select className="control" defaultValue=""><option value="" disabled>Modelo</option><option>Corolla</option><option>Civic</option><option>T-Cross</option></select>
            <select className="control" defaultValue=""><option value="" disabled>Preço</option><option>Até R$ 120 mil</option><option>R$ 120–150 mil</option><option>Acima de R$ 150 mil</option></select>
            <select className="control" defaultValue=""><option value="" disabled>Câmbio</option><option>Automático</option><option>Manual</option></select>
            <button className="more-filter">Mais filtros</button>
          </div>
        </section>

        <section className="banner">
          <h2>Nem todo seminovo é igual.</h2>
          <p>Encontre opções com <strong>único dono, garantia, baixa quilometragem e revisões em dia.</strong></p>
          <button>Explorar diferenciais →</button>
        </section>

        <section>
          <div className="listing-head">
            <div>
              <h2>180 veículos encontrados</h2>
              <p>Compare opções e abra os detalhes para avaliar procedência, equipamentos e condições.</p>
            </div>
            <select className="control" defaultValue="relevance" aria-label="Ordenar">
              <option value="relevance">Mais relevantes</option>
              <option value="lowest">Menor preço</option>
              <option value="highest">Maior preço</option>
            </select>
          </div>

          <div className="grid">
            {vehicles.map((vehicle) => (
              <article className="card" key={vehicle.slug}>
                <div className="card-media">Foto do veículo</div>
                <div className="card-body">
                  <div className="eyebrow">{vehicle.brand}</div>
                  <h3>{vehicle.model}</h3>
                  <div className="version">{vehicle.version}</div>
                  <div className="specs">
                    <span>{vehicle.year}</span><span>•</span><span>{vehicle.km}</span><span>•</span><span>{vehicle.transmission}</span>
                  </div>
                  <div className="tags">{vehicle.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
                  <div className="trust">{vehicle.trust.map((item) => <span key={item}>✓ {item}</span>)}</div>
                  <div className="price">{vehicle.price}</div>
                  <a className="details" href={`/seminovos/${vehicle.slug}`}>Ver detalhes →</a>
                </div>
              </article>
            ))}
          </div>
        </section>
        <div className="footer-space" />
      </main>
    </>
  );
}
