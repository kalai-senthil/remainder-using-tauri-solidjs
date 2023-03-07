import { Quote } from "../../typings";

export async function loadImg(): Promise<string> {
  try {
    const req = await fetch(
      `https://api.unsplash.com/search/photos?query=nature&client_id=IXlYs_BHmxLVizUWD58ul4MWU1-jWJx05td9nwZROzg`
    );
    const data = (await req.json())["results"];
    if (req.ok) {
      const randomIndex = Math.ceil(Math.random() * data.length);
      return data[randomIndex]["urls"]["regular"];
    }
    return data[0]["urls"]["regular"];
  } catch (e) {
    return "https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8bmF0dXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60";
  }
}
export async function getQuote(): Promise<Quote> {
  try {
    const req = await fetch("https://api.quotable.io/random");
    if (req.ok) {
      return (await req.json()) as Quote;
    }
    return { content: "Loading", author: "" };
  } catch (e) {
    return { content: "Error", author: "" };
  }
}
