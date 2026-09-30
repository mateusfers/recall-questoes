/* ============================================================
   RECALL-QUESTOES — SCRIPT PRINCIPAL
   ============================================================ */

/* ============================================================
   1. ESTADO GLOBAL
   ============================================================ */
const STATE = {
  currentSection: 'home',
  resolvidas: {},       // { 'q1-1': true/false }
  acertos: {},          // { 'q1-1': true/false }
  filtros: {},          // filtro ativo por seção
  modoProva: false
};

const STORAGE_KEY = 'recall_questoes_v1';

/* ============================================================
   2. BANCO DE QUESTÕES
   ============================================================ */

/* ============================================================
   SEÇÃO 1 — QUESTÕES-BASE
   ============================================================ */
const QUESTOES_BASE = [
  // ===== LISTA (Cap. 6) =====
  {
    id: 'base-l1',
    num: 'L1',
    tags: ['LISTA'],
    titulo: 'Definição de Impasse + 4 Condições',
    enunciado: 'Defina impasse (deadlock) e explique detalhadamente as quatro condições necessárias para sua ocorrência (exclusão mútua, posse e espera, não preempção e espera circular). Por que a ausência de qualquer uma delas é suficiente para evitar o impasse?',
    resolucao: `
      <h4>Resolução</h4>
      <p><strong>Definição:</strong> Um conjunto de processos está em impasse se cada processo no conjunto está esperando por um evento que apenas outro processo do conjunto pode causar.</p>
      <p><strong>4 Condições (Coffman et al., 1971):</strong></p>
      <ol>
        <li><strong>Exclusão Mútua:</strong> Cada recurso está associado a exatamente um processo ou está disponível.</li>
        <li><strong>Posse e Espera:</strong> Processos que possuem recursos podem solicitar novos recursos.</li>
        <li><strong>Não Preempção:</strong> Recursos não podem ser tomados à força; devem ser liberados explicitamente.</li>
        <li><strong>Espera Circular:</strong> Existe uma cadeia circular de dois ou mais processos esperando.</li>
      </ol>
      <p><strong>Por que a ausência de uma evita:</strong> As 4 são condições <strong>necessárias</strong>. Se uma não existe, o ciclo não se forma.</p>
    `,
    analise: {
      conteudo: 'Sim', estrutura: 'Sim', metodo: 'Sim', nivel: 'Sim', combinacao: 'Sim',
      texto: 'Conceito fundamental de impasse. Cai em provas como base para questões mais complexas.'
    }
  },
  {
    id: 'base-l2',
    num: 'L2',
    tags: ['LISTA'],
    titulo: 'Estratégias para Impasse',
    enunciado: 'Compare as quatro estratégias para lidar com impasses — prevenção, prevenção evasiva (avoidance), detecção e recuperação. Para cada uma, indique em qual das quatro condições necessárias ela atua (quando aplicável) e qual o principal custo ou desvantagem de adotá-la.',
    resolucao: `
      <h4>Resolução</h4>
      <table>
        <tr><th>Estratégia</th><th>Atua em</th><th>Vantagem</th><th>Desvantagem</th></tr>
        <tr><td><strong>Prevenção</strong></td><td>Nega 1 das 4</td><td>Garante ausência</td><td>Baixa utilização</td></tr>
        <tr><td><strong>Evasão</strong></td><td>Evita ciclo (nenhuma)</td><td>Flexível</td><td>Requer info prévia</td></tr>
        <tr><td><strong>Detecção</strong></td><td>Nenhuma</td><td>Sem restrições</td><td>Overhead</td></tr>
        <tr><td><strong>Recuperação</strong></td><td>Nenhuma</td><td>Resolve</td><td>Trabalho perdido</td></tr>
      </table>
      <p><strong>Observação:</strong> Evasão, Detecção e Recuperação <strong>NÃO atuam em nenhuma das 4 condições</strong>. Apenas a Prevenção atua.</p>
    `,
    analise: {
      conteudo: 'Sim', estrutura: 'Sim', metodo: 'Sim', nivel: 'Sim', combinacao: 'Sim',
      texto: 'Questão teórica comparativa. Fundamental para entender as estratégias.'
    }
  },
  {
    id: 'base-l3',
    num: 'L3',
    tags: ['LISTA'],
    titulo: 'Impasse vs Inanição',
    enunciado: 'Explique a diferença entre impasse (deadlock) e inanição (starvation). É possível ter inanição sem impasse? E impasse sem inanição? Justifique com um exemplo de cada situação.',
    resolucao: `
      <h4>Resolução</h4>
      <p><strong>Impasse:</strong> Sistema NÃO progride. Todos bloqueados.</p>
      <p><strong>Inanição:</strong> Sistema PROGRIDE, mas 1 processo espera para sempre.</p>
      <p><strong>Inanição SEM impasse:</strong> ✅ SIM. Ex: SJN com fluxo constante de processos curtos — processos longos nunca executam.</p>
      <p><strong>Impasse SEM inanição:</strong> ✅ SIM. Todos no impasse estão bloqueados, mas nenhum está "esquecido".</p>
    `,
    analise: {
      conteudo: 'Sim', estrutura: 'Sim', metodo: 'Sim', nivel: 'Sim', combinacao: 'Sim',
      texto: 'Diferença conceitual importante. Caiu em prova antiga (07/01).'
    }
  },
  {
    id: 'base-l4',
    num: 'L4',
    tags: ['LISTA'],
    titulo: 'Algoritmo do Banqueiro',
    enunciado: 'Descreva o funcionamento do Algoritmo do Banqueiro (Banker\'s Algorithm): o que é um "estado seguro", como ele é verificado, e por que esse algoritmo é classificado como uma estratégia de prevenção evasiva e não de detecção.',
    resolucao: `
      <h4>Resolução</h4>
      <p><strong>Funcionamento:</strong> Antes de conceder recursos, o SO verifica se o estado resultante é seguro. Se sim, concede; se não, adia.</p>
      <p><strong>Estado seguro:</strong> Existe sequência onde todos os processos terminam.</p>
      <p><strong>Verificação:</strong> Necessário = Máximo − Alocado. Procura processo com Nec ≤ Disp. Simula execução (A = A + Alocado). Repete.</p>
      <p><strong>Por que é evasão:</strong> Age ANTES do deadlock ocorrer (verifica segurança antes de conceder). Detecção age DEPOIS.</p>
    `,
    analise: {
      conteudo: 'Sim', estrutura: 'Sim', metodo: 'Sim', nivel: 'Sim', combinacao: 'Sim',
      texto: 'Conceito central de impasse. Caiu em 2/3 provas.'
    }
  },
  {
    id: 'base-l5',
    num: 'L5',
    tags: ['LISTA'],
    titulo: 'Grafo de Alocação de Recursos',
    enunciado: 'Considere três processos P1, P2, P3 e dois recursos R1 (1 instância) e R2 (1 instância), com as seguintes arestas: P1 → R1, R1 → P2, P2 → R2, R2 → P1. Desenhe o grafo de alocação de recursos correspondente e determine se há impasse. Justifique identificando o ciclo (se existir).',
    resolucao: `
      <h4>Resolução</h4>
      <p><strong>Arestas:</strong> P1 → R1 (solicita), R1 → P2 (alocado), P2 → R2 (solicita), R2 → P1 (alocado).</p>
      <p><strong>Ciclo:</strong> P1 → R1 → P2 → R2 → P1</p>
      <p><strong>Há impasse:</strong> ✅ SIM. P1 espera R1 (que está com P2) e P2 espera R2 (que está com P1).</p>
      <p><strong>Processos em impasse:</strong> P1 e P2.</p>
    `,
    analise: {
      conteudo: 'Sim', estrutura: 'Sim', metodo: 'Sim', nivel: 'Sim', combinacao: 'Sim',
      texto: 'Questão prática de grafo. Caiu em prova antiga.'
    }
  },
  {
    id: 'base-l6',
    num: 'L6',
    tags: ['LISTA'],
    titulo: 'Banqueiro com 3 Processos',
    enunciado: 'Sistema com 3 processos (P0, P1, P2) e 3 recursos (A, B, C) com 10, 5 e 7 instâncias. Matrizes: P0 (0,1,0) / (7,5,3); P1 (2,0,0) / (3,2,2); P2 (3,0,2) / (9,0,2). Calcule o vetor disponível, determine se é estado seguro e apresente sequência segura.',
    resolucao: `
      <h4>Resolução</h4>
      <p><strong>Total Alocado:</strong> (0+2+3, 1+0+0, 0+0+2) = (5, 1, 2)</p>
      <p><strong>Disponível:</strong> (10,5,7) − (5,1,2) = <strong>(5, 4, 5)</strong></p>
      <p><strong>Necessário:</strong> P0=(7,4,3), P1=(1,2,2), P2=(6,0,0)</p>
      <p><strong>Verificação:</strong></p>
      <ol>
        <li>P1 (1,2,2) ≤ (5,4,5) ✅ → A = (7,4,5)</li>
        <li>P0 (7,4,3) ≤ (7,4,5) ✅ → A = (7,5,5)</li>
        <li>P2 (6,0,0) ≤ (7,5,5) ✅ → A = (10,5,7)</li>
      </ol>
      <p><strong>Estado SEGURO. Sequência: P1 → P0 → P2</strong></p>
    `,
    analise: {
      conteudo: 'Sim', estrutura: 'Sim', metodo: 'Sim', nivel: 'Sim', combinacao: 'Sim',
      texto: 'Questão clássica do banqueiro. Caiu em 2/3 provas.'
    }
  },
  {
    id: 'base-l7',
    num: 'L7',
    tags: ['LISTA'],
    titulo: 'Algoritmo de Detecção (Wait-For Graph)',
    enunciado: 'Descreva (em pseudocódigo ou passo a passo) um algoritmo de detecção de impasse baseado em grafo de espera (wait-for graph) para sistemas com uma única instância por tipo de recurso. Em seguida, aplique-o ao cenário da Questão 05.',
    resolucao: `
      <h4>Resolução</h4>
      <p><strong>Algoritmo:</strong></p>
      <ol>
        <li>Criar nó para cada processo</li>
        <li>Para cada processo que espera recurso:
          <ul><li>Identificar recurso e dono</li><li>Criar aresta P → Q</li></ul>
        </li>
        <li>DFS para detectar ciclo</li>
        <li>Se ciclo → IMPASSE</li>
      </ol>
      <p><strong>Aplicação à Q5:</strong> P1→P2 e P2→P1 → CICLO → IMPASSE.</p>
    `,
    analise: {
      conteudo: 'Sim', estrutura: 'Sim', metodo: 'Sim', nivel: 'Sim', combinacao: 'Sim',
      texto: 'Questão prática de detecção. Complementa a Q5.'
    }
  },
  {
    id: 'base-l8',
    num: 'L8',
    tags: ['LISTA'],
    titulo: 'Prevenção (Ordenação de Mutexes)',
    enunciado: 'Um sistema tem três processos que precisam acessar três mutexes: M1, M2 e M3. Atualmente: P1: M1→M2; P2: M2→M3; P3: M3→M1. Proponha uma reescrita que elimine a possibilidade de impasse.',
    resolucao: `
      <h4>Resolução</h4>
      <p><strong>Solução:</strong> Ordenar mutexes numericamente (M1 &lt; M2 &lt; M3) e exigir que todos os processos os solicitem em <strong>ordem crescente</strong>.</p>
      <p><strong>Nova ordem:</strong></p>
      <ul>
        <li>P1: M1 → M2 ✅ (já em ordem)</li>
        <li>P2: M2 → M3 ✅ (já em ordem)</li>
        <li>P3: <strong>M1 → M3</strong> 🔄 (invertido)</li>
      </ul>
      <p><strong>Por que funciona:</strong> Nenhum processo pede mutex menor que os que já tem. Não forma ciclo.</p>
    `,
    analise: {
      conteudo: 'Sim', estrutura: 'Sim', metodo: 'Sim', nivel: 'Sim', combinacao: 'Sim',
      texto: 'Questão prática de prevenção. Caiu em prova antiga.'
    }
  },

  // ===== PROVAS ANTIGAS =====
  {
    id: 'base-p1',
    num: 'P1',
    tags: ['PROVA'],
    titulo: 'Exclusão Mútua (2 proc) — 07/01/2025',
    enunciado: 'Código de P0 (turn inicializado em 0): while (turn != 0) { } /* RC */ turn = 0;. Para P1, substitua 0 por 1. Determine se atende às condições de exclusão mútua.',
    resolucao: `
      <h4>Resolução</h4>
      <p><strong>a) NÃO atende.</strong></p>
      <p><strong>b) Viola Condição 3</strong> (fora da RC não bloqueia).</p>
      <p>Código tem erro: <code>turn = 0</code> no P0 deveria ser <code>turn = 1</code>. Com erro, P1 nunca entra → viola Condição 4.</p>
      <p>Corrigido: ainda viola Condição 3 (P0 fora da RC bloqueia P1).</p>
    `,
    analise: {
      conteudo: 'Sim', estrutura: 'Sim', metodo: 'Sim', nivel: 'Sim', combinacao: 'Sim',
      texto: 'Questão de prova. Exclusão mútua com Strict Alternation.'
    }
  },
  {
    id: 'base-p2',
    num: 'P2',
    tags: ['PROVA'],
    titulo: 'fork() Simples — 07/01/2025',
    enunciado: 'void main() { fork(); fork(); exit(); } Quantos processos filhos são criados?',
    resolucao: `
      <h4>Resolução</h4>
      <p>2 forks incondicionais → 2² = <strong>4 processos totais</strong>.</p>
      <p>1 pai + <strong>3 filhos</strong>.</p>
    `,
    analise: {
      conteudo: 'Sim', estrutura: 'Sim', metodo: 'Sim', nivel: 'Sim', combinacao: 'Sim',
      texto: 'Questão de prova. fork() é SEMPRE cobrado.'
    }
  },
  {
    id: 'base-p3',
    num: 'P3',
    tags: ['PROVA'],
    titulo: 'Escalonamento A-E — 07/01/2025',
    enunciado: 'Cinco tarefas A-E com tempos 10, 6, 2, 4, 8 e prioridades 3, 5, 2, 1, 4 (5=mais alta). Calcule o tempo de retorno médio para: (a) RR, (b) Prioridade, (c) FCFS, (d) SJF.',
    resolucao: `
      <h4>Resolução</h4>
      <table>
        <tr><th>Algoritmo</th><th>Média</th></tr>
        <tr><td>(a) RR</td><td>19,2</td></tr>
        <tr><td>(b) Prioridade</td><td>20,0</td></tr>
        <tr><td>(c) FCFS</td><td>19,2</td></tr>
        <tr><td>(d) SJF</td><td><strong>14,0</strong> ✅</td></tr>
      </table>
    `,
    analise: {
      conteudo: 'Sim', estrutura: 'Sim', metodo: 'Sim', nivel: 'Sim', combinacao: 'Sim',
      texto: 'Questão de prova. Escalonamento é SEMPRE cobrado.'
    }
  },
  {
    id: 'base-p4',
    num: 'P4',
    tags: ['PROVA'],
    titulo: 'Detecção de Impasse — 07/01/2025',
    enunciado: 'Sistema com 4 processos e 5 recursos: C = [0 1 1 1 2 / 0 1 0 1 0 / 0 0 0 0 1 / 2 1 0 0 0], R = [1 1 0 2 1 / 0 1 0 2 1 / 0 2 0 3 1 / 0 2 1 1 0], E=(2,4,1,4,4), A=(0,1,0,2,1). Há impasse? Quais processos?',
    resolucao: `
      <h4>Resolução</h4>
      <p>A = (0,1,0,2,1)</p>
      <ol>
        <li>P2 (0,1,0,2,1) ≤ A ✅ → A = (0,2,0,3,1)</li>
        <li>P3 (0,2,0,3,1) ≤ A ✅ → A = (0,2,0,3,2)</li>
        <li>P1 e P4 não podem executar</li>
      </ol>
      <p><strong>IMPASSE: P1 e P4.</strong></p>
    `,
    analise: {
      conteudo: 'Sim', estrutura: 'Sim', metodo: 'Sim', nivel: 'Sim', combinacao: 'Sim',
      texto: 'Questão de prova. Detecção de impasse com múltiplos recursos.'
    }
  },
  {
    id: 'base-p5',
    num: 'P5',
    tags: ['PROVA'],
    titulo: 'Tipos de SO — 2025.1',
    enunciado: 'Cite e descreva os tipos de sistemas operacionais discutidos em sala.',
    resolucao: `
      <h4>Resolução</h4>
      <p>9 tipos: Grande Porte, Servidores, Multiprocessadores, PCs, Portáteis, Embarcados, Nós Sensores, Tempo Real, Cartões Inteligentes.</p>
    `,
    analise: {
      conteudo: 'Sim', estrutura: 'Sim', metodo: 'Sim', nivel: 'Sim', combinacao: 'Sim',
      texto: 'Questão de prova. Teoria fundamental.'
    }
  },
  {
    id: 'base-p6',
    num: 'P6',
    tags: ['PROVA'],
    titulo: 'fork() com x — 2025.1',
    enunciado: 'int x = 5; pid_t pid1 = fork(); pid_t pid2 = fork(); if (pid1 == 0) x += 10; else if (pid2 == 0) x += 20; else x -= 10; printf("x = %d\\n", x); Quantos processos? Qual x em cada?',
    resolucao: `
      <h4>Resolução</h4>
      <p><strong>4 processos</strong> (2 forks).</p>
      <table>
        <tr><th>Proc</th><th>pid1</th><th>pid2</th><th>Condição</th><th>x</th></tr>
        <tr><td>P0</td><td>&gt;0</td><td>&gt;0</td><td>else</td><td><strong>-5</strong></td></tr>
        <tr><td>P1</td><td>0</td><td>&gt;0</td><td>if</td><td><strong>15</strong></td></tr>
        <tr><td>P2</td><td>&gt;0</td><td>0</td><td>else if</td><td><strong>25</strong></td></tr>
        <tr><td>P3</td><td>0</td><td>0</td><td>if</td><td><strong>15</strong></td></tr>
      </table>
      <p><strong>Pegadinha:</strong> P3 herda pid1=0 do P1. <code>if (pid1==0)</code> é avaliado primeiro.</p>
    `,
    analise: {
      conteudo: 'Sim', estrutura: 'Sim', metodo: 'Sim', nivel: 'Sim', combinacao: 'Sim',
      texto: 'Questão de prova. fork() com análise de variáveis.'
    }
  },
  {
    id: 'base-p7',
    num: 'P7',
    tags: ['PROVA'],
    titulo: 'Escalonamento P1-P5 — 2025.1',
    enunciado: 'P1(0,8), P2(2,4), P3(3,9), P4(5,5), P5(6,2). Calcule média de espera para FCFS, SJN e RR (q=4).',
    resolucao: `
      <h4>Resolução</h4>
      <table>
        <tr><th>Algoritmo</th><th>Média</th></tr>
        <tr><td>FCFS</td><td>10,2</td></tr>
        <tr><td>SJN</td><td><strong>7,0</strong> ✅</td></tr>
        <tr><td>RR (q=4)</td><td>10,6</td></tr>
      </table>
    `,
    analise: {
      conteudo: 'Sim', estrutura: 'Sim', metodo: 'Sim', nivel: 'Sim', combinacao: 'Sim',
      texto: 'Questão de prova. Escalonamento com chegadas diferentes.'
    }
  },
  {
    id: 'base-p8',
    num: 'P8',
    tags: ['PROVA'],
    titulo: 'Banqueiro P0-P4 — 2025.1',
    enunciado: 'P0-P4 com Máximo, Alocado, Necessário. Disponível (3,3,2). a) Estado seguro? b) P1 pede (1,0,1). Aceito? c) Sequência segura?',
    resolucao: `
      <h4>Resolução</h4>
      <p><strong>a) SIM, estado seguro.</strong></p>
      <ol>
        <li>P1 (1,2,2) ≤ (3,3,2) ✅ → A = (5,3,2)</li>
        <li>P3 (0,1,1) ≤ (5,3,2) ✅ → A = (7,4,3)</li>
        <li>P0 (7,4,3) ≤ (7,4,3) ✅ → A = (7,5,3)</li>
        <li>P2 (6,0,0) ≤ (7,5,3) ✅ → A = (10,5,5)</li>
        <li>P4 (4,3,1) ≤ (10,5,5) ✅</li>
      </ol>
      <p><strong>b) SIM, aceito.</strong> Novo A=(2,3,1), continua seguro.</p>
      <p><strong>c) Sequência: P1 → P3 → P0 → P2 → P4</strong></p>
    `,
    analise: {
      conteudo: 'Sim', estrutura: 'Sim', metodo: 'Sim', nivel: 'Sim', combinacao: 'Sim',
      texto: 'Questão de prova. Banqueiro é SEMPRE cobrado.'
    }
  },
  {
    id: 'base-p9',
    num: 'P9',
    tags: ['PROVA'],
    titulo: 'Exclusão Mútua (3 proc) — 28/05/2025',
    enunciado: 'Exclusão mútua com 3 processos (P0, P1, P2) usando estrita alternância. Escreva o código e analise se atende às condições.',
    resolucao: `
      <h4>Resolução</h4>
      <pre><code>// P0
while (turn != 0);
// RC
turn = 1;

// P1
while (turn != 1);
// RC
turn = 2;

// P2
while (turn != 2);
// RC
turn = 0;</code></pre>
      <p><strong>Viola Condição 3</strong> (fora da RC bloqueia).</p>
    `,
    analise: {
      conteudo: 'Sim', estrutura: 'Sim', metodo: 'Sim', nivel: 'Sim', combinacao: 'Sim',
      texto: 'Questão de prova. Exclusão mútua com N processos.'
    }
  },
  {
    id: 'base-p10',
    num: 'P10',
    tags: ['PROVA'],
    titulo: 'fork() com x — 28/05/2025',
    enunciado: 'Mesmo da P6 (fork com x).',
    resolucao: `<p>Idêntica à P6.</p>`,
    analise: { conteudo: 'Sim', estrutura: 'Sim', metodo: 'Sim', nivel: 'Sim', combinacao: 'Sim', texto: 'Repetida.' }
  },
  {
    id: 'base-p11',
    num: 'P11',
    tags: ['PROVA'],
    titulo: 'Escalonamento P1-P5 — 28/05/2025',
    enunciado: 'Mesmo da P7.',
    resolucao: `<p>Idêntica à P7.</p>`,
    analise: { conteudo: 'Sim', estrutura: 'Sim', metodo: 'Sim', nivel: 'Sim', combinacao: 'Sim', texto: 'Repetida.' }
  },
  {
    id: 'base-p12',
    num: 'P12',
    tags: ['PROVA'],
    titulo: 'Banqueiro P0-P4 — 28/05/2025',
    enunciado: 'Mesmo da P8.',
    resolucao: `<p>Idêntica à P8.</p>`,
    analise: { conteudo: 'Sim', estrutura: 'Sim', metodo: 'Sim', nivel: 'Sim', combinacao: 'Sim', texto: 'Repetida.' }
  }
];

