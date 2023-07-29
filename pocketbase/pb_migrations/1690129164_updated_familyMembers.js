migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0iarb5abfj9atin")

  collection.viewRule = "@request.auth.id != ''"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0iarb5abfj9atin")

  collection.viewRule = null

  return dao.saveCollection(collection)
})
