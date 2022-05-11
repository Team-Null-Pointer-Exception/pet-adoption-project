//
//
// var pubnub = new PubNub({
//     publishKey: "pub-c-bb9af08e-b237-4be3-9034-01b26d08c08a",
//     subscribeKey: "sub-c-f4ccb286-cd53-11ec-8bef-6e591379c0d0",
//     uuid: "myUniqueUUID"
// });
//
//
//
// export default (request) => {
//     /** The "Hello World" sample function transforms the message payload
//      * before the message is published to channel
//      * and delivered to subscribers.
//      **/
//     console.log('request',request); //request
//
//     request.message = 'Hello World!'; // modify message payload
//     console.log("message:",request.message); //message Payload
//     console.log("channel:",request.channels[0]); //channel
//     console.log("uuid:",request.params.uuid); //uuid
//
//     return request.ok(); // return a promise when you're done
// };