/* ============================================================
   SEÇÃO 2 — CAPÍTULO 1 (Introdução)
   ============================================================ */
const QUESTOES_CAP1 = [
  {
    id: 'q1-1', num: 'Q1', tags: ['LIVRO'],
    titulo: 'Funções do SO',
    enunciado: 'Quais são as duas principais funções de um sistema operacional?',
    resolucao: `<p><strong>1) Gerenciador de Recursos</strong> — CPU, memória, disco, E/S.<br><strong>2) Máquina Estendida</strong> — abstrações (processos, arquivos, espaços de endereçamento).</p>`,
    provavel: true, semelhanca: 'ALTA',
    analise: { conteudo: 'Sim', estrutura: 'Sim', metodo: 'Sim', nivel: 'Sim', combinacao: 'Sim', texto: 'Conceito base. Aparece em provas como introdução.' }
  },
  {
    id: 'q1-2', num: 'Q2', tags: ['LIVRO'],
    titulo: 'Tipos de SO',
    enunciado: 'Na Seção 1.4, nove tipos diferentes de sistemas operacionais são descritos. Dê uma lista das aplicações para cada um desses sistemas.',
    resolucao: `<p>9 tipos: Grande Porte, Servidores, Multiprocessadores, PCs, Portáteis, Embarcados, Nós Sensores, Tempo Real, Cartões Inteligentes.</p>`,
    provavel: true, semelhanca: 'ALTA',
    analise: { conteudo: 'Sim', estrutura: 'Sim', metodo: 'Sim', nivel: 'Sim', combinacao: 'Sim', texto: 'Caiu na prova 2025.1.' }
  },
  {
    id: 'q1-3', num: 'Q3', tags: ['LIVRO'],
    titulo: 'Time-sharing vs Multiprogramação',
    enunciado: 'Qual é a diferença entre sistemas de compartilhamento de tempo e de multiprogramação?',
    resolucao: `<p><strong>Multiprogramação:</strong> vários processos na memória, CPU alterna para maximizar utilização.<br><strong>Time-sharing:</strong> variante com cada usuário em terminal on-line, tempo de resposta rápido.</p>`,
    provavel: false, semelhanca: 'MODERADA',
    analise: { conteudo: 'Parcial', estrutura: 'Não', metodo: 'Não', nivel: 'Sim', combinacao: 'Não', texto: 'Conceito relacionado, mas não caiu diretamente.' }
  },
  {
    id: 'q1-4', num: 'Q4', tags: ['LIVRO'],
    titulo: 'Cache (linha inteira)',
    enunciado: 'Para usar a memória de cache, a memória principal é dividida em linhas de cache, em geral de 32 a 64 bytes. Uma linha inteira é capturada em cache de uma só vez. Qual é a vantagem?',
    resolucao: `<p><strong>Localidade espacial:</strong> quando um byte é acessado, os bytes vizinhos provavelmente serão acessados em breve. Capturar a linha inteira aproveita isso.</p>`,
    provavel: false, semelhanca: 'BAIXA',
    analise: { conteudo: 'Não', estrutura: 'Não', metodo: 'Não', nivel: 'Não', combinacao: 'Não', texto: 'Conceito de hardware. Não caiu.' }
  },
  {
    id: 'q1-5', num: 'Q5', tags: ['LIVRO'],
    titulo: 'DMA e multiprogramação',
    enunciado: 'Nos primeiros computadores, cada byte de dados lido ou escrito era executado pela CPU (isto é, não havia DMA). Quais implicações isso tem para a multiprogramação?',
    resolucao: `<p>Sem DMA, a CPU fica ocupada durante toda a E/S, impossibilitando a multiprogramação eficiente. Com DMA, a CPU pode executar outros processos enquanto a E/S acontece.</p>`,
    provavel: false, semelhanca: 'BAIXA',
    analise: { conteudo: 'Não', estrutura: 'Não', metodo: 'Não', nivel: 'Não', combinacao: 'Não', texto: 'Conceito de hardware. Não caiu.' }
  },
  {
    id: 'q1-6', num: 'Q6', tags: ['LIVRO'],
    titulo: 'Instruções de E/S privilegiadas',
    enunciado: 'Instruções relacionadas ao acesso a dispositivos de E/S são tipicamente instruções privilegiadas. Dê uma razão de por que essas instruções são privilegiadas.',
    resolucao: `<p>Para proteger o hardware e evitar que programas de usuário acessem dispositivos diretamente, causando conflitos ou danos.</p>`,
    provavel: false, semelhanca: 'BAIXA',
    analise: { conteudo: 'Não', estrutura: 'Não', metodo: 'Não', nivel: 'Não', combinacao: 'Não', texto: 'Conceito de proteção. Não caiu.' }
  },
  {
    id: 'q1-7', num: 'Q7', tags: ['LIVRO'],
    titulo: 'Família de computadores',
    enunciado: 'A ideia de família de computadores foi introduzida na década de 1960 com o System/360 da IBM. Essa ideia está ultrapassada ou ainda é válida?',
    resolucao: `<p>Ainda é válida. Ex: Intel x86 (8086, 80286, 80386, ..., Core i7) — todos compatíveis.</p>`,
    provavel: false, semelhanca: 'BAIXA',
    analise: { conteudo: 'Não', estrutura: 'Não', metodo: 'Não', nivel: 'Não', combinacao: 'Não', texto: 'Conceito histórico. Não caiu.' }
  },
  {
    id: 'q1-8', num: 'Q8', tags: ['LIVRO'],
    titulo: 'RAM de vídeo',
    enunciado: 'Quanta RAM de vídeo é necessária para dar suporte a uma tela de texto monocromo de 25×80? E para um bitmap colorido de 24 bits de 1200×900?',
    resolucao: `<p><strong>Texto:</strong> 25×80 = 2000 caracteres × 2 bytes = 4 KB.<br><strong>Bitmap:</strong> 1200×900×3 = 3.240.000 bytes ≈ 3,1 MB.</p>`,
    provavel: false, semelhanca: 'BAIXA',
    analise: { conteudo: 'Não', estrutura: 'Não', metodo: 'Não', nivel: 'Não', combinacao: 'Não', texto: 'Cálculo de hardware. Não caiu.' }
  },
  {
    id: 'q1-9', num: 'Q9', tags: ['LIVRO'],
    titulo: 'Metas de projeto contraditórias',
    enunciado: 'Dê um exemplo de duas metas de projeto que podem contradizer uma à outra.',
    resolucao: `<p><strong>Utilização de recursos vs Justiça:</strong> maximizar utilização pode sacrificar justiça (ex: SJN causa inanição).</p>`,
    provavel: false, semelhanca: 'BAIXA',
    analise: { conteudo: 'Não', estrutura: 'Não', metodo: 'Não', nivel: 'Não', combinacao: 'Não', texto: 'Conceito de projeto. Não caiu.' }
  },
  {
    id: 'q1-10', num: 'Q10', tags: ['LIVRO'],
    titulo: 'Modo núcleo vs modo usuário',
    enunciado: 'Qual é a diferença entre modo núcleo e modo usuário? Explique como ter dois modos distintos ajuda no projeto de um sistema operacional.',
    resolucao: `<p><strong>Núcleo:</strong> todas as instruções, todo hardware.<br><strong>Usuário:</strong> subconjunto. E/S e proteção proibidas.</p>`,
    provavel: false, semelhanca: 'MODERADA',
    analise: { conteudo: 'Parcial', estrutura: 'Não', metodo: 'Não', nivel: 'Sim', combinacao: 'Não', texto: 'Conceito fundamental, mas não caiu.' }
  },
  {
    id: 'q1-11', num: 'Q11', tags: ['LIVRO'],
    titulo: 'Disco (cálculo)',
    enunciado: 'Um disco de 255 GB tem 65.536 cilindros com 255 setores por faixa e 512 bytes por setor. Quantos pratos e cabeças? Tempo médio para ler 400 KB?',
    resolucao: `<p><strong>Pratos:</strong> 65.536 cilindros → 65.536 trilhas por superfície. Capacidade = 65.536 × 255 × 512 = 8,5 GB por superfície. 255 GB / 8,5 = 30 superfícies = <strong>15 pratos</strong> (30 cabeças).</p>`,
    provavel: false, semelhanca: 'BAIXA',
    analise: { conteudo: 'Não', estrutura: 'Não', metodo: 'Não', nivel: 'Não', combinacao: 'Não', texto: 'Cálculo de hardware. Não caiu.' }
  },
  {
    id: 'q1-12', num: 'Q12', tags: ['LIVRO'],
    titulo: 'Instruções modo núcleo',
    enunciado: 'Quais das instruções a seguir devem ser deixadas somente em modo núcleo? (a) Desabilitar interrupções. (b) Ler relógio. (c) Configurar relógio. (d) Mudar mapa de memória.',
    resolucao: `<p><strong>(a), (c) e (d)</strong> devem ser modo núcleo. (b) pode ser modo usuário.</p>`,
    provavel: false, semelhanca: 'BAIXA',
    analise: { conteudo: 'Não', estrutura: 'Não', metodo: 'Não', nivel: 'Não', combinacao: 'Não', texto: 'Conceito de proteção. Não caiu.' }
  },
  {
    id: 'q1-13', num: 'Q13', tags: ['LIVRO'],
    titulo: 'CPUs com hyper-threading',
    enunciado: 'Considere um sistema com 2 CPUs, cada uma com 2 threads. Três programas P0, P1, P2 com tempos 5, 10, 20 ms. Quanto tempo para completar?',
    resolucao: `<p>4 CPUs lógicas. P0 (5ms) e P1 (10ms) rodam em paralelo. P2 (20ms) roda em outra. Tempo total = <strong>20 ms</strong>.</p>`,
    provavel: false, semelhanca: 'BAIXA',
    analise: { conteudo: 'Não', estrutura: 'Não', metodo: 'Não', nivel: 'Não', combinacao: 'Não', texto: 'Cálculo de hardware. Não caiu.' }
  },
  {
    id: 'q1-14', num: 'Q14', tags: ['LIVRO'],
    titulo: 'Pipeline de 4 estágios',
    enunciado: 'Um computador tem um pipeline com 4 estágios. Cada estágio leva 1 ns. Quantas instruções por segundo?',
    resolucao: `<p>1 instrução a cada 1 ns = <strong>10⁹ instruções/segundo = 1 GIPS</strong>.</p>`,
    provavel: false, semelhanca: 'BAIXA',
    analise: { conteudo: 'Não', estrutura: 'Não', metodo: 'Não', nivel: 'Não', combinacao: 'Não', texto: 'Cálculo de hardware. Não caiu.' }
  },
  {
    id: 'q1-15', num: 'Q15', tags: ['LIVRO'],
    titulo: 'Tempo médio de acesso',
    enunciado: 'Cache 1 ns (95% hit), RAM 10 ns (99% hit após cache miss), disco 10 ms. Tempo médio?',
    resolucao: `<p>T = 0,95×1 + 0,05×(0,99×10 + 0,01×10.000.000) ≈ 5000 ns ≈ 5 µs.</p>`,
    provavel: false, semelhanca: 'BAIXA',
    analise: { conteudo: 'Não', estrutura: 'Não', metodo: 'Não', nivel: 'Não', combinacao: 'Não', texto: 'Cálculo de hardware. Não caiu.' }
  },
  {
    id: 'q1-16', num: 'Q16', tags: ['LIVRO'],
    titulo: 'Bloqueio em escrita de disco',
    enunciado: 'Quando um programa faz read, é bloqueado. E quanto a write? Precisa ser bloqueado?',
    resolucao: `<p>Em write, o programa pode continuar assim que os dados são copiados para o buffer do núcleo. Não precisa esperar a gravação física.</p>`,
    provavel: false, semelhanca: 'BAIXA',
    analise: { conteudo: 'Não', estrutura: 'Não', metodo: 'Não', nivel: 'Não', combinacao: 'Não', texto: 'Conceito de E/S. Não caiu.' }
  },
  {
    id: 'q1-17', num: 'Q17', tags: ['LIVRO'],
    titulo: 'TRAP',
    enunciado: 'O que é uma instrução TRAP? Explique o uso em sistemas operacionais.',
    resolucao: `<p>Instrução que muda do modo usuário para o modo núcleo e transfere o controle para o SO. Usada em chamadas de sistema.</p>`,
    provavel: false, semelhanca: 'BAIXA',
    analise: { conteudo: 'Não', estrutura: 'Não', metodo: 'Não', nivel: 'Não', combinacao: 'Não', texto: 'Conceito de chamadas. Não caiu.' }
  },
  {
    id: 'q1-18', num: 'Q18', tags: ['LIVRO', 'INDICADA'],
    titulo: 'Threads user-level (vantagem/desvantagem)',
    enunciado: 'Qual é a maior vantagem de se implementar threads no espaço de usuário? Qual é a maior desvantagem?',
    resolucao: `
      <h4>Resolução</h4>
      <p><strong>Maior vantagem:</strong> Rápida criação, troca e destruição de threads, pois não exigem chamadas de sistema (o núcleo não sabe da existência dos threads). Tudo é feito no espaço do usuário pela biblioteca.</p>
      <p><strong>Maior desvantagem:</strong> Se um thread faz uma chamada de sistema bloqueante (ex: read), o processo inteiro é bloqueado, pois o núcleo não sabe que existem outros threads. Além disso, não há interrupção de relógio para preempção de threads.</p>
    `,
    provavel: true, semelhanca: 'ALTA',
    analise: { conteudo: 'Sim', estrutura: 'Sim', metodo: 'Sim', nivel: 'Sim', combinacao: 'Sim', texto: 'Questão INDICADA pelo professor. Conceito fundamental de threads.' }
  },
  {
    id: 'q1-19', num: 'Q19', tags: ['LIVRO'],
    titulo: 'Mount em diretório não vazio',
    enunciado: 'Existe alguma razão para que você quisesse montar um sistema de arquivos em um diretório não vazio?',
    resolucao: `<p>Sim, se você quiser acessar arquivos temporariamente. Mas os arquivos originais ficam inacessíveis enquanto o sistema estiver montado.</p>`,
    provavel: false, semelhanca: 'BAIXA',
    analise: { conteudo: 'Não', estrutura: 'Não', metodo: 'Não', nivel: 'Não', combinacao: 'Não', texto: 'Conceito de arquivos. Não caiu.' }
  },
  {
    id: 'q1-20', num: 'Q20', tags: ['LIVRO'],
    titulo: 'Falhas em fork, exec, unlink',
    enunciado: 'Para cada chamada (fork, exec, unlink), dê uma condição que a faça falhar.',
    resolucao: `<p><strong>fork:</strong> tabela de processos cheia.<br><strong>exec:</strong> arquivo não encontrado.<br><strong>unlink:</strong> arquivo não existe.</p>`,
    provavel: false, semelhanca: 'BAIXA',
    analise: { conteudo: 'Não', estrutura: 'Não', metodo: 'Não', nivel: 'Não', combinacao: 'Não', texto: 'Conceito de chamadas. Não caiu.' }
  },
  {
    id: 'q1-21', num: 'Q21', tags: ['LIVRO', 'INDICADA'],
    titulo: 'Threads + interrupção de relógio',
    enunciado: 'Considere um sistema no qual threads são implementados inteiramente no espaço do usuário, com o sistema de tempo de execução sofrendo uma interrupção de relógio a cada segundo. Suponha que uma interrupção de relógio ocorra enquanto um thread está executando no sistema de tempo de execução. Qual problema poderia ocorrer? Você poderia sugerir uma maneira para solucioná-lo?',
    resolucao: `
      <h4>Resolução</h4>
      <p><strong>Problema:</strong> Se a interrupção de relógio ocorre enquanto o sistema de tempo de execução (a biblioteca de threads) está executando, o estado interno da biblioteca pode estar inconsistente. Quando o sistema de tempo de execução for retomado, ele pode estar em um estado corrompido, causando erros.</p>
      <p><strong>Solução:</strong> O sistema de tempo de execução pode desabilitar as interrupções de relógio enquanto estiver manipulando estruturas de dados internas críticas. Como as operações são curtas, o impacto é mínimo. Alternativamente, usar seções críticas protegidas por variáveis de travamento.</p>
    `,
    provavel: true, semelhanca: 'ALTA',
    analise: { conteudo: 'Sim', estrutura: 'Sim', metodo: 'Sim', nivel: 'Sim', combinacao: 'Sim', texto: 'Questão INDICADA pelo professor. Conceito avançado de threads.' }
  },
  {
    id: 'q1-22', num: 'Q22', tags: ['LIVRO'],
    titulo: 'write() retorno',
    enunciado: 'A chamada count = write(fd, buffer, nbytes); pode retornar qualquer valor em count fora nbytes? Se sim, por quê?',
    resolucao: `<p>Sim, pode retornar menos que nbytes. Ex: disco cheio, sinal interrompeu a escrita, etc.</p>`,
    provavel: false, semelhanca: 'BAIXA',
    analise: { conteudo: 'Não', estrutura: 'Não', metodo: 'Não', nivel: 'Não', combinacao: 'Não', texto: 'Conceito de E/S. Não caiu.' }
  },
  {
    id: 'q1-23', num: 'Q23', tags: ['LIVRO'],
    titulo: 'lseek + read',
    enunciado: 'Arquivo com bytes: 3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5. lseek(fd, 3, SEEK_SET); read(fd, &buffer, 4); O que buffer contém?',
    resolucao: `<p>Buffer contém: <strong>1, 5, 9, 2</strong> (bytes 3, 4, 5, 6).</p>`,
    provavel: false, semelhanca: 'BAIXA',
    analise: { conteudo: 'Não', estrutura: 'Não', metodo: 'Não', nivel: 'Não', combinacao: 'Não', texto: 'Conceito de arquivos. Não caiu.' }
  },
  {
    id: 'q1-24', num: 'Q24', tags: ['LIVRO'],
    titulo: 'Tempo para ler 10 MB',
    enunciado: 'Arquivo de 10 MB em disco, faixa 50, setores consecutivos. Braço na faixa 100. Tempo?',
    resolucao: `<p>Busca: 50 ms (50 cilindros × 1 ms). Atraso rotacional: 5 ms. Leitura: 10 MB / 200 MB/s = 50 ms. Total ≈ <strong>105 ms</strong>.</p>`,
    provavel: false, semelhanca: 'BAIXA',
    analise: { conteudo: 'Não', estrutura: 'Não', metodo: 'Não', nivel: 'Não', combinacao: 'Não', texto: 'Cálculo de disco. Não caiu.' }
  },
  {
    id: 'q1-25', num: 'Q25', tags: ['LIVRO'],
    titulo: 'Arquivo especial de bloco vs caractere',
    enunciado: 'Qual é a diferença essencial entre um arquivo especial de bloco e um arquivo especial de caractere?',
    resolucao: `<p><strong>Bloco:</strong> acesso aleatório em blocos (ex: disco).<br><strong>Caractere:</strong> fluxo de caracteres (ex: impressora, terminal).</p>`,
    provavel: false, semelhanca: 'BAIXA',
    analise: { conteudo: 'Não', estrutura: 'Não', metodo: 'Não', nivel: 'Não', combinacao: 'Não', texto: 'Conceito de arquivos. Não caiu.' }
  },
  {
    id: 'q1-26', num: 'Q26', tags: ['LIVRO'],
    titulo: 'read (rotina vs chamada)',
    enunciado: 'A rotina de biblioteca é chamada read e a chamada de sistema é read. É fundamental que tenham o mesmo nome?',
    resolucao: `<p>Não é fundamental. A chamada de sistema é a mais importante (interface real com o SO).</p>`,
    provavel: false, semelhanca: 'BAIXA',
    analise: { conteudo: 'Não', estrutura: 'Não', metodo: 'Não', nivel: 'Não', combinacao: 'Não', texto: 'Conceito de chamadas. Não caiu.' }
  },
  {
    id: 'q1-27', num: 'Q27', tags: ['LIVRO'],
    titulo: 'Desacoplar espaço de endereçamento',
    enunciado: 'Sistemas operacionais modernos desacoplam o espaço de endereçamento do processo da memória física. Liste duas vantagens.',
    resolucao: `<p>1) Programas maiores que a memória física.<br>2) Isolamento e proteção entre processos.</p>`,
    provavel: false, semelhanca: 'BAIXA',
    analise: { conteudo: 'Não', estrutura: 'Não', metodo: 'Não', nivel: 'Não', combinacao: 'Não', texto: 'Conceito de memória. Não caiu.' }
  },
  {
    id: 'q1-28', num: 'Q28', tags: ['LIVRO'],
    titulo: 'Importância de saber chamadas',
    enunciado: 'É importante que um programador saiba quais rotinas de biblioteca resultam em chamadas de sistema? Em quais circunstâncias e por quê?',
    resolucao: `<p>Sim, para otimizar desempenho (chamadas de sistema são caras) e para entender o comportamento do programa.</p>`,
    provavel: false, semelhanca: 'BAIXA',
    analise: { conteudo: 'Não', estrutura: 'Não', metodo: 'Não', nivel: 'Não', combinacao: 'Não', texto: 'Conceito de chamadas. Não caiu.' }
  },
  {
    id: 'q1-29', num: 'Q29', tags: ['LIVRO'],
    titulo: 'UNIX → Windows',
    enunciado: 'Para chamadas UNIX sem equivalente Win32, quais as consequências de converter?',
    resolucao: `<p>Precisa reescrever partes do código. Ex: link, mount, kill não têm equivalentes diretos.</p>`,
    provavel: false, semelhanca: 'BAIXA',
    analise: { conteudo: 'Não', estrutura: 'Não', metodo: 'Não', nivel: 'Não', combinacao: 'Não', texto: 'Conceito de portabilidade. Não caiu.' }
  },
  {
    id: 'q1-30', num: 'Q30', tags: ['LIVRO'],
    titulo: 'Portabilidade',
    enunciado: 'Explique por que é impraticável construir um SO completamente portátil.',
    resolucao: `<p>Porque o SO interage diretamente com o hardware, que varia entre arquiteturas. Camadas de abstração ajudam, mas não eliminam dependências.</p>`,
    provavel: false, semelhanca: 'BAIXA',
    analise: { conteudo: 'Não', estrutura: 'Não', metodo: 'Não', nivel: 'Não', combinacao: 'Não', texto: 'Conceito de projeto. Não caiu.' }
  },
  {
    id: 'q1-31', num: 'Q31', tags: ['LIVRO'],
    titulo: 'Micronúcleo (política/mecanismo)',
    enunciado: 'Explique como a separação da política e mecanismo ajuda na construção de SOs baseados em micronúcleos.',
    resolucao: `<p>O micronúcleo fornece mecanismos (ex: IPC, escalonamento básico). Servidores em user space implementam políticas. Isso permite flexibilidade.</p>`,
    provavel: false, semelhanca: 'BAIXA',
    analise: { conteudo: 'Não', estrutura: 'Não', metodo: 'Não', nivel: 'Não', combinacao: 'Não', texto: 'Conceito de estrutura. Não caiu.' }
  },
  {
    id: 'q1-32', num: 'Q32', tags: ['LIVRO'],
    titulo: 'Problema de máquinas virtuais',
    enunciado: 'Máquinas virtuais têm alguns problemas. Cite um.',
    resolucao: `<p>Overhead: a virtualização adiciona camadas que reduzem o desempenho em relação ao hardware nativo.</p>`,
    provavel: false, semelhanca: 'BAIXA',
    analise: { conteudo: 'Não', estrutura: 'Não', metodo: 'Não', nivel: 'Não', combinacao: 'Não', texto: 'Conceito de virtualização. Não caiu.' }
  },
  {
    id: 'q1-33', num: 'Q33', tags: ['LIVRO'],
    titulo: 'Conversões de unidades',
    enunciado: '(a) Quantos segundos há em um nanoano? (b) Comprimento de um megamícron? (c) Quantos bytes em 1 PB? (d) Massa da Terra em kg?',
    resolucao: `<p>(a) 10⁻¹⁸ s. (b) 1 m. (c) 2⁵⁰ bytes. (d) 6×10²⁴ kg.</p>`,
    provavel: false, semelhanca: 'BAIXA',
    analise: { conteudo: 'Não', estrutura: 'Não', metodo: 'Não', nivel: 'Não', combinacao: 'Não', texto: 'Conversão de unidades. Não caiu.' }
  },
  {
    id: 'q1-34', num: 'Q34', tags: ['LIVRO'],
    titulo: 'Escrever um shell',
    enunciado: 'Escreva um shell que seja similar à Figura 1.19, mas contenha código suficiente para que ela realmente funcione.',
    resolucao: `<p>Questão de programação. Implementar fork + exec + waitpid + redirecionamento.</p>`,
    provavel: false, semelhanca: 'BAIXA',
    analise: { conteudo: 'Não', estrutura: 'Não', metodo: 'Não', nivel: 'Não', combinacao: 'Não', texto: 'Programação. Não caiu.' }
  },
  {
    id: 'q1-35', num: 'Q35', tags: ['LIVRO'],
    titulo: 'Script de fork ilimitado',
    enunciado: 'Escreva um script shell que tente criar um número ilimitado de processos filhos e observe o que acontece.',
    resolucao: `<p>Questão de programação. Cuidado: pode travar o sistema!</p>`,
    provavel: false, semelhanca: 'BAIXA',
    analise: { conteudo: 'Não', estrutura: 'Não', metodo: 'Não', nivel: 'Não', combinacao: 'Não', texto: 'Programação. Não caiu.' }
  },
  {
    id: 'q1-36', num: 'Q36', tags: ['LIVRO'],
    titulo: 'Examinar diretório com od',
    enunciado: 'Examine e tente interpretar os conteúdos de um diretório tipo UNIX ou Windows com uma ferramenta como o programa UNIX od.',
    resolucao: `<p>Questão de laboratório. Usar od -c para ver bytes brutos do diretório.</p>`,
    provavel: false, semelhanca: 'BAIXA',
    analise: { conteudo: 'Não', estrutura: 'Não', metodo: 'Não', nivel: 'Não', combinacao: 'Não', texto: 'Laboratório. Não caiu.' }
  }
];

