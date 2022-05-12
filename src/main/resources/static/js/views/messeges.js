
import {getHeaders} from "../auth.js";

export default function UserIndex(props) {
    return `
        <main>
            <div>
                Enter Chat and press enter
            <div>
            <input id=input placeholder="message" />
            </div>
                 Chat Output
                <div 
                    id=box>
               </div>
            </div>
        </main>
`;
}

export function MessageEvent() {
    const pubnub = new PubNub({
        publishKey: 'pub-c-bb9af08e-b237-4be3-9034-01b26d08c08a',
        subscribeKey: 'sub-c-f4ccb286-cd53-11ec-8bef-6e591379c0d0'
    });

    function $(id) {
        return document.getElementById(id);
    }

    const box = $('box'),
        input = $('input'),
        channel = '10chat-demo';
    pubnub.addListener({
        message: function (obj) {
            box.innerHTML = ('' + obj.message).replace(/[<>]/g, '') + '<br>' + box.innerHTML
        }
    });
    pubnub.subscribe({
        channels: [channel]
    });
    input.addEventListener('keyup', function (e) {
        if ((e.keyCode || e.charCode) === 13) {
            pubnub.publish({
                channel: channel,
                message: input.value,
                x: (input.value = '')
            });
        }

        let request = {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(box)
        }
        pubnub.fetchMessages(
            {
                channels: ["chats_guilds.mages_guild"],
                end: '15343325004275466',
                count: 100
            },
            function(status, response) {
                console.log(status, response);
            }
        );

        // fetch("http://localhost:8080/about", request)
        //     .then(response => {
        //         console.log(response.status);
        //         CreateView("/");
        //     }).catch(error => {
        //     console.log(error);
        //     createView("/");
        // });
    });
}
