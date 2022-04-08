const INITAL_STATE = {
    volume: 1
}

interface Action {
    type: string,
    volume: number
}

const songPlayer = (state = INITAL_STATE, action: Action) => {
    switch (action.type) {
        case 'SAVE_VOLUME': 
            return {
                volume: action.volume
            }
        default: 
            return state
    }
}

export default songPlayer;