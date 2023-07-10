migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4lzn3v06f8t9jbq")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "spcbtcm2",
    "name": "familyName",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4lzn3v06f8t9jbq")

  // remove
  collection.schema.removeField("spcbtcm2")

  return dao.saveCollection(collection)
})
