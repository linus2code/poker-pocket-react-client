import React, { useState, useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';

const playerNickname = 'Anon' + Math.floor(Math.random() * 1000);

const SelectRoomModal = ({ mode, context, closeModal }) => {
  const { socketCtx, gameCtx } = context;
  const { roomId, setRoomId } = gameCtx;
  const { socket, connId, socketKey } = socketCtx;

  const [isSpect, setIsSpect] = useState(mode !== 'all');

  const filterList = [
    { key: 'allRB', label: 'All', params: 'all' },
    { key: 'lowRB', label: 'Low bets', params: 'lowBets' },
    { key: 'mediumRB', label: 'Medium bets', params: 'mediumBets' },
    { key: 'highRB', label: 'High bets', params: 'highBets' },
  ];
  const [filter, setFilter] = useState(filterList[0]);

  const onChangeFilter = (item) => {
    setFilter(item);
  };

  const [roomsData, setRoomsData] = useState(null);

  useEffect(() => {
    if (!isSpect) {
      getRooms(socket, filter.params);
    } else {
      getSpectateRooms(socket, filter.params);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSpect, filter]);

  const getRooms = (socket, roomSortParam) => {
    if (socket) {
      if (roomId === -1) {
        const data = JSON.stringify({
          connectionId: connId,
          socketKey: socketKey,
          key: 'getRooms',
          playerName: playerNickname,
          roomId: -1,
          roomSortParam: roomSortParam,
        });
        socket.send(data);
      } else {
        toast.warn('reload when already in a room');
        // TODO:
        // window.location.reload();
      }
    }
  };

  function selectRoom(room_id) {
    if (socket) {
      const data = JSON.stringify({
        connectionId: connId,
        socketKey: socketKey,
        key: 'selectRoom',
        roomId: room_id,
      });
      socket.send(data);
    }
  }

  function getSpectateRooms(socket, roomSortParam) {
    if (socket) {
      if (roomId === -1) {
        const data = JSON.stringify({
          connectionId: connId,
          socketKey: socketKey,
          key: 'getSpectateRooms',
          roomId: -1,
          roomSortParam: roomSortParam,
        });
        socket.send(data);
      } else {
        toast.warn('reload when already in a room');
        // TODO:
        // window.location.reload();
      }
    }
  }

  function selectSpectateRoom(room_id) {
    if (socket) {
      const data = JSON.stringify({
        connectionId: connId,
        socketKey: socketKey,
        key: 'selectSpectateRoom',
        roomId: room_id,
      });
      socket.send(data);

      const data2 = JSON.stringify({
        connectionId: connId,
        socketKey: socketKey,
        key: 'getRoomParams',
        roomId: room_id,
      });
      socket.send(data2);
    }
  }

  useEffect(() => {
    if (socket) {
      regGameHandler(socket);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  const regGameHandler = (socket) => {
    // Example: {"key":"getRooms","data":[{"roomId":0,"roomName":"Room 0","playerCount":0,"maxSeats":6},{"roomId":1,"roomName":"Room 1","playerCount":0,"maxSeats":6},{"roomId":2,"roomName":"Room 2","playerCount":0,"maxSeats":6}]}
    socket.handle('getRooms', (jsonData) => parseRooms(jsonData.data));

    socket.handle('getSpectateRooms', (jsonData) => parseRooms(jsonData.data));
  };

  const parseRooms = (rData) => {
    setRoomsData(rData);
  };

  const chooseRoom = (rData) => {
    const room_id = Number(rData.roomId);
    if (room_id !== -1) {
      setRoomId(room_id);
      isSpect ? selectSpectateRoom(room_id) : selectRoom(room_id);
      closeModal();
    }
  };

  function PlayingRoomClick() {
    setIsSpect(false);
  }
  function SpectateRoomClick() {
    setIsSpect(true);
  }

  const RoomView = useMemo(() => {
    if (!roomsData) {
      return null;
    }
    return roomsData.map((rData) => {
      const minBet = rData['roomMinBet'] ? rData.roomMinBet : 10;
      const desc = ' ➟ ' + rData.playerCount + '/' + rData.maxSeats + ' ➟ MB ' + minBet + '$';
      return (
        <button
          key={rData.roomId}
          type="button"
          onClick={() => chooseRoom(rData)}
          className="list-group-item list-group-item-action"
        >
          <div className="d-flex flex-row">
            <div className="p-2" style={{ marginLeft: '-10px' }}>
              <div className={!isSpect ? 'chipIcon' : 'spectateIcon'}></div>
            </div>
            <div className="p-2" style={{ marginLeft: '-10px' }}>
              <b>{rData.roomName}</b>
              {desc}
            </div>
          </div>
        </button>
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomsData, isSpect]);

  return (
    <>
      <p>
        <button
          type="button"
          onClick={PlayingRoomClick}
          className={`btn btn3d ${!isSpect ? 'btn-primary' : 'btn-default'}`}
        >
          Playing rooms
        </button>
        <button
          type="button"
          onClick={SpectateRoomClick}
          className={`btn btn3d ${isSpect ? 'btn-primary' : 'btn-default'}`}
        >
          Spectate rooms
        </button>
      </p>
      <div style={{ marginLeft: '10px', marginBottom: '5px' }}>
        {filterList.length > 0
          ? ['radio'].map((type) =>
              filterList.map((item, index) => {
                return (
                  <div key={item.key} className="custom-control custom-radio custom-control-inline">
                    <input
                      id={item.key}
                      name={type}
                      type={type}
                      className="custom-control-input"
                      checked={filter.key === item.key}
                      onChange={() => onChangeFilter(item)}
                    />
                    <label className="custom-control-label" htmlFor={item.key}>
                      {item.label}
                    </label>
                  </div>
                );
              })
            )
          : null}
      </div>
      <div id="roomListGroup" className="list-group">
        {/* <!-- Dynamically appending here from javascript --> */}
        {RoomView}
      </div>
    </>
  );
};

export default SelectRoomModal;
