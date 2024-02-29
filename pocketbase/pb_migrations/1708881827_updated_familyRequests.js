/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("i75zvnc51e32ysc")

  collection.listRule = "@request.auth.id != '' && (user.id = @request.auth.id || family.familyCoordinator.id = @request.auth.id)"
  collection.createRule = "@request.auth.collectionName = \"users\""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("i75zvnc51e32ysc")

  collection.listRule = "@request.auth.id != '' && (user = @request.auth.id || family.familyCoordinator = @request.auth.id)"
  collection.createRule = ""

  return dao.saveCollection(collection)
})
