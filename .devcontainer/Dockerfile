# Dockerfile de Desenvolvimento - DevContainer
# Ambiente completo para desenvolvimento com Git e ferramentas

FROM node:20-bullseye

# Evitar prompts durante instalação de pacotes
ENV DEBIAN_FRONTEND=noninteractive

# Atualizar sistema e instalar ferramentas essenciais
RUN apt-get update && apt-get install -y \
    git \
    curl \
    wget \
    vim \
    nano \
    zsh \
    ca-certificates \
    gnupg \
    lsb-release \
    openssh-client \
    sudo \
    && rm -rf /var/lib/apt/lists/*

# Instalar GitHub CLI
RUN curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg \
    && chmod go+r /usr/share/keyrings/githubcli-archive-keyring.gpg \
    && echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | tee /etc/apt/sources.list.d/github-cli.list > /dev/null \
    && apt-get update \
    && apt-get install -y gh \
    && rm -rf /var/lib/apt/lists/*

# Criar usuário não-root para desenvolvimento
ARG USERNAME=node
ARG USER_UID=1000
ARG USER_GID=$USER_UID

# Configurar usuário node que já existe na imagem base
RUN groupmod --gid $USER_GID $USERNAME \
    && usermod --uid $USER_UID --gid $USER_GID $USERNAME \
    && chown -R $USER_UID:$USER_GID /home/$USERNAME \
    && echo "$USERNAME ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME

# Instalar Oh My Zsh para o usuário node
USER $USERNAME
RUN sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended \
    && echo 'export PATH=$PATH:/usr/local/bin' >> /home/$USERNAME/.zshrc

# Voltar para root para configurações finais
USER root

# Definir diretório de trabalho
WORKDIR /workspace

# Configurar permissões do workspace
RUN chown -R $USERNAME:$USERNAME /workspace

# Voltar para usuário não-root
USER $USERNAME

# Configurar Git (valores padrão, podem ser sobrescritos)
RUN git config --global init.defaultBranch main \
    && git config --global core.autocrlf input \
    && git config --global pull.rebase false

# Definir shell padrão como zsh
ENV SHELL=/bin/zsh

# Manter container rodando
CMD ["sleep", "infinity"]
