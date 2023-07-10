migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4lzn3v06f8t9jbq")

  collection.listRule = null
  collection.viewRule = "@request.auth.id = familyCoordinator.id"
  collection.updateRule = "@request.auth.id = familyCoordinator.id"
  collection.deleteRule = "@request.auth.id = familyCoordinator.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4lzn3v06f8t9jbq")

  collection.listRule = ""
  collection.viewRule = null
  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
