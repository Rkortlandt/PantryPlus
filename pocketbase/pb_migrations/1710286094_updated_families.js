/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4lzn3v06f8t9jbq")

  collection.listRule = "@request.auth.id != '' && hidden = false && @request.data.joinCode = joinCode"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4lzn3v06f8t9jbq")

  collection.listRule = "@request.auth.id != '' && hidden = false"

  return dao.saveCollection(collection)
})
