class App {
  constructor() {}

  /**
   * @type {App.Properties}
   */
  get properties() {
    if (!this._properties) {
      this._properties = PropertiesService.getScriptProperties().getProperties();
    }
    return this._properties;
  }

  doGet() {}

  /**
   *
   * @param {GoogleAppsScript.Events.DoPost} e
   */
  doPost(e) {
    try {
      /** @type {App.SMSForwarderPayload} */
      const sms = JSON.parse(e.postData.contents);
      if (sms.from && sms.sentStamp && sms.receivedStamp)
        SpreadsheetApp.openById(this.properties.bookId).appendRow([
          new Date(),
          sms.sentStamp,
          sms.text,
          sms.from,
          sms.sim,
          sms.receivedStamp,
        ]);
    } catch (error) {
      console.error(error.message, error.stack);
    }
  }
}

/**
 * @typedef {{
 *  bookId: string;
 * }} App.Properties
 */

/**
 * @typedef {{
 *  from: string;
 *  text: string;
 *  sentStamp: number;
 *  receivedStamp: number;
 *  sim: string;
 * }} App.SMSForwarderPayload
 */
