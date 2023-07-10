migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4lzn3v06f8t9jbq")

  collection.createRule = "@request.auth.collectionName.coordinators.id != '' && @request.auth.name ?!= @request.data.field.familyCoordinator"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4lzn3v06f8t9jbq")

  collection.createRule = null

  return dao.saveCollection(collection)
})
