// Conteúdo do manual. Para evoluir: preencher CONTENT[id] de cada item do menu.
// Item: { subs:[{t, path, ent:[texto], nota, img:{src, alt, pins:[[x%, y%, 'Título', 'Explicação']]}, steps:[{t, s:[]}], tips:[]}], feat:[índices de legacy FEATS] }
export const VERSION = '2.0';
export const SECTIONS = [['quem','Quem somos'],['menus','Funcionalidade dos menus'],['areas','Passo a passo por área'],['treino','Treinamento consultivo'],['faq','Dúvidas frequentes'],['contatos','Contatos'],['chamados','Abra chamados']];

export const MENU = [
 { g:'Início', items:[
  {id:'primeiros',t:'Primeiros passos',d:'Login, escolha da empresa e Dashboard.'},
  {id:'agenda',t:'Agenda',d:'Agenda da rotina da empresa.'},
  {id:'dashboards',t:'Dashboards',d:'Painéis escolhidos para cada usuário.'}]},
 { g:'Módulos', items:[
  {id:'cadastros',t:'Cadastros',d:'Base do sistema: empresa, departamentos e participantes.'},
  {id:'produtos',t:'Produtos',d:'Produtos, kits, preços e fornecedores.'},
  {id:'compras',t:'Compras',d:'Compras junto a fornecedores.'},
  {id:'vendas',t:'Vendas',d:'Vendas e orçamentos.'},
  {id:'contrato',t:'Contrato',d:'Contratos de locação e programação de entregas.'},
  {id:'servicos',t:'Serviços',d:'Análise de O.S. e ordens de serviço.'},
  {id:'faturamento',t:'Faturamento',d:'Análise de faturamento e emissão de notas.'},
  {id:'financeiro',t:'Financeiro',d:'Contas a receber e a pagar, fluxo de caixa e conciliação.'},
  {id:'estoque',t:'Estoque',d:'Locais e movimentações de estoque.'},
  {id:'frota',t:'Frota',d:'Veículos e controle da frota.'}]},
 { g:'Utilitários', items:[
  {id:'suporte',t:'Suporte / Chamados',d:'Abertura e acompanhamento de chamados.'},
  {id:'chamados',t:'Chamados Next01',d:'Chamados direcionados à equipe Next01.'},
  {id:'manual',t:'Manual do usuário',d:'Este manual.'},
  {id:'protocolo',t:'Protocolo de documentos',d:'Registro de documentos protocolados.'},
  {id:'usuarios',t:'Usuários',d:'Cadastro de usuários e das áreas do dashboard de cada um.'},
  {id:'auditoria',t:'Log de auditoria',d:'Histórico das ações realizadas no sistema.'}]},
 { g:'Conta', items:[
  {id:'trocar',t:'Trocar empresa',d:'Alterna a empresa (CNPJ) em que você trabalha.'},
  {id:'sair',t:'Sair',d:'Encerra a sessão.'}]}
];

