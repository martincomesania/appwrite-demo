const sdk = require("node-appwrite");

module.exports = async function (req, res) {
  const client = new sdk.Client();
  const database = new sdk.Databases(client);

  if (
    !req.variables['APPWRITE_FUNCTION_ENDPOINT'] ||
    !req.variables['APPWRITE_FUNCTION_API_KEY']
  ) {
    console.warn("Environment variables are not set. Function cannot use Appwrite SDK.");
  } else {
    client
      .setEndpoint(req.variables['APPWRITE_FUNCTION_ENDPOINT'])
      .setProject(req.variables['APPWRITE_FUNCTION_PROJECT_ID'])
      .setKey(req.variables['APPWRITE_FUNCTION_API_KEY'])
      .setSelfSigned(true);
  }

  const data = JSON.parse(req.variables['APPWRITE_FUNCTION_EVENT_DATA']);

  const databaseId = data.$databaseId;
  const collectionId = data.$collectionId;
  const documentId = data.$id;
	const { description, $read, $write } = data;
	const document = {
		description: "CHANGED_BY_A_FUNCTION_" + description
	};

	try {
		await database.updateDocument(databaseId, collectionId, documentId, document, $read, $write);
		res.json({ success: true });
	} catch (e) {
		res.send(`Unable to update description for the message ${e}}`, 400);
	}

};
