@genType
let loadMessages = (lang, loadMessages) => {
  let lang = lang->Option.getOr("en")
  let messages = Js.Promise.all(loadMessages(lang))

  messages
}
