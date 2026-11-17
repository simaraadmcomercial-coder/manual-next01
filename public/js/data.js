// Estrutura do manual: módulos → 3 camadas (ent = Entender, con = Conhecer a tela, faz = Fazer).
// Para adicionar conteúdo, preencha os arrays abaixo. Cada guia: {t, obj, steps:[{t, s:[frases]}], tips:[]}
import { MODS, FEATS } from './legacy.js';
const ent = n => (MODS.find(m => m.nome === n) || {}).blocks || [];

export const MODULES = [
  { id:'cadastros', t:'Cadastros', cor:'#01135D', d:'Participantes, produtos, regras fiscais, financeiro, estoque e frota.', ent:[], con:FEATS, faz:[] },
  { id:'comercial', t:'Comercial', cor:'#00A859', d:'Do orçamento ao contrato assinado e programado.', ent:ent('Comercial'), con:[], faz:[
    { t:'Orçamento de locação', obj:'Montar orçamentos para locações mensais e diárias.', steps:[
      {t:'Novo orçamento', s:['Abra o **Orçamento de Locação** e clique em **Novo**.','Preencha os dados de acordo com o Tipo.']},
      {t:'Produtos e serviços', s:['Inclua os produtos conforme a necessidade do cliente, com os valores.']},
      {t:'Dados do transporte', s:['Identifique a base que vai atender, as datas de entrega e retirada, o contato e o local.']},
      {t:'Dados do pagamento', s:['Informe a condição de pagamento e a forma de pagamento.']},
      {t:'Salvar e enviar', s:['Após salvar, entre novamente no orçamento para imprimir, salvar no servidor e enviar ao cliente por e-mail e WhatsApp, formalizando a proposta.']}]},
    { t:'Contrato de locação', obj:'Com o orçamento aprovado, elaborar o contrato.', steps:[
      {t:'Acessar o orçamento', s:['Acesse o orçamento já emitido. Se ele ainda não foi gerado, volte à etapa anterior e faça o orçamento.']},
      {t:'Gerar o contrato', s:['Clique no orçamento, escolha **Gerar contrato** e preencha os **Dados do contrato**.']},
      {t:'Conferir produtos, serviços e transporte', s:['Na aba de produtos e serviços / transporte, confira itens, valores, datas e local.']},
      {t:'Programação', s:['Programe os dias de entregas, manutenções e retiradas. Essa programação é a base da **Análise de O.S.** do Operacional.']},
      {t:'Dados do pagamento', s:['Registre as condições negociadas com o cliente.','Eventos particulares: insira o financeiro quando não houver nota.','Contratos mensais: defina o dia de faturamento.']},
      {t:'Confirmar e imprimir', s:['Após salvar, use os botões no alto da tela: **Imprimir** (contrato), **Guia de entrega** e **Guia de retirada** (quando aplicável).']}]},
    { t:'Assinatura, guias e escala', obj:'Formalizar o contrato e repassar a programação.', steps:[
      {t:'Assinatura digital', s:['Acesse o portal da D4Sign, faça login e escolha **Enviar um documento**.','Insira o e-mail do cliente, do responsável da empresa e de duas testemunhas.','Selecione a ordem de envio e o modelo, e envie.']},
      {t:'Enviar o link ao cliente', s:['No e-mail do cliente, selecione e copie o link e envie por e-mail e WhatsApp com o texto padrão.']},
      {t:'Guias de entregas e retiradas', s:['Coloque os impressos das guias na pasta sanfonada, organizados por data.']},
      {t:'Programação na escala', s:['Lance o serviço no relatório de escala. Atenção: ele é separado por tipo, e o **X** deve ficar na data correspondente da programação.']}],
      tips:['Use o relatório comercial de Obras ou de Eventos, conforme o tipo do contrato.'] }
  ]},
  { id:'operacional', t:'Operacional', cor:'#1B4F72', d:'Análise de O.S., rotas, equipe e acompanhamento do dia.', ent:ent('Operacional'), con:[], faz:[
    { t:'Rotina do gestor da operação', obj:'O gestor da operação planeja, distribui, acompanha e finaliza.', steps:[
      {t:'Análise de O.S.', s:['Acesse **Home → Serviço → Análise de OS**.','Informe a data, escolha a rota correspondente e pesquise para visualizar a demanda de serviços.']},
      {t:'Gerar rota pela análise', s:['Após a análise, clique em **Gerar** para editar.','Na aba **Dados da ordem de serviço** e depois **Ordens de Serviço Contrato**, clique em **Salvar**.','Para excluir ou adicionar itens, acesse o número da O.S. emitida.']},
      {t:'Gerar rota avulsa', s:['Acesse **Home → Serviço → Ordem de serviço → Novo**.','Nas abas **Dados da ordem de serviço** e **Ordens de Serviço**, informe Contrato, Tipo, Produto e Quantidade e clique em **Incluir**.','Ao concluir todos os itens, clique em **Salvar**.']},
      {t:'Distribuição da equipe', s:['Com a O.S. emitida, abra-a, clique em **Imprimir** e delegue para a equipe.']},
      {t:'Acompanhar a execução', s:['Acesse a O.S. em aberto, na aba **Ordens de Serviço**.','Informe horário de chegada e saída, km e volume (em caso de N.A., deixe zerado).']},
      {t:'Gestão do dia', s:['Ao final do dia, analise o que ficou sem fazer e planeje o encaixe com o Comercial para a próxima data possível.','Altere a programação no contrato.']}]}
  ]},
  { id:'faturamento', t:'Faturamento', cor:'#D62828', d:'Análise, Fatura de Locação, NFS-e e envio ao cliente.', ent:ent('Faturamento'), con:[], faz:[
    { t:'Emissão de notas — Fatura (locação) e NFS-e (serviço)', obj:'Emitir pela Análise de faturamento.', steps:[
      {t:'Acessar a análise', s:['Acesse **Home → Faturamento → Nota fiscal de serviço eletrônica → Análise de faturamento**.']},
      {t:'Filtrar', s:['Preencha as datas (período de cobrança), o tipo do contrato e o número do contrato, e pesquise.']},
      {t:'Novo e conferência', s:['Clique em **Novo** e use o botão **Locação** (Fatura) ou **Serviço** (NFS-e).','Confira Dados da nota, Serviços e Financeiro.','Gere o financeiro ou insira-o, em caso de parcelado, e clique em **Salvar**.']},
      {t:'Fatura de locação: salvar o PDF', s:['Acesse a nota e clique em **Imprimir** para salvar o PDF.']},
      {t:'NFS-e: enviar a nota', s:['Clique em **Enviar NFE-E**; abrirá a tela de confirmação. Após validar, o PDF é liberado para salvar.']},
      {t:'Enviar ao cliente', s:['Após emitir o boleto, salve e envie ao cliente por e-mail e WhatsApp.']},
      {t:'Atualizar o Bitrix24', s:['Concluído o faturamento, atualize a tarefa no Bitrix24 (na NFS-e, caso necessário).']}]},
    { t:'Emissão de notas avulsas', obj:'Faturar sem passar pela Análise de faturamento.', steps:[
      {t:'Acessar', s:['Acesse **Home → Faturamento → Nota fiscal de serviço eletrônica → Nfe-e movimentação**.']},
      {t:'Preencher e conferir', s:['Preencha datas, tipo e número do contrato e pesquise, depois clique em **Novo**.','Use o botão **Locação** (Fatura) ou **Serviço** (NFS-e) e confira Dados da nota, Serviços e Financeiro. Salve.']},
      {t:'Finalizar', s:['Salve o PDF (Fatura) ou use **Enviar NFE-E** (NFS-e), envie ao cliente e atualize o Bitrix24.']}]}
  ]},
  { id:'financeiro', t:'Financeiro', cor:'#B8860B', d:'Contas a receber e a pagar, fluxo de caixa e conciliação.', ent:ent('Financeiro'), con:[], faz:[] },
  { id:'relatorios', t:'Relatórios', cor:'#5B6785', d:'Relatórios disponíveis, filtros e interpretação.', ent:[], con:[], faz:[] }
];
export const LAYERS = [['entender','Entender','ent'],['conhecer','Conhecer a tela','con'],['fazer','Fazer','faz']];
