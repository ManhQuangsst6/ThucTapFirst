
import { auth } from "~/stores/auth";
import { load } from "~/stores/loading";
export default defineNuxtPlugin(({ ssrContext }) => {
    const config = useRuntimeConfig();
    const header = useRequestHeaders(['cookie'])
    // const body = useRe
    const authStores = auth();
    const loadStores = load();
    //debugger;
    if(authStores.$state.token && authStores.$state.token.token)
    {
        header.Authorization = "Bearer " + authStores.$state.token.token
    }
    if(window.token)
    {
        header.Authorization = "Bearer " + window.token
    }
    // const headers = {Authorization: "Bearer " + token.access_token}

    return {
        provide: {
            spaFetch: $fetch.create({
                baseURL: config.public.baseURL,
                headers: header,
                async onResponse(response) {
                    //console.log('spaFetch onResponse ')
                    //console.log(response)
                    loadStores.setLoading(false)
                },
                async onRequest(response) {
                    if(authStores.$state.token && authStores.$state.token.token)
                    {
                        header.Authorization = "Bearer " + authStores.$state.token.token
                    }
                    if(window.token)
                    {
                        header.Authorization = "Bearer " + window.token
                    }
                    //console.log('spaFetch onRequest ')
                    //console.log(response)
                    loadStores.setLoading(this.loading == false ? false : true)
                },
                async onRequestError({ response }) {
                    //console.log('spaFetch onRequestError CORS')
                    //console.log(response)
                    loadStores.setLoading(false)
                },
                async onResponseError({ response }) {      
                    //console.log('spaFetch onResponseError')
                    //console.log(response)
                    loadStores.setLoading(false)
                },
            })
        }
    }
});
