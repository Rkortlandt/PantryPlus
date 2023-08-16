migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("i75zvnc51e32ysc")

  collection.createRule = ""
  collection.updateRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("i75zvnc51e32ysc")

  collection.createRule = null
  collection.updateRule = null

  return dao.saveCollection(collection)
})
