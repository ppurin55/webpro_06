"use strict";

let taskCount = 0; // タスクの件数を追跡
const taskList = document.querySelector('#taskList');

// タスク一覧を取得
document.querySelector('#getTasks').addEventListener('click', () => {
    const params = {
        method: "POST",
        body: '',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    const url = "/read";
    fetch(url, params)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error');
            }
            return response.json();
        })
        .then(response => {
            console.log("取得したタスク一覧:", response.tasks); // デバッグ用
            displayTasks(response.tasks);
        })
        .catch(error => console.error(error));
});

// タスクを追加
document.querySelector('#taskForm').addEventListener('submit', event => {
    event.preventDefault();
    const taskName = document.querySelector('#taskName').value;
    const taskDescription = document.querySelector('#taskDescription').value;

    const params = {
        method: "POST",
        body: `name=${encodeURIComponent(taskName)}&description=${encodeURIComponent(taskDescription)}`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    const url = "/post";
    fetch(url, params)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error');
            }
            return response.json();
        })
        .then(response => {
            alert(`タスクが追加されました。現在のタスク数: ${response.number}`);
            document.querySelector('#taskForm').reset(); // フォームをリセット
        })
        .catch(error => console.error(error));
});

// 特定のタスクを削除
document.querySelector('#deleteTask').addEventListener('click', () => {
    const taskId = document.querySelector('#taskId').value;

    const url = `/tasks/${taskId}`;
    fetch(url, {
        method: "DELETE"
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error');
            }
            return response.json();
        })
        .then(response => {
            alert(`タスクID ${taskId} が削除されました。`);
        })
        .catch(error => console.error(error));
});

// タスク一覧を画面に表示
function displayTasks(tasks) {
    taskList.innerHTML = ''; // 初期化
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = `ID: ${task.id}, タスク名: ${task.name}, 内容: ${task.description}`;
        taskList.appendChild(li);
    });
}
