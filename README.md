# タスク管理システム - フローチャート
---

## フローチャート

```mermaid
graph TD
  Start[スタート] --> Input[フロントエンド入力処理]
  Input -->|タスクの追加| AddTask[タスク追加処理]
  Input -->|タスク一覧の取得| GetTasks[タスク取得処理]
  Input -->|タスクの削除| DeleteTask[タスク削除処理]

  AddTask --> ServerAddTask[バックエンド: タスクを追加]
  ServerAddTask --> UpdateTasks[タスクリストを更新]
  UpdateTasks --> ReturnAddResult[追加結果を返す]
  ReturnAddResult --> DisplayAddResult[フロントエンド: 結果を表示]

  GetTasks --> ServerGetTasks[バックエンド: タスクを取得]
  ServerGetTasks --> ReturnTaskList[タスクリストを返す]
  ReturnTaskList --> DisplayTaskList[フロントエンド: タスクを表示]

  DeleteTask --> ServerDeleteTask[バックエンド: タスクを削除]
  ServerDeleteTask --> UpdateTasksAfterDelete[タスクリストを更新]
  UpdateTasksAfterDelete --> ReturnDeleteResult[削除結果を返す]
  ReturnDeleteResult --> DisplayDeleteResult[フロントエンド: 結果を表示]

  DisplayAddResult --> End[終了]
  DisplayTaskList --> End
  DisplayDeleteResult --> End
  ```
