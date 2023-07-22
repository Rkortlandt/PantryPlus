migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qwuakp1omvixwh1")

  collection.listRule = "@request.auth.id = id"
  collection.viewRule = "@request.auth.id = id"
  collection.deleteRule = "@request.auth.id = id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qwuakp1omvixwh1")

  collection.listRule = null
  collection.viewRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
