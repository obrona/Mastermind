import { useState } from "react";
import { Mastermind } from "../GameLogic/Mastermind";

export function useMastermind() {
    const [_, setUpdate] = useState(false);
    const [game, setGame] = useState(new Mastermind(tick));

    function tick() {
        setUpdate(t => !t);
    }

    function reset() {
        setGame(new Mastermind(tick));
    }

    return {
        game,
        tick,
        reset,
    }
}