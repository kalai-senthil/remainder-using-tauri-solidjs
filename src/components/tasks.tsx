import { createSignal, onMount, useContext } from "solid-js";
import { Store } from "tauri-plugin-store-api";
import { AppContext } from "../App";
import { Tasks_T } from "../../typings";
function Tasks() {
  const store = useContext(AppContext);
  const [tasks, setTasks] = createSignal<Tasks_T[]>([]);

  onMount(() => {
    store?.values().then((_tasks) => {
      setTasks(_tasks as Tasks_T[]);
    });
  });
  async function saveTodo(task: string) {
    const newTask = {
      task,
      finished: false,
      time: new Date(),
    };
    await store?.set(`${tasks.length + 1}`, newTask);
    await store?.save();
    setTasks((prev) => {
      return [newTask, ...prev];
    });
  }
  return (
    <div class="flex-grow">
      <div class="flex gap-x-2">
        <h2 class="text-2xl font-semibold">Tasks</h2>
        <input
          onkeyup={(key) => {
            if (key.key === "Enter") {
              saveTodo(key.currentTarget.value);
              key.currentTarget.value = "";
            }
          }}
          type="text"
          placeholder="Type your todo"
          class="rounded-md text-black pl-2 flex-grow bg-white"
        />
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mt-5">
        {tasks().map((task) => (
          <p class="bg-white text-black rounded-md p-2 grow">{task.task}</p>
        ))}
      </div>
    </div>
  );
}

export default Tasks;
