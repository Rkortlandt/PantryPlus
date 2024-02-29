/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qwuakp1omvixwh1")

  collection.listRule = "@request.auth.id = id || (FamilyCodeUpdated = @hour && @request.data.FamilyCode = FamilyCode)"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qwuakp1omvixwh1")

  collection.listRule = "@request.auth.id = id || FamilyCodeUpdated = @hour"

  return dao.saveCollection(collection)
})
