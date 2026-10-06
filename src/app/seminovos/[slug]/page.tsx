"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import {
  CalendarDays, Gauge, SlidersHorizontal, Fuel, Car, PaintBucket, Signpost,
  UserRound, Wrench, ShieldCheck, Heart, GitCompareArrows, Check, ChevronRight,
  CircleDollarSign, ArrowLeftRight, MessageCircle
} from "lucide-react";

const gallery = [
  "https://www.figma.com/api/mcp/asset/5b1a45e2-799c-4976-8253-31a2bfb8a72d.png",
  "https://www.figma.com/api/mcp/asset/dac5d1f5-dc6a-43ff-b741-99916999579c.png",
  "https://www.figma.com/api/mcp/asset/674e7abf-6a50-4720-90b1-aae9d6090909.png",
  "https://www.figma.com/api/mcp/asset/6b20936f-7774-4eee-837e-80989d56d4dc.png",
];

const vehicleMap = {
  "toyota-corolla-altis-premium-2024": {
    brand:"TOYOTA", model:"Corolla", version:"Altis Premium 2.0 Flex", year:"2024/2025", km:"56.434 km", transmission:"Automático",
    engine:"2.0 VVT-IE Flex XEI Direct Shift", fuel:"Flex", doors:"4", body:"Sedan", color:"Branco pérola", plate:"8",
    oldPrice:"R$ 164.000", price:"R$ 142.900"
  },
  "toyota-corolla-xei-2024": {
    brand:"TOYOTA", model:"Corolla", version:"XEi 2.0 Flex", year:"2023/2024", km:"32.410 km", transmission:"Automático",
    engine:"2.0 VVT-IE Flex XEI Direct Shift", fuel:"Flex", doors:"4", body:"Sedan", color:"Branco pérola", plate:"8",
    oldPrice:"R$ 159.000", price:"R$ 139.900"
  },
  "toyota-corolla-gli-2023": {
    brand:"TOYOTA", model:"Corolla", version:"GLi 2.0 Flex", year:"2022/2023", km:"44.180 km", transmission:"Automático",
    engine:"2.0 VVT-IE Flex Direct Shift", fuel:"Flex", doors:"4", body:"Sedan", color:"Branco pérola", plate:"8",
    oldPrice:"R$ 149.000", price:"R$ 132.900"
  }
} as const;

const equipment = [
  ["Características","Motor 2.0 Flex, câmbio automático e rodas de liga leve."],
  ["Conforto","Ar-condicionado digital, bancos em couro e ajuste elétrico."],
  ["Tecnologia","Central multimídia, conectividade e câmera de ré."],
  ["Segurança","Controle de estabilidade, airbags e assistentes de condução."]
] as const;

