/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4lzn3v06f8t9jbq")

  collection.viewRule = "@request.auth.id ?= familyMembers.user.id || @request.auth.id = familyCoordinator.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4lzn3v06f8t9jbq")

  collection.viewRule = "@request.auth.id ?= familyMembers.user.id"

  return dao.saveCollection(collection)
})
