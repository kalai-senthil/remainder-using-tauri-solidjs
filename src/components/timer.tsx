import { createEffect, createSignal } from "solid-js";
import { sendNotification } from "@tauri-apps/api/notification";
function Timer() {
  const [time, setTime] = createSignal<Date>(new Date());
  const [prevTime, setPrevTime] = createSignal<Date>(new Date());
  const [alarmShowed, setAlarmShowed] = createSignal<boolean>(true);
  setInterval(() => {
    setTime((prev) => {
      const newDate = prev;
      newDate.setMinutes(prev.getMinutes() + 1);
      if (newDate.getMinutes() - prevTime().getMinutes() >= 15) {
        setAlarmShowed(true);
      }
      return newDate;
    });
  }, 1000 * 60);
  createEffect(() => {
    if (alarmShowed()) {
      sendNotification({ title: "Hey!!💕💕", body: "Man, Drink Water" });
      setAlarmShowed(false);
    }
  }, alarmShowed);
  return (
    <div class="flex justify-center items-center">
      <div class="text-9xl font-bold">
        {time().getHours() % 12}:{time().getMinutes()}
      </div>
    </div>
  );
}

export default Timer;
