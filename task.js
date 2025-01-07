"use strict";

const express = require("express");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public"))); // `public`フォルダを静的ファイルとして提供

// タスク管理データ
let tasks = [];

// タスク件数を返す
app.post("/check", (req, res) => {
  res.json({ number: tasks.length });
});

// タスクを取得
app.post("/read", (req, res) => {
  const start = Number(req.body.start || 0);
  if (start === 0) res.json({ tasks });
  else res.json({ tasks: tasks.slice(start) });
});

// タスクを追加
app.post("/post", (req, res) => {
  const { name, description } = req.body;
  console.log("受信したデータ:", req.body); // デバッグ用
  tasks.push({ id: tasks.length + 1, name, description, completed: false });
  console.log("現在のタスク一覧:", tasks); // デバッグ用
  res.json({ number: tasks.length });
});

// 特定のタスクを削除
app.delete("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const taskIndex = tasks.findIndex((t) => t.id === id);
  if (taskIndex !== -1) {
    const deletedTask = tasks.splice(taskIndex, 1);
    res.json({ task: deletedTask });
  } else {
    res.status(404).json({ error: "タスクが見つかりません" });
  }
});

// サーバーを起動
app.listen(8080, () => console.log("Example app listening on port 8080!"));