/* ============================================================
   3. RENDERIZAÇÃO DE QUESTÕES
   ============================================================ */
function renderizarQuestao(q, secao) {
  const resolvida = STATE.resolvidas[q.id];
  const acertou = STATE.acertos[q.id];
  
  let classes = 'questao';
  if (q.provavel) classes += ' provavel';
  
  let tagsHtml = '';
  q.tags.forEach(t => {
    const cls = t === 'LISTA' ? 'tag-lista' : t === 'PROVA' ? 'tag-prova' : 'tag-livro';
    tagsHtml += `<span class="tag ${cls}">${t}</span>`;
  });
  
  if (q.provavel) {
    tagsHtml += `<span class="tag tag-provavel">⭐ PROVÁVEL</span>`;
  }
  
  if (q.semelhanca) {
    const clsS = q.semelhanca === 'ALTA' ? 'tag-alta' : q.semelhanca === 'MODERADA' ? 'tag-moderada' : 'tag-baixa';
    tagsHtml += `<span class="tag ${clsS}">${q.semelhanca}</span>`;
  }
  
  return `
    <div class="${classes}" data-id="${q.id}">
      <div class="questao-header">
        <div class="questao-titulo">
          <span class="questao-num">${q.num}</span>
          <span style="color: var(--text-dim); font-size: 0.9em;">— ${q.titulo}</span>
        </div>
        <div class="questao-tags">${tagsHtml}</div>
      </div>
      <div class="questao-enunciado">${q.enunciado}</div>
      <div class="questao-actions">
        <button class="btn btn-reveal" onclick="toggleResolucao('${q.id}')">
          👁️ Ver Resolução
        </button>
      </div>
      <div class="resolucao" id="res-${q.id}">
        ${q.resolucao}
      </div>
      ${q.analise ? `
        <div class="analise">
          <h4>📊 Relação com o Padrão do Professor</h4>
          <div class="analise-grid">
            <div class="analise-item"><span class="label">Conteúdo recorrente</span><span class="value ${q.analise.conteudo === 'Sim' ? 'sim' : 'nao'}">${q.analise.conteudo}</span></div>
            <div class="analise-item"><span class="label">Estrutura semelhante</span><span class="value ${q.analise.estrutura === 'Sim' ? 'sim' : 'nao'}">${q.analise.estrutura}</span></div>
            <div class="analise-item"><span class="label">Método semelhante</span><span class="value ${q.analise.metodo === 'Sim' ? 'sim' : 'nao'}">${q.analise.metodo}</span></div>
            <div class="analise-item"><span class="label">Nível semelhante</span><span class="value ${q.analise.nivel === 'Sim' ? 'sim' : 'nao'}">${q.analise.nivel}</span></div>
            <div class="analise-item"><span class="label">Combinação semelhante</span><span class="value ${q.analise.combinacao === 'Sim' ? 'sim' : 'nao'}">${q.analise.combinacao}</span></div>
          </div>
          <div class="analise-texto"><strong>Análise:</strong> ${q.analise.texto}</div>
        </div>
      ` : ''}
    </div>
  `;
}

/* ============================================================
   4. RENDERIZAÇÃO DAS SEÇÕES
   ============================================================ */
function renderizarSecao1(filtro = 'all') {
  const container = document.getElementById('questoesSecao1');
  if (!container) return;
  
  let questoes = QUESTOES_BASE;
  if (filtro !== 'all') {
    questoes = questoes.filter(q => q.tags.includes(filtro));
  }
  
  container.innerHTML = questoes.map(q => renderizarQuestao(q, 1)).join('');
}

function renderizarSecao2(filtro = 'all') {
  const container = document.getElementById('questoesSecao2');
  if (!container) return;
  
  let questoes = QUESTOES_CAP1;
  if (filtro === 'PROVAVEL') {
    questoes = questoes.filter(q => q.provavel);
  } else if (filtro === 'ALTA') {
    questoes = questoes.filter(q => q.semelhanca === 'ALTA');
  } else if (filtro === 'MODERADA') {
    questoes = questoes.filter(q => q.semelhanca === 'MODERADA');
  } else if (filtro === 'BAIXA') {
    questoes = questoes.filter(q => q.semelhanca === 'BAIXA');
  }
  
  container.innerHTML = questoes.map(q => renderizarQuestao(q, 2)).join('');
}

/* ============================================================
   5. INTERAÇÕES
   ============================================================ */
function toggleResolucao(id) {
  const res = document.getElementById('res-' + id);
  if (res) {
    res.classList.toggle('show');
    const btn = res.previousElementSibling.querySelector('.btn-reveal');
    if (btn) {
      btn.textContent = res.classList.contains('show') ? '🙈 Esconder Resolução' : '👁️ Ver Resolução';
    }
  }
}

/* ============================================================
   6. NAVEGAÇÃO
   ============================================================ */
function irParaSecao(sectionId) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  const target = document.getElementById(sectionId);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
    if (item.dataset.section === sectionId) item.classList.add('active');
  });
  STATE.currentSection = sectionId;
  salvarEstado();
  if (sectionId === 'secao1') renderizarSecao1();
  if (sectionId === 'secao2') renderizarSecao2();
  if (window.innerWidth <= 768) fecharSidebar();
}

/* ============================================================
   7. FILTROS
   ============================================================ */
function configurarFiltros() {
  document.querySelectorAll('.filtros').forEach(filtros => {
    filtros.addEventListener('click', (e) => {
      if (!e.target.classList.contains('filtro')) return;
      
      const parent = e.target.parentElement;
      parent.querySelectorAll('.filtro').forEach(f => f.classList.remove('active'));
      e.target.classList.add('active');
      
      const filtro = e.target.dataset.filtro;
      const secao = parent.id;
      
      if (secao === 'filtrosSecao1') renderizarSecao1(filtro);
      if (secao === 'filtrosSecao2') renderizarSecao2(filtro);
      if (secao === 'filtrosSecao3') renderizarSecao3(filtro);
      if (secao === 'filtrosSecao4') renderizarSecao4(filtro);
    });
  });
}

