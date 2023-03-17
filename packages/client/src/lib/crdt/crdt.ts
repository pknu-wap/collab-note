class CRDT {
  constructor() {
    //
  }

  localInsert() {
    // 1. 입력된 문자의 left, right를 찾음.
    // 2. left.id, right.id 사이의 id를 만듦 -> { id, content }, CRDT에 넣기: merge()
    // 3. socket.emit('insert', operation)
    return;
  }

  localDelete() {
    // 1. CRDT에서 n번째 문자 찾기.
    // 2. CRDT에서 n번째 문자 지우기: merge()
    // 3. socket.emit('delete', operation)
    return;
  }

  remoteInsert() {
    // 1. CRDT에서 받은 문자가 들어가야 할 index를 찾음: findIndex()
    // 2. CRDT에 넣기: merge()
    return;
  }

  remoteDelete() {
    // 1. CRDT에서 삭제된 문자의 index를 찾음: findIndex()
    // 2. CRDT에서 지우기: merge()
    return;
  }
}

export default CRDT;
