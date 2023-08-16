migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4lzn3v06f8t9jbq")

  collection.createRule = "@request.auth.id != '' && @request.auth.collectionName = 'coordinators' && @request.data.familyCoordinator.id ?!= @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4lzn3v06f8t9jbq")

  collection.createRule = null

  return dao.saveCollection(collection)
})
