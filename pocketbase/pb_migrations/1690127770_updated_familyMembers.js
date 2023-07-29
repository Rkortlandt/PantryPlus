migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0iarb5abfj9atin")

  collection.viewRule = "@request.auth.id = user.id || @request.auth.id = family.familyCoordinator.id"
  collection.createRule = "@request.auth.id = @request.data.family.familyCoordinator.id && @request.auth.collectionName = 'coordinators'"
  collection.updateRule = "@request.auth.id = family.familyCoordinator.id"
  collection.deleteRule = "@request.auth.id = user.id || @request.auth.id = family.familyCoordinator.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0iarb5abfj9atin")

  collection.viewRule = null
  collection.createRule = null
  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
