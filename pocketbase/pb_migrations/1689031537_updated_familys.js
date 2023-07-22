migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4lzn3v06f8t9jbq")

  collection.listRule = "@request.auth.id = familyCoordinator.id || @request.auth.id = familyManager.id || @request.auth.id = familyRequesters.id || @request.auth.id = familyVeiwers.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4lzn3v06f8t9jbq")

  collection.listRule = null

  return dao.saveCollection(collection)
})
