export const MODS = [
 {nome:"Comercial", blocks:[
  {kicker:"Início do processo", title:"Tudo começa no Comercial",
   flow:["Cliente","Proposta","Aprovação","Contrato"], lead:"A qualidade das informações comerciais influencia as próximas etapas.",
   callout:[
    "O preenchimento completo do contrato é fundamental para garantir que todas as áreas tenham acesso às informações necessárias para dar continuidade ao processo.",
    "Cada informação registrada no Comercial orienta a programação da Operação, permite o acompanhamento correto das atividades e contribui para que o Faturamento e o Financeiro funcionem adequadamente.",
    "Um contrato bem preenchido evita retrabalho, reduz falhas de comunicação e garante a integração entre as etapas.",
    "O que não é registrado corretamente no sistema pode comprometer as etapas seguintes."]}
 ]},
 {nome:"Operacional", blocks:[
  {kicker:"Movimentação operacional", title:"O contrato movimenta a Operação",
   flow:["Programação","Ordem de Serviço","Execução","Registro"],
   callout:["O que foi contratado precisa chegar corretamente à equipe operacional."]},
  {kicker:"Execução rastreável", title:"Operação — o fluxo da O.S.",
   flow:["Gerar","Conferir","Distribuir","Executar","Registrar","Fechar"], hi:5,
   details:[["Origem","Contrato ou O.S. avulsa"],["Conferência","Produtos, quantidades, rotas e capacidade do veículo"],["Apontamento","Apontar o resultado da operação do dia programado."]],
   rules:["A instalação deve ser registrada por Ordem de Serviço.","A execução precisa ser apontada no sistema.","O registro da OS alimenta o andamento do contrato e as etapas seguintes."]}
 ]},
 {nome:"Faturamento", blocks:[
  {kicker:"Registros para faturar", title:"A execução gera informações para o Faturamento",
   flow:["Conferência","Medição","Análise","Liberação"], hi:3,
   lead:"O faturamento depende dos registros e critérios aplicáveis ao contrato."},
  {kicker:"Da execução à cobrança", title:"Faturamento — conferir antes de transmitir",
   flow:["Conferência / análise de faturamento","Fechamento de medições","Fatura de Locação e NFS-e","Financeiro + boleto","Envio ao cliente"], hi:2,
   cols:[
    {h:"Análise de faturamento", items:[
      "A tela de análise identifica contratos aptos ao faturamento.","Considera o período selecionado.","O contrato precisa ter as informações de instalação registradas.","Apresenta a última nota emitida e o status do faturamento.","A análise é dinâmica: ao alterar o período, os contratos podem mudar."]},
    {h:"Gestão de Medição", badge:"Nova funcionalidade", items:[
      "Gerar medições por período e cliente, ou para todos os clientes.","Conferir os contratos e valores apresentados.","Gerar o PDF da medição e enviar ao cliente pelo e-mail do sistema.","O cliente pode aprovar ou rejeitar pelo link recebido.","Sem resposta em dois dias corridos, a medição é liberada automaticamente.","Então é possível voltar à tela de Análise de faturamento e realizar a emissão da fatura/NFS-e."]}
   ]}
 ]},
 {nome:"Financeiro", blocks:[
  {kicker:"Acompanhamento do resultado", title:"O Financeiro acompanha o resultado",
   chips:["Receitas","Despesas","Títulos","Vencimentos","Recebimentos"],
   lead:"O financeiro precisa refletir corretamente os acontecimentos comerciais e operacionais."},
  {kicker:"Gestão integrada", title:"Financeiro — reflexo das operações, não uma ilha",
   flow:["Contratos","Operacional","Faturamento","Contas a receber"], hi:3,
   lead:"O financeiro consolida e acompanha as informações geradas pelos contratos, pela operação e pelo faturamento.",
   quote:"“Ele não gera o resultado: ele reflete o que cada etapa registrou.”"}
 ]}
];

