import axios from "axios";

export type AudioGenerationRequest = {
  videoUrl: string;
  targetLanguage: string;
  voice?: string;
  sourceLanguage?: string;
};

export type AudioGenerationResponse = {
  audioUrl: string;
};

export const generateAudio = async (
  request: AudioGenerationRequest
): Promise<AudioGenerationResponse> => {
  const response = await axios.post<AudioGenerationResponse>(
    "/api/audio",
    request
  );
  return response.data;
};
