### Instalar:
https://github.com/Aider-AI/aider

### Clonar:
https://github.com/marcelomf/frontend-boilerplate

### Ir para a branch nextjs com:
```bash
git checkout nextjs
```

### Começar uma nova branch para testar modelos/prompts específicos:
```bash
git checkout -b appv1
```

### Criar conta na https://openrouter.ai/ ter uma key para integração com o aider

### Melhores combinações(em ordem de melhor para pior):

- PAGO: aider --yes-always --read CONVENTIONS.md --read package.json --model anthropic/claude-3-5-sonnet-20240620 --editor-model anthropic/claude-3-5-sonnet-20240620 --api-key anthropic=ANTHROPIC_KEY --no-show-model-warnings --auto-accept-architect --watch-files --no-dry-run --no-browser --architect
- PAGO: aider --yes-always --read CONVENTIONS.md --read package.json --model anthropic/claude-3-haiku-20240307 --editor-model anthropic/claude-3-haiku-20240307 --api-key anthropic=ANTHROPIC_KEY --no-show-model-warnings --auto-accept-architect --watch-files --no-dry-run --no-browser --architect
- FREE: aider --yes-always --read CONVENTIONS.md --read package.json --model openrouter/google/gemini-2.0-flash-exp:free --editor-model openrouter/deepseek/deepseek-chat-v3-0324:free --api-key openrouter=OPENROUTER_KEY --no-show-model-warnings --auto-accept-architect --watch-files --no-dry-run --no-browser --architect

### Arquivos importantes:
#### [CONVENTIONS.md]
#### [INSTRUCTIONS.md]

Já testei praticamente todos os modelos free da openrouter.ai(llama, qwen, mistral, versões do deepseek e etc). De longe, o melhor foi: --model openrouter/google/gemini-2.0-flash-exp:free --editor-model openrouter/deepseek/deepseek-chat-v3-0324:free

Acredito que agora para melhorar tem que ser por prompt mesmo.

Decidir como adicionar novos módulos/campos no sistema. Usar o gerador de código ou a IA ?

Gerador: vantagem de ter backend e frontend integrados e sincronizados com os mesmos módulos/campos. A desvantagem é que ele sobreescreve alterações manuais dos usuários… pq ele gera de novo o código! É possível ter uma lógica para não sobrescrever módulos/campos que o usuário editou, o problema disso é que corre o risco de ter inconsistências entre frontend/backend, mas talvez seja a melhor saída.
IA: É muito complicado manter backend e frontend sincronizados. Necessidade de vários prompts. Não vejo muita vantagem.