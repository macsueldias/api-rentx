# Cadastro de carro

**RF** => Requisitos funcionais
Deve ser possível cadastrar um novo carro.

**RN** => Regra de negócio
Não deve ser possível cadastrar um carro com uma placa já existente.
Ao ser cadastrado o status do carro deve está como disponível.

O usuário responsável pelo cadastro deve ser um usuário administrador.

# Listagem de carros

**RF** => Requisitos funcionais
Deve ser possível listar todos os carros disponíveis.
Deve ser possível listar todos os carros disponíveis pelo nome da categoria.
Deve ser possível listar todos os carros disponíveis pelo nome da marca.
Deve ser possível listar todos os carros disponíveis pelo nome da carro.

**RN** => Regra de negócio
O usuário não precisa estar logado no sistama para visualizar os carros disponíveis

# Cadastro de especificação no carro

**RF** => Requisitos funcionais
Deve ser possível cadastrar uma especificação para um carro.

**RN** => Regra de negócio
Não deve ser possível cadastrar um especificação para um carro não cadastrado.
Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
O usuário responsável pelo cadastro deve ser um usuário administrador.

# Cadastro de imagens do carro

**RF** => Requisitos funcionais
Deve ser possível cadastrar a imagem do carro.

**RNF** => Requisitos não funcionais
Utilizar o multer para upload dos arquivos.

**RN** => Regra de negócio
O usuário poderá cadastrar mais de uma imagem para o mesmo carro.
O usuário responsável pelo cadastro deve ser um usuário administrados.

# Aluguel de carro

**RF** => Requisitos funcionais
Deve ser possível cadastrar um aluguel.

**RN** => Regra de negócio
O aluguel deve ter duração minima de 24 horas.
Não deve ser possível cadastra um novo aluguel caso já exista um aberto com o mesmo usuário.
Não deve ser possível cadastra um novo aluguel caso já exista um aberto para o mesmo carro.
O usuário deve estar logado na aplicação.
Ao realizar um aluguel, o status do carro deverá ser alterado para indisponível

# Devolução de carro

**RF** => Requisitos funcionais
Deve ser possível realizar a devolução de um carro

**RN** => Regra de negócio
Se o carro for devolvido com menos de 24 horas, deverá ser cobrado diária completa.
Ao realizar a devolução, o carro deverá ser liberado para outro aluguel.
Ao realizar a devolução, o usuário deverá ser liberado par outro aluguel.
Ao realizar a devolução, deverá ser calculado o total do aluguel.
Caso o horário de devolução seja superior ao horário previsto de entrega, deverá ser cobrado multa proporcional aos dias de atraso.
Caso haja multa, deverá ser somado ao total do aluguel.
O usuário deve estar logado na aplicação.

# Listagem de Alugueis para usuário

**RF** => Requisitos funcionais
Deve ser possível realizar a busca de todos os alugueis para o suário

**RN** => Regra de negócio
O usuário deve estar logado na aplicação

# Recuperar Senha

**RF** => Requisitos funcionais
Deve ser possível o usuário recuperar a senha informando o e-mail
O usuário deve receber um e=mail com o passo a passo para a recuperação da senha
O usuário deve conseguir inserir um nova senha

**RN** => Regra de negócio