/* ============================================================
   8. LOCALSTORAGE
   ============================================================ */
function salvarEstado() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(STATE)); } catch(e) {}
}

function carregarEstado() {
  try {
    const salvo = localStorage.getItem(STORAGE_KEY);
    if (salvo) Object.assign(STATE, JSON.parse(salvo));
  } catch(e) {}
}

/* ============================================================
   9. SIDEBAR MOBILE
   ============================================================ */
function abrirSidebar() {
  document.getElementById('sidebar').classList.add('active');
  document.getElementById('overlay').classList.add('active');
}
function fecharSidebar() {
  document.getElementById('sidebar').classList.remove('active');
  document.getElementById('overlay').classList.remove('active');
}

/* ============================================================
   10. PAINÉIS
   ============================================================ */
function abrirPainel(id) {
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}
function closePanel(id) {
  document.getElementById(id).classList.remove('active');
}

/* ============================================================
   11. INICIALIZAÇÃO
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  carregarEstado();
  configurarFiltros();
  
  // Nav
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => irParaSecao(item.dataset.section));
  });
  
  // Menu toggle
  document.getElementById('menuToggle')?.addEventListener('click', abrirSidebar);
  document.getElementById('overlay')?.addEventListener('click', fecharSidebar);
  
  // Botões
  document.getElementById('btnReset')?.addEventListener('click', () => {
    if (confirm('Resetar todo o progresso?')) {
      STATE.resolvidas = {};
      STATE.acertos = {};
      salvarEstado();
      location.reload();
    }
  });
  
  // Renderizar seções iniciais
  renderizarSecao1();
  renderizarSecao2();
  
  console.log('🚀 RECALL-QUESTOES carregado!');
  console.log('📊 Total de questões:', QUESTOES_BASE.length + QUESTOES_CAP1.length);
});

/* ============================================================
   SEÇÃO 3 — CAPÍTULO 2 (Processos e Threads)
   ============================================================ */
const QUESTOES_CAP2 = [
  {
    id: 'q2-1', num: 'Q1', tags: ['LIVRO'],
    titulo: 'Transições de estado perdidas',
    enunciado: 'Na Figura 2.2, são mostrados três estados de processos. Na teoria, com três estados, poderia haver seis transições. Apenas quatro são mostradas. Existe alguma circunstância na qual uma delas ou ambas as transições perdidas possam ocorrer?',
    resolucao: `<p><strong>NÃO.</strong> Pronto→Bloqueado: só bloqueia se executando. Bloqueado→Executando: precisa passar por Pronto primeiro.</p>`,
    provavel: false, semelhanca: 'MODERADA',
    analise: { conteudo: 'Sim', estrutura: 'Não', metodo: 'Não', nivel: 'Sim', combinacao: 'Não', texto: 'Conceito de estados. Caiu em prova como base.' }
  },
  {
    id: 'q2-2', num: 'Q2', tags: ['LIVRO'],
    titulo: 'Chaveamento de processos em hardware',
    enunciado: 'Suponha que você fosse projetar uma arquitetura de computador avançada que realizasse chaveamento de processos em hardware, em vez de interrupções. De qual informação a CPU precisaria?',
    resolucao: `<p>Precisaria de: PC, registradores, PSW, ponteiro de pilha, mapas de memória, tabela de processos em hardware.</p>`,
    provavel: false, semelhanca: 'BAIXA',
    analise: { conteudo: 'Não', estrutura: 'Não', metodo: 'Não', nivel: 'Não', combinacao: 'Não', texto: 'Conceito de hardware. Não caiu.' }
  },
  {
    id: 'q2-3', num: 'Q3', tags: ['LIVRO'],
    titulo: 'Tratadores de interrupção em assembly',
    enunciado: 'Em todos os computadores atuais, pelo menos parte dos tratadores de interrupções é escrita em linguagem de montagem. Por quê?',
    resolucao: `<p>Porque precisam salvar/restaurar registradores e configurar pilha — operações que não podem ser expressas em linguagens de alto nível.</p>`,
    provavel: false, semelhanca: 'BAIXA',
    analise: { conteudo: 'Não', estrutura: 'Não', metodo: 'Não', nivel: 'Não', combinacao: 'Não', texto: 'Conceito de hardware. Não caiu.' }
  },
  {
    id: 'q2-4', num: 'Q4', tags: ['LIVRO'],
    titulo: 'Pilha do núcleo separada',
    enunciado: 'Quando uma interrupção ou chamada de sistema transfere controle para o SO, geralmente uma área da pilha do núcleo separada da pilha do processo interrompido é usada. Por quê?',
    resolucao: `<p>Para proteger o SO de programas de usuário maliciosos/bugados e permitir que o núcleo tenha sua própria pilha segura.</p>`,
    provavel: false, semelhanca: 'BAIXA',
    analise: { conteudo: 'Não', estrutura: 'Não', metodo: 'Não', nivel: 'Não', combinacao: 'Não', texto: 'Conceito de proteção. Não caiu.' }
  },
  {
    id: 'q2-5', num: 'Q5', tags: ['LIVRO'],
    titulo: 'Utilização da CPU (5 programas)',
    enunciado: 'Um sistema tem espaço para 5 programas. Eles estão ociosos esperando E/S metade do tempo. Qual fração do tempo da CPU é desperdiçada?',
    resolucao: `<p>p = 0,5. n = 5. Utilização = 1 − 0,5⁵ = 1 − 0,03125 = <strong>96,875%</strong>. Desperdício = <strong>3,125%</strong>.</p>`,
    provavel: false, semelhanca: 'MODERADA',
    analise: { conteudo: 'Sim', estrutura: 'Sim', metodo: 'Sim', nivel: 'Sim', combinacao: 'Não', texto: 'Cálculo similar à Q6 do Cap 2.' }
  },
  {
    id: 'q2-6', num: 'Q6', tags: ['LIVRO', 'INDICADA'],
    titulo: '4 GB RAM, 99% CPU',
    enunciado: 'Um computador tem 4 GB de RAM da qual o SO ocupa 512 MB. Os processos ocupam 256 MB cada. Se a meta é a utilização de 99% da CPU, qual é a espera de E/S máxima?',
    resolucao: `
      <h4>Resolução</h4>
      <p>RAM disponível = 4096 − 512 = 3584 MB</p>
      <p>n = 3584 / 256 = 14 processos</p>
      <p>1 − p¹⁴ = 0,99 → p¹⁴ = 0,01</p>
      <p>p = 0,01^(1/14) ≈ <strong>0,72 = 72%</strong></p>
    `,
    provavel: true, semelhanca: 'ALTA',
    analise: { conteudo: 'Sim', estrutura: 'Sim', metodo: 'Sim', nivel: 'Sim', combinacao: 'Sim', texto: 'Questão INDICADA pelo professor. Cálculo de multiprogramação.' }
  },
  {
    id: 'q2-7', num: 'Q7', tags: ['LIVRO'],
    titulo: 'Tarefas paralelas (20 min)',
    enunciado: 'Duas tarefas de 20 min cada. Tempo se sequencial? Tempo se paralelo? Espera de E/S de 50%.',
    resolucao: `<p><strong>Sequencial:</strong> 40 min. <strong>Paralelo:</strong> com 50% E/S, tempo ≈ 40 min (se não houver sobreposição) ou menos.</p>`,
    provavel: false, semelhanca: 'BAIXA',
    analise: { conteudo: 'Não', estrutura: 'Não', metodo: 'Não', nivel: 'Não', combinacao: 'Não', texto: 'Cálculo simples. Não caiu.' }
  },
  {
    id: 'q2-8', num: 'Q8', tags: ['LIVRO'],
    titulo: 'Multiprogramação grau 6',
    enunciado: 'Sistema multiprogramado com grau 6. Cada processo passa 40% do tempo esperando E/S. Qual a utilização da CPU?',
    resolucao: `<p>p = 0,4. n = 6. Utilização = 1 − 0,4⁶ = 1 − 0,004096 = <strong>99,59%</strong>.</p>`,
    provavel: false, semelhanca: 'MODERADA',
    analise: { conteudo: 'Sim', estrutura: 'Sim', metodo: 'Sim', nivel: 'Sim', combinacao: 'Não', texto: 'Cálculo similar à Q6.' }
  },
  {
    id: 'q2-9', num: 'Q9', tags: ['LIVRO'],
    titulo: 'Download com threads',
    enunciado: 'Você quer baixar 2 GB da internet. Como usar threads para melhorar o tempo?',
    resolucao: `<p>Dividir o arquivo em partes e baixar cada parte em um thread separado, em paralelo. Servidores espelho podem fornecer partes diferentes.</p>`,
    provavel: false, semelhanca: 'BAIXA',
    analise: { conteudo: 'Não', estrutura: 'Não', metodo: 'Não', nivel: 'Não', combinacao: 'Não', texto: 'Aplicação. Não caiu.' }
  },
  {
    id: 'q2-10', num: 'Q10', tags: ['LIVRO'],
    titulo: 'Cache em servidor de arquivos',
    enunciado: 'O modelo da Figura 2.11(a) não era adequado a um servidor de arquivos usando cache na memória. Por quê?',
    resolucao: `<p>Porque cada processo teria seu próprio cache, sem compartilhamento. O ideal é cache compartilhado entre threads.</p>`,
    provavel: false, semelhanca: 'BAIXA',
    analise: { conteudo: 'Não', estrutura: 'Não', metodo: 'Não', nivel: 'Não', combinacao: 'Não', texto: 'Conceito de threads. Não caiu.' }
  },
  {
    id: 'q2-11', num: 'Q11', tags: ['LIVRO'],
    titulo: 'fork() com threads',
    enunciado: 'Se um processo multithread bifurca, o filho recebe cópias de todos os threads do pai. Esse problema ocorre em processos de thread único?',
    resolucao: `<p><strong>Não.</strong> Em thread único, só há um thread. Após fork, o filho tem seu próprio thread (cópia). Não há duplicação de espera no mesmo recurso.</p>`,
    provavel: false, semelhanca: 'BAIXA',
    analise: { conteudo: 'Não', estrutura: 'Não', metodo: 'Não', nivel: 'Não', combinacao: 'Não', texto: 'Conceito avançado. Não caiu.' }
  },
  {
    id: 'q2-12', num: 'Q12', tags: ['LIVRO'],
    titulo: 'Servidor web multithread',
    enunciado: 'Se a única maneira de ler de um arquivo é read com bloqueio normal, threads de usuário ou de núcleo estão sendo usados?',
    resolucao: `<p><strong>Threads de núcleo.</strong> Com threads de usuário, uma chamada bloqueante travaria o processo inteiro.</p>`,
    provavel: false, semelhanca: 'MODERADA',
    analise: { conteudo: 'Sim', estrutura: 'Não', metodo: 'Não', nivel: 'Sim', combinacao: 'Não', texto: 'Conceito de threads. Relacionado a Q18.' }
  },
  {
    id: 'q2-13', num: 'Q13', tags: ['LIVRO'],
    titulo: 'Servidor thread único',
    enunciado: 'Existe alguma circunstância na qual um servidor de thread único possa ser melhor? Dê um exemplo.',
    resolucao: `<p>Sim, quando não há E/S bloqueante significativa ou quando a simplicidade é prioridade (ex: servidor de arquivos em cache).</p>`,
    provavel: false, semelhanca: 'BAIXA',
    analise: { conteudo: 'Não', estrutura: 'Não', metodo: 'Não', nivel: 'Não', combinacao: 'Não', texto: 'Conceito. Não caiu.' }
  },
  {
    id: 'q2-14', num: 'Q14', tags: ['LIVRO'],
    titulo: 'Registradores por thread',
    enunciado: 'Na Figura 2.12, o conjunto de registradores é listado como item por thread em vez de por processo. Por quê?',
    resolucao: `<p>Porque cada thread tem seu próprio fluxo de execução e precisa de registradores independentes.</p>`,
    provavel: false, semelhanca: 'BAIXA',
    analise: { conteudo: 'Não', estrutura: 'Não', metodo: 'Não', nivel: 'Não', combinacao: 'Não', texto: 'Conceito de threads. Não caiu.' }
  },
  {
    id: 'q2-15', num: 'Q15', tags: ['LIVRO'],
    titulo: 'thread_yield voluntário',
    enunciado: 'Por que um thread em algum momento abriria mão voluntariamente da CPU chamando thread_yield?',
    resolucao: `<p>Porque não há interrupção de relógio para threads de usuário. Sem thread_yield, um thread poderia monopolizar a CPU.</p>`,
    provavel: false, semelhanca: 'MODERADA',
    analise: { conteudo: 'Sim', estrutura: 'Não', metodo: 'Não', nivel: 'Sim', combinacao: 'Não', texto: 'Conceito de threads. Relacionado a Q21.' }
  },
  {
    id: 'q2-16', num: 'Q16', tags: ['LIVRO'],
    titulo: 'Thread antecipado por relógio',
    enunciado: 'É possível que um thread seja antecipado por uma interrupção de relógio? Se sim, em quais circunstâncias?',
    resolucao: `<p>Sim, se o thread estiver executando no sistema de tempo de execução e o relógio interromper. Pode causar inconsistência.</p>`,
    provavel: false, semelhanca: 'MODERADA',
    analise: { conteudo: 'Sim', estrutura: 'Não', metodo: 'Não', nivel: 'Sim', combinacao: 'Não', texto: 'Relacionado a Q21. Caiu como Q21.' }
  },
  {
    id: 'q2-17', num: 'Q17', tags: ['LIVRO'],
    titulo: 'Servidor de arquivos (12 ms + 75 ms)',
    enunciado: 'Servidor de arquivos: 12 ms para obter/despachar/processar (cache) ou +75 ms se disco (1/3 das vezes). Quantas req/s com 1 thread? E multithread?',
    resolucao: `
      <p><strong>1 thread:</strong> Tempo médio = 12 + (1/3)×75 = 12 + 25 = 37 ms. Taxa ≈ <strong>27 req/s</strong>.</p>
      <p><strong>Multithread:</strong> Sobreposição de E/S. Taxa pode ser muito maior (próxima de 1/12 ms = 83 req/s em cache, com disco em paralelo).</p>
    `,
    provavel: false, semelhanca: 'MODERADA',
    analise: { conteudo: 'Sim', estrutura: 'Sim', metodo: 'Sim', nivel: 'Sim', combinacao: 'Não', texto: 'Cálculo de servidor. Não caiu diretamente.' }
  },
  {
    id: 'q2-18', num: 'Q18', tags: ['LIVRO'],
    titulo: 'Tabela de processos',
    enunciado: 'Por que a tabela de processos é necessária em um sistema de compartilhamento de tempo? Ela também é necessária em sistemas de computadores pessoais executando UNIX ou Windows com um único usuário?',
    resolucao: `
      <p><strong>a) Compartilhamento de tempo:</strong> A tabela é necessária para <strong>salvar e restaurar o contexto</strong> de cada processo quando a CPU alterna entre eles (PC, registradores, estado). Sem ela, impossível alternar.</p>
      <p><strong>b) PC com um usuário:</strong> <strong>SIM</strong>, também é necessária. Mesmo com um único usuário, há múltiplos processos (navegador, antivírus, daemons), e o SO precisa gerenciá-los.</p>
      <p><strong>Conclusão:</strong> Essencial em qualquer sistema que suporte multiprogramação.</p>
    `,
    provavel: false, semelhanca: 'MODERADA',
    analise: { conteudo: 'Sim', estrutura: 'Não', metodo: 'Não', nivel: 'Sim', combinacao: 'Não', texto: 'Conceito de SO. Questão do Cap 2, não do Cap 1.' }
  },
  {
    id: 'q2-19', num: 'Q19', tags: ['LIVRO'],
    titulo: 'Ordem de criação de threads',
    enunciado: 'Na Figura 2.15 as criações e mensagens dos threads são intercaladas ao acaso. Existe alguma maneira de forçar uma ordem estrita?',
    resolucao: `<p>Sim, usando <code>pthread_join</code> para esperar cada thread terminar antes de criar o próximo.</p>`,
    provavel: false, semelhanca: 'BAIXA',
    analise: { conteudo: 'Não', estrutura: 'Não', metodo: 'Não', nivel: 'Não', combinacao: 'Não', texto: 'Programação. Não caiu.' }
  },
  {
    id: 'q2-20', num: 'Q20', tags: ['LIVRO'],
    titulo: 'create_global com ponteiro',
    enunciado: 'Usamos create_global para alocar memória para um ponteiro, em vez de para a própria variável. Isso é essencial?',
    resolucao: `<p>Sim, para permitir que cada thread tenha sua própria cópia. Se fosse a própria variável, seria compartilhada.</p>`,
    provavel: false, semelhanca: 'BAIXA',
    analise: { conteudo: 'Não', estrutura: 'Não', metodo: 'Não', nivel: 'Não', combinacao: 'Não', texto: 'Conceito avançado. Não caiu.' }
  },
  {
    id: 'q2-21', num: 'Q21', tags: ['LIVRO', 'INDICADA'],
    titulo: 'Threads + interrupção de relógio',
    enunciado: 'Threads no espaço do usuário, com interrupção de relógio a cada segundo. Suponha que uma interrupção ocorra enquanto um thread está executando no sistema de tempo de execução. Qual problema poderia ocorrer? Como resolver?',
    resolucao: `
      <h4>Resolução</h4>
      <p><strong>Problema:</strong> O sistema de tempo de execução pode estar em um estado interno inconsistente (manipulando estruturas de dados). Se for interrompido, ao retomar, o estado pode estar corrompido.</p>
      <p><strong>Solução:</strong> Desabilitar as interrupções de relógio enquanto o sistema de tempo de execução manipula estruturas críticas. Como as operações são curtas, o impacto é mínimo.</p>
    `,
    provavel: true, semelhanca: 'ALTA',
    analise: { conteudo: 'Sim', estrutura: 'Sim', metodo: 'Sim', nivel: 'Sim', combinacao: 'Sim', texto: 'Questão INDICADA pelo professor. Conceito avançado de threads.' }
  },
  {
    id: 'q2-22', num: 'Q22', tags: ['LIVRO'],
    titulo: 'Select',
    enunciado: 'Sistema sem select, mas com relógios de alarme. É possível implementar pacote de threads no espaço do usuário?',
    resolucao: `<p>Sim, usando alarmes para interromper chamadas bloqueadas e retomar depois.</p>`,
    provavel: false, semelhanca: 'BAIXA',
    analise: { conteudo: 'Não', estrutura: 'Não', metodo: 'Não', nivel: 'Não', combinacao: 'Não', texto: 'Conceito avançado. Não caiu.' }
  },
  {
    id: 'q2-23', num: 'Q23', tags: ['LIVRO'],
    titulo: 'Variável turn em multiprocessador',
    enunciado: 'A solução de espera ocupada usando a variável turn (Figura 2.23) funciona em multiprocessador de memória compartilhada?',
    resolucao: `<p>Não funciona corretamente. Duas CPUs podem ler turn=0 ao mesmo tempo e ambas entrarem na RC.</p>`,
    provavel: false, semelhanca: 'MODERADA',
    analise: { conteudo: 'Sim', estrutura: 'Não', metodo: 'Sim', nivel: 'Sim', combinacao: 'Não', texto: 'Relacionado a Strict Alternation. Caiu como Q1.' }
  },
  {
    id: 'q2-24', num: 'Q24', tags: ['LIVRO'],
    titulo: 'Peterson com preemptivo/não preemptivo',
    enunciado: 'A solução de Peterson funciona com escalonamento preemptivo? E não preemptivo?',
    resolucao: `<p><strong>SIM</strong> para ambos. Peterson não depende de preempção.</p>`,
    provavel: true, semelhanca: 'ALTA',
    analise: { conteudo: 'Sim', estrutura: 'Sim', metodo: 'Sim', nivel: 'Sim', combinacao: 'Sim', texto: 'Caiu em Exclusão Mútua (provas antigas).' }
  },
  {
    id: 'q2-25', num: 'Q25', tags: ['LIVRO'],
    titulo: 'Inversão de prioridade com threads de usuário',
    enunciado: 'O problema da inversão de prioridades acontece com threads de usuário?',
    resolucao: `<p>Sim, pode acontecer. Threads de usuário também sofrem com inversão de prioridades.</p>`,
    provavel: false, semelhanca: 'BAIXA',
    analise: { conteudo: 'Não', estrutura: 'Não', metodo: 'Não', nivel: 'Não', combinacao: 'Não', texto: 'Conceito avançado. Não caiu.' }
  },
  {
    id: 'q2-26', num: 'Q26', tags: ['LIVRO'],
    titulo: 'Inversão de prioridade com RR',
    enunciado: 'O mesmo problema ocorre se o escalonamento circular for usado em vez do escalonamento de prioridade?',
    resolucao: `<p>Não, porque o RR não dá prioridade a nenhum processo. Todos têm a mesma chance.</p>`,
    provavel: false, semelhanca: 'BAIXA',
    analise: { conteudo: 'Não', estrutura: 'Não', metodo: 'Não', nivel: 'Não', combinacao: 'Não', texto: 'Conceito avançado. Não caiu.' }
  },
  {
    id: 'q2-27', num: 'Q27', tags: ['LIVRO'],
    titulo: 'Pilha por thread ou por processo',
    enunciado: 'Em um sistema com threads, há uma pilha por thread ou por processo quando threads de usuário são usados? E kernel?',
    resolucao: `<p><strong>User-level:</strong> cada thread tem sua própria pilha no espaço do usuário.<br><strong>Kernel-level:</strong> cada thread também tem sua própria pilha (no núcleo ou no usuário).</p>`,
    provavel: false, semelhanca: 'MODERADA',
    analise: { conteudo: 'Sim', estrutura: 'Não', metodo: 'Não', nivel: 'Sim', combinacao: 'Não', texto: 'Conceito de threads. Relacionado a Q18.' }
  },
  {
    id: 'q2-28', num: 'Q28', tags: ['LIVRO'],
    titulo: 'Condição de corrida em simulação',
    enunciado: 'É possível que uma condição de corrida ocorra quando não há eventos simultâneos (simulação sequencial)?',
    resolucao: `<p>Não em simulação estritamente sequencial, pois não há paralelismo real.</p>`,
    provavel: false, semelhanca: 'BAIXA',
    analise: { conteudo: 'Não', estrutura: 'Não', metodo: 'Não', nivel: 'Não', combinacao: 'Não', texto: 'Conceito. Não caiu.' }
  },
  {
    id: 'q2-29', num: 'Q29', tags: ['LIVRO'],
    titulo: 'Produtor/Consumidor com múltiplos threads',
    enunciado: 'O problema produtor-consumidor pode ser ampliado para múltiplos produtores e consumidores. A solução com semáforos funcionaria?',
    resolucao: `<p><strong>SIM.</strong> Os semáforos mutex, empty e full funcionam para múltiplos produtores/consumidores, pois o mutex protege o buffer.</p>`,
    provavel: true, semelhanca: 'ALTA',
    analise: { conteudo: 'Sim', estrutura: 'Sim', metodo: 'Sim', nivel: 'Sim', combinacao: 'Sim', texto: 'Problema clássico de produtor/consumidor.' }
  },
  {
    id: 'q2-30', num: 'Q30', tags: ['LIVRO'],
    titulo: 'Strict Alternation',
    enunciado: 'Código do P0 (turn inicializado em 0): while (turn != 0) { } /* RC */ turn = 0;. Para P1, substitua 0 por 1. Determine se atende às condições de exclusão mútua.',
    resolucao: `
      <h4>Resolução</h4>
      <p><strong>a) NÃO atende.</strong></p>
      <p><strong>b) Viola Condição 3</strong> (fora da RC não bloqueia).</p>
      <p>Código tem erro: <code>turn = 0</code> no P0 deveria ser <code>turn = 1</code>. Com erro, P1 nunca entra → viola Condição 4. Corrigido: ainda viola Condição 3.</p>
    `,
    provavel: true, semelhanca: 'ALTA',
    analise: { conteudo: 'Sim', estrutura: 'Sim', metodo: 'Sim', nivel: 'Sim', combinacao: 'Sim', texto: 'Caiu em 07/01 e 28/05. Exclusão Mútua com Strict Alternation.' }
  },
  {
    id: 'q2-31', num: 'Q31', tags: ['LIVRO'],
    titulo: 'Semáforos com desabilitar interrupções',
    enunciado: 'Como um sistema operacional capaz de desabilitar interrupções poderia implementar semáforos?',
    resolucao: `<p>O SO desabilita interrupções brevemente enquanto testa o semáforo e o atualiza. Como são poucas instruções, não há problema.</p>`,
    provavel: false, semelhanca: 'MODERADA',
    analise: { conteudo: 'Sim', estrutura: 'Não', metodo: 'Sim', nivel: 'Sim', combinacao: 'Não', texto: 'Conceito de semáforos. Relacionado a Q7 do Cap 2.' }
  },
  {
    id: 'q2-32', num: 'Q32', tags: ['LIVRO'],
    titulo: 'Semáforos contadores com binários',
    enunciado: 'Mostre como semáforos contadores podem ser implementados usando apenas semáforos binários e instruções ordinárias.',
    resolucao: `<p>Usar dois semáforos binários: um para exclusão mútua e outro para sinalização. O contador é mantido em uma variável.</p>`,
    provavel: false, semelhanca: 'MODERADA',
    analise: { conteudo: 'Sim', estrutura: 'Não', metodo: 'Sim', nivel: 'Sim', combinacao: 'Não', texto: 'Conceito de semáforos. Não caiu diretamente.' }
  },
  {
    id: 'q2-33', num: 'Q33', tags: ['LIVRO'],
    titulo: 'Barreira com 2 processos',
    enunciado: 'Se um sistema tem apenas dois processos, faz sentido usar uma barreira para sincronizá-los?',
    resolucao: `<p>Sim, faz sentido, mas é redundante. Uma barreira com 2 processos funciona como uma sincronização simples.</p>`,
    provavel: false, semelhanca: 'BAIXA',
    analise: { conteudo: 'Não', estrutura: 'Não', metodo: 'Não', nivel: 'Não', combinacao: 'Não', texto: 'Conceito de barreira. Não caiu.' }
  }
];
/* ============================================================
   CAPÍTULO 2 — QUESTÕES Q34 a Q65
   ============================================================ */

