export default class Climb {
  constructor(id, gymId, sessionStartTime, sessionEndTime) {
    this.id = id
    this.gymId = gymId
    this.sessionStartTime = sessionStartTime
    this.sessionEndTime = sessionEndTime
  }

  getId() {
    return this.id
  }

  getGymId() {
    return this.gymId
  }

  getSessionStartTime() {
    return this.sessionStartTime
  }

  getSessionEndTime() {
    return this.sessionEndTime
  }
}
