from src.leilao.dominio import Usuario, Lance, Leilao

gui = Usuario('Gui', 500.0)
yuri = Usuario('Yuri', 500.0)

lance_do_yuri = Lance(yuri, 100.0)
lance_do_gui = Lance(gui, 150.0)

leilao = Leilao('Celular')

leilao.lances.append(lance_do_gui)
leilao.lances.append(lance_do_yuri)

for lance in leilao.lances:
    print(f'O usúario {lance.usuario.nome} deu um lance de {lance.valor}')


