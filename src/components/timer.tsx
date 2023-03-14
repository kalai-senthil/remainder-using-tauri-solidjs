import { createEffect, createSignal } from "solid-js";
import { sendNotification } from "@tauri-apps/api/notification";
function Timer() {
  const [time, setTime] = createSignal<Date>(new Date());
  const [prevTime, setPrevTime] = createSignal<Date>(new Date());
  const [alarmShowed, setAlarmShowed] = createSignal<boolean>(true);
  setInterval(() => {
    setTime((prev) => {
      const newDate = new Date(prev.getTime());
      newDate.setSeconds(prev.getSeconds() + 1);
      if (newDate.getMinutes() - prevTime().getMinutes() >= 15) {
        setPrevTime(newDate);
        setAlarmShowed(true);
      }
      return newDate;
    });
  }, 1000);
  createEffect(() => {
    if (alarmShowed()) {
      sendNotification({ title: "Hey!!💕💕", body: "Man, Drink Water" });
      setAlarmShowed(false);
    }
  }, alarmShowed);
  return (
    <div class="flex justify-center items-center">
      <div class="text-9xl font-bold">{time().toLocaleTimeString()}</div>
    </div>
  );
}

export default Timer;