export const MAN = [
 {area:"Cadastros", t:"Cadastro de empresa / participantes",
  obj:"Cadastrar novos clientes, fornecedores e parceiros no sistema com preenchimento automático de dados cadastrais a partir do CNPJ, garantindo agilidade e evitando erros de digitação.",
  steps:[
   {t:"Acessar a tela de cadastro", s:["No menu lateral, clique em **Participante**.","Em seguida, selecione **Participante** e clique no botão **Novo**."]},
   {t:"Consulta e preenchimento automático por CNPJ", s:["No campo **CPF/CNPJ**, digite apenas os números do CNPJ da empresa.","Clique no ícone de lupa (ou no botão de busca) ao lado do campo.","O sistema consulta os dados na Receita Federal e preenche: Razão Social, Nome Fantasia e Endereço completo (Rua, Número, Bairro, Cidade, Estado e CEP)."]},
   {t:"Vincular Inscrição Estadual (IE)", s:["Se o sistema não puxar a Inscrição Estadual automaticamente, clique no botão **Sintegra / CCC**, ao lado do campo do CNPJ.","Selecione o estado (UF) correspondente e confirme para que a IE seja preenchida automaticamente."]},
   {t:"Classificação do participante", s:["No menu superior direito da tela, defina o perfil do cadastro marcando as caixas aplicáveis:"], tags:["Cliente","Fornecedor","Transportadora","Funcionário"]},
   {t:"Dados de contato", s:["Preencha **E-mail**, **Telefone / WhatsApp** e o nome do **Contato Principal**."]},
   {t:"Endereços e locais de entrega", s:["**Endereço principal:** é preenchido automaticamente ao realizar a busca pelo CNPJ.","Para adicionar endereço secundário ou de entrega, clique na aba **Endereços** no menu interno do cadastro.","Clique no botão **Novo / Adicionar**.","Defina o **Tipo de Endereço** (ex.: Cobrança, Entrega, Obra/Eventos).","Digite o CEP para carregar Logradouro, Bairro, Cidade e UF, e preencha Número e Complemento.","Salve o endereço para disponibilizá-lo na seleção de frete/entrega dos orçamentos e contratos (caso necessário)."]},
   {t:"Salvar", s:["Clique no botão **Salvar** na barra superior para finalizar o registro."]}
  ]},
 {area:"Cadastros", t:"Cadastro de produtos e serviços",
  obj:"Registrar e estruturar itens no catálogo do sistema (estruturas, banheiros, equipamentos e serviços), configurando regras de locação diária/mensal, peso, dimensões e vinculando a composição de kits para emissão correta de contratos e ordens de serviço.",
  terms:[["Grupo","Categorização principal do acervo (ex.: Estruturas, Sanitários, Caminhões/Caçambas, Serviços)."],["Subgrupo","Detalhamento do grupo para facilitar buscas e relatórios (ex.: no grupo Sanitários, os subgrupos podem ser Banheiro Químico Luxo, Trailer, Container)."],["Unidade de Medida","Siglas de comercialização (ex.: UN, M², M³, DIA, MÊS, KM)."],["Tabela de Preços","Tabelas diferenciadas por tipo de cliente, contrato ou região (caso necessário padronizar tabela)."],["Produto","Tela principal de preenchimento e gestão do catálogo completo de produtos e serviços da empresa."]],
  steps:[
   {t:"Acessar a tela de cadastro", s:["No menu lateral esquerdo, selecione **Produtos**.","Clique na opção **Produto** e, em seguida, no botão **Novo** (no topo da tela)."]},
   {t:"Gerar código de barras automático", s:["No canto superior da tela, localize o campo **Código de Barras**.","Clique no ícone do raio / engrenagem ao lado do campo para que o sistema gere automaticamente uma numeração padrão para o item."]},
   {t:"Preencher dados gerais", s:["**Descrição:** digite o nome padronizado do produto ou serviço (ex.: Caçamba Estacionária 5m³, Tenda Galpão 10x10, Banheiro Químico Luxo).","**Unidade de Medida:** defina a unidade comercial (ex.: UN, M², M3, DIÁRIA, MÊS).","**Preço de Venda / Locação:** informe o valor base cobrado pelo item.","**Classificação e Grupo:** selecione a categoria/grupo do produto, para organização nos relatórios."]},
   {t:"Configurar regras de locação e operação (menu interno)", s:["**Tipo de Locação:** defina se a cobrança padrão será Diária ou Mensal.","**Peso e Dimensões:** preencha Peso Bruto/Líquido (kg) e dimensões (comprimento, largura, altura) para o cálculo automatizado do frete e da capacidade de carga nos caminhões."]},
   {t:"Composição / kits (se aplicável)", s:["Na aba **Composição/Kits**, clique para adicionar os subitens que formam o produto final.","Selecione as peças vinculadas e as quantidades necessárias (ex.: Estrutura de Tenda + Lona + Lança)."]},
   {t:"Salvar o cadastro", s:["Verifique se todas as informações operacionais estão corretas.","Clique no botão **Salvar** na barra superior para disponibilizar o item nos orçamentos e contratos."]}
  ],
  tips:["**Padronização de nomes:** mantenha um padrão no nome dos produtos para facilitar a busca rápida durante a digitação de orçamentos.","**Verificar os auxiliares:** antes de cadastrar um produto novo, certifique-se de que o Grupo, Subgrupo e a Unidade de Medida desejados já foram criados nas telas auxiliares.","**Acessar a tela Produto:** entre na opção Produto, clique em Novo e preencha os dados do catálogo, conforme o passo a passo acima."]},
 {area:"Faturamento", t:"Cadastro de regras fiscais",
  obj:"Parametrizar a tributação e as naturezas de operação do sistema, garantindo que cada faturamento (locação de bens móveis, prestação de serviços ou venda) aplique automaticamente as alíquotas, CFOPs, impostos e retenções corretas.",
  steps:[
   {t:"Acessar a tela de regras fiscais", s:["No menu lateral, acesse o módulo **Faturamento** (ou Fiscal).","Clique em **Cadastros** e selecione **Regras Fiscais** (ou Operações Fiscais).","Clique no botão **Novo** para criar um parâmetro de tributação."]},
   {t:"Definir a operação e o tipo de faturamento", s:["**Descrição da regra:** dê um nome claro para a operação (ex.: Locação de Bens Móveis, Prestação de Serviços de Montagem, Venda de Ativo).","**CFOP / Código do Serviço:** vincule o CFOP adequado para operações estaduais/interestaduais ou o Código de Tributação Municipal (ISS) para prestação de serviços."]},
   {t:"Configurar impostos e alíquotas", s:["Defina a aplicação ou isenção de tributos de acordo com o regime da empresa (Simples Nacional, Lucro Presumido ou Real):","**ISSQN:** alíquota municipal e indicação de retenção na fonte (se aplicável no município de prestação).","**PIS / COFINS / CSLL / IRRF:** alíquotas e destaques de retenção para serviços de terceiros.","**ICMS / IPI:** alíquotas, CST e base de cálculo para movimentação de mercadorias."]},
   {t:"Regra de locação (isenção de ICMS/ISS)", s:["Para operações exclusivas de Locação de Bens Móveis (sem mão de obra), marque a opção de isenção de ISS/ICMS conforme a legislação vigente, direcionando o lançamento para **Fatura de Locação**."]},
   {t:"Salvar e vincular aos produtos/serviços", s:["Clique em **Salvar**.","Vincule a regra fiscal padrão aos cadastros de Produtos e Serviços, para que o cálculo tributário seja automático na geração dos orçamentos e faturas."]}
  ],
  tips:["**Alinhamento contábil:** sempre valide os códigos de CFOP, CST e alíquotas com a contabilidade antes de salvar novas regras fiscais no sistema.","**Retenção na fonte:** atenção às regras de retenção do município do tomador, para evitar cobranças em duplicidade ou erros na emissão de NFS-e."]},
 {area:"Financeiro", t:"Cadastros do Financeiro",
  obj:"Cadastrar as contas de movimentação financeira (bancos, caixas internos e carteiras virtuais), credenciadoras de cartão e formas de pagamento, garantindo a liquidação correta de títulos, o controle de fluxo de caixa e a integração com a conciliação bancária.",
  steps:[
   {t:"Acessar a tela de cadastros financeiros", s:["No menu lateral, acesse o módulo **Financeiro**.","Clique na opção **Cadastros** para ver as tabelas auxiliares da rotina financeira."]},
   {t:"Cadastrar contas financeiras / bancos", s:["Selecione **Conta Financeira / Caixa** e clique no botão **Novo**.","**Descrição:** nomeie a conta para identificação rápida (ex.: Banco Itaú — CNPJ 01, Caixa Interno Sede, Conta Saneamento — CNPJ 02).","**Tipo de Conta:** defina se é Bancária, Caixa Físico ou Carteira Digital/Cobrança.","**Dados Bancários:** preencha Agência, Conta Corrente, Banco e atribua o CNPJ Titular correspondente.","**Integração/Boleto:** se a conta emite boletos via API ou arquivo remessa/retorno (CNAB), configure a carteira e o convênio bancário."]},
   {t:"Cadastrar formas e meios de pagamento", s:["Acesse a aba **Formas de Pagamento** e clique em **Novo**.","**Modais:** configure as opções de recebimento e pagamento (ex.: PIX, Boleto Bancário, Transferência/TED, Cartão de Crédito/Débito, Dinheiro).","**Taxas e prazos (cartões/boletos):** informe as taxas percentuais de desconto e os dias para liquidação/compensação automática."]},
   {t:"Vincular ao plano de contas", s:["Certifique-se de que a conta financeira esteja vinculada às contas de movimentação padrão (Disponibilidades/Ativo Circulante), para que as baixas e recebimentos sejam contabilizados corretamente."]},
   {t:"Salvar", s:["Verifique as informações inseridas e clique no botão **Salvar**."]}
  ],
  tips:["**Segregação por CNPJ:** vincule cada conta bancária ao seu respectivo CNPJ (CNPJ 01 para Eventos e CNPJ 02 para Saneamento), para não misturar lançamentos e relatórios no encerramento do mês.","**Nomenclatura clara:** use nomes padronizados para as contas financeiras, para que a equipe de faturamento e de contas a pagar/receber selecione o destino correto nas liquidações."]},
 {area:"Estoque", t:"Cadastros iniciais de estoque",
  obj:"Definir a estrutura física e lógica do estoque (depósitos, almoxarifados, prateleiras e tipos de movimentação), permitindo o saldo em tempo real, a rastreabilidade do acervo de locação e o controle de insumos de manutenção.",
  steps:[
   {t:"Acessar a tela de cadastros de estoque", s:["No menu lateral, acesse o módulo **Estoque**.","Clique em **Cadastros** e selecione **Local de Estoque / Almoxarifado** (ou Depósito).","Clique no botão **Novo** para criar um novo local."]},
   {t:"Cadastrar locais de armazenagem / depósitos", s:["**Descrição:** nomeie o local com clareza (ex.: Depósito Central — CNPJ 01, Pátio de Sanitários — CNPJ 02, Almoxarifado de Peças/Manutenção, Estoque em Trânsito/Campo).","**CNPJ / Base Responsável:** vincule o local de estoque ao CNPJ da unidade correspondente.","**Endereçamento (se aplicável):** defina corredores, prateleiras ou baias para facilitar a localização dos itens no galpão."]},
   {t:"Configurar tipos de movimentação de estoque", s:["Acesse a aba **Tipos de Movimentação** e clique em **Novo**.","Cadastre as operações que impactam o saldo:","**Entradas:** Compra, Retorno de Locação, Ajuste de Inventário (+), Devolução.","**Saídas:** Remessa para Locação, Envio para Manutenção, Baixa por Avaria/Perda, Consumo Interno, Ajuste de Inventário (-).","**Impacto no custo/saldo:** defina se o tipo de movimentação atualiza o Custo Médio e o saldo físico disponível."]},
   {t:"Vincular aos produtos", s:["Garanta que os produtos e materiais de consumo cadastrados no catálogo estejam vinculados ao seu Local de Estoque Padrão, para baixa e entrada automáticas nas ordens de serviço e contratos."]},
   {t:"Salvar", s:["Revise as configurações e clique no botão **Salvar**."]}
  ],
  tips:["**Segregação do acervo x consumo:** separe o estoque de Ativo de Locação (coberturas, palcos, banheiros) do estoque de Insumos/Consumo (produtos químicos, parafusos, peças de reposição). Isso evita divergências no balanço patrimonial e no controle de custos.","**Inventários periódicos:** use os locais cadastrados para fazer conferências/contagens físicas periódicas e manter o saldo do ERP alinhado com o pátio."]},
 {area:"Frota", t:"Cadastro de frota e veículos",
  obj:"Cadastrar os veículos, caminhões, máquinas e carretas da empresa, parametrizando dados de capacidade de carga, documentação e manutenção, para viabilizar a alocação correta nas escalas de serviço, nas rotas de entrega e no controle de custos logísticos.",
  steps:[
   {t:"Acessar a tela de cadastro de frota", s:["No menu lateral, acesse o módulo **Frota** (ou Transporte / Logística).","Clique em **Veículos / Frota** e selecione o botão **Novo**."]},
   {t:"Preencher dados gerais do veículo", s:["**Placa / Identificador:** digite a placa do veículo (ou código interno para máquinas/carretas).","**Descrição / Modelo:** nomeie o veículo de forma clara (ex.: Caminhão Munck Volkswagen 24.280, Caminhão Sucção Ford Cargo, Carreta Prancha, Fiat Fiorino — Apoio).","**Tipo de Veículo:** classifique a categoria (ex.: Caminhão Leve, Caminhão Pesado / Trucado, Munck, Utilitário, Carreta / Reboque).","**CNPJ / Base Responsável:** vincule o veículo à empresa proprietária (CNPJ 01 para Eventos ou CNPJ 02 para Saneamento/Munk/Caçamba)."]},
   {t:"Capacidade operacional e carga", s:["**Capacidade de Carga (kg / m³):** preencha o limite de peso e volume suportado pelo veículo.","**Consumo Médio (km/L):** informe a média de consumo projetada, para auxiliar o cálculo de custos do frete e o controle de combustível."]},
   {t:"Documentação e manutenção (aba complementar)", s:["**RENAVAM e Chassi:** informe os números de registro para controle legal.","**Vencimentos (IPVA, Licenciamento e Cronotacógrafo):** cadastre as datas de vencimento para que o sistema emita alertas preventivos.","**Odômetro / Horímetro inicial:** informe a quilometragem ou as horas de uso atuais, para o controle de revisões periódicas."]},
   {t:"Salvar", s:["Confira as informações preenchidas e clique no botão **Salvar**."]}
  ]}
];

