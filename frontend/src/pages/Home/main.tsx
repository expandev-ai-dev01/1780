export const HomePage = () => {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-3xl font-bold mb-4">Bem-vindo ao Catálogo de Carros</h2>
        <p className="text-lg text-muted-foreground">
          Explore nossa coleção de veículos disponíveis. Clique em qualquer carro para ver mais
          detalhes e entrar em contato.
        </p>
      </section>

      <section>
        <div className="bg-muted rounded-sm p-8 text-center">
          <p className="text-muted-foreground">A listagem de carros será implementada aqui.</p>
        </div>
      </section>
    </div>
  );
};
