migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  // remove
  collection.schema.removeField("wnkpntoe")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yssnpxbo",
    "name": "family",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "0iarb5abfj9atin",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wnkpntoe",
    "name": "family",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "4lzn3v06f8t9jbq",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  // remove
  collection.schema.removeField("yssnpxbo")

  return dao.saveCollection(collection)
})
