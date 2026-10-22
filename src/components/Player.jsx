import { useState } from 'react';

const Player = ({ initialName, symbol, isActive, saveName }) => {
    const [playerName, setPlayerName] = useState(initialName)
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
        if (isEditing) {
            saveName(symbol, playerName);
        }
        setIsEditing((prev) => !prev);
    }

    const handleNameChange = (event) => {
        setPlayerName(event.target.value);
    }
    return (
        <li className={isActive ? 'active' : ""}>
            <span className="player">
                {isEditing ?
                    <input type="text" required value={playerName} onChange={handleNameChange} /> :
                    <span className="player-name">{playerName}</span>
                }
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
        </li>
    )
}

export default Player;