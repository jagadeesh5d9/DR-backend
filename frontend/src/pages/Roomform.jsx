import React, { useState } from "react";
import axios from "axios";

const Roomform = ({ floorId, blockId, onClose, refreshBlockData }) => {
  const [roomId, setRoomId] = useState("");
  const [roomName, setRoomName] = useState("");
  const [roomType, setRoomType] = useState("");
  const [roomCapacity, setRoomCapacity] = useState(0);
  const [err, setErr] = useState("");

  const handleAddRoom = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/block/floor/room/${blockId}/${floorId}`, {
        room_id: roomId,
        room_name: roomName,
        room_type: roomType,
        room_capacity: roomCapacity,
      });
      setRoomName("");
      setRoomType("");
      setRoomCapacity(0);
      refreshBlockData(); // Refresh block data after adding room
      onClose(); // Close the form
    } catch (error) {
      setErr("Failed to add room");
      console.error(error);
    }
  };

  return (
    <div className="room-form">
      <h2>Add Room to Floor</h2>
      {err && <p className="error">Error: {err}</p>}
      <form>
        <input
          type="number"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          placeholder="Enter room Id"
          required
        />
        <input
          type="text"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          placeholder="Enter room name"
          required
        />
        <input
          type="text"
          value={roomType}
          onChange={(e) => setRoomType(e.target.value)}
          placeholder="Enter room type"
          required
        />
        <input
          type="number"
          value={roomCapacity}
          onChange={(e) => setRoomCapacity(Number(e.target.value))}
          placeholder="Enter room capacity"
          required
        />
        <button onClick={handleAddRoom}>Add Room</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default Roomform;

// classroom
// faculty room
// labs
// seminars
// other