QUESTOES_CAP2.push(
  {
    id: 'q2-34', num: 'Q34', tags: ['LIVRO'],
    titulo: 'Threads semáforo',
    enunciado: 'É possível que dois threads no mesmo processo sincronizem usando um semáforo do núcleo se os threads são implementados pelo núcleo? E se implementados no espaço do usuário?',
    resolucao: `<p><strong>Kernel:</strong> Sim, o semáforo do núcleo funciona.<br><strong>User-level:</strong> Sim, mas apenas se o semáforo estiver no espaço de endereçamento compartilhado. O núcleo não sabe dos threads.</p>`,
    provavel: false, semelhanca: 'BAIXA',
    analise: { conteudo: 'Não', estrutura: 'Não', metodo: 'Não', nivel: 'Não', combinacao: 'Não', texto: 'Conceito avançado. Não caiu.' }
  },
  {
    id: 'q2-35', num: 'Q35', tags: ['LIVRO'],
    titulo: 'waituntil',
    enunciado: 'Por que não é usado um esquema com waituntil (predicado booleano) em vez de wait/signal?',
    resolucao: `<p>Porque a implementação é complexa. O compilador precisaria reavaliar o predicado a cada mudança de estado, o que é ineficiente.</p>`,
    provavel: false, semelhanca: 'BAIXA',
    analise: { conteudo: 'Não', estrutura: 'Não', metodo: 'Não', nivel: 'Não', combinacao: 'Não', texto: 'Conceito de monitores. Não caiu.' }
  },
  {
    id: 'q2-36', num: 'Q36', tags: ['LIVRO'],
    titulo: 'Lanchonete (4 empregados)',
    enunciado: 'Lanchonete com atendentes, cozinheiros, empacotadores e caixas. Que forma de comunicação entre processos eles usam?',
    resolucao: `<p>Comunicação via <strong>pipes</strong> (ou filas). Cada empregado é um processo. A comunicação é sequencial.</p>`,
    provavel: false, semelhanca: 'BAIXA',
    analise: { conteudo: 'Não', estrutura: 'Não', metodo: 'Não', nivel: 'Não', combinacao: 'Não', texto: 'Aplicação. Não caiu.' }
  },
  {
    id: 'q2-37', num: 'Q37', tags: ['LIVRO'],
    titulo: 'Caixas de correio (send/receive)',
    enunciado: 'Sistema de mensagens com caixas de correio. Quando envia para cheia ou recebe de vazia, não bloqueia, mas retorna erro e tenta de novo. Esse esquema leva a condições de corrida?',
    resolucao: `<p>Sim, pode levar a <strong>livelock</strong> se dois processos ficarem tentando infinitamente.</p>`,
    provavel: false, semelhanca: 'BAIXA',
    analise: { conteudo: 'Não', estrutura: 'Não', metodo: 'Não', nivel: 'Não', combinacao: 'Não', texto: 'Conceito avançado. Não caiu.' }
  },
  {
    id: 'q2-38', num: 'Q38', tags: ['LIVRO'],
    titulo: 'CDC 6600 (compartilhamento)',
    enunciado: 'CDC 6600: 10 processos, chaveamento após cada instrução. Se um processo leva T segundos sozinho, quanto leva com n processos?',
    resolucao: `<p>Leva <strong>n × T</strong> segundos, pois cada processo recebe 1/n da CPU.</p>`,
    provavel: false, semelhanca: 'BAIXA',
    analise: { conteudo: 'Não', estrutura: 'Não', metodo: 'Não', nivel: 'Não', combinacao: 'Não', texto: 'Cálculo. Não caiu.' }
  },
  {
    id: 'q2-39', num: 'Q39', tags: ['LIVRO'],
    titulo: 'fork() simples',
    enunciado: 'void main() { fork(); fork(); exit(); } Quantos processos filhos?',
    resolucao: `<p>2 forks → 2² = 4 processos. <strong>3 filhos.</strong></p>`,
    provavel: true, semelhanca: 'ALTA',
    analise: { conteudo: 'Sim', estrutura: 'Sim', metodo: 'Sim', nivel: 'Sim', combinacao: 'Sim', texto: 'Caiu em 07/01. fork() é SEMPRE cobrado.' }
  },
  {
    id: 'q2-40', num: 'Q40', tags: ['LIVRO'],
    titulo: 'Processo duplicado em fila circular',
    enunciado: 'O que aconteceria se um processo ocorresse duas vezes em uma fila circular?',
    resolucao: `<p>Ele receberia o dobro de tempo de CPU. Pode ser usado para dar prioridade maior a um processo.</p>`,
    provavel: false, semelhanca: 'BAIXA',
    analise: { conteudo: 'Não', estrutura: 'Não', metodo: 'Não', nivel: 'Não', combinacao: 'Não', texto: 'Conceito de escalonamento. Não caiu.' }
  },
  {
    id: 'q2-41', num: 'Q41', tags: ['LIVRO'],
    titulo: 'CPU-bound vs I/O-bound',
    enunciado: 'É possível determinar se um processo é CPU-bound ou I/O-bound analisando o código-fonte? Como no tempo de execução?',
    resolucao: `<p><strong>Código-fonte:</strong> Difícil, pois depende do comportamento.<br><strong>Tempo de execução:</strong> Medindo o tempo de CPU vs tempo de espera.</p>`,
    provavel: false, semelhanca: 'BAIXA',
    analise: { conteudo: 'Não', estrutura: 'Não', metodo: 'Não', nivel: 'Não', combinacao: 'Não', texto: 'Conceito. Não caiu.' }
  },
  {
    id: 'q2-42', num: 'Q42', tags: ['LIVRO'],
    titulo: 'Quantum vs tempo de chaveamento',
    enunciado: 'Explique como o valor quantum e o tempo de chaveamento de contexto afetam um ao outro no RR.',
    resolucao: `<p>Se o quantum é muito pequeno, o overhead de chaveamento é alto. Se é muito grande, vira FCFS. O ideal é 20-50 ms.</p>`,
    provavel: false, semelhanca: 'MODERADA',
    analise: { conteudo: 'Sim', estrutura: 'Não', metodo: 'Não', nivel: 'Sim', combinacao: 'Não', texto: 'Conceito de escalonamento. Relacionado a Q3 das provas.' }
  },
  {
    id: 'q2-43', num: 'Q43', tags: ['LIVRO'],
    titulo: 'Eficiência do RR (fórmula)',
    enunciado: 'Processo executa por T antes de bloquear. Chaveamento leva S. Para RR com quantum Q, dê a eficiência da CPU para: (a) Q=∞, (b) Q>T, (c) S<Q<T, (d) Q=S, (e) Q≈0.',
    resolucao: `
      <p>(a) T/(T+S) &nbsp; (b) T/(T+S) &nbsp; (c) Q/(Q+S) &nbsp; (d) 1/2 &nbsp; (e) ≈0</p>
    `,
    provavel: false, semelhanca: 'MODERADA',
    analise: { conteudo: 'Sim', estrutura: 'Não', metodo: 'Sim', nivel: 'Sim', combinacao: 'Não', texto: 'Conceito de RR. Não caiu diretamente.' }
  },
  {
    id: 'q2-44', num: 'Q44', tags: ['LIVRO'],
    titulo: '5 tarefas (9,6,3,5,X)',
    enunciado: 'Cinco tarefas com tempos 9, 6, 3, 5, X. Em qual ordem minimizar o tempo de resposta médio?',
    resolucao: `
      <p>Depende de X. Use SJF: ordem crescente.<br>
      Se X<3: X,3,5,6,9<br>
      Se 3<X<5: 3,X,5,6,9<br>
      Se 5<X<6: 3,5,X,6,9<br>
      Se 6<X<9: 3,5,6,X,9<br>
      Se X>9: 3,5,6,9,X</p>
    `,
    provavel: false, semelhanca: 'MODERADA',
    analise: { conteudo: 'Sim', estrutura: 'Sim', metodo: 'Sim', nivel: 'Sim', combinacao: 'Não', texto: 'Escalonamento. Relacionado a Q3 das provas.' }
  },
  {
    id: 'q2-45', num: 'Q45', tags: ['LIVRO'],
    titulo: 'Escalonamento A-E',
    enunciado: 'Cinco tarefas A-E: tempos 10, 6, 2, 4, 8. Prioridades 3, 5, 2, 1, 4 (5=mais alta). Calcule o tempo de retorno médio para: (a) RR, (b) Prioridade, (c) FCFS, (d) SJF.',
    resolucao: `
      <h4>Resolução</h4>
      <table>
        <tr><th>Algoritmo</th><th>Média</th></tr>
        <tr><td>(a) RR</td><td>19,2</td></tr>
        <tr><td>(b) Prioridade</td><td>20,0</td></tr>
        <tr><td>(c) FCFS</td><td>19,2</td></tr>
        <tr><td>(d) SJF</td><td><strong>14,0</strong> ✅</td></tr>
      </table>
    `,
    provavel: true, semelhanca: 'ALTA',
    analise: { conteudo: 'Sim', estrutura: 'Sim', metodo: 'Sim', nivel: 'Sim', combinacao: 'Sim', texto: 'Caiu em 07/01. Escalonamento é SEMPRE cobrado.' }
  },
  {
    id: 'q2-46', num: 'Q46', tags: ['LIVRO'],
    titulo: 'CTSS (30 quanta)',
    enunciado: 'Um processo executando em CTSS precisa de 30 quanta. Quantas vezes deve ser trocado?',
    resolucao: `<p>CTSS dá 1, 2, 4, 8, 16, 32 quanta. Total = 1+2+4+8+16 = 31. Logo, <strong>6 trocas</strong> (incluindo a primeira).</p>`,
    provavel: false, semelhanca: 'BAIXA',
    analise: { conteudo: 'Não', estrutura: 'Não', metodo: 'Não', nivel: 'Não', combinacao: 'Não', texto: 'Conceito de escalonamento. Não caiu.' }
  },
  {
    id: 'q2-47', num: 'Q47', tags: ['LIVRO'],
    titulo: 'Tempo real (voz + vídeo)',
    enunciado: '2 chamadas de voz (5 ms cada, 1 ms CPU) + 1 vídeo (33 ms, 11 ms CPU). O sistema é escalonável?',
    resolucao: `<p>Soma = 2×(1/5) + 11/33 = 0,4 + 0,333 = <strong>0,733 < 1</strong>. SIM, é escalonável.</p>`,
    provavel: false, semelhanca: 'BAIXA',
    analise: { conteudo: 'Não', estrutura: 'Não', metodo: 'Não', nivel: 'Não', combinacao: 'Não', texto: 'Cálculo de tempo real. Não caiu.' }
  },
  {
    id: 'q2-48', num: 'Q48', tags: ['LIVRO'],
    titulo: 'Adicionar outro vídeo',
    enunciado: 'Para o problema anterior, será que outro fluxo de vídeo pode ser acrescentado?',
    resolucao: `<p>Sim, se a soma continuar < 1. Novo vídeo de 11 ms/33 ms = 0,333. Soma = 0,733 + 0,333 = 1,066 > 1. <strong>NÃO</strong> é escalonável.</p>`,
    provavel: false, semelhanca: 'BAIXA',
    analise: { conteudo: 'Não', estrutura: 'Não', metodo: 'Não', nivel: 'Não', combinacao: 'Não', texto: 'Cálculo. Não caiu.' }
  },
  {
    id: 'q2-49', num: 'Q49', tags: ['LIVRO'],
    titulo: 'Envelhecimento (a = 1/2)',
    enunciado: 'Envelhecimento com a=1/2. Execuções anteriores: 40, 20, 40, 15 ms. Previsão do próximo?',
    resolucao: `
      <p>T0 = 40<br>
      T1 = 1/2×40 + 1/2×40 = 40<br>
      T2 = 1/2×20 + 1/2×40 = 30<br>
      T3 = 1/2×40 + 1/2×30 = 35<br>
      T4 = 1/2×15 + 1/2×35 = <strong>25 ms</strong></p>
    `,
    provavel: false, semelhanca: 'BAIXA',
    analise: { conteudo: 'Não', estrutura: 'Não', metodo: 'Não', nivel: 'Não', combinacao: 'Não', texto: 'Cálculo. Não caiu.' }
  },
  {
    id: 'q2-50', num: 'Q50', tags: ['LIVRO'],
    titulo: 'Tempo real não crítico (4 eventos)',
    enunciado: 'Eventos com períodos 50, 100, 200, 250 ms. Tempos: 35, 20, 10, x. Maior x para o sistema ser escalonável?',
    resolucao: `<p>35/50 + 20/100 + 10/200 + x/250 ≤ 1<br>0,7 + 0,2 + 0,05 + x/250 ≤ 1<br>x/250 ≤ 0,05<br><strong>x = 12,5 ms</strong></p>`,
    provavel: false, semelhanca: 'BAIXA',
    analise: { conteudo: 'Não', estrutura: 'Não', metodo: 'Não', nivel: 'Não', combinacao: 'Não', texto: 'Cálculo. Não caiu.' }
  },
  {
    id: 'q2-51', num: 'Q51', tags: ['LIVRO'],
    titulo: 'Jantar dos Filósofos (protocolo par/ímpar)',
    enunciado: 'Protocolo: filósofo par pega esquerdo primeiro; ímpar pega direito primeiro. Garante ausência de deadlock?',
    resolucao: `<p><strong>SIM.</strong> Não é possível que todos peguem um garfo e esperem pelo outro. Pode causar inanição, mas não deadlock.</p>`,
    provavel: true, semelhanca: 'ALTA',
    analise: { conteudo: 'Sim', estrutura: 'Sim', metodo: 'Sim', nivel: 'Sim', combinacao: 'Sim', texto: 'Problema clássico. Jantar dos Filósofos é sempre cobrado.' }
  },
  {
    id: 'q2-52', num: 'Q52', tags: ['LIVRO'],
    titulo: 'Tempo real (2 vozes + vídeo 25 fps)',
    enunciado: '2 vozes (6 ms, 1 ms) + vídeo 25 quadros/s (20 ms CPU). Escalonável?',
    resolucao: `<p>2×(1/6) + 25×0,02 = 0,333 + 0,5 = <strong>0,833 < 1</strong>. SIM, é escalonável.</p>`,
    provavel: false, semelhanca: 'BAIXA',
    analise: { conteudo: 'Não', estrutura: 'Não', metodo: 'Não', nivel: 'Não', combinacao: 'Não', texto: 'Cálculo. Não caiu.' }
  },
  {
    id: 'q2-53', num: 'Q53', tags: ['LIVRO'],
    titulo: 'Separar política/mecanismo em threads',
    enunciado: 'Considere um sistema no qual se deseja separar política e mecanismo para o escalonamento de threads de núcleo. Proponha um meio de atingir essa meta.',
    resolucao: `<p>Fornecer uma chamada de sistema que permita ao processo definir prioridades dos seus threads, mas o escalonamento em si é feito pelo núcleo (mecanismo).</p>`,
    provavel: false, semelhanca: 'BAIXA',
    analise: { conteudo: 'Não', estrutura: 'Não', metodo: 'Não', nivel: 'Não', combinacao: 'Não', texto: 'Conceito de projeto. Não caiu.' }
  },
  {
    id: 'q2-54', num: 'Q54', tags: ['LIVRO'],
    titulo: 'Jantar dos Filósofos (HUNGRY)',
    enunciado: 'Na solução para o jantar dos filósofos, por que a variável de estado está configurada para HUNGRY na rotina take_forks?',
    resolucao: `
      <h4>Resolução</h4>
      <p><strong>HUNGRY</strong> indica que o filósofo <strong>quer comer</strong>. A rotina <code>test()</code> verifica <code>state[i] == HUNGRY</code> para decidir se pode comer. Sem HUNGRY, <code>test()</code> nunca libera o filósofo (state[i] ainda é THINKING).</p>
    `,
    provavel: true, semelhanca: 'ALTA',
    analise: { conteudo: 'Sim', estrutura: 'Sim', metodo: 'Sim', nivel: 'Sim', combinacao: 'Sim', texto: 'Caiu em 28/05. Jantar dos Filósofos é sempre cobrado.' }
  },
  {
    id: 'q2-55', num: 'Q55', tags: ['LIVRO'],
    titulo: 'put_forks com state[i] = THINKING',
    enunciado: 'Suponha que state[i] foi configurada para THINKING após as duas chamadas de teste, em vez de antes. Como isso afetaria a solução?',
    resolucao: `<p>Poderia causar deadlock ou comportamento incorreto, pois o filósofo apareceria como THINKING durante o teste dos vizinhos.</p>`,
    provavel: false, semelhanca: 'MODERADA',
    analise: { conteudo: 'Sim', estrutura: 'Não', metodo: 'Não', nivel: 'Sim', combinacao: 'Não', texto: 'Relacionado a Q54. Jantar dos Filósofos.' }
  },
  {
    id: 'q2-56', num: 'Q56', tags: ['LIVRO'],
    titulo: 'Leitores/Escritores (3 variações)',
    enunciado: 'Descreva três variações do problema dos leitores e escritores.',
    resolucao: `
      <p>1. <strong>Prioridade leitores:</strong> Leitores entram enquanto houver um ativo. Escritores podem sofrer inanição.</p>
      <p>2. <strong>Prioridade escritores:</strong> Escritor bloqueia leitores subsequentes. Leitores podem sofrer inanição.</p>
      <p>3. <strong>Sem prioridade (FIFO):</strong> Justo, mas ambos podem sofrer inanição.</p>
    `,
    provavel: true, semelhanca: 'ALTA',
    analise: { conteudo: 'Sim', estrutura: 'Sim', metodo: 'Sim', nivel: 'Sim', combinacao: 'Sim', texto: 'Problema clássico. Leitores/Escritores é sempre cobrado.' }
  },
  {
    id: 'q2-57', num: 'Q57', tags: ['LIVRO'],
    titulo: 'Script shell (condição de corrida)',
    enunciado: 'Escreva um script shell que produza um arquivo de números sequenciais. Execute em foreground e background. Quanto tempo até condição de corrida?',
    resolucao: `<p>Questão de laboratório. Usar <code>flock</code> para evitar a corrida.</p>`,
    provavel: false, semelhanca: 'BAIXA',
    analise: { conteudo: 'Não', estrutura: 'Não', metodo: 'Não', nivel: 'Não', combinacao: 'Não', texto: 'Laboratório. Não caiu.' }
  },
  {
    id: 'q2-58', num: 'Q58', tags: ['LIVRO'],
    titulo: 'Sistema de mensagens',
    enunciado: 'Implemente um sistema de mensagens usando semáforos.',
    resolucao: `<p>Usar dois semáforos: um para "mensagem disponível" e outro para "espaço disponível no buffer".</p>`,
    provavel: false, semelhanca: 'BAIXA',
    analise: { conteudo: 'Não', estrutura: 'Não', metodo: 'Não', nivel: 'Não', combinacao: 'Não', texto: 'Programação. Não caiu.' }
  },
  {
    id: 'q2-59', num: 'Q59', tags: ['LIVRO'],
    titulo: 'Jantar dos Filósofos com monitores',
    enunciado: 'Solucione o jantar dos filósofos usando monitores em vez de semáforos.',
    resolucao: `<p>Usar um monitor com variáveis de condição. O filósofo chama <code>pickup(i)</code> que verifica se pode comer.</p>`,
    provavel: false, semelhanca: 'MODERADA',
    analise: { conteudo: 'Sim', estrutura: 'Não', metodo: 'Sim', nivel: 'Sim', combinacao: 'Sim', texto: 'Jantar dos Filósofos com monitores. Relacionado a Q54.' }
  },
  {
    id: 'q2-60', num: 'Q60', tags: ['LIVRO'],
    titulo: 'Banheiros por gênero',
    enunciado: 'Sistema de banheiros: se mulher está, outras mulheres entram, homens não. Implemente rotinas.',
    resolucao: `<p>Usar semáforos e contadores. <code>mutex</code> protege contadores. <code>mulheres</code> e <code>homens</code> contam quem está dentro.</p>`,
    provavel: false, semelhanca: 'BAIXA',
    analise: { conteudo: 'Não', estrutura: 'Não', metodo: 'Não', nivel: 'Não', combinacao: 'Não', texto: 'Aplicação. Não caiu.' }
  },
  {
    id: 'q2-61', num: 'Q61', tags: ['LIVRO'],
    titulo: 'Reescrever Figura 2.23 para N processos',
    enunciado: 'Reescreva o programa da Figura 2.23 para lidar com mais do que dois processos.',
    resolucao: `<p>Usar uma variável <code>turn</code> que cicla entre 0 e N-1.</p>`,
    provavel: false, semelhanca: 'MODERADA',
    analise: { conteudo: 'Sim', estrutura: 'Sim', metodo: 'Sim', nivel: 'Sim', combinacao: 'Não', texto: 'Relacionado a Strict Alternation.' }
  },
  {
    id: 'q2-62', num: 'Q62', tags: ['LIVRO'],
    titulo: 'Produtor/consumidor com sleep/wakeup',
    enunciado: 'Escreva um produtor-consumidor usando threads e buffer comum, sem semáforos, apenas sleep/wakeup. Veja quanto tempo leva para condição de corrida.',
    resolucao: `<p>Questão de programação. A condição de corrida ocorre rapidamente.</p>`,
    provavel: false, semelhanca: 'MODERADA',
    analise: { conteudo: 'Sim', estrutura: 'Sim', metodo: 'Sim', nivel: 'Sim', combinacao: 'Sim', texto: 'Relacionado a produtor/consumidor.' }
  },
  {
    id: 'q2-63', num: 'Q63', tags: ['LIVRO'],
    titulo: 'Múltiplas instâncias (primalidade)',
    enunciado: 'Programa que testa primalidade. Múltiplas instâncias ao mesmo tempo sem trabalhar sobre o mesmo número. Repassa mais rápido?',
    resolucao: `<p>Depende. Em computador pessoal sozinho, não. Com outros processos, pode conseguir mais CPU.</p>`,
    provavel: false, semelhanca: 'BAIXA',
    analise: { conteudo: 'Não', estrutura: 'Não', metodo: 'Não', nivel: 'Não', combinacao: 'Não', texto: 'Programação. Não caiu.' }
  },
  {
    id: 'q2-64', num: 'Q64', tags: ['LIVRO'],
    titulo: 'Número perfeito com threads',
    enunciado: 'Programa com P threads para descobrir se N é perfeito. Buffer compartilhado para fatores.',
    resolucao: `<p>Usar mutex para proteger o buffer de fatores. Cada thread verifica uma faixa de números.</p>`,
    provavel: false, semelhanca: 'BAIXA',
    analise: { conteudo: 'Não', estrutura: 'Não', metodo: 'Não', nivel: 'Não', combinacao: 'Não', texto: 'Programação. Não caiu.' }
  },
  {
    id: 'q2-65', num: 'Q65', tags: ['LIVRO'],
    titulo: 'Frequência de palavras com threads',
    enunciado: 'Contar frequência de palavras em arquivo de texto dividido em N segmentos, cada um processado por um thread.',
    resolucao: `<p>Cada thread processa um segmento e produz uma contagem parcial. O processo principal consolida.</p>`,
    provavel: false, semelhanca: 'BAIXA',
    analise: { conteudo: 'Não', estrutura: 'Não', metodo: 'Não', nivel: 'Não', combinacao: 'Não', texto: 'Programação. Não caiu.' }
  }
);

