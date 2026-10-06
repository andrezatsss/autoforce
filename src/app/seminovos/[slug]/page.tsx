type Props = { params: Promise<{ slug: string }> };

export default async function VehicleDetailPage({ params }: Props) {
  const { slug } = await params;
  return (
    <main className="container" style={{ padding: "48px 0" }}>
      <a href="/seminovos" style={{ color: "#0f3d8f", fontWeight: 700 }}>← Voltar para seminovos</a>
      <h1 style={{ marginTop: 28 }}>Detalhe do veículo</h1>
      <p>Rota dinâmica pronta para receber o layout final do Figma.</p>
      <code>{slug}</code>
    </main>
  );
}