export default function VehicleDetailPage() {
  const params = useParams<{slug:string}>();
  const data = vehicleMap[params.slug as keyof typeof vehicleMap] ?? vehicleMap["toyota-corolla-altis-premium-2024"];
  const [activeImage,setActiveImage] = useState(0);
  const [openEquipment,setOpenEquipment] = useState(0);

  const specs = [
    [CalendarDays,"Ano/Modelo",data.year],
    [Gauge,"Km rodados",data.km],
    [SlidersHorizontal,"Câmbio",data.transmission],
    [Wrench,"Versão",data.engine],
    [Fuel,"Combustível",data.fuel],
    [Car,"Portas",data.doors],
    [Car,"Carroceria",data.body],
    [PaintBucket,"Cor",data.color],
    [Signpost,"Final da placa",data.plate],
  ] as const;

  return (
    <div className="detail-page">
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
          <a className="talk-button" href="#"><MessageCircle size={19}/> Fale com a gente</a>
        </div>
      </header>

      <main className="detail-main mares-container">
        <div className="detail-back"><Link href="/seminovos">← Voltar para resultados</Link></div>

        <section className="detail-hero">
          <div className="detail-gallery">
            <div className="gallery-main">
              <img src={gallery[activeImage]} alt={`${data.brand} ${data.model}`} />
              <span>{activeImage+1}/8</span>
            </div>
            <div className="gallery-thumbs">
              {gallery.map((src,i)=>(
                <button key={src} className={i===activeImage ? "active":""} onClick={()=>setActiveImage(i)}>
                  <img src={src} alt={`Foto ${i+1} do veículo`} />
                </button>
              ))}
            </div>
          </div>

          <div className="detail-summary">
            <div className="detail-brand">{data.brand}</div>
            <h1>{data.model}</h1>
            <p className="detail-version">{data.version}</p>
            <div className="detail-tags"><span>ÚNICO DONO</span><span>BAIXA KM</span></div>

            <div className="spec-grid">
              {specs.map(([Icon,label,value])=>(
                <div className="spec-item" key={label}>
                  <Icon aria-hidden="true"/>
                  <div><span>{label}</span><b>{value}</b></div>
                </div>
              ))}
            </div>

            <div className="detail-price"><small>De <s>{data.oldPrice}</s></small><strong>{data.price}</strong></div>
            <a className="detail-whatsapp" href="#"><MessageCircle size={19}/>Conversar sobre este carro</a>
            <div className="detail-actions">
              <button><Heart size={17}/>Favoritar</button>
              <button><GitCompareArrows size={17}/>Comparar</button>
            </div>
            <p className="detail-note">Atendimento direto com a equipe Marés Automóveis.</p>
          </div>
        </section>

        <section className="detail-highlights">
          <h2>Destaques</h2>
          <div className="highlight-grid">
            <article><UserRound/><h3>Único dono</h3><p>Histórico mais simples e fácil de acompanhar.</p></article>
            <article><Gauge/><h3>{data.km}</h3><p>Quilometragem abaixo da média para o ano.</p></article>
            <article><Wrench/><h3>Revisado na concessionária</h3><p>Histórico de manutenção disponível.</p></article>
            <article><ShieldCheck/><h3>Laudo aprovado</h3><p>Estrutura e identificação verificadas.</p></article>
          </div>
        </section>

        <section className="detail-section vehicle-about">
          <div className="section-heading"><span>PARA AVALIAR</span><h2>Sobre este veículo</h2><p>As informações essenciais, organizadas para uma avaliação mais clara.</p></div>
          <div className="about-grid">
            <dl className="basic-data">
              <div><dt>Combustível</dt><dd>{data.fuel}</dd></div>
              <div><dt>Cor</dt><dd>{data.color}</dd></div>
              <div><dt>Carroceria</dt><dd>Sedã</dd></div>
              <div><dt>Final da placa</dt><dd>{data.plate}</dd></div>
            </dl>
            <div className="equipment-list">
              {equipment.map(([title,body],i)=>(
                <div className={`equipment-row ${openEquipment===i?"open":""}`} key={title}>
                  <button onClick={()=>setOpenEquipment(openEquipment===i?-1:i)}><b>{title}</b><span>{openEquipment===i?"−":"+"}</span></button>
                  {openEquipment===i && <p>{body}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="history-section">
          <div className="history-copy"><h2>A história deste carro, antes de chegar até você.</h2><p>Uma trajetória documentada e verificada pela Marés.</p></div>
          <div className="history-timeline">
            {[
              ["2023","Primeiro proprietário"],
              ["2024","Revisão realizada na concessionária"],
              ["2025","Revisão realizada na concessionária"],
              ["Hoje","Laudo cautelar aprovado ✓"],
            ].map(([year,text])=><div key={year}><i/><span>{year}</span><b>{text}</b></div>)}
          </div>
          <div className="history-footer"><span>Documentação <b>Regular ✓</b></span><span>Garantia <a href="#">Consultar disponibilidade →</a></span></div>
        </section>

        <section className="detail-section buying">
          <div className="section-heading"><span>PARA AVANÇAR</span><h2>Condições de compra</h2></div>
          <div className="buy-grid">
            <article><CircleDollarSign/><div><h3>Financiamento</h3><p>Consulte condições adequadas ao seu momento.</p><a href="#">Consultar condições →</a></div></article>
            <article><ArrowLeftRight/><div><h3>Seu carro na troca</h3><p>Seu veículo atual pode fazer parte do pagamento.</p><a href="#">Solicitar avaliação →</a></div></article>
          </div>
        </section>

        <section className="detail-section related">
          <div className="section-heading"><span>OUTRAS OPÇÕES</span><h2>Você também pode gostar</h2></div>
          <div className="related-grid">
            {Object.entries(vehicleMap).map(([slug,v])=>(
              <article className="related-card" key={slug}>
                <img src={gallery[0]} alt={v.model}/>
                <div><span>{v.brand}</span><h3>{v.model}</h3><p>{v.version}</p><strong>{v.price}</strong><Link href={`/seminovos/${slug}`}>Ver detalhes →</Link></div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
