migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("62oj10x15e12v1l")

  collection.name = "familysHidden"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("62oj10x15e12v1l")

  collection.name = "familys_duplicate"

  return dao.saveCollection(collection)
})