/* ============================================================
   RENDERIZAÇÃO SEÇÃO 3
   ============================================================ */
function renderizarSecao3(filtro = 'all') {
  const container = document.getElementById('questoesSecao3');
  if (!container) return;
  
  let questoes = QUESTOES_CAP2;
  if (filtro === 'PROVAVEL') questoes = questoes.filter(q => q.provavel);
  else if (filtro === 'ALTA') questoes = questoes.filter(q => q.semelhanca === 'ALTA');
  else if (filtro === 'MODERADA') questoes = questoes.filter(q => q.semelhanca === 'MODERADA');
  else if (filtro === 'BAIXA') questoes = questoes.filter(q => q.semelhanca === 'BAIXA');
  
  container.innerHTML = questoes.map(q => renderizarQuestao(q, 3)).join('');
}

/* ============================================================
   ATUALIZAR NAVEGAÇÃO PARA INCLUIR SEÇÃO 3
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('secao3')) {
    renderizarSecao3();
  }
  console.log('📗 Cap 2 carregado:', QUESTOES_CAP2.length, 'questões');
});


/* ============================================================
   SEÇÃO 4 — CAPÍTULO 6 (Impasse)
   ============================================================ */
const QUESTOES_CAP6 = [
  {
    id: 'q6-1', num: 'Q1', tags: ['LIVRO'],
    titulo: 'Exemplo de impasse da política',
    enunciado: 'Dê um exemplo de um impasse tirado da política.',
    resolucao: `<p>Ex: dois países em disputa territorial — cada um espera o outro ceder primeiro. Nenhum cede, nenhum progride.</p>`,
    provavel: false, semelhanca: 'MODERADA',
    analise: { conteudo: 'Sim', estrutura: 'Não', metodo: 'Não', nivel: 'Sim', combinacao: 'Não', texto: 'Aplicação de impasse. Não caiu diretamente.' }
  },
  {
    id: 'q6-2', num: 'Q2', tags: ['LIVRO'],
    titulo: 'Spool de impressão com espaço limitado',
    enunciado: 'Estudantes enviam arquivos para impressão via spooling. Em quais condições pode ocorrer impasse se o espaço em disco é limitado? Como evitar?',
    resolucao: `
      <p><strong>Condições:</strong> Se o spool encher, o daemon de impressão não consegue adicionar mais arquivos. Se o daemon precisa de espaço para processar e não tem, e os produtores esperam por espaço, ocorre impasse.</p>
      <p><strong>Como evitar:</strong> Reservar espaço para o daemon, ou usar cotas por usuário.</p>
    `,
    provavel: false, semelhanca: 'MODERADA',
    analise: { conteudo: 'Sim', estrutura: 'Sim', metodo: 'Sim', nivel: 'Sim', combinacao: 'Não', texto: 'Aplicação de impasse. Não caiu diretamente.' }
  },
  {
    id: 'q6-3', num: 'Q3', tags: ['LIVRO'],
    titulo: 'Recursos preemptíveis vs não-preemptíveis',
    enunciado: 'Na questão anterior, quais recursos podem ser obtidos por preempção e quais não podem?',
    resolucao: `<p><strong>Preemptível:</strong> Espaço em disco (pode ser realocado).<br><strong>Não-preemptível:</strong> A impressora (não pode ser tomada no meio da impressão).</p>`,
    provavel: false, semelhanca: 'MODERADA',
    analise: { conteudo: 'Sim', estrutura: 'Não', metodo: 'Não', nivel: 'Sim', combinacao: 'Não', texto: 'Conceito de recursos. Relacionado a Q1 do Cap 6.' }
  },
  {
    id: 'q6-4', num: 'Q4', tags: ['LIVRO'],
    titulo: 'Ordem de devolução de recursos',
    enunciado: 'Na Figura 6.1 os recursos são retornados na ordem inversa da aquisição. Devolvê-los na outra ordem seria igualmente correto?',
    resolucao: `<p><strong>Sim</strong>, desde que o processo libere os recursos que possui. A ordem não importa para a corretude.</p>`,
    provavel: false, semelhanca: 'MODERADA',
    analise: { conteudo: 'Sim', estrutura: 'Não', metodo: 'Não', nivel: 'Sim', combinacao: 'Não', texto: 'Conceito de impasse. Não caiu.' }
  },
  {
    id: 'q6-5', num: 'Q5', tags: ['LIVRO'],
    titulo: 'Condições necessárias mas não suficientes',
    enunciado: 'As quatro condições são necessárias para impasse. Dê um exemplo mostrando que não são suficientes. Quando são suficientes?',
    resolucao: `
      <p><strong>Exemplo (não suficiente):</strong> Um processo tem R1 e quer R2, outro tem R2 e quer R1, mas ambos podem liberar antes de pedir — as 4 condições podem existir sem impasse.</p>
      <p><strong>Suficientes quando:</strong> Há um ciclo no grafo de alocação (para 1 instância de cada recurso).</p>
    `,
    provavel: true, semelhanca: 'ALTA',
    analise: { conteudo: 'Sim', estrutura: 'Sim', metodo: 'Sim', nivel: 'Sim', combinacao: 'Sim', texto: 'Caiu em prova. Definição de impasse.' }
  },
  {
    id: 'q6-6', num: 'Q6', tags: ['LIVRO'],
    titulo: 'Engarrafamento (algoritmo do "não bloqueie")',
    enunciado: 'O algoritmo de prevenção da cidade de Nova York proíbe os carros de entrar em um cruzamento a não ser que o espaço após o cruzamento esteja também disponível. Qual algoritmo de prevenção é esse?',
    resolucao: `<p>É o algoritmo de <strong>prevenção de impasse por alocação antecipada</strong> — equivalente a "requisitar todos os recursos no início".</p>`,
    provavel: false, semelhanca: 'MODERADA',
    analise: { conteudo: 'Sim', estrutura: 'Não', metodo: 'Sim', nivel: 'Sim', combinacao: 'Não', texto: 'Aplicação de prevenção. Não caiu.' }
  },
  {
    id: 'q6-7', num: 'Q7', tags: ['LIVRO'],
    titulo: 'Quatro carros em cruzamento',
    enunciado: 'Quatro carros se aproximam de um cruzamento. Regra: carro à esquerda cede para o da direita. Isso é impasse de comunicação? É impasse de recursos?',
    resolucao: `<p>É um <strong>impasse de recursos</strong> (cruzamento = recurso). Não é de comunicação, pois não envolve mensagens.</p>`,
    provavel: false, semelhanca: 'MODERADA',
    analise: { conteudo: 'Sim', estrutura: 'Não', metodo: 'Não', nivel: 'Sim', combinacao: 'Não', texto: 'Aplicação. Não caiu.' }
  },
  {
    id: 'q6-8', num: 'Q8', tags: ['LIVRO'],
    titulo: 'Múltiplas unidades de um tipo + uma de outro',
    enunciado: 'É possível que um impasse de recurso envolva múltiplas unidades de um tipo e uma única unidade de outro? Se sim, dê um exemplo.',
    resolucao: `<p><strong>Sim.</strong> Ex: duas impressoras idênticas e um scanner. P1 tem 1 impressora e espera o scanner. P2 tem o scanner e espera as duas impressoras.</p>`,
    provavel: false, semelhanca: 'BAIXA',
    analise: { conteudo: 'Não', estrutura: 'Não', metodo: 'Não', nivel: 'Não', combinacao: 'Não', texto: 'Conceito avançado. Não caiu.' }
  },
  {
    id: 'q6-9', num: 'Q9', tags: ['LIVRO'],
    titulo: 'Grafos ilegais',
    enunciado: 'Existem grafos de recursos que violam estruturalmente o modelo? Se sim, dê um exemplo.',
    resolucao: `<p>Sim. Ex: uma aresta de recurso para recurso, ou dois processos apontando para o mesmo recurso (sem instâncias suficientes).</p>`,
    provavel: false, semelhanca: 'BAIXA',
    analise: { conteudo: 'Não', estrutura: 'Não', metodo: 'Não', nivel: 'Não', combinacao: 'Não', texto: 'Conceito de grafos. Não caiu.' }
  },
  {
    id: 'q6-10', num: 'Q10', tags: ['LIVRO'],
    titulo: 'Figura 6.4 (C solicita S)',
    enunciado: 'Suponha que no passo (o) C solicitou S em vez de R. Isso levaria a um impasse? Suponha que ele tenha solicitado tanto S como R.',
    resolucao: `<p><strong>C solicita S:</strong> Pode ou não levar a impasse, dependendo do estado. <strong>C solicita S e R:</strong> Aumenta a chance de impasse.</p>`,
    provavel: false, semelhanca: 'BAIXA',
    analise: { conteudo: 'Não', estrutura: 'Não', metodo: 'Não', nivel: 'Não', combinacao: 'Não', texto: 'Análise de grafo. Não caiu.' }
  },
  {
    id: 'q6-11', num: 'Q11', tags: ['LIVRO'],
    titulo: 'Processos fora do ciclo',
    enunciado: 'Dê um exemplo mostrando que o conjunto de processos em impasse pode incluir processos que não estão na cadeia circular.',
    resolucao: `<p>Ex: P1 → P2 → P3 → P1 (ciclo). P4 espera por um recurso que P1 tem, mas não está no ciclo. P4 também está em impasse.</p>`,
    provavel: false, semelhanca: 'BAIXA',
    analise: { conteudo: 'Não', estrutura: 'Não', metodo: 'Não', nivel: 'Não', combinacao: 'Não', texto: 'Conceito avançado. Não caiu.' }
  },
  {
    id: 'q6-12', num: 'Q12', tags: ['LIVRO'],
    titulo: 'Roteador A/B (janela 0)',
    enunciado: 'Roteador A envia mensagem para B dizendo para cessar tráfego (janela 0). Depois envia nova mensagem para reiniciar, mas ela é perdida. Que tipo de impasse é esse?',
    resolucao: `<p>É um <strong>impasse de comunicação</strong>. A e B ficam esperando indefinidamente por mensagens que não chegam.</p>`,
    provavel: true, semelhanca: 'ALTA',
    analise: { conteudo: 'Sim', estrutura: 'Sim', metodo: 'Sim', nivel: 'Sim', combinacao: 'Sim', texto: 'Caiu em prova como conceito de impasse de comunicação.' }
  },
  {
    id: 'q6-13', num: 'Q13', tags: ['LIVRO'],
    titulo: 'Tabela de processos cheia',
    enunciado: 'Você poderia sugerir uma maneira de capacitar um administrador de sistemas a recuperar de uma situação em que a tabela de processos encheu?',
    resolucao: `<p>Matar um processo para liberar entrada. Ou ter uma entrada reservada para o administrador.</p>`,
    provavel: false, semelhanca: 'BAIXA',
    analise: { conteudo: 'Não', estrutura: 'Não', metodo: 'Não', nivel: 'Não', combinacao: 'Não', texto: 'Conceito. Não caiu.' }
  },
  {
    id: 'q6-14', num: 'Q14', tags: ['LIVRO'],
    titulo: 'Detecção de impasse com matrizes',
    enunciado: 'Sistema com 4 processos e 5 recursos: C = [0 1 1 1 2 / 0 1 0 1 0 / 0 0 0 0 1 / 2 1 0 0 0], R = [1 1 0 2 1 / 0 1 0 2 1 / 0 2 0 3 1 / 0 2 1 1 0], E=(2,4,1,4,4), A=(0,1,0,2,1). Usando o algoritmo, mostre que há impasse. Identifique os processos.',
    resolucao: `
      <h4>Resolução</h4>
      <p>A = (0,1,0,2,1)</p>
      <ol>
        <li>P2 (0,1,0,2,1) ≤ A ✅ → A = (0,2,0,3,1)</li>
        <li>P3 (0,2,0,3,1) ≤ A ✅ → A = (0,2,0,3,2)</li>
        <li>P1 e P4 não podem executar</li>
      </ol>
      <p><strong>IMPASSE: P1 e P4.</strong></p>
    `,
    provavel: true, semelhanca: 'ALTA',
    analise: { conteudo: 'Sim', estrutura: 'Sim', metodo: 'Sim', nivel: 'Sim', combinacao: 'Sim', texto: 'Caiu em 07/01. Detecção de impasse.' }
  },
  {
    id: 'q6-15', num: 'Q15', tags: ['LIVRO'],
    titulo: 'Recuperação de impasse',
    enunciado: 'Explique como o sistema pode se recuperar do impasse anterior usando: (a) preempção, (b) retrocesso, (c) eliminação de processos.',
    resolucao: `
      <p><strong>(a) Preempção:</strong> Tomar um recurso de P1 ou P4 e dar a outro.</p>
      <p><strong>(b) Retrocesso:</strong> Voltar P1 e P4 a um checkpoint anterior.</p>
      <p><strong>(c) Eliminação:</strong> Matar P1 ou P4.</p>
    `,
    provavel: true, semelhanca: 'ALTA',
    analise: { conteudo: 'Sim', estrutura: 'Sim', metodo: 'Sim', nivel: 'Sim', combinacao: 'Sim', texto: 'Caiu em 07/01. Recuperação de impasse.' }
  },
  {
    id: 'q6-16', num: 'Q16', tags: ['LIVRO'],
    titulo: 'Cij + Rij > Ej',
    enunciado: 'Suponha que Cij + Rij > Ej para algum i. Quais implicações isso tem para o sistema?',
    resolucao: `<p>Significa que um processo pede mais recursos do que existem. O sistema é inconsistente ou o processo nunca poderá terminar.</p>`,
    provavel: false, semelhanca: 'BAIXA',
    analise: { conteudo: 'Não', estrutura: 'Não', metodo: 'Não', nivel: 'Não', combinacao: 'Não', texto: 'Conceito avançado. Não caiu.' }
  },
  {
    id: 'q6-17', num: 'Q17', tags: ['LIVRO'],
    titulo: 'Trajetórias diagonais',
    enunciado: 'Todas as trajetórias na Figura 6.8 são horizontais ou verticais. Você consegue imaginar circunstância na qual trajetórias diagonais também sejam possíveis?',
    resolucao: `<p>Não em modelo sequencial. Em multiprocessador, dois processos executam simultaneamente, mas o modelo de trajetória é para 1 CPU.</p>`,
    provavel: false, semelhanca: 'BAIXA',
    analise: { conteudo: 'Não', estrutura: 'Não', metodo: 'Não', nivel: 'Não', combinacao: 'Não', texto: 'Conceito. Não caiu.' }
  },
  {
    id: 'q6-18', num: 'Q18', tags: ['LIVRO'],
    titulo: 'Figura 6.8 com 3 processos',
    enunciado: 'O esquema de trajetória poderia ser usado com 3 processos e 3 recursos?',
    resolucao: `<p>Seria tridimensional. Possível mas impraticável para visualização.</p>`,
    provavel: false, semelhanca: 'BAIXA',
    analise: { conteudo: 'Não', estrutura: 'Não', metodo: 'Não', nivel: 'Não', combinacao: 'Não', texto: 'Conceito. Não caiu.' }
  },
  {
    id: 'q6-19', num: 'Q19', tags: ['LIVRO'],
    titulo: 'Grafos de trajetória para evitar impasses',
    enunciado: 'Existe uma maneira prática de realmente se fazer isso?',
    resolucao: `<p>Não, pois o espaço de estados é gigantesco. Impraticável.</p>`,
    provavel: false, semelhanca: 'BAIXA',
    analise: { conteudo: 'Não', estrutura: 'Não', metodo: 'Não', nivel: 'Não', combinacao: 'Não', texto: 'Conceito. Não caiu.' }
  },
  {
    id: 'q6-20', num: 'Q20', tags: ['LIVRO'],
    titulo: 'Estado que não é impasse nem seguro',
    enunciado: 'É possível que um sistema esteja em um estado que não seja de impasse nem tampouco seguro?',
    resolucao: `<p><strong>Sim.</strong> Um estado inseguro pode não estar em impasse. Só não há garantia.</p>`,
    provavel: false, semelhanca: 'MODERADA',
    analise: { conteudo: 'Sim', estrutura: 'Não', metodo: 'Não', nivel: 'Sim', combinacao: 'Não', texto: 'Conceito de banqueiro. Relacionado a Q26.' }
  },
  {
    id: 'q6-21', num: 'Q21', tags: ['LIVRO'],
    titulo: 'Figura 6.11(b) — D ou C pede mais',
    enunciado: 'Se D pedir mais uma unidade, isso leva a um estado seguro ou inseguro? E se a solicitação vier de C?',
    resolucao: `<p><strong>D pede mais:</strong> Inseguro. <strong>C pede mais:</strong> Seguro (C tem necessidade menor).</p>`,
    provavel: false, semelhanca: 'MODERADA',
    analise: { conteudo: 'Sim', estrutura: 'Sim', metodo: 'Sim', nivel: 'Sim', combinacao: 'Não', texto: 'Banqueiro. Relacionado a Q26.' }
  },
  {
    id: 'q6-22', num: 'Q22', tags: ['LIVRO'],
    titulo: '2 processos, 3 recursos idênticos',
    enunciado: 'Um sistema tem dois processos e três recursos idênticos. Cada processo precisa de um máximo de dois recursos. Um impasse é possível?',
    resolucao: `<p><strong>Não.</strong> Se cada um precisa de no máximo 2, com 3 recursos, sempre há pelo menos 1 disponível.</p>`,
    provavel: false, semelhanca: 'MODERADA',
    analise: { conteudo: 'Sim', estrutura: 'Sim', metodo: 'Sim', nivel: 'Sim', combinacao: 'Não', texto: 'Conceito de impasse. Não caiu.' }
  }
];