export const FEATS = [
 {n:"1.1", t:"Cadastro de Empresa e Participantes", man:[0],
  faz:"Registra clientes, fornecedores, transportadoras e funcionários em uma base única, com consulta automática de dados na Receita Federal pelo CNPJ.",
  por:"Evita erros de digitação na emissão de notas fiscais, impede cadastros duplicados e separa endereços de cobrança dos locais de entrega ou eventos.",
  como:["Acesse **Participante → Participante → Novo**.","Digite apenas os números do CPF/CNPJ e clique na lupa para preencher Razão Social e Endereço Principal.","Caso a Inscrição Estadual não carregue, clique em **Sintegra / CCC** e selecione a UF.","No canto superior direito, marque o perfil (Cliente, Fornecedor, Transportadora ou Funcionário).","Preencha e-mail, telefone e contato principal. Se precisar de endereço de entrega diferente, acesse a aba **Endereços → Novo**, informe o tipo e o CEP. Clique em **Salvar**."],
  con:"Alimenta diretamente os orçamentos no Comercial, as notas no Faturamento e os títulos no Financeiro."},
 {n:"1.2", t:"Catálogo de Produtos e Serviços", man:[1],
  faz:"Estrutura todo o acervo de locação (coberturas, sanitários, caçambas, equipamentos) e serviços, incluindo unidades de medida, tabelas de preço e kits compostos.",
  por:"Padroniza os nomes nos orçamentos, calcula automaticamente o peso/volume para a logística e garante que um kit (ex: Tenda + Lona + Lança) dê baixa nas peças certas.",
  como:["Antes de cadastrar o item, verifique nas telas auxiliares se Grupo, Subgrupo e Unidade de Medida (UN, M², M³, DIA, MÊS, KM) já existem.","Acesse **Produtos → Produto → Novo** e clique no ícone de raio/engrenagem para gerar o código de barras.","Preencha Descrição padronizada, Unidade de Medida, Preço Base e Grupo.","Configure o Tipo de Locação (Diária ou Mensal) e informe Peso e Dimensões.","Se for um kit, acesse a aba **Composição/Kits** e adicione os subitens. Clique em **Salvar**."],
  con:"A composição movimenta o Estoque."},
 {n:"1.3", t:"Regras Fiscais e Tributação", man:[2],
  faz:"Parametriza CFOP, códigos de serviço (ISS), alíquotas de impostos (ISSQN, PIS, COFINS, CSLL, IRRF, ICMS, IPI) e isenções legais.",
  por:"Garante que o sistema diferencie automaticamente uma **Locação de Bem Móvel** (isenta de ISS/ICMS) de uma **Prestação de Serviço** ou venda, evitando bitributação ou rejeição na Prefeitura.",
  como:["Acesse **Faturamento (ou Fiscal) → Cadastros → Regras Fiscais → Novo**.","Nomeie a operação (ex: Locação de Bens Móveis, Serviço de Montagem).","Vincule o CFOP ou Código Municipal (ISS) e configure as alíquotas conforme orientação da contabilidade.","Para locação pura sem mão de obra, marque a isenção de ISS/ICMS e direcione para Fatura de Locação.","Clique em **Salvar** e vincule a regra aos produtos/serviços."]},
 {n:"1.4", t:"Cadastros Financeiros, Estoque Inicial e Frota", man:[3,4,5],
  faz:"Configura contas bancárias/caixas, formas de pagamento (PIX, Boleto, Cartão), depósitos físicos de estoque e veículos da frota (capacidade e documentos).",
  por:"Segrega corretamente as movimentações entre os CNPJs da empresa.",
  como:["**Contas e Pagamentos:** em **Financeiro → Cadastros → Conta Financeira / Caixa → Novo**, cadastre bancos e caixas vinculando o CNPJ Titular e dados de CNAB/API. Em **Formas de Pagamento**, cadastre taxas e prazos de compensação.","**Estoque:** em **Estoque → Cadastros → Local de Estoque → Novo**, crie depósitos separados para Ativo de Locação e Insumos/Consumo. Configure os tipos de entrada e saída.","**Frota:** em **Frota → Veículos → Novo**, registre placa, modelo, CNPJ proprietário, capacidade máxima (kg/m³), consumo médio e datas de licenciamento."]}
];
