migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4lzn3v06f8t9jbq")

  collection.createRule = "@request.auth.collectionName.coordinators.id != '' && @request.auth.id ?!= @request.data.field.familyCoordinator"
  collection.deleteRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4lzn3v06f8t9jbq")

  collection.createRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