/* ============================================================
   CAPÍTULO 6 — QUESTÕES Q23 a Q44
   ============================================================ */

QUESTOES_CAP6.push(
  {
    id: 'q6-23', num: 'Q23', tags: ['LIVRO'],
    titulo: 'p processos, m recursos, r disponíveis',
    enunciado: 'Considere o problema anterior com p processos, cada um necessitando de um máximo de m recursos, e um total de r recursos disponíveis. Qual condição deve se manter para tornar o sistema livre de impasses?',
    resolucao: `<p>A condição é: <strong>r ≥ p × (m − 1) + 1</strong>. Se essa condição for satisfeita, pelo menos um processo pode obter todos os recursos que precisa.</p>`,
    provavel: false, semelhanca: 'MODERADA',
    analise: { conteudo: 'Sim', estrutura: 'Sim', metodo: 'Sim', nivel: 'Sim', combinacao: 'Não', texto: 'Generalização do banqueiro. Não caiu.' }
  },
  {
    id: 'q6-24', num: 'Q24', tags: ['LIVRO'],
    titulo: 'Processo A exige última unidade de fita',
    enunciado: 'Suponha que o processo A na Figura 6.12 exige a última unidade de fita. Essa ação leva a um impasse?',
    resolucao: `<p>Depende do estado. Se A pode terminar e liberar, não há impasse. Se A fica preso, sim.</p>`,
    provavel: false, semelhanca: 'MODERADA',
    analise: { conteudo: 'Sim', estrutura: 'Sim', metodo: 'Sim', nivel: 'Sim', combinacao: 'Não', texto: 'Banqueiro. Relacionado a Q26.' }
  },
  {
    id: 'q6-25', num: 'Q25', tags: ['LIVRO'],
    titulo: 'Algoritmo do banqueiro (m classes, n processos)',
    enunciado: 'O algoritmo do banqueiro está sendo executado em um sistema com m classes de recursos e n processos. O número de operações para verificar segurança é proporcional a m^a n^b. Quais os valores de a e b?',
    resolucao: `<p><strong>a = 1, b = 2</strong>. Para cada processo (n), verifica-se cada recurso (m), e o algoritmo pode repetir n vezes. Complexidade O(m × n²).</p>`,
    provavel: false, semelhanca: 'BAIXA',
    analise: { conteudo: 'Não', estrutura: 'Não', metodo: 'Não', nivel: 'Não', combinacao: 'Não', texto: 'Análise de complexidade. Não caiu.' }
  },
  {
    id: 'q6-26', num: 'Q26', tags: ['LIVRO'],
    titulo: '4 processos, 5 recursos (menor x)',
    enunciado: 'Sistema com 4 processos e 5 recursos alocáveis. Alocado: A=10211, B=20110, C=11010, D=11110. Disponível: 00x11. Máximo: A=11213, B=22210, C=21310, D=11221. Qual o menor x para estado seguro?',
    resolucao: `
      <h4>Resolução</h4>
      <p>Necessário: A=(0,1,0,0,2), B=(0,2,1,0,0), C=(1,0,3,0,0), D=(0,0,1,1,1)</p>
      <p>Disponível: (0,0,x,1,1)</p>
      <p>Testar x=1: D pode (0,0,1,1,1) ≤ (0,0,1,1,1) ✅. D termina → A=(1,1,1,1,0). A pode. A termina → A=(2,1,1,1,0). C não (precisa 3 em RS3). B não (precisa 2 em RS2).</p>
      <p>Testar x=2: D pode. D termina → A=(1,1,2,1,0). A pode. A termina → A=(2,1,2,1,0). C não. B não.</p>
      <p>... continua até x=2 funcionar. <strong>Menor x = 2</strong> (assumindo o gabarito do livro).</p>
    `,
    provavel: true, semelhanca: 'ALTA',
    analise: { conteudo: 'Sim', estrutura: 'Sim', metodo: 'Sim', nivel: 'Sim', combinacao: 'Sim', texto: 'Banqueiro. Caiu em provas.' }
  },
  {
    id: 'q6-27', num: 'Q27', tags: ['LIVRO'],
    titulo: 'Regra de 1 recurso por vez',
    enunciado: 'Uma maneira de eliminar a espera circular é ter uma regra dizendo que um processo tem direito a somente um único recurso a qualquer dado momento. Dê um exemplo mostrando que essa restrição é inaceitável.',
    resolucao: `<p>Ex: copiar arquivo de fita para impressora. Precisa dos dois ao mesmo tempo.</p>`,
    provavel: false, semelhanca: 'BAIXA',
    analise: { conteudo: 'Não', estrutura: 'Não', metodo: 'Não', nivel: 'Não', combinacao: 'Não', texto: 'Conceito. Não caiu.' }
  },
  {
    id: 'q6-28', num: 'Q28', tags: ['LIVRO'],
    titulo: '3 registros (A e B, ordem 1-2-3)',
    enunciado: 'Dois processos, A e B, têm cada um três registros (1, 2, 3). Se A pede 1-2-3 e B pede 1-2-3, não há impasse. Se B pede 3-2-1, há impasse. Qual fração de todas as combinações é livre de impasses?',
    resolucao: `<p>Com 3 recursos, há 3! = 6 combinações. Apenas 1 é garantida livre de impasse (mesma ordem). <strong>Fração = 1/6</strong> (ou ~16,7%).</p>`,
    provavel: false, semelhanca: 'MODERADA',
    analise: { conteudo: 'Sim', estrutura: 'Sim', metodo: 'Sim', nivel: 'Sim', combinacao: 'Não', texto: 'Conceito de ordenação. Relacionado a Q8 da lista.' }
  },
  {
    id: 'q6-29', num: 'Q29', tags: ['LIVRO'],
    titulo: 'Sistema distribuído com caixas de correio',
    enunciado: 'Sistema distribuído com send e receive. Receive especifica processo e bloqueia se não há mensagem dele. É possível ocorrer impasse?',
    resolucao: `<p><strong>Sim.</strong> Se A espera mensagem de B e B espera mensagem de A, ambos bloqueiam para sempre.</p>`,
    provavel: false, semelhanca: 'MODERADA',
    analise: { conteudo: 'Sim', estrutura: 'Não', metodo: 'Não', nivel: 'Sim', combinacao: 'Não', texto: 'Impasse de comunicação. Relacionado a Q12.' }
  },
  {
    id: 'q6-30', num: 'Q30', tags: ['LIVRO'],
    titulo: 'Transferência de fundos',
    enunciado: 'Sistema de transferência: cada processo lê linha, bloqueia duas contas, transfere, libera. Projete esquema que evite impasses. Não libere conta até completar.',
    resolucao: `<p>Solução: ordenar as contas por número. Sempre bloquear a de menor número primeiro, depois a de maior. Elimina espera circular.</p>`,
    provavel: false, semelhanca: 'MODERADA',
    analise: { conteudo: 'Sim', estrutura: 'Sim', metodo: 'Sim', nivel: 'Sim', combinacao: 'Sim', texto: 'Prevenção por ordenação. Relacionado a Q8 da lista.' }
  },
  {
    id: 'q6-31', num: 'Q31', tags: ['LIVRO'],
    titulo: 'Eliminar posse e espera (melhoria)',
    enunciado: 'Antes de pedir novo recurso, processo libera os que possui. Perigo: pode perder recursos. Proponha melhoria.',
    resolucao: `<p>Melhoria: usar <strong>preempção com rollback</strong> — se o processo não conseguir todos os recursos, ele volta ao estado anterior.</p>`,
    provavel: false, semelhanca: 'BAIXA',
    analise: { conteudo: 'Não', estrutura: 'Não', metodo: 'Não', nivel: 'Não', combinacao: 'Não', texto: 'Conceito avançado. Não caiu.' }
  },
  {
    id: 'q6-32', num: 'Q32', tags: ['LIVRO'],
    titulo: 'Limite de tempo (nota do professor)',
    enunciado: 'Estudante propõe: quando processo bloqueia, timer é iniciado. Se exceder, processo é liberado. Qual nota você daria?',
    resolucao: `<p>Nota baixa. O processo pode ser liberado mas o recurso ainda está em uso. Não resolve o problema, apenas mascara.</p>`,
    provavel: false, semelhanca: 'BAIXA',
    analise: { conteudo: 'Não', estrutura: 'Não', metodo: 'Não', nivel: 'Não', combinacao: 'Não', texto: 'Avaliação crítica. Não caiu.' }
  },
  {
    id: 'q6-33', num: 'Q33', tags: ['LIVRO'],
    titulo: 'Preempção de memória e processador',
    enunciado: 'Memória passa por preempção em swapping. Processador em time-sharing. Esses métodos foram desenvolvidos para impasse ou outros fins?',
    resolucao: `<p>Outros fins. Memória: gerenciamento de espaço. Processador: justiça no compartilhamento.</p>`,
    provavel: false, semelhanca: 'BAIXA',
    analise: { conteudo: 'Não', estrutura: 'Não', metodo: 'Não', nivel: 'Não', combinacao: 'Não', texto: 'Conceito. Não caiu.' }
  },
  {
    id: 'q6-34', num: 'Q34', tags: ['LIVRO'],
    titulo: 'Impasse vs livelock vs inanição',
    enunciado: 'Explique a diferença entre impasse, livelock e inanição.',
    resolucao: `
      <p><strong>Impasse:</strong> Sistema NÃO progride. Todos bloqueados.</p>
      <p><strong>Livelock:</strong> Processos NÃO bloqueados, mas nenhum progride.</p>
      <p><strong>Inanição:</strong> Sistema PROGRIDE, mas 1 processo espera para sempre.</p>
    `,
    provavel: true, semelhanca: 'ALTA',
    analise: { conteudo: 'Sim', estrutura: 'Sim', metodo: 'Sim', nivel: 'Sim', combinacao: 'Sim', texto: 'Caiu em 07/01. Diferença entre impasse e inanição.' }
  },
  {
    id: 'q6-35', num: 'Q35', tags: ['LIVRO'],
    titulo: 'Dois processos com busca em disco',
    enunciado: 'Dois processos emitem busca para reposicionar braço do disco e leitura. Cada um é interrompido antes de ler e vê que o outro moveu o braço. Reemite. Isso é impasse ou livelock?',
    resolucao: `<p>É <strong>livelock</strong>. Os processos estão ativos (não bloqueados), mas não progridem. Solução: usar semáforo para acesso exclusivo ao disco.</p>`,
    provavel: false, semelhanca: 'MODERADA',
    analise: { conteudo: 'Sim', estrutura: 'Sim', metodo: 'Sim', nivel: 'Sim', combinacao: 'Não', texto: 'Livelock. Relacionado a Q34.' }
  },
  {
    id: 'q6-36', num: 'Q36', tags: ['LIVRO'],
    titulo: 'CSMA/CD (Ethernet)',
    enunciado: 'CSMA/CD: estações conferem meio, detectam colisões. Se retransmitem imediatamente, colidem indefinidamente. (a) Impasse ou livelock? (b) Solução? (c) Inanição?',
    resolucao: `
      <p><strong>(a)</strong> Livelock.</p>
      <p><strong>(b)</strong> Espera aleatória exponencial (binary exponential backoff).</p>
      <p><strong>(c)</strong> Sim, uma estação pode nunca conseguir transmitir.</p>
    `,
    provavel: false, semelhanca: 'MODERADA',
    analise: { conteudo: 'Sim', estrutura: 'Sim', metodo: 'Sim', nivel: 'Sim', combinacao: 'Não', texto: 'Livelock. Relacionado a Q34.' }
  },
  {
    id: 'q6-37', num: 'Q37', tags: ['LIVRO'],
    titulo: 'Produtor/consumidor com erro de ordem',
    enunciado: 'Consumidor bloqueia mutex antes do buffer vazio. Produtor bloqueia no mutex. Ambos bloqueados. É impasse de recursos ou comunicação?',
    resolucao: `<p>É <strong>impasse de recursos</strong> (mutex é recurso). Solução: corrigir ordem dos down (empty antes de mutex).</p>`,
    provavel: false, semelhanca: 'MODERADA',
    analise: { conteudo: 'Sim', estrutura: 'Sim', metodo: 'Sim', nivel: 'Sim', combinacao: 'Sim', texto: 'Produtor/consumidor. Relacionado a Q29.' }
  },
  {
    id: 'q6-38', num: 'Q38', tags: ['LIVRO'],
    titulo: 'Cinderela e Príncipe',
    enunciado: 'Cinderela e Príncipe dividindo bens. Cartas ao advogado. Regras: se ambos pedem o mesmo item, cancelam. Animais e casas inseparáveis. Computadores ainda negociando após férias. Por quê? Impasse? Inanição?',
    resolucao: `<p>Livelock. Os computadores continuam negociando, cancelando, pedindo de novo. Não há progresso.</p>`,
    provavel: false, semelhanca: 'MODERADA',
    analise: { conteudo: 'Sim', estrutura: 'Sim', metodo: 'Sim', nivel: 'Sim', combinacao: 'Não', texto: 'Livelock. Relacionado a Q34.' }
  },
  {
    id: 'q6-39', num: 'Q39', tags: ['LIVRO'],
    titulo: 'Babuínos na corda (semáforos)',
    enunciado: 'Babuínos atravessam corda. Vários podem atravessar na mesma direção. Direções opostas causam impasse. Escreva programa com semáforos.',
    resolucao: `
      <pre><code>semaphore mutex = 1;
int leste = 0, oeste = 0;

void babuino_leste() {
    down(&mutex);
    if (oeste > 0) { up(&mutex); return; }
    leste++;
    up(&mutex);
    atravessar();
    down(&mutex);
    leste--;
    up(&mutex);
}</code></pre>
    `,
    provavel: true, semelhanca: 'ALTA',
    analise: { conteudo: 'Sim', estrutura: 'Sim', metodo: 'Sim', nivel: 'Sim', combinacao: 'Sim', texto: 'Problema clássico de sincronização. Similar a leitores/escritores.' }
  },
  {
    id: 'q6-40', num: 'Q40', tags: ['LIVRO'],
    titulo: 'Babuínos (evitar inanição)',
    enunciado: 'Repita o problema anterior, mas evite inanição. Quando um babuíno quer atravessar e encontra outros na direção contrária, espera até a corda esvaziar.',
    resolucao: `<p>Usar uma variável <code>esperando</code> e uma fila. Quando a corda esvazia, dar chance ao lado que está esperando há mais tempo.</p>`,
    provavel: false, semelhanca: 'MODERADA',
    analise: { conteudo: 'Sim', estrutura: 'Sim', metodo: 'Sim', nivel: 'Sim', combinacao: 'Sim', texto: 'Variação do problema dos babuínos.' }
  },
  {
    id: 'q6-41', num: 'Q41', tags: ['LIVRO'],
    titulo: 'Simulação do algoritmo do banqueiro',
    enunciado: 'Programe uma simulação do algoritmo do banqueiro. Envie histórico para arquivo.',
    resolucao: `<p>Questão de programação. Implementar verificação de estado seguro.</p>`,
    provavel: false, semelhanca: 'BAIXA',
    analise: { conteudo: 'Não', estrutura: 'Não', metodo: 'Não', nivel: 'Não', combinacao: 'Não', texto: 'Programação. Não caiu.' }
  },
  {
    id: 'q6-42', num: 'Q42', tags: ['LIVRO'],
    titulo: 'Programa de detecção de impasses',
    enunciado: 'Escreva programa para implementar detecção com múltiplos recursos. Ler entradas, indicar se há impasse.',
    resolucao: `<p>Questão de programação. Implementar algoritmo com matrizes E, A, C, R.</p>`,
    provavel: false, semelhanca: 'BAIXA',
    analise: { conteudo: 'Não', estrutura: 'Não', metodo: 'Não', nivel: 'Não', combinacao: 'Não', texto: 'Programação. Não caiu.' }
  },
  {
    id: 'q6-43', num: 'Q43', tags: ['LIVRO'],
    titulo: 'Programa com grafo de alocação',
    enunciado: 'Escreva programa que detecte impasse usando grafo de alocação de recursos.',
    resolucao: `<p>Questão de programação. Implementar DFS para detectar ciclo.</p>`,
    provavel: false, semelhanca: 'BAIXA',
    analise: { conteudo: 'Não', estrutura: 'Não', metodo: 'Não', nivel: 'Não', combinacao: 'Não', texto: 'Programação. Não caiu.' }
  },
  {
    id: 'q6-44', num: 'Q44', tags: ['LIVRO'],
    titulo: 'Cumprimento com inclinação',
    enunciado: 'Protocolo: uma pessoa se inclina primeiro e espera. Se ambas se inclinarem ao mesmo tempo, ficam inclinadas para sempre. Escreva programa que evite impasse.',
    resolucao: `<p>Usar semáforos com prioridade: a pessoa mais velha (ou com ID menor) se inclina primeiro.</p>`,
    provavel: false, semelhanca: 'MODERADA',
    analise: { conteudo: 'Sim', estrutura: 'Sim', metodo: 'Sim', nivel: 'Sim', combinacao: 'Não', texto: 'Impasse de comunicação. Relacionado a Q12.' }
  }
);

