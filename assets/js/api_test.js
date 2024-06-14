// api.js
const API_URL = "https://raft-alta-main.victoriouswave-6fcdb8d5.swedencentral.azurecontainerapps.io/answer/";

async function fetchBotResponse(userInput) {
    const requestBody = { input: userInput, max_token_number: 256 };
    const requestHeaders = new Headers({
        "Content-Type": "application/json",
        "Authorization": `Bearer`,
        "azureml-model-deployment": "blue"
    });

    const response = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: requestHeaders,
        mode: "no-cors",
        crossorigin: true,
        withCredentials: true
    });

    if (!response.ok) {
        console.debug(...response.headers);
        console.debug(response.body);
        throw new Error("Request failed with status code " + response.status);
    }

    const jsonResponse = await response.json();
    return jsonResponse.result || "I'm sorry, I couldn't understand that.";
}



// // Request data goes here
// // The example below assumes JSON formatting which may be updated
// // depending on the format your endpoint expects.
// // More information can be found here:
// // https://docs.microsoft.com/azure/machine-learning/how-to-deploy-advanced-entry-script

// const requestBody = "" ;

// const requestHeaders = new Headers({"Content-Type" : "application/json"});

// // Replace this with the primary/secondary key, AMLToken, or Microsoft Entra ID token for the endpoint
// const apiKey = "3nHpagripcGpufOSQRh5fv2rG5drQKYL";
// if (!apiKey)
// {
// 	throw new Exception("A key should be provided to invoke the endpoint");
// }
// requestHeaders.append("Authorization", "Bearer " + apiKey)

// // This header will force the request to go to a specific deployment.
// // Remove this line to have the request observe the endpoint traffic rules
// requestHeaders.append("azureml-model-deployment", "blue");

// const url = "https://opt-endpoint-10-06-24.westus2.inference.ml.azure.com/score";

// fetch(url, {
//   method: "POST",
//   body: JSON.stringify(requestBody),
//   headers: requestHeaders
// })
// 	.then((response) => {
// 	if (response.ok) {
// 		return response.json();
// 	} else {
// 		// Print the headers - they include the request ID and the timestamp, which are useful for debugging the failure
// 		console.debug(...response.headers);
// 		console.debug(response.body)
// 		throw new Error("Request failed with status code" + response.status);
// 	}
// 	})
// 	.then((json) => console.log(json))
// 	.catch((error) => {
// 		console.error(error)
// 	});

