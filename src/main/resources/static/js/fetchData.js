/**
 * Given an object containing all the required data for a given page, fetch all the needed data and return it as properties to pass to a view.
 * @param state
 * @param request
 * @returns {Promise<{}>}
 */
export const baseUri = "https://team-npe.fulgentcorp.com:8080";
// export const baseUri = "http://localhost:8080";

export default function fetchData(state, request) {
    const promises = [];
    console.log("got to fetch data");
    for (let pieceOfState of Object.keys(state)) {
        console.log(baseUri + state[pieceOfState]);
        promises.push(
            fetch(baseUri + state[pieceOfState], request)
                .then(function (res) {
                    return res.json();
                }));
    }
    return Promise.all(promises).then(propsData => {
        const props = {};
        Object.keys(state).forEach((key, index) => {
            props[key] = propsData[index];
        });
        return props;
    });
}