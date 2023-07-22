migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qwuakp1omvixwh1")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fxclwr3z",
    "name": "familyName",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "k82v256j",
    "name": "family",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "4lzn3v06f8t9jbq",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qwuakp1omvixwh1")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fxclwr3z",
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

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "k82v256j",
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

  return dao.saveCollection(collection)
})
