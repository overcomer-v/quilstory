class JournalEvent {
  #tags;
  constructor({ id = null, date, title, tags, imageUrl, journalEvent }) {
    this.id = id;
    this.date = date;
    this.title = title;
    this.#tags = tags;
    this.imageUrl = imageUrl;
    this.journalEvent = journalEvent;
  }

  getTags() {
    return this.#tags.split(",");
  }

  toObject() {
    return {
      id: this.id,
      date: this.date,
      title: this.title,
      tags: this.getTags(),
      imageUrl: this.imageUrl,
      journalEvent: this.journalEvent,
    };
  }
}

export default JournalEvent;
