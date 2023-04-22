import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

function Home() {
  const [videoUrl, setVideoUrl] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("en-US");
  const [sourceLanguage, setSourceLanguage] = useState("en-US");
  const [voice, setVoice] = useState("en-US-Wavenet-F");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleVideoUrlChange = (event) => {
    setVideoUrl(event.target.value);
  };

  const handleTargetLanguageChange = (event) => {
    setTargetLanguage(event.target.value);
  };

  const handleSourceLanguageChange = (event) => {
    setSourceLanguage(event.target.value);
  };

  const handleVoiceChange = (event) => {
    setVoice(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    const response = await fetch("/api/generate-audio", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        videoUrl,
        targetLanguage,
        sourceLanguage,
        voice,
      }),
    });

    const { audioUrl } = await response.json();

    setIsLoading(false);

    router.push({
      pathname: "/video",
      query: {
        videoUrl,
        audioUrl,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-700 to-blue-700 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-inter">
      <Head>
        <title>Worwio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-white">
            Worwio
          </h2>
          <p className="mt-2 text-center text-md text-white">
            Make videos speak any language with Worwio&apos;s magic voice tool!{" "}
          </p>
        </div>
        <form className="mt-8" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm">
            <div className="divide-y divide-gray-200">
              <div className="py-2">
                <label className="sr-only" htmlFor="videoUrl">
                  Video URL
                </label>
                <input
                  id="videoUrl"
                  name="videoUrl"
                  type="url"
                  autoComplete="off"
                  required
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                  placeholder="Video URL"
                  value={videoUrl}
                  onChange={handleVideoUrlChange}
                />
              </div>
              <div className="py-2">
                <label className="sr-only" htmlFor="sourceLanguage">
                  Source Language
                </label>
                <select
                  id="sourceLanguage"
                  name="sourceLanguage"
                  autoComplete="off"
                  required
                  className="block w-full px-3 py-2 border border-gray

                  -300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                  value={sourceLanguage}
                  onChange={handleSourceLanguageChange}
                >
                  <option value="en-US">English</option>
                  <option value="cs-CZ">Czech</option>
                </select>
              </div>
              <div className="py-2">
                <label className="sr-only" htmlFor="targetLanguage">
                  Target Language
                </label>
                <select
                  id="targetLanguage"
                  name="targetLanguage"
                  autoComplete="off"
                  required
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                  value={targetLanguage}
                  onChange={handleTargetLanguageChange}
                >
                  <option value="en-US">English</option>
                  <option value="cs-CZ">Czech</option>
                </select>
              </div>
              <div className="py-2">
                <label className="sr-only" htmlFor="voice">
                  Voice
                </label>
                <select
                  id="voice"
                  name="voice"
                  autoComplete="off"
                  required
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                  value={voice}
                  onChange={handleVoiceChange}
                >
                  <option value="en-US-Wavenet-F">Female</option>
                  <option value="en-US-Wavenet-C">Male</option>
                </select>
              </div>
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {isLoading ? "Generating Audio..." : "Generate Audio"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Home;
