migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0iarb5abfj9atin")

  collection.name = "familyRelation"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0iarb5abfj9atin")

  collection.name = "familyMembers"

  return dao.saveCollection(collection)
})