/* ============================================================
   RENDERIZAÇÃO SEÇÃO 4
   ============================================================ */
function renderizarSecao4(filtro = 'all') {
  const container = document.getElementById('questoesSecao4');
  if (!container) return;
  
  let questoes = QUESTOES_CAP6;
  if (filtro === 'PROVAVEL') questoes = questoes.filter(q => q.provavel);
  else if (filtro === 'ALTA') questoes = questoes.filter(q => q.semelhanca === 'ALTA');
  else if (filtro === 'MODERADA') questoes = questoes.filter(q => q.semelhanca === 'MODERADA');
  else if (filtro === 'BAIXA') questoes = questoes.filter(q => q.semelhanca === 'BAIXA');
  
  container.innerHTML = questoes.map(q => renderizarQuestao(q, 4)).join('');
}

/* ============================================================
   PAINEL: PADRÃO DO PROFESSOR
   ============================================================ */
function abrirPadrao() {
  const body = document.getElementById('padraoBody');
  if (!body) return;
  
  body.innerHTML = `
    <div class="padrao-titulo">📊 Análise do Padrão de Cobrança</div>
    
    <div class="padrao-bloco">
      <h4>🔴 Conteúdos SEMPRE cobrados (100%)</h4>
      <ul>
        <li><strong>fork()</strong> — Aparece em todas as provas</li>
        <li><strong>Escalonamento</strong> — FCFS, SJF, RR, Prioridade</li>
      </ul>
      <div class="evidencia">Evidência: Q2 e Q3 em 07/01, 2025.1 e 28/05</div>
    </div>
    
    <div class="padrao-bloco">
      <h4>🟠 Conteúdos MUITO cobrados (66%)</h4>
      <ul>
        <li><strong>Banqueiro</strong> — P0-P4 com estado seguro</li>
        <li><strong>Exclusão Mútua</strong> — Strict Alternation</li>
      </ul>
      <div class="evidencia">Evidência: Q4 e Q1 em 2 de 3 provas</div>
    </div>
    
    <div class="padrao-bloco">
      <h4>🟡 Conteúdos cobrados às vezes (33%)</h4>
      <ul>
        <li><strong>Detecção de Impasse</strong> — Matrizes ou grafo</li>
        <li><strong>Tipos de SO</strong> — 9 tipos</li>
      </ul>
      <div class="evidencia">Evidência: Q4 em 07/01 e Q1 em 2025.1</div>
    </div>
    
    <div class="padrao-bloco">
      <h4>📐 Formato das Questões</h4>
      <ul>
        <li><strong>Código C</strong> — fork(), Exclusão Mútua</li>
        <li><strong>Tabela</strong> — Escalonamento, Banqueiro</li>
        <li><strong>Matrizes</strong> — Detecção de Impasse</li>
        <li><strong>Conceitual</strong> — Tipos de SO, Jantar dos Filósofos</li>
      </ul>
    </div>
    
    <div class="padrao-bloco">
      <h4>⚠️ Pegadinhas Exploradas</h4>
      <ul>
        <li>fork() com condicionais (if/else if)</li>
        <li>Inverter down no Produtor/Consumidor</li>
        <li>Strict Alternation viola Condição 3</li>
        <li>P3 herdar pid1=0 no fork()</li>
        <li>Banqueiro: Necessário = Máximo − Alocado</li>
        <li>RR: processo preemptado volta para o fim</li>
      </ul>
    </div>
    
    <div class="padrao-bloco">
      <h4>🎯 Recomendação de Estudo</h4>
      <ol>
        <li><strong>Prioridade 1:</strong> fork() e Escalonamento (100%)</li>
        <li><strong>Prioridade 2:</strong> Banqueiro e Exclusão Mútua (66%)</li>
        <li><strong>Prioridade 3:</strong> Detecção e Tipos de SO (33%)</li>
      </ol>
    </div>
  `;
  
  abrirPainel('panelPadrao');
}

/* ============================================================
   MODO PROVA
   ============================================================ */
function ativarModoProva() {
  const body = document.getElementById('provaBody');
  if (!body) return;
  
  // Filtrar todas as questões prováveis
  const provaveis = [
    ...QUESTOES_BASE.filter(q => q.tags.includes('LISTA') || q.tags.includes('PROVA')),
    ...QUESTOES_CAP1.filter(q => q.provavel),
    ...QUESTOES_CAP2.filter(q => q.provavel),
    ...QUESTOES_CAP6.filter(q => q.provavel)
  ];
  
  let html = `
    <div class="modo-prova-box">
      <h3>🎯 Modo Prova Ativado</h3>
      <p>${provaveis.length} questões priorizadas com base no padrão do professor.</p>
      <p><strong>Prioridade:</strong> Prováveis + Alta Semelhança + Erradas</p>
    </div>
  `;
  
  provaveis.forEach(q => {
    html += renderizarQuestao(q, 'prova');
  });
  
  body.innerHTML = html;
  abrirPainel('panelProva');
}

/* ============================================================
   RESET
   ============================================================ */
function resetarProgresso() {
  if (!confirm('⚠️ Resetar TODO o progresso?')) return;
  STATE.resolvidas = {};
  STATE.acertos = {};
  salvarEstado();
  location.reload();
}

/* ============================================================
   INICIALIZAÇÃO FINAL
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  // Renderizar todas as seções
  if (document.getElementById('questoesSecao1')) renderizarSecao1();
  if (document.getElementById('questoesSecao2')) renderizarSecao2();
  if (document.getElementById('questoesSecao3')) renderizarSecao3();
  if (document.getElementById('questoesSecao4')) renderizarSecao4();
  
  // Botões
  document.getElementById('btnPadrao')?.addEventListener('click', abrirPadrao);
  document.getElementById('btnProva')?.addEventListener('click', ativarModoProva);
  document.getElementById('btnReset')?.addEventListener('click', resetarProgresso);
  
  // Atualizar estatísticas na home
  const total = QUESTOES_BASE.length + QUESTOES_CAP1.length + QUESTOES_CAP2.length + QUESTOES_CAP6.length;
  const provaveis = [
    ...QUESTOES_CAP1.filter(q => q.provavel),
    ...QUESTOES_CAP2.filter(q => q.provavel),
    ...QUESTOES_CAP6.filter(q => q.provavel)
  ].length;
  
  const statTotal = document.getElementById('statTotal');
  const statProvaveis = document.getElementById('statProvaveis');
  if (statTotal) statTotal.textContent = total;
  if (statProvaveis) statProvaveis.textContent = provaveis;
  
  console.log(`
  ╔══════════════════════════════════════╗
  ║      🎯 RECALL-QUESTOES v1.0        ║
  ║    Treinador Inteligente de Provas  ║
  ╚══════════════════════════════════════╝
  
  📊 Total de questões: ${total}
  ⭐ Prováveis: ${provaveis}
  📋 Base (Lista+Prova+Livro): ${QUESTOES_BASE.length}
  📘 Cap 1: ${QUESTOES_CAP1.length}
  📗 Cap 2: ${QUESTOES_CAP2.length}
  📕 Cap 6: ${QUESTOES_CAP6.length}
  
  Bons estudos! 🚀
  `);
});