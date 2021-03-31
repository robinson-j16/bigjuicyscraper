//This code was posted for an article at https://codingislove.com/send-sms-developers/

const axios = require("axios");

const tlClient = axios.create({
    baseURL: "https://api.txtlocal.com/",
    params: {
        apiKey: "MzEzMTk2Njg4Yjk1YjcyOTdlZjQxMzc4YzU0MGZlZmQ=", //Text local api key
    }
});

const smsClient = {
    sendMessage: url => {
        if (url) {
            const params = new URLSearchParams();
            params.append("numbers", [parseInt("447923018796"), parseInt("447803428549")]);
            params.append(
                "message",
                `BEER LINK: ` + url
            );

            tlClient.post("/send", params)
        }
    },
};

module.exports = smsClient;

// Now import the client in any other file or wherever required and run these functions
// const smsClient = require("./smsClient");
// smsClient.sendMessage(user)