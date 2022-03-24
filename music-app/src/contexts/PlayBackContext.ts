import { createContext } from "react";

type PlayBackContextTypes = {
    chooseTrack: (track: string[] | string) => void
}

export const PlayBackContext = createContext<PlayBackContextTypes | null>(null);
