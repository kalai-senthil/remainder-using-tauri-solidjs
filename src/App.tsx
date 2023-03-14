import { createContext, createSignal } from "solid-js";
import { Store } from "tauri-plugin-store-api";
import {
  isPermissionGranted,
  requestPermission,
} from "@tauri-apps/api/notification";
import { getQuote, loadImg } from "./api/main";
import { Quote } from "../typings";
import Timer from "./components/timer";
import Tasks from "./components/tasks";
const store = new Store("tasks");
export const AppContext = createContext<Store>();
function App() {
  const [imgUrl, setImgUrl] = createSignal(
    "https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8bmF0dXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60"
  );
  const [quote, setQuote] = createSignal<Quote>();
  Promise.all([loadImg(), getQuote()]).then(([url, _quote]) => {
    setImgUrl(url);
    setQuote(_quote);
  });
  isPermissionGranted().then(async (isGranted) => {
    if (isGranted) {
      await requestPermission();
    }
  });
  return (
    <AppContext.Provider value={store}>
      <div class="flex selection:none justify-center items-center">
        <div class="absolute bottom-0">
          <div class="absolute w-screen bottom-0 h-2/3 z-5 bg-gradient-to-t from-black to-transparent"></div>
          <img
            src={imgUrl()}
            class="w-screen h-screen bg-cover"
            alt="background-pic"
          />
        </div>
        <div class="absolute w-screen text-white flex flex-col justify-between h-3/4 bottom-0 mb-24 px-10">
          <Timer />
          <Tasks />
          {quote() && (
            <div class="transition-all text-center">
              <h3 class="font-bold text-2xl">{quote()?.content}</h3>
              <p>{quote()?.author}</p>
            </div>
          )}
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
