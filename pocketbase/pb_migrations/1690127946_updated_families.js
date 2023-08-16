migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4lzn3v06f8t9jbq")

  collection.listRule = "@request.auth.id != '' && hidden = false"

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "sgzvpd5w",
    "name": "hidden",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4lzn3v06f8t9jbq")

  collection.listRule = null

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "sgzvpd5w",
    "name": "Hidden",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
})
