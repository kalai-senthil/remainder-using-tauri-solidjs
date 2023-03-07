import { createSignal } from "solid-js";
import { invoke } from "@tauri-apps/api/tauri";
import {
  isPermissionGranted,
  requestPermission,
} from "@tauri-apps/api/notification";
import { getQuote, loadImg } from "./api/main";
import { Quote } from "../typings";
import Timer from "./components/timer";

function App() {
  const [imgUrl, setImgUrl] = createSignal("");
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
    <div class="flex selection:none justify-center items-center">
      <div class="absolute bottom-0">
        <div class="absolute w-screen bottom-0 h-2/3 z-5 bg-gradient-to-t from-black to-transparent"></div>
        <img
          src={imgUrl()}
          class="w-screen h-screen bg-cover"
          alt="background-pic"
        />
      </div>
      <div class="absolute text-white flex flex-col justify-between h-3/4 bottom-0 mb-24 px-10">
        <Timer />
        {quote() && (
          <div class="transition-all text-center">
            <h3 class="font-bold text-2xl">{quote()?.content}</h3>
            <p>{quote()?.author}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
