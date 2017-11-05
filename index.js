const id = process.env.SUBID;
const projectID = process.env.PROJECTID;
const authJSONFile = process.env.CREDJSON;

console.log(`Params are - ${id}, ${projectID} and ${authJSONFile}`);

if (!id || !projectID || !authJSONFile) {
    throw Error("Please provide required parameters. Parameters are required - SUBID, PROJECTID a" +
            "nd CREDJSON");
}

const reviewer = require("./helpers/reviewer");
const pubsub = require('@google-cloud/pubsub')({projectId: projectID, credentials: require(authJSONFile)});

// Reference a topic that has been previously created.
var topic = pubsub.topic('assistant-codereview');

const onMessage = (event) => {

    console.log(`event received -`, event);
    const message = event
        .data
        .toString('utf8');

    let eventJSON = {
        action: message
    };

    try {
        console.log("trying parse", typeof message);
        eventJSON = JSON.parse(message);
        console.log(eventJSON);
    } catch (error) {
        console.log(error, "Not received a event data JSON so using JSON.data");
    }

    console.log(`Got a message - ${message} and action is ${eventJSON.action}`);

    switch (eventJSON.action) {
        case "codereview.start":
            console.log("starting codereview.start");
            reviewer();
            break;

        default:
            console.log(`No commands sent.`);
            break;
    }

    event.ack();
}

const onError = (err) => {
    console.log(err);
}

// Subscribe to the topic.
topic
    .createSubscription('codereviewer-' + id, function (err, subscription) {
        if (err) {
            console.log(err);
        }
        subscription.on('error', onError);
        subscription.on('message', onMessage);
    });

console.log("Listening for commands");