const dash = 'Ao clicar em **Dashboards**, aparecem os módulos de visualização escolhidos no cadastro do usuário. Quando o gestor cria o seu usuário, ele escolhe quais áreas do dashboard são importantes para você ver primeiro.';
export const CONTENT = {
 primeiros:{ subs:[
  {t:'1. Entre com seu login',ent:['Com o login e a senha em mãos, preencha o **e-mail** e a **senha** e clique em **Entrar**.'],img:{src:'login.png',alt:'Tela de login'}},
  {t:'2. Escolha a empresa',ent:['Escolha o CNPJ em que vai realizar a atividade do momento (caso tenha mais de um) e clique em continuar.'],img:{src:'empresa.png',alt:'Escolha da empresa'}},
  {t:'3. Dashboards',ent:[dash],img:{src:'dashboard.png',alt:'Menu lateral com Dashboards'}}]},
 dashboards:{ subs:[{t:'Dashboards',ent:[dash],img:{src:'dashboard.png',alt:'Menu lateral com Dashboards'}}]},
 trocar:{ subs:[{t:'Escolher a empresa',ent:['Seleciona a base de trabalho (CNPJ) para continuar. Busque por nome, razão social ou CNPJ.'],img:{src:'empresa.png',alt:'Escolha da empresa'}}]},
 cadastros:{ subs:[
  {id:'emp',t:'Empresa › Empresa',path:'Menu › Cadastros › Empresa › Empresa',ent:['O gestor do sistema cadastra a empresa na contratação, por conta das configurações. É a **base central do CNPJ**: nela ficam parte das regras fiscais e o enquadramento.'],img:{src:'cad-empresa.png',alt:'Submenu Empresa'}},
  {id:'dep',t:'Empresa › Departamento',path:'Menu › Cadastros › Empresa › Departamento',ent:['Serve para **separar as áreas da empresa**.'],img:{src:'cad-empresa.png',alt:'Submenu Empresa'}},
  {id:'tp',t:'Participante › Tipo de participante',path:'Menu › Cadastros › Participante › Tipo de participante',ent:['Use quando quiser classificar os participantes de forma mais específica. Exemplos: órgãos governamentais, construtoras, produção de eventos.'],img:{src:'cad-participante.png',alt:'Submenu Participante'},steps:[{t:'Cadastrar um tipo',s:['Acesse **Menu › Cadastros › Participante › Tipo de participante**.','Clique em **Novo**, preencha a **descrição** e clique em **Salvar**.']}]},
  {id:'part',t:'Participante › Participante',path:'Menu › Cadastros › Participante › Participante',
   ent:['É onde acontece o cadastro de **Cliente, Fornecedor, Transportadora, Funcionário e Vendedor**.'],
   nota:'**Importante:** preencha todos os campos corretamente. Este cadastro é a base que alimenta o Comercial (orçamentos e contratos), que segue para o Faturamento (emissão das notas) e para a gestão Financeira.',
   img:{src:'participante-form.png',alt:'Cadastro de participante',pins:[
    [8.9,18,'Salvar','Grava o cadastro depois de preenchido e conferido.'],
    [18.3,18,'Pesquisar CPF','Busca o CPF/CNPJ na Receita e preenche automaticamente os principais dados.'],
    [1.6,31,'Aviso de campos obrigatórios','Para emitir Nota Fiscal Eletrônica é obrigatório informar Nome/Razão Social, Tipo de Pessoa, CPF/CNPJ, endereço completo (CEP, endereço, número, bairro, cidade, estado) e pelo menos um e-mail para NF-e.'],
    [7,45.5,'Abas Dados Gerais e Endereço','As abas reduzem a rolagem da tela. Para funcionário e vendedor, acrescenta-se a aba **Funcionário**, com os dados de registro e contratação.'],
    [54.5,94,'Classificação','Define o que o cadastro é: Cliente, Fornecedor, Transportadora, Funcionário ou Vendedor.']]},
   steps:[
    {t:'Abrir o cadastro',s:['Acesse **Menu › Cadastros › Participante › Participante** e clique em **Novo**.']},
    {t:'Pesquisar CPF/CNPJ na Receita',s:['Digite o CPF/CNPJ e clique em **Pesquisar**.','Se os dados não forem preenchidos automaticamente, feche a janela e siga com o cadastro normalmente.']},
    {t:'Preencher Dados Gerais e Endereço',s:['Preencha os dados cadastrais em cada aba.','Para funcionários e vendedores, preencha também a aba **Funcionário**.','Evite abreviar nomes, salvo se nos registros legais já estiver abreviado.']},
    {t:'Salvar',s:['Confira os dados e clique em **Salvar**.']}],
   tips:['Se a pesquisa do CPF/CNPJ não trouxer informações, há alguma restrição na Receita e por isso não carrega automaticamente. Com os dados em mãos, prossiga normalmente.']}]},
 produtos:{ feat:[1] }, faturamento:{ feat:[2] }, financeiro:{ feat:[3] }
};

export const QUEM = {
 intro:'Especialistas em software. Transformamos ideias em resultados, com relacionamento transparente e parceria de longa duração.',
 cards:[['Missão','Impulsionar a transformação digital com software personalizado, escalável e seguro. Entender o negócio a fundo e entregar além do esperado.'],['Visão','Ser a parceira de referência em software sob medida: ágil, flexível e orientada a resultado, para empresas que querem ir mais longe.'],['Valores','Inovação, qualidade e agilidade. Excelência do planejamento à entrega. Relacionamento de longo prazo e melhoria contínua.']],
 etapas:[['01','Preparar','Cadastros, produtos, participantes e regras fiscais. A base da nave, alinhada à sua operação.'],['02','Decolar','Vendas, PDV, contratos, ordens de serviço e compras. O dia a dia em movimento, no mesmo cockpit.'],['03','Órbita','Financeiro, NF-e, NFS-e e dashboards. Visão contínua para manter a empresa em curso.']]
};
export const TREINO = { intro:'Todo o sistema parte do cadastro. Um dado errado na base se repete em orçamento, contrato, nota fiscal e cobrança.', corrige:'Por isso, preencher cada campo com atenção não é burocracia: é o que mantém o fluxo inteiro funcionando.' };
export const FAQ = [
 ['Pesquisei o CPF/CNPJ e os dados não carregaram. E agora?','Significa que há alguma restrição na Receita, por isso não carrega automaticamente. Com os dados em mãos, prossiga com o cadastro normalmente.'],
 ['O que é obrigatório para emitir nota fiscal eletrônica?','Nome/Razão Social, Tipo de Pessoa, CPF/CNPJ, endereço completo (CEP, endereço, número, bairro, cidade, estado) e pelo menos um e-mail para NF-e.'],
 ['Posso abreviar nomes no cadastro?','Evite abreviar, salvo se nos registros legais o nome já estiver abreviado.'],
 ['Esqueci minha senha.','Na tela de login, clique em **Esqueceu a senha? Fale conosco**.'],
 ['Trabalho com mais de uma empresa. Como troco?','Use **Trocar empresa**, no grupo Conta do menu lateral, e escolha o CNPJ pelo nome, razão social ou número.']
];
export const CONTATOS = { nome:'Next01 Software', end:'R. Arizona, 121 — Jardim Dona Judith, Americana - SP, 13469-168', email:'next01.software@gmail.com', tels:[['19 99334-7165','+5519993347165'],['19 99341-9632','+5519993419632']] };
