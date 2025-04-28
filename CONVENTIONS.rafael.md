# Aider Conventions

Este documento define as regras globais para o comportamento do aider, garantindo confiabilidade, previsibilidade e qualidade nas operações de criação e edição de projetos.

## Comportamento Geral

- **Verificação Rigorosa**: Manter modo de verificação constante para prevenir alucinações
- **Compatibilidade Retroativa**: Sempre preservar compatibilidade com versões anteriores
- **Limiar de Confiança**: Exigir nível mínimo de confiança (0.85) para executar operações críticas

## Gerenciamento de Código

- **Validação de Sintaxe**: Verificar sintaxe antes de qualquer modificação
- **Preservação**: Manter documentação, comentários e estrutura de arquivos existentes
- **Consistência de Estilo**: Seguir padrões de codificação do projeto
- **Anti-redundância**: Evitar criação de código redundante
- **Limitação de Alterações**: Restringir mudanças a 500 linhas por operação para facilitar revisão

## Arquitetura e Organização

- **Componentização Obrigatória**: Trabalhar sempre com componentes reutilizáveis em sistemas web
- **Evitar Páginas Monolíticas**: Não editar ou criar páginas completas; sempre dividir em componentes menores
- **Separação de Responsabilidades**: Garantir que cada componente tenha uma única responsabilidade bem definida
- **Estrutura Hierárquica**: Organizar componentes em hierarquia clara com interfaces bem definidas

## Compatibilidade Tecnológica

### Front-End
- React (preferir última versão estável)
- Next.js (preferir última versão estável)
- TypeScript (preferir última versão estável)
- ShadCN (preferir última versão estável)
- HTML
- CSS

### Princípios de Tecnologia
- **Preferência por Open Source**: Priorizar sempre tecnologias de código aberto
- **Atualização Contínua**: Usar versões mais recentes estáveis de cada tecnologia
- **Padrões Abertos**: Preferir padrões abertos e bem documentados
- **Portabilidade**: Garantir que aplicações sejam portáveis entre ambientes

## Desempenho

- **Análise de Desempenho**: Detectar potenciais problemas
- **Otimização**: Otimizar código gerado para eficiência
- **Prevenção de Vazamentos**: Evitar operações que possam causar vazamento de memória
- **Análise de Complexidade**: Monitorar complexidade ciclomática
- **Limitação de Aninhamento**: Restringir profundidade máxima de aninhamento a 4 níveis

## Edição e Geração

- **Edição Incremental**: Usar abordagem incremental para edições grandes
- **Preservação de Formatação**: Manter formatação de código existente
- **Detecção de Mudanças em API**: Alertar sobre alterações em APIs públicas
- **Consistência de Indentação**: Manter espaçamento e indentação uniformes

## Ajustes para IA

- **Limitação Especulativa**: Restringir geração especulativa para evitar alucinações
- **Conhecimento de Domínio**: Usar conhecimento específico quando disponível
- **Adaptação de Estilo**: Adaptar ao estilo de código existente
- **Validação por Exemplos**: Validar geração contra exemplos do projeto
- **Simplicidade**: Preferir soluções mais simples e diretas
- **Equilíbrio**: Balancear otimização vs. legibilidade (0.7 favorecendo legibilidade)