import { createContext } from "react";
interface PlayBackContextTypes {
    playingTrack: string | string[] | undefined;
    chooseTrack: (track: string[] | string) => void;
}

export const PlayBackContext = createContext<PlayBackContextTypes | null>(null);
