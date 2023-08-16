migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("i75zvnc51e32ysc")

  collection.listRule = "@request.auth.id != '' && (userRequest = @request.auth.id || family.familyCoordinator = @request.auth.id)"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("i75zvnc51e32ysc")

  collection.listRule = null

  return dao.saveCollection(collection)
})
