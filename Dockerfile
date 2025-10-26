FROM node:22-slim

RUN apt-get update && \
    apt-get install -y git curl sudo bash python3 && \
    rm -rf /var/lib/apt/lists/*

# 作業ディレクトリの所有者とグループを変更
WORKDIR /workspace
RUN chown node:node /workspace

# nodeユーザーがパスワードなしでsudoを使えるように設定
# /etc/sudoers.d/nodeファイルを作成し、NOPASSWD: ALL を設定
RUN echo "node ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/node && \
    chmod 0440 /etc/sudoers.d/node

# ユーザー変更（イメージの中の既存ユーザー）
USER node

RUN mkdir -p node_modules && chown -R node:node node_modules

# Python uvをnodeユーザーでインストール（Serena MCP用）
RUN curl -LsSf https://astral.sh/uv/install.sh | sh

# nodeユーザーのPATHにuvを追加
ENV PATH="/home/node/.local/bin:$PATH"

# Gemini CLIをグローバルインストール
USER root
RUN npm install -g @google/gemini-cli
# 元のnodeユーザーに戻す
USER node

RUN mkdir -p $HOME/.claude $HOME/.gemini && chown -R node:node $HOME/.claude $HOME/.gemini
