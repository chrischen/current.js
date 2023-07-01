import { Writable } from "stream";
import type { RecordMap } from "./RelayEnvironment";

export default class PreloadInsertingStreamNode extends Writable {
  _store: RecordMap | undefined;
  _writable: Writable;
  _hasWrittenDocument: boolean;

  constructor(writable: Writable) {
    super();
    // this._queryData = [];
    // this._assetLoaderTags = [];
    this._writable = writable;
    // Disable preloading until the document is written or we'll get an invalid page.
    this._hasWrittenDocument = false;
    this._store = undefined;
  }

  /**
   * Should be invoked when a new Relay query is started or updated.
   *
   * @param {string} id
   *   The query ID used to track the request between server and client.
   * @param {*} response
   *   The Relay response or undefined in case this request is just being initiated.
   * @param {boolean|undefined} final
   *   Whether this is the final response for this query (or undefined in case the query is just being initiated).
   */
  /* onQuery(id, response, final) {
    this._queryData.push({ id, response, final })
  } */

  setStore(store: RecordMap) {
    this._store = store;
  }

  /**
   * Should be invoked when a new asset has been used.
   *
   * @param {string} loaderTag
   *   The HTML tag (e.g. `link` or `script`) that loads the required resource.
   */
  /* onAssetPreload(loaderTag) {
    this._assetLoaderTags.push(loaderTag)
  } */

  /**
   * Generates the HTML tags needed to load assets used since the last call.
   *
   * @returns {string}
   *   An HTML string containing Relay Data snippets and asset loading tags.
   */
  _generateNewScriptTagsSinceLastCall() {
    let scriptTags = "";

    // if (this._queryData.length > 0) {
    if (this._store)
      scriptTags = `<script type="text/javascript" class="__relay_data">
          window.__GRAPHQL_STATE__ = ${JSON.stringify(
        this._store.getSource().toJSON()
      )};
      if (window.__READY_TO_BOOT__) window.updateRelayStore(window.__GRAPHQL_STATE__);
          Array.prototype.forEach.call(
            document.getElementsByClassName("__relay_data"),
            function (element) {
              element.remove()
            }
          );
          </script>`;

    // this._queryData = [];
    // }

    // if (this._assetLoaderTags.length > 0) {
    //   scriptTags += this._assetLoaderTags.join("");

    //   this._assetLoaderTags = [];
    // }

    return scriptTags;
  }

  _write(chunk: Buffer, encoding: BufferEncoding, callback: () => void) {
    // This should pick up any new tags that hasn't been previously
    // written to this stream.
    if (this._hasWrittenDocument) {
      const scriptTags = this._generateNewScriptTagsSinceLastCall();
      if (scriptTags.length > 0) {
        // Write it before the HTML to ensure that we can start
        // downloading it as early as possible.
        this._writable.write(scriptTags);
      }
    }
    // Enable preloading only after the document is written.
    this._hasWrittenDocument = true;
    // Finally write whatever React tried to write.
    this._writable.write(chunk, encoding, callback);
  }

  /* flush() {
    if (typeof this._writable.flush === 'function') {
      this._writable.flush();
    }
  } */
}
