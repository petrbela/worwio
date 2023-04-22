import Router from "next/router";
import React, { useState, ChangeEvent, FormEvent } from "react";

function Index() {
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [targetLanguage, setTargetLanguage] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Call the API and handle the response here
  };

  const handleVideoUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVideoUrl(e.target.value);
  };

  const handleTargetLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setTargetLanguage(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-700 to-blue-700 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-inter">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-center text-4xl font-semibold text-gray-900 mb-4">
          Worwio
        </h1>
        <h2 className="text-center text-xl text-gray-600 mb-6">
          Make videos speak any language with Worwio&apos;s magic voice tool!
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="video-url"
              className="block text-sm font-medium text-gray-700"
            >
              Video URL
            </label>
            <input
              id="video-url"
              type="text"
              value={videoUrl}
              onChange={handleVideoUrlChange}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="target-language"
              className="block text-sm font-medium text-gray-700"
            >
              Target Language
            </label>
            <select
              id="target-language"
              value={targetLanguage}
              onChange={handleTargetLanguageChange}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select a language</option>
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="cs">Czech</option>
              {/* Add more languages as needed */}
            </select>
          </div>
          <button
            onClick={() => Router.push("/video")}
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Magic! 🪄
          </button>
        </form>
      </div>
    </div>
  );
}

export default Index;
