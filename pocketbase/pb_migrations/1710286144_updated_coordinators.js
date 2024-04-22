/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qwuakp1omvixwh1")

  collection.listRule = "@request.auth.id = id || @request.data.familyCode = familyCode"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qwuakp1omvixwh1")

  collection.listRule = "@request.auth.id = id || (familyCodeUpdated = @hour && @request.data.familyCode = familyCode)"

  return dao.saveCollection(collection)
